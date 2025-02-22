"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard", { scroll: false });
    } else if (status === "unauthenticated") {
      router.push("/login", { scroll: false });
    }
  }, [status]);
  return <Loader />;
}
