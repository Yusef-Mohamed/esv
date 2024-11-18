import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";
import ContactForm from "@/components/ContactForm";
import { getTranslations } from "next-intl/server";

const SERVICES_QUERY = `*[_type == "service"]{_id, title_en, description_en , title_no, description_no , image}`;
import { FaPhone } from "react-icons/fa";
import { MdOutlineAccessTime, MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Metadata } from "next";
import { getLocalizedMetadata } from "@/metadataHelper";
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getLocalizedMetadata(locale, "contact");
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}

export default async function ContactPage() {
  return (
    <main>
      <PageBanner pageTitle="contact" />

      <section className=" secPadding container ">
        <PageBreadCrumb pageTitle="contact" /> <DisplayContactContent />
      </section>
    </main>
  );
}
export const DisplayContactContent = async () => {
  const services = await client.fetch<SanityDocument[]>(SERVICES_QUERY);
  const text = await getTranslations("contact");
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39600.404386682305!2d19.45227420059936!3d51.65937363756527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a316f8e85a2c7%3A0xe04539fbe85349e!2s95-030%20Rzg%C3%B3w%2C%20Poland!5e0!3m2!1sen!2seg!4v1731401362461!5m2!1sen!2seg"
        height={450}
        allowFullScreen
        className="w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="grid mt-10 lg:mt-12 lg:grid-cols-2 gap-8 lg:gap-10">
        <ContactForm services={services} />
        <div>
          <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-semibold">
            {text("contactInfo")}
          </h3>
          <div className="md:space-y-3 space-y-2 text-sm">
            <div className="flex items-center gap-1.5 md:gap-2">
              <FaPhone className="text-primary w-4 h-4" />
              <a
                target="_blank"
                href="tel:4792929800"
                className="hover:underline"
              >
                {text("phone")}
              </a>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <MdOutlineEmail className="text-primary w-4 h-4" />
              <a
                href="mailto:info@esvc.no"
                target="_blank"
                className="hover:underline"
              >
                info@esvc.no
              </a>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <IoLocationOutline className="text-primary w-4 h-4" />
              <div>
                <p>{text("address")}</p>
                <p>{text("orgNo")}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <MdOutlineAccessTime className="text-primary w-4 h-4" />
              <div>
                <b>{text("workHoursTitle")}</b>
                <p>{text("workHoursWeekdays")}</p>
                <p>{text("workHoursWeekend")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
