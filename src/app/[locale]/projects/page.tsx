import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";
// import { getTranslations } from "next-intl/server";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/i18n/routing";
import ProjectCard from "@/components/ProjectCard";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Metadata } from "next";
import { getLocalizedMetadata } from "@/metadataHelper";
// const SERVICES_QUERY = `*[_type == "service"]{_id, title_en, title_no}`;
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getLocalizedMetadata(locale, "projects");
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}
const options = {};
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: {
    service?: string;
    page?: string;
  };
}) {
  const { service, page } = await searchParams;
  // const text = await getTranslations("projects");
  const serviceId = service ? service : "";
  // const services = await client.fetch<SanityDocument[]>(
  //   SERVICES_QUERY,
  //   {},
  //   options
  // );
  const projectsQuery = serviceId
    ? `*[_type == "project" && references($serviceId)] | order(_createdAt desc) {
      _id, title_en, description_en, title_no, description_no, coverImage, gallery, relatedService->{
    _id,
    title_en,
    title_no
  }
    }`
    : `*[_type == "project"] | order(_createdAt desc) {
      _id, title_en, description_en, title_no, description_no, coverImage, gallery, relatedService->{
    _id,
    title_en,
    title_no
  }
    }`;
  const projects = await client.fetch<SanityDocument[]>(
    projectsQuery,
    { serviceId },
    options
  );
  const text = await getTranslations("projects");
  const currentPage = page ? parseInt(page) : 1;
  return (
    <main>
      <PageBanner pageTitle="projects" />
      <section className="container secPadding">
        <PageBreadCrumb pageTitle="projects" />
        {/* <div className="flex items-center gap-2">
          <Button variant={serviceId ? "faded" : "default"} asChild>
            <Link href={`/projects`}>{text("all")}</Link>
          </Button>
          {services.map((service) => (
            <Button
              key={service._id}
              variant={serviceId === service._id ? "default" : "faded"}
              asChild
            >
              <Link href={`/projects?service=${service._id}`}>
                {service.title_en}
              </Link>
            </Button>
          ))}
        </div> */}
        {currentPage === 1 ? (
          <DisplayProjects projects={projects} />
        ) : (
          <p>{text("somethingWentWrong")}</p>
        )}
        <div className="flex items-center justify-center gap-4">
          {currentPage > 1 ? (
            <Link
              href={`/projects?page=${currentPage - 1}`}
              className="text-primary hover:border-primary flex items-center justify-center w-10 h-10 border rounded-md"
            >
              <FaAngleLeft />
            </Link>
          ) : (
            <span className="text-gray-600 cursor-not-allowed flex items-center justify-center w-10 h-10 border rounded-md">
              {" "}
              <FaAngleLeft />
            </span>
          )}
          <span className=" flex items-center justify-center w-10 h-10 border rounded-md">
            {currentPage}
          </span>
          <Link
            href={`/projects?page=${currentPage + 1}`}
            className="text-primary flex items-center justify-center w-10 h-10 border hover:border-primary rounded-md"
          >
            <FaAngleRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
export const DisplayProjects = ({
  projects,
}: {
  projects: SanityDocument[];
}) => {
  const text = useTranslations("projects");
  return projects.length > 0 ? (
    <div className="grid lg:grid-cols-2 md:gap-8 gap-6 mt-8 md:mt-10">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  ) : (
    <div>
      <p className="text-2xl font-semibold text-center mt-6">
        {text("noProjects")}
      </p>
    </div>
  );
};
