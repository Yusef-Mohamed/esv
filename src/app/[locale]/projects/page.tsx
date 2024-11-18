import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";
import ProjectCard from "@/components/ProjectCard";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Metadata } from "next";
import { getLocalizedMetadata } from "@/metadataHelper";
import { notFound } from "next/navigation";

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

const PAGE_SIZE = 2;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: {
    service?: string;
    page?: string;
  };
}) {
  const { service, page } = await searchParams;
  const serviceId = service ? service : "";
  const currentPage = page ? Math.max(1, parseInt(page)) : 1;

  const skip = (currentPage - 1) * PAGE_SIZE;

  const projectsQuery = serviceId
    ? `*[_type == "project" && references($serviceId)] | order(_createdAt desc) [$skip...$limit] {
      _id, title_en, description_en, title_no, description_no, coverImage, gallery, relatedService->{
        _id,
        title_en,
        title_no
      }
    }`
    : `*[_type == "project"] | order(_createdAt desc) [$skip...$limit] {
      _id, title_en, description_en, title_no, description_no, coverImage, gallery, relatedService->{
        _id,
        title_en,
        title_no
      }
    }`;

  const totalQuery = serviceId
    ? `count(*[_type == "project" && references($serviceId)])`
    : `count(*[_type == "project"])`;

  const [projects, total] = await Promise.all([
    client.fetch<SanityDocument[]>(projectsQuery, {
      serviceId,
      skip,
      limit: skip + PAGE_SIZE,
    }),
    client.fetch<number>(totalQuery, { serviceId }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const text = await getTranslations("projects");
  if (projects.length === 0) notFound();
  return (
    <main>
      <PageBanner pageTitle="projects" />
      <section className="container secPadding">
        <PageBreadCrumb pageTitle="projects" />
        {projects.length > 0 ? (
          <>
            <DisplayProjects projects={projects} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <p className="text-2xl font-semibold text-center mt-6 text-red-600">
            {text("somethingWentWrong")}
          </p>
        )}
      </section>
    </main>
  );
}

export const DisplayProjects = ({
  projects,
}: {
  projects: SanityDocument[];
}) => {
  return (
    <div className="grid lg:grid-cols-2 md:gap-8 gap-6 mt-8 md:mt-10">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

const Pagination = ({
  currentPage,
}: {
  currentPage: number;
  totalPages: number;
}) => (
  <div className="flex items-center justify-center gap-4 mt-6">
    {currentPage > 1 ? (
      <Link
        href={`/projects?page=${currentPage - 1}`}
        className="text-primary hover:border-primary flex items-center justify-center w-10 h-10 border rounded-md"
      >
        <FaAngleLeft />
      </Link>
    ) : (
      <span className="text-gray-600 cursor-not-allowed flex items-center justify-center w-10 h-10 border rounded-md">
        <FaAngleLeft />
      </span>
    )}
    <span className=" flex items-center justify-center w-10 h-10 border rounded-md">
      {currentPage}
    </span>
    {/* {currentPage < totalPages ? (
      <Link
        href={`/projects?page=${currentPage + 1}`}
        className="text-primary flex items-center justify-center w-10 h-10 border hover:border-primary rounded-md"
      >
        <FaAngleRight />
      </Link>
    ) : (
      <span className="text-gray-600 cursor-not-allowed flex items-center justify-center w-10 h-10 border rounded-md">
        <FaAngleRight />
      </span>
    )} */}
    <Link
      href={`/projects?page=${currentPage + 1}`}
      className="text-primary flex items-center justify-center w-10 h-10 border hover:border-primary rounded-md"
    >
      <FaAngleRight />
    </Link>
  </div>
);
