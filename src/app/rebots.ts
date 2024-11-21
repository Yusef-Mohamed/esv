import { MetadataRoute } from "next";

export default function rebots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `https://esvc.no/sitemap.xml`,
  };
}
