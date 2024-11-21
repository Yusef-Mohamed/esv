import { client } from "@/sanity/client";
import { MetadataRoute } from "next";
const pages = [
  "",
  "about",
  "contact",
  "projects",
  "courses",
  "services",
  "transparency-act",
];
const projectIdsQuery = `*[_type == "project"]{ _id }`;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch<{ _id: string }[]>(projectIdsQuery);
  const productsEntries = projects.map((project) => {
    return `projects/${project._id}`;
  });

  const allPages = [...pages, ...productsEntries];
  const enLocales = allPages.map((page) => {
    return {
      url: "https://esvc.no/" + "en" + "/" + page,
    };
  });
  const noLocales = allPages.map((page) => {
    return {
      url: "https://esvc.no/" + "no" + "/" + page,
    };
  });

  return [...noLocales, ...enLocales];
}
