"use client";
import { useTranslations } from "next-intl";
import LangChanger from "../LangChanger";
import Logo from "../Logo";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { links } from "@/constants";

const Header = () => {
  const text = useTranslations("header");
  const pages = useTranslations("pages");
  const pathname = usePathname();
  return (
    <header className="bg-white py-2 z-20 top-0 sticky shadow-md">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <Logo className="w-40" />
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.url}
                className={cn(
                  "relative py-2 group hover:text-primary transition-all",
                  {
                    "text-primary font-semibold": pathname === link.url,
                  }
                )}
                href={link.url}
              >
                {pages(link.label)}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform",
                    {
                      "scale-x-100": pathname === link.url,
                    }
                  )}
                ></div>
              </Link>
            ))}
          </nav>
          <LangChanger />
          <Sheet>
            <SheetTrigger>
              <FaBars className="text-xl lg:hidden" />
            </SheetTrigger>
            <SheetContent
              className="h-screen border-none lg:hidden bg-secondary/60 text-white"
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <SheetHeader className="mt-6 mb-10">
                <SheetTitle className="sr-only">
                  {text("navigationMenu")}
                </SheetTitle>
                <Logo isIcon className="w-20 mx-auto " />
              </SheetHeader>
              <nav className="lg:flex text-lg gap-4 flex flex-col">
                {links.map((link) => (
                  <SheetClose key={link.url} asChild>
                    <Link
                      className={cn(
                        "relative py-4  hover:text-primary px-4 group transition-all",
                        {
                          "font-semibold text-primary": pathname === link.url,
                        }
                      )}
                      href={link.url}
                    >
                      {pages(link.label)}
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform",
                          {
                            "scale-x-100": pathname === link.url,
                          }
                        )}
                      ></div>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
