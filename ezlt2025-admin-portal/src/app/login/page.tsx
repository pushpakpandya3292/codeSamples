"use client";
import React, { useEffect, useState } from "react";
import SignInForm from "@/screens/Auth/SignInForm/SignInForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";

function Login() {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      redirect("/dashboard");
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
          <SignInForm />
        </>
      )}
    </>
  );
}

export default Login;
