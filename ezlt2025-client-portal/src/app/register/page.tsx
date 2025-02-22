"use client";
import RegisterUser from "@/screens/Auth/Register/Register";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      redirect("/dashboards");
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RegisterUser />
        </>
      )}
    </>
  );
}
