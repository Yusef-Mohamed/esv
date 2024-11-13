"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { useLocale, useTranslations } from "next-intl";
import ContactForm from "./ContactForm";
type ServiceCardProps = {
  service: SanityDocument;
  services: SanityDocument[];
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, services }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const locale = useLocale();
  const text = useTranslations("services");
  return (
    <>
      <div className="service-card group border flex flex-col">
        <div className="relative overflow-hidden">
          {service.image && (
            <Image
              src={
                (urlFor(service.image)
                  .width(600)
                  .height(300)
                  ?.url() as string) || ""
              }
              alt={service.title_en}
              className="w-full rounded aspect-[2/1] group-hover:scale-[1.2] transition-transform"
              width={600}
              height={300}
            />
          )}
        </div>
        <div className="md:p-6 flex flex-col justify-between p-4 bg-gray-100 flex-grow">
          <div>
            <h3 className="text-2xl md:text-3xl mb-3 md:mb-4">
              {locale === "en" ? service.title_en : service.title_no}
            </h3>
            <div className="mb-4 md:mb-5">
              <p>
                {locale === "en"
                  ? showAll
                    ? service.description_en
                    : `${service.description_en.substring(0, 150)}...`
                  : showAll
                  ? service.description_no
                  : `${service.description_no.substring(0, 150)}...`}
                <button
                  onClick={() => {
                    setShowAll((prev) => !prev);
                  }}
                  className="inline underline ms-2"
                >
                  {showAll ? text("readLess") : text("readMore")}
                </button>
              </p>
            </div>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="w-48">
            {text("requestService")}{" "}
          </Button>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white w-full">
          <DialogHeader className="hidden">
            <DialogTitle>{text("requestService")} </DialogTitle>
          </DialogHeader>
          <ContactForm services={services} selectedService={service.title_en} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
