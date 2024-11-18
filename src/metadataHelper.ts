type Metadata = {
  [locale: string]: {
    [pageKey: string]: {
      title: string;
      description: string;
      keywords: string;
    };
  };
};

const metadata: Metadata = {
  en: {
    landingPage: {
      title: "Trusted Construction Contractor in Norway  | ESV AS",
      description:
        "ESV AS is a leading construction contractor in Norway , specializing in new construction, rehabilitation, and building interiors. Delivering quality, sustainability, and innovation.",
      keywords: [
        "construction contractor Norway ",
        "new construction Norway ",
        "rehabilitation services",
        "building interiors",
        "quality construction",
        "sustainable building",
        "innovative construction solutions",
      ].join(", "),
    },
    about: {
      title: "About ESV AS | Trusted Construction Contractor in Norway ",
      description:
        "Learn more about ESV AS, an experienced contractor with expertise in new construction, rehabilitation, and building interiors. Committed to quality, safety, and sustainability since 2011.",
      keywords: [
        "about ESV AS",
        "Norway  construction company",
        "contractor expertise",
        "safety and quality construction",
        "sustainable construction practices",
        "NS 8405 and NS 8407 standards",
      ].join(", "),
    },
    contact: {
      title: "Contact ESV AS | Reach Out to Your Trusted Construction Partner",
      description:
        "Contact ESV AS for inquiries about our construction services. Call us at +47 92929800 or visit us at Filipstadveien 3, Norway . Let's build your future together.",
      keywords: [
        "contact ESV AS",
        "Norway  contractor contact",
        "construction services Norway ",
        "construction inquiries",
        "building services contact",
        "Norway  construction address",
      ].join(", "),
    },
    projects: {
      title: "Our Projects | ESV AS - Quality Construction in Norway ",
      description:
        "Explore ESV AS's portfolio of completed projects, including new construction, rehabilitation, and interiors. Quality craftsmanship in Norway  and surrounding areas.",
      keywords: [
        "ESV AS projects",
        "Norway  construction projects",
        "rehabilitation portfolio",
        "interior construction",
        "quality craftsmanship",
        "completed projects Norway ",
      ].join(", "),
    },
    services: {
      title: "Our Services | ESV AS - Construction Solutions in Norway ",
      description:
        "Discover the wide range of services offered by ESV AS, from new construction to rehabilitation and interior work. Tailored solutions for your building needs.",
      keywords: [
        "ESV AS services",
        "Norway  construction solutions",
        "new construction services",
        "rehabilitation services Norway ",
        "building interiors",
        "tailored construction solutions",
      ].join(", "),
    },
    transparencyAct: {
      title: "Transparency Act | ESV AS - Ethical Construction Practices",
      description:
        "Learn about ESV AS's commitment to the Transparency Act. Promoting respect for fundamental human rights and decent working conditions in all our projects.",
      keywords: [
        "Transparency Act ESV AS",
        "ethical construction Norway ",
        "human rights in construction",
        "Transparency Act compliance",
        "sustainable business practices",
      ].join(", "),
    },
  },
  no: {
    landingPage: {
      title: "Din pålitelige entreprenør i Norge  | ESV AS",
      description:
        "ESV AS er en ledende byggentreprenør i Norge , spesialisert på nybygg, rehabilitering og interiørarbeid. Vi leverer kvalitet, bærekraft og innovasjon.",
      keywords: [
        "byggentreprenør Norge ",
        "nybygg Norge ",
        "rehabiliteringstjenester",
        "interiørarbeid",
        "kvalitetsbygging",
        "bærekraftig bygging",
        "innovative byggetjenester",
      ].join(", "),
    },
    about: {
      title: "Om ESV AS | Pålitelig byggentreprenør i Norge ",
      description:
        "Lær mer om ESV AS, en erfaren entreprenør med ekspertise i nybygg, rehabilitering og interiørarbeid. Forpliktet til kvalitet, sikkerhet og bærekraft siden 2011.",
      keywords: [
        "om ESV AS",
        "Norge  byggselskap",
        "entreprenørekspertise",
        "sikkerhet og kvalitet bygg",
        "bærekraftige byggetjenester",
        "NS 8405 og NS 8407 standarder",
      ].join(", "),
    },
    contact: {
      title: "Kontakt ESV AS | Din pålitelige byggpartner",
      description:
        "Kontakt ESV AS for forespørsler om våre byggetjenester. Ring oss på +47 92929800 eller besøk oss på Filipstadveien 3, Norge . La oss bygge fremtiden sammen.",
      keywords: [
        "kontakt ESV AS",
        "Norge  byggkontakt",
        "byggetjenester Norge ",
        "byggforespørsler",
        "kontakt byggtjenester",
        "Norge  byggeadresse",
      ].join(", "),
    },
    projects: {
      title: "Våre prosjekter | ESV AS - Kvalitetsbygg i Norge ",
      description:
        "Utforsk ESV ASs portefølje av fullførte prosjekter, inkludert nybygg, rehabilitering og interiørarbeid. Kvalitetshåndverk i Norge  og omegn.",
      keywords: [
        "ESV AS prosjekter",
        "byggeprosjekter Norge ",
        "rehabiliteringsportefølje",
        "interiørkonstruksjon",
        "kvalitetshåndverk",
        "fullførte prosjekter Norge ",
      ].join(", "),
    },
    services: {
      title: "Våre tjenester | ESV AS - Byggeløsninger i Norge ",
      description:
        "Oppdag de mange tjenestene ESV AS tilbyr, fra nybygg til rehabilitering og interiørarbeid. Skreddersydde løsninger for dine byggbehov.",
      keywords: [
        "ESV AS tjenester",
        "byggeløsninger Norge ",
        "nybygg tjenester",
        "rehabiliteringstjenester Norge ",
        "bygginnredning",
        "skreddersydde byggeløsninger",
      ].join(", "),
    },
    transparencyAct: {
      title: "Åpenhetsloven | ESV AS - Etiske byggetjenester",
      description:
        "Lær om ESV AS sitt engasjement for åpenhetsloven. Fremmer respekt for grunnleggende menneskerettigheter og anstendige arbeidsforhold i alle våre prosjekter.",
      keywords: [
        "Åpenhetsloven ESV AS",
        "etisk bygging Norge ",
        "menneskerettigheter i bygging",
        "Åpenhetsloven overholdelse",
        "bærekraftige forretningspraksis",
      ].join(", "),
    },
  },
};

export function getLocalizedMetadata(locale: string, pageKey: string) {
  return metadata[locale]?.[pageKey] || {};
}
