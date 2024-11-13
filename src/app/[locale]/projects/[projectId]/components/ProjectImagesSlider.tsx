"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { useLocale } from "next-intl";
type ProjectImagesSliderProps = {
  project: SanityDocument;
};
import { IoClose } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AiOutlineZoomIn } from "react-icons/ai";

const ProjectImagesSlider: React.FC<ProjectImagesSliderProps> = ({
  project,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [project.coverImage, ...project.gallery];
  const locale = useLocale();
  return (
    <>
      <div className="flex items-center justify-center w-full h-full relative bg-secondary/20 aspect-video">
        {images[currentImage] && (
          <Image
            src={(urlFor(images[currentImage])?.url() as string) || ""}
            alt={`Project Image `}
            width={1920}
            height={1080}
            className="w-full h-full object-contain"
          />
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 right-6 bg-white w-10 h-10 flex items-center justify-center rounded-full"
        >
          <AiOutlineZoomIn className="w-5 h-5" />
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
            {images[currentImage] && (
              <Image
                src={(urlFor(images[currentImage])?.url() as string) || ""}
                alt={`Project Image `}
                width={1920}
                height={1080}
                className="w-[100vw] h-[100vh] object-contain"
                quality={80}
              />
            )}

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

export default ProjectImagesSlider;
