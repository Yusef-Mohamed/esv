"use client";
import { Link, usePathname } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GrLanguage } from "react-icons/gr";

const LangChanger = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("flex text-xl items-center gap-4", className)}
      >
        <GrLanguage />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          asChild
          className="flex cursor-pointer items-center justify-center gap-1 text-sm"
        >
          <Link href={pathname} locale={"no"}>
            Norsk
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex cursor-pointer items-center justify-center gap-1 text-sm"
        >
          <Link href={pathname} locale={"en"}>
            English
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangChanger;
