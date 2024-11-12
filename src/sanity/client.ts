import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "ynn3pota",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
const builder = ImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
