"use client";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { useLocale } from "next-intl";
type ProjectCardProps = {
  project: SanityDocument;
};
import { Link } from "@/i18n/routing";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const locale = useLocale();
  return (
    <>
      <Link href={`/projects/${project._id}`} className="group cursor-pointer">
        <div className="relative overflow-hidden">
          <div className="aspect-[2.5/4] bg-gray-200">
            {project.coverImage && (
              <Image
                src={
                  (urlFor(project.coverImage)
                    .width(500)
                    .height(800)
                    ?.url() as string) || ""
                }
                alt={project.title_en}
                className="w-full rounded aspect-[2.5/4] group-hover:scale-[1.2] transition-transform"
                width={500}
                height={800}
              />
            )}
          </div>

          <div
            style={{
              background:
                "linear-gradient(359.33deg, rgba(0, 0, 0, 0.62) -7.77%, rgba(0, 0, 0, 0) 118.03%)",
            }}
            className="absolute w-full h-full top-0 right-0 p-6 flex items-end justify-center"
          >
            <h4 className="font-semibold text-white md:text-lg">
              {project.relatedService &&
                (locale === "no"
                  ? project.relatedService.title_no
                  : project.relatedService.title_en)}
            </h4>
          </div>
        </div>
        <div className="md:p-4 p-3">
          <h3 className="text-xl text-center mb-2 md:mb-3 font-semibold">
            {locale === "no" ? project.title_no : project.title_en}
          </h3>
          <p className="text-center text-gray-600">
            {locale === "no" ? project.description_no : project.description_en}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
