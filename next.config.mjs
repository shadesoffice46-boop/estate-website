/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // High-quality placeholder imagery is served from Unsplash.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Baseline security headers. A strict CSP is added once the site is behind
  // a domain + HTTPS (the next deployment step).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Pragmatic CSP that doesn't break Next's runtime. Upgrade path:
            // switch to a nonce-based policy via middleware to drop 'unsafe-inline'.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' data: https://images.unsplash.com",
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
