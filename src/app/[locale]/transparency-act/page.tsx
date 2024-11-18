/* eslint-disable react/no-unescaped-entities */
import PageBanner from "@/components/PageBanner";
import PageBreadCrumb from "@/components/PageBreadcrumb";
import { getLocalizedMetadata } from "@/metadataHelper";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getLocalizedMetadata(locale, "transparencyAct");
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
}
export default async function TransparencyPage({
  params,
}: {
  params: {
    locale: string;
  };
}) {
  const { locale } = await params;
  return (
    <main>
      <PageBanner pageTitle="transparency-act" />
      <section className="container secPadding">
        <PageBreadCrumb pageTitle="transparency-act" />

        <div className="max-md:prose-sm prose max-w-full">
          {locale === "en" ? (
            <>
              <h1>Transparency Act</h1>
              <p>
                The Transparency Act came into effect on July 1, 2022, and
                applies to larger companies. The primary objective of the Act is
                to promote companies' respect for fundamental human rights and
                decent working conditions, while also ensuring public access to
                relevant information.
              </p>
              <p>
                ESV AS is subject to the Transparency Act and is committed to
                fulfilling its obligations under the law. Since our
                establishment in 2011, ESV has prioritized the respect for
                fundamental human rights and decent working conditions and
                actively ensures that our suppliers also adhere to these
                principles.
              </p>
              <p>
                Companies covered by the Transparency Act are required to
                conduct due diligence assessments within their own operations
                and supply chains. The findings of these assessments must be
                summarized and made available to the public in a report on the
                company’s website.
              </p>
              <h2>Available Reports:</h2>
              <ul>
                <li>
                  <a href="/2023-report.pdf" target="_blank">
                    ESV AS’s report for 2023 is available in PDF format.
                  </a>
                </li>
              </ul>
              <p>
                The Transparency Act grants individuals the right to request
                information on how companies address potential negative impacts
                on fundamental human rights and decent working conditions.
                Requests for such information must be submitted in writing. ESV
                AS may deny requests under the following circumstances:
              </p>
              <ul>
                <li>
                  The request does not provide enough information to identify
                  what it pertains to.
                </li>
                <li>The request is deemed clearly unreasonable.</li>
                <li>
                  The requested information involves personal details about
                  someone.
                </li>
                <li>
                  The requested information involves technical devices, methods,
                  or other operational or business-related matters that could be
                  competitively sensitive for those concerned.
                </li>
              </ul>
              <p>
                For inquiries related to the Transparency Act, ESV AS can be
                contacted via email at{" "}
                <a href="mailto:info@esvc.no">info@esvc.no</a>.
              </p>
              <p>
                If anyone believes that ESV AS is not meeting its information
                obligations under the Transparency Act, they are encouraged to
                file a complaint regarding a potential breach of the Act. We
                kindly ask that you first contact ESV AS directly at{" "}
                <a href="mailto:info@esvc.no">info@esvc.no</a> to address any
                misunderstandings or errors as promptly as possible.
              </p>
            </>
          ) : (
            <>
              <h1>Åpenhetsloven</h1>
              <p>
                Åpenhetsloven trådte i kraft 1. juli 2022 og gjelder for større
                selskaper. Loven har som mål å fremme selskapers respekt for
                grunnleggende menneskerettigheter og anstendige arbeidsforhold,
                samt sikre allmennhetens tilgang til relevant informasjon.
              </p>
              <p>
                ESV AS omfattes av åpenhetsloven og er forpliktet til å oppfylle
                sine forpliktelser i henhold til loven. Siden etableringen i
                2011 har ESV prioritert respekten for grunnleggende
                menneskerettigheter og anstendige arbeidsforhold, og vi jobber
                aktivt for å sikre at våre leverandører også følger disse
                prinsippene.
              </p>
              <p>
                Selskaper som omfattes av åpenhetsloven må gjennomføre
                aktsomhetsvurderinger i sine egne virksomheter og
                leverandørkjeder. Resultatene av disse vurderingene må
                oppsummeres og gjøres tilgjengelig i en offentlig rapport på
                selskapets nettside.
              </p>
              <h2>Tilgjengelige rapporter:</h2>
              <ul>
                <li>
                  <a href="/2023-report.pdf" target="_blank">
                    ESV AS sin rapport for 2023 er tilgjengelig i PDF-format.
                  </a>
                </li>
              </ul>
              <p>
                Åpenhetsloven gir alle rett til å be om informasjon om hvordan
                selskaper håndterer potensielle negative konsekvenser for
                grunnleggende menneskerettigheter og anstendige arbeidsforhold.
                Forespørsler om slik informasjon må sendes skriftlig. ESV AS kan
                avslå forespørsler i følgende tilfeller:
              </p>
              <ul>
                <li>
                  Forespørselen gir ikke tilstrekkelig grunnlag for å
                  identifisere hva den gjelder.
                </li>
                <li>Forespørselen anses som klart urimelig.</li>
                <li>
                  Den forespurte informasjonen gjelder noens personlige forhold.
                </li>
                <li>
                  Den forespurte informasjonen gjelder tekniske enheter,
                  metoder, eller andre drifts- eller forretningsmessige forhold
                  som kan være konkurransesensitive for de berørte.
                </li>
              </ul>
              <p>
                For spørsmål knyttet til åpenhetsloven kan ESV AS kontaktes via
                e-post på <a href="mailto:info@esvc.no">info@esvc.no</a>.
              </p>
              <p>
                Dersom noen mener at ESV AS ikke oppfyller sine
                informasjonsforpliktelser etter åpenhetsloven, oppfordres de til
                å sende en klage om et mulig brudd på loven. Vi anbefaler
                imidlertid at du først kontakter ESV AS direkte på{" "}
                <a href="mailto:info@esvc.no">info@esvc.no</a> for å løse
                eventuelle misforståelser eller feil så raskt som mulig.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
