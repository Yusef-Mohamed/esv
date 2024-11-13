/* eslint-disable @typescript-eslint/ban-ts-comment */
import { client } from "@/sanity/client";
import { PortableText, type SanityDocument } from "next-sanity";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProjectImagesSlider from "./components/ProjectImagesSlider";
const projectQuery = `*[_type == "project" && _id == $projectId][0] {
    _id, title_en, description_en, title_no, description_no, coverImage, content_en, content_no, gallery, relatedService->{
        _id, title_en, title_no
    }
}`;
const options = {};
export default async function ProjectsPage({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const { projectId } = await params;
  const pages = await getTranslations("pages");
  const text = await getTranslations("projects");
  const locale = await getLocale();
  const project = await client.fetch<SanityDocument>(
    projectQuery,
    { projectId },
    options
  );
  return (
    <main>
      <section className="container secPadding min-h-[50vh]">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/"}>{pages("home")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/projects"}>{pages("projects")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {locale === "en" ? project.title_en : project.title_no}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProjectImagesSlider project={project} />
        <h1 className="text-3xl md:text-4xl mt-3 md:mt-4 mb-1 font-semibold">
          {locale === "en" ? project.title_en : project.title_no}
        </h1>
        <p>
          <b>{text("service")}</b> :{" "}
          {locale === "en"
            ? project.relatedService.title_en
            : project.relatedService.title_no}
        </p>
        <div className="prose max-w-full mt-4">
          <PortableText
            value={locale === "en" ? project.content_en : project.content_no}
          />
        </div>
      </section>
    </main>
  );
}
