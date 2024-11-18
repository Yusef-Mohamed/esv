"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

const NotFound = () => {
  const locale = useLocale();

  const translations = {
    en: {
      title: "404",
      heading: "Page not found",
      message: "The page you are looking for does not exist or has been moved.",
      hint: "If you believe this is a mistake, it might be due to a server error. Please try again later.",
      linkText: "Go back to home",
    },
    no: {
      title: "404",
      heading: "Siden ble ikke funnet",
      message: "Siden du leter etter finnes ikke eller har blitt flyttet.",
      hint: "Hvis du tror dette er en feil, kan det skyldes en serverfeil. Prøv igjen senere.",
      linkText: "Gå tilbake til startsiden",
    },
  };

  const content = translations[locale as "en" | "no"] || translations.en;

  return (
    <section className="relative flex items-center min-h-[70vh] p-4 text-center md:p-10 container">
      <div className="space-y-6 mx-auto">
        <div>
          <h1 className="font-semibold md:text-6xl sm:text-5xl text-4xl lg:text-7xl pb-4">
            {content.title}
          </h1>
          <h2 className="text-2xl sm:text-3xl text-primary md:text-4xl font-semibold mb-4">
            {content.heading}
          </h2>
          <p className="mb-4">{content.message}</p>
          <p className="text-sm text-gray-600">{content.hint}</p>
        </div>
        <Link
          href="/"
          className="px-6 py-2 rounded-md text-white bg-primary font-semibold block w-fit mx-auto"
        >
          {content.linkText}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
