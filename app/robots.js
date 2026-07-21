export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/proxy"],
    },
    sitemap: "https://shivraj7.vercel.app/sitemap.xml",
  };
}
