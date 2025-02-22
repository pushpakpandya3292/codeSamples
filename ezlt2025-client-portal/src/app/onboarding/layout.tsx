"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useUserDetailListing } from "@/provider/profile";
import { setAuthenticationHeader } from "@/services";
import Loader from "@/components/Loader";
import { DEMO_USER } from "../../../config";

function OnBoardingLayout({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [profileFetching, setProfileFetching] = useState(false);
  const userDetail = useUserDetailListing({ isValid: valid });
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      //@ts-ignore
      setAuthenticationHeader(data?.user?.token);
      setValid(true);
    } else if (status === "unauthenticated") {
      setLoading(false);
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    if (userDetail?.isLoading) {
      setProfileFetching(true);
    }
  }, [userDetail?.isLoading]);

  useEffect(() => {
    if (userDetail?.data?.isOnboardingCompleted) {
      //@ts-ignore
      router.replace("/dashboards");
      setTimeout(() => {
        setProfileFetching(false);
      }, 1000);
    } else if (!userDetail?.data?.isOnboardingCompleted) {
      setProfileFetching(false);
    }
  }, [userDetail?.data?.isOnboardingCompleted]);

  return <>{loading || profileFetching ? <Loader /> : <>{children}</>}</>;
}

export default OnBoardingLayout;
