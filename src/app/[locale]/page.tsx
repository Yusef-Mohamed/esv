import { getTranslations } from "next-intl/server";
import HeroSection from "./componeonts/HeroSection";
import { DisplayContactContent } from "./contact/page";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { DisplayProjects } from "./projects/page";
import { DisplayServices } from "./services/page";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Metadata } from "next";
import { getLocalizedMetadata } from "@/metadataHelper";
import Image from "next/image";
const options = {};
const projectsQuery = `*[_type == "project"] | order(_createdAt desc) [0...2] {
    _id, title_en, description_en, title_no, description_no, coverImage, gallery, relatedService->{
  _id,
  title_en,
  title_no
}
  }`;
const SERVICES_QUERY = `*[_type == "service"] [0...2] {_id, title_en, description_en , title_no, description_no , image}`;
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getLocalizedMetadata(locale, "landingPage");
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}
export default async function HomePage() {
  const servicesText = await getTranslations("services");
  const projectsText = await getTranslations("projects");
  const aboutText = await getTranslations("about");

  const projects = await client.fetch<SanityDocument[]>(
    projectsQuery,
    {},
    options
  );
  const services = await client.fetch<SanityDocument[]>(
    SERVICES_QUERY,
    {},
    options
  );
  return (
    <main>
      <HeroSection />
      <section className="container items-center secPadding grid lg:grid-cols-2 gap-8 lg:gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl mb-3 md:mb-4 font-semibold  ">
            {aboutText("title")}
          </h2>
          <p>{aboutText("homeP")}</p>
          <Button asChild className="text-center  mt-4 md:mt-6 w-32">
            <Link href="/about">{aboutText("learnMore")}</Link>
          </Button>
        </div>
        <Image
          className="w-full aspect-[16/12] object-cover rounded-md"
          width={1600}
          height={1200}
          src="/images/about.webp"
          alt="Hero image"
        />
      </section>
      <section className="container secPadding">
        <h2 className="text-2xl md:text-3xl mb-3 md:mb-4 font-semibold  ">
          {servicesText("title")}
        </h2>
        <DisplayServices services={services} />
        <Button asChild className="text-center block mt-4 md:mt-6 w-32 mx-auto">
          <Link href="/services">{servicesText("all")}</Link>
        </Button>
      </section>
      <section className="container secPadding">
        <h2 className="text-2xl md:text-3xl mb-3 md:mb-4 font-semibold  ">
          {projectsText("title")}
        </h2>
        <DisplayProjects projects={projects} />
        <Button asChild className="text-center block mt-4 md:mt-6 w-32 mx-auto">
          <Link href="/projects">{projectsText("all")}</Link>
        </Button>
      </section>
      <section className="secPadding container">
        <DisplayContactContent />
      </section>
    </main>
  );
}
