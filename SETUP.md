# ESTATE — Backend Setup (n8n + Supabase + Claude + Mail)

This guide takes the system from "code is ready" to "live and answering inquiries".
Everything technical is already built; **you only fill in your own credentials**.

> What's already done for you:
> - Website + secure `/api/inquiry` route (validation, rate-limit, honeypot, IP hashing, security headers)
> - n8n workflows **already created** in your instance: `Website Inquiry (Full)` and `ESTATE Error Handler`
> - Placeholder credentials already created in n8n (you just edit their values)
> - Importable backups in `n8n/*.workflow.json`, DB schema in `supabase/supabase-setup.sql`,
>   reverse proxy in `deploy/nginx-estate.conf`

Do the steps **in order**. Each "▶" is an action.

---

## 0. Credentials you provide (nothing else is needed from you)

| Credential (n8n name)        | Type            | You enter                                   |
| ---------------------------- | --------------- | ------------------------------------------- |
| `ESTATE Anthropic Key (FILL IN)` | HTTP Header Auth | **Value** = your Anthropic API key (Name stays `x-api-key`) |
| `ESTATE Supabase (FILL IN)`  | Supabase API    | **Host** = project URL, **Service Role** = service_role key |
| `ESTATE SMTP (FILL IN)`      | SMTP            | Gmail address + **app password**            |

Plus these **n8n environment variables** (Step 4) and the website **`.env.local`** (Step 5).

---

## 1. Supabase (database)

▶ Create a project at [supabase.com] — **region EU (Frankfurt)** (GDPR).
▶ SQL Editor → paste `supabase/supabase-setup.sql` → **Run**. Creates the `inquiries` table with **RLS on** (anon has zero access; only the service_role key can read/write).
▶ Project Settings → API → copy **Project URL** and the **`service_role` key** (the secret one, *not* anon).
▶ In n8n → Credentials → open **`ESTATE Supabase (FILL IN)`**:
  - **Host** = `https://<your-project>.supabase.co`
  - **Service Role** = the `service_role` key → **Save**

> The `service_role` key bypasses RLS and must live **only in n8n**, never in the website.

---

## 2. Anthropic (Claude Haiku)

▶ Get an API key at [console.anthropic.com].
▶ **Restrict the key** in the Anthropic console to the domain `api.anthropic.com` (and set a spend limit — cheap insurance).
▶ In n8n → Credentials → open **`ESTATE Anthropic Key (FILL IN)`**:
  - Leave **Name** = `x-api-key`
  - **Value** = your Anthropic key → **Save**

---

## 3. E-mail sending (SMTP via Gmail — default)

▶ On the Google account: enable **2-Step Verification**, then create an **App Password** (Google Account → Security → App passwords).
▶ In n8n → Credentials → open **`ESTATE SMTP (FILL IN)`**:
  - **User** = your Gmail address
  - **Password** = the 16-char app password
  - **Host** = `smtp.gmail.com`, **Port** = `465`, **SSL/TLS** = on → **Save**

▶ **Protect your domain reputation** (so replies don't land in spam). On your sending domain's DNS:
  - **SPF**: TXT `v=spf1 include:_spf.google.com ~all`
  - **DKIM**: enable in Google Workspace admin and publish the provided key (consumer Gmail signs automatically for its own domain)
  - **DMARC**: TXT at `_dmarc` → `v=DMARC1; p=quarantine; rua=mailto:you@yourdomain`

> **Alternative — Gmail OAuth** (instead of SMTP): create a Google Cloud OAuth client (type *Web*), add n8n's OAuth redirect URL, then in n8n create a *Gmail OAuth2* credential and click *Connect* to authorize. Swap the three `Email …` nodes' credential to that Gmail credential. SMTP is simpler and recommended to start.

---

## 4. n8n environment variables

Set these in n8n (Hostinger n8n template: edit the n8n container's env / `.env`, then restart the container):

| Variable               | Value                                                      |
| ---------------------- | --------------------------------------------------------- |
| `WEBHOOK_SECRET`       | a long random value (`openssl rand -hex 32`) — **must match** the website's `N8N_WEBHOOK_SECRET` |
| `MAIL_FROM`            | e.g. `ESTATE <you@gmail.com>`                             |
| `INTERNAL_NOTIFY_EMAIL`| your internal inbox for notifications                     |
| `MAX_PER_HOUR`         | `30` (global hourly cap before AI/mail is skipped)        |

**Hardening (same env):**

| Variable               | Value / note                                              |
| ---------------------- | --------------------------------------------------------- |
| `N8N_ENCRYPTION_KEY`   | must be set **and backed up**. ⚠️ If one already exists (template), **do NOT change it** — changing it makes all stored credentials unreadable. |
| `N8N_SECURE_COOKIE`    | `true` (n8n is behind HTTPS)                              |

▶ After setting env vars, **restart the n8n container** so they take effect.

---

## 5. Connect the website (VPS)

▶ On the VPS, in `~/estate-website`, create/replace `.env.local`:

```bash
cd ~/estate-website
cat > .env.local <<'EOF'
N8N_INQUIRY_WEBHOOK_URL=https://n8n.srv1697285.hstgr.cloud/webhook/inquiry
N8N_WEBHOOK_SECRET=<SAME value as WEBHOOK_SECRET in n8n>
IP_HASH_SALT=<openssl rand -hex 16>
EOF
pm2 restart estate --update-env
```

> `.env.local` is gitignored — it never reaches GitHub.

---

## 6. Activate the workflows

The workflows already exist in your n8n. Once Steps 1–4 are done:

▶ Open **`ESTATE Error Handler`** → confirm the SMTP credential is selected → **Save**.
▶ Open **`Website Inquiry (Full)`** → confirm every node's credential dropdown shows the right credential (no red "credential missing") → **Save** → toggle **Active**.
▶ Settings (of `Website Inquiry (Full)`) → **Error Workflow** → already set to `ESTATE Error Handler` (confirm).
▶ Click the **Webhook** node → confirm the **Production URL** is
  `https://n8n.srv1697285.hstgr.cloud/webhook/inquiry` (matches Step 5).

> The old unused credential `ESTATE Webhook Secret` (header-auth) is no longer needed — the new workflow checks the secret via the `WEBHOOK_SECRET` env var in code. You may delete it.

---

## 7. HTTPS, reverse proxy & firewall (VPS)

▶ Point a domain/subdomain (A record) to `187.127.83.69`.
▶ Edit `deploy/nginx-estate.conf`, replace `<DOMAIN>`, then:

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
sudo cp deploy/nginx-estate.conf /etc/nginx/sites-available/estate
sudo ln -s /etc/nginx/sites-available/estate /etc/nginx/sites-enabled/estate
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d <DOMAIN>
```

▶ Make the app listen on localhost only (port 3001 not public). Add `HOSTNAME=127.0.0.1` to `.env.local`, then:

```bash
pm2 delete estate
HOSTNAME=127.0.0.1 PORT=3001 pm2 start "npm start" --name estate --cwd ~/estate-website
pm2 save
```

▶ Firewall — only SSH + web:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

---

## 8. End-to-end test

▶ Open the website → **Contact** section → send a real inquiry to an inbox you control.
Expected:
1. Form shows **"Message received"** instantly.
2. In n8n → `Website Inquiry (Full)` → **Executions**: one successful run.
3. In Supabase → table `inquiries`: a new row with `status = answered` and `ai_response` filled.
4. The test inbox receives the **AI reply**.
5. Your `INTERNAL_NOTIFY_EMAIL` receives an internal copy.

▶ Negative tests:
- Send the same email+message twice within 10 min → second one stored as `duplicate`, **no** second AI mail.
- POST to the webhook without the secret header → **403** (try: `curl -i -X POST https://n8n.srv1697285.hstgr.cloud/webhook/inquiry -d '{}'`).

---

## 9. Security checklist (tick before real traffic)

- [ ] HTTPS active on the domain; HTTP redirects to HTTPS
- [ ] Port **3001 closed** to the public (app bound to `127.0.0.1`, `ufw` only 80/443/SSH)
- [ ] All secrets only in n8n credentials / server `.env.local` — **none in Git** (`git grep` clean)
- [ ] Supabase **RLS enabled**; only `service_role` used (in n8n); region EU
- [ ] Anthropic key **domain-restricted** + spend limit set
- [ ] Rate limit (`MAX_PER_HOUR`) + dedup active; website API rate-limit active
- [ ] SPF + DKIM + DMARC set for the sending domain
- [ ] n8n editor behind owner login + strong password; `N8N_SECURE_COOKIE=true`
- [ ] `N8N_ENCRYPTION_KEY` set **and backed up** (offline)
- [ ] n8n Docker image pinned to a fixed version; data volume **backed up** regularly
- [ ] n8n public REST API disabled if unused
- [ ] GitHub repo set to **private** once any sensitive logic is added
- [ ] **Impressum + Datenschutzerklärung** online, and a **consent checkbox** on the form (DE legal requirement — verify with a qualified source/lawyer)

---

## Reference

| Item | Value |
| --- | --- |
| Webhook URL | `https://n8n.srv1697285.hstgr.cloud/webhook/inquiry` |
| Main workflow | `Website Inquiry (Full)` (id `BHWsM8SIaajgOmBN`) |
| Error workflow | `ESTATE Error Handler` (id `Gl7iPlPOW653yA4M`) |
| VPS | `187.127.83.69` (Ubuntu 24.04) |
| App | PM2 process `estate`, port 3001 |
