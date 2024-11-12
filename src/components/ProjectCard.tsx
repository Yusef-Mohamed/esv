"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { useLocale } from "next-intl";
type ProjectCardProps = {
  project: SanityDocument;
};
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { IoClose } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [project.coverImage, ...project.gallery];
  const locale = useLocale();
  return (
    <>
      <div onClick={() => setIsOpen(true)} className="group cursor-pointer">
        <div className="relative overflow-hidden">
          {project.coverImage && (
            <Image
              src={
                urlFor(project.coverImage)
                  .width(500)
                  .height(800)
                  .url() as string
              }
              alt={project.title_en}
              className="w-full rounded aspect-[2.5/4] group-hover:scale-[1.2] transition-transform"
              width={500}
              height={800}
            />
          )}
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
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="p-0 border-none bg-secondary  max-w-[100vw] w-screen h-screen "
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          <DialogHeader className="hidden">
            <DialogTitle>
              {locale === "no" ? project.title_no : project.title_en}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src={
                urlFor(images[currentImage])
                  .width(1920)
                  .height(1080)
                  .url() as string
              }
              alt={`Project Image `}
              width={1920}
              height={1080}
              className="w-[90%] h-[90%] object-contain"
              quality={80}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 bg-white w-10 h-10 flex items-center justify-center rounded-full"
            >
              <IoClose className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute top-1/2 -translate-y-1/2  right-6 bg-white w-10 h-10 flex items-center justify-center rounded-full"
            >
              <FaAngleRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                );
              }}
              className="absolute top-1/2 -translate-y-1/2  left-6 bg-white w-10 h-10 flex items-center justify-center rounded-full"
            >
              <FaAngleLeft className="w-5 h-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
