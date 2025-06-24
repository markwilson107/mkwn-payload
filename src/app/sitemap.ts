import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://mkwn.dev/", priority: 1, lastModified: new Date() },
  ];
}
