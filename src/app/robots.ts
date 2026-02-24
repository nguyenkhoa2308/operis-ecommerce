import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account/",
          "/cart",
          "/checkout",
          "/login",
          "/register",
        ],
      },
    ],
    sitemap: "https://operis.vn/sitemap.xml",
  };
}
