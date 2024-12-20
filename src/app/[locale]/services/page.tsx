import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import ServiceCard from "@/components/ServiceCard";
import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";
import { Metadata } from "next";
import { getLocalizedMetadata } from "@/metadataHelper";

const SERVICES_QUERY = `*[_type == "service"]{_id, title_en, description_en , title_no, description_no , image}`;
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getLocalizedMetadata(locale, "services");
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}
export default async function ServicesPage() {
  const services = await client.fetch<SanityDocument[]>(SERVICES_QUERY);
  return (
    <main>
      <PageBanner pageTitle="services" />
      <section className="container secPadding">
        <PageBreadCrumb pageTitle="services" />
        <DisplayServices services={services} />
      </section>
    </main>
  );
}
export const DisplayServices = ({
  services,
}: {
  services: SanityDocument[];
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {services.map((service) => (
        <ServiceCard services={services} key={service._id} service={service} />
      ))}
    </div>
  );
};
