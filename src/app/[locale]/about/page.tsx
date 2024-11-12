import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";

import { useTranslations } from "next-intl";
import Image from "next/image";
export default function AboutPage() {
  const text = useTranslations("about");
  return (
    <main>
      <PageBanner pageTitle="about" />
      <section className=" secPadding container ">
        <PageBreadCrumb pageTitle="about" />
        <div className="prose max-w-full">
          <h1>{text("title")}</h1>
          <p>{text("homeP")}</p>
          <p>{text("aboutP1")}</p>
          <p>{text("aboutP2")}</p>
          <h2>{text("healthTitle")}</h2>
          <p>{text("healthP")}</p>
          <h2>{text("transparencyTitle")}</h2>
          <p>{text("transparencyP")}</p>
          <h2>{text("safetyTitle")}</h2>
          <p>{text("safetyP")}</p>{" "}
          <Image
            src={`/images/partners/about.jpg`}
            alt="partner"
            className="mx-auto"
            width={866}
            height={135}
          />
          <h2>{text("socialTitle")}</h2>
          <p>{text("socialP")}</p>
        </div>
      </section>
    </main>
  );
}
