import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({
  className,
  isIcon,
  isLight,
}: {
  className?: string;
  isIcon?: boolean;
  isLight?: boolean;
}) => {
  if (isIcon)
    return (
      <Image
        src="/images/iconLogo.png"
        alt="logo"
        width={400}
        height={410}
        className={cn("aspect-[400/410]", className)}
      />
    );
  return (
    <Image
      src={`/images/${isLight ? "lightLogo.png" : "logo.png"}`}
      alt="logo"
      width={525}
      height={207}
      className={cn("aspect-[1055/414]", className)}
    />
  );
};

export default Logo;
