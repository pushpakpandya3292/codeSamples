"use client";

import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  link?: string;
}

const Logo = ({ link = "/" }: Props) => {
  const large = useMediaQuery("(min-width:768px)");

  return (
    <Link href={link}>
      <Image
        src="/images/logo-mixed.svg"
        alt="Logo"
        width={large ? 104 : 78}
        height={large ? 32 : 24}
        style={{
          display: "block",
        }}
      />
    </Link>
  );
};

export default Logo;
