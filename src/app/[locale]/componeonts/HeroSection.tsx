import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const text = useTranslations("hero");
  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), 
    url('/images/hero.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
      className="secPadding"
    >
      <div className="container">
        <div
          style={{
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
          className=" z-10 min-h-[60vh] flex max-w-2xl text-white justify-center flex-col"
        >
          <h1
            className="text-3xl md:text-4xl mb-3 md:mb-4 font-semibold"
            dangerouslySetInnerHTML={{
              __html: text("title"),
            }}
          ></h1>
          <p className="md:text-lg mb-2 md:mb-3">{text("description")}</p>
          <div className="flex items-center gap-2">
            <Button size={"lg"} className="w-44">
              {text("action")}
            </Button>
            <Button variant={"secondary"} className="w-44" size={"lg"}>
              {text("subAction")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
