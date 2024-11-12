import { useTranslations } from "next-intl";

const PageBanner = ({ pageTitle }: { pageTitle: string }) => {
  const text = useTranslations("pages");
  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), 
    url('/images/hero.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-[30vh] flex items-center justify-center secPadding"
    >
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-4 font-semibold text-white">
        {text(pageTitle)}
      </h1>
    </section>
  );
};

export default PageBanner;
