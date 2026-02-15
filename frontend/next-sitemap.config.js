/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://gentlemenbarber.ru",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/cabinet", "/cabinet/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
