import { useTranslations } from "next-intl";
import Logo from "../Logo";
import { FaAngleDoubleRight, FaPhone } from "react-icons/fa";
import { MdOutlineAccessTime, MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "@/i18n/routing";
import { links, partners } from "@/constants";
import Image from "next/image";
const Footer = () => {
  const text = useTranslations("footer");
  const pages = useTranslations("pages");
  return (
    <footer className="pt-12 bg-secondary text-white">
      <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sm:col-span-2">
          <Logo isLight className="w-48" />
          <p className="max-w-lg text-white mt-4 mb-6">{text("description")}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg md:text-xl mb-3 md:mb-4">
            {text("importantLinks")}
          </h3>
          <div className="w-fit">
            {links.map((link) => (
              <Link
                key={link.url}
                className="relative flex items-center gap-3 md:gap-4 py-2 hover:text-primary group transition-all"
                href={link.url}
              >
                <FaAngleDoubleRight className="text-primary md:group-hover:translate-x-2 group-hover:translate-x-1 transition-transform" />
                {pages(link.label)}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:space-y-6 space-y-4 text-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <FaPhone className="text-primary w-6 h-6" />
            <a
              target="_blank"
              href="tel:4792929800"
              className="hover:underline"
            >
              {text("phone")}
            </a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <MdOutlineEmail className="text-primary w-6 h-6" />
            <a
              href="mailto:info@esvc.no"
              target="_blank"
              className="hover:underline"
            >
              {text("email")}
            </a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <IoLocationOutline className="text-primary w-6 h-6" />
            <div>
              <p>{text("address")}</p>
              <p>{text("orgNo")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <MdOutlineAccessTime className="text-primary w-6 h-6" />
            <div>
              <b>{text("workHoursTitle")}</b>
              <p>{text("workHoursWeekdays")}</p>
              <p>{text("workHoursWeekend")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex items-center md:justify-center mt-4 gap-4 flex-wrap">
        {partners.map((partner) => (
          <Image
            key={partner}
            src={`/images/partners/${partner}`}
            alt="partner"
            className="md:h-16 w-auto h-12"
            width={200}
            height={100}
          />
        ))}
      </div>
      <p className="container text-center py-4 border-t border-t-primary/20 mt-4">
        {text("copyright")} &copy; {new Date().getFullYear()} {text("company")}.
      </p>
    </footer>
  );
};

export default Footer;
