import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";
// import { getTranslations } from "next-intl/server";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/i18n/routing";
import ProjectCard from "@/components/ProjectCard";
import { useTranslations } from "next-intl";
// const SERVICES_QUERY = `*[_type == "service"]{_id, title_en, title_no}`;
const options = {};
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: {
    service?: string;
  };
}) {
  const { service } = await searchParams;
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
        <DisplayProjects projects={projects} />
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
    <div className="grid md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4 md:gap-8 gap-6 mt-8 md:mt-10">
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
