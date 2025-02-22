"use client";
import React, { useEffect, useState } from "react";
import SignInForm from "@/screens/Auth/SignInForm/SignInForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import CustomModal from "@/components/CustomModal";
import Logo from "@/assets/img/logo.png";
import CustomButton from "@/components/CustomButton";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

function Login() {
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [breakpoint, setBreakPiont] = useState(false);

  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setBreakPiont(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      redirect("/dashboards");
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);
  useEffect(() => {
    if (isMobileOrTablet) {
      setBreakPiont(true);
    } else {
      setBreakPiont(false);
    }
  }, [isMobileOrTablet]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SignInForm />
          <CustomModal
            width={{ xs: "100%", sm: "320px" }}
            open={breakpoint} handleClose={handleClose}>
            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"20px"} textAlign={"center"}>
              <Image
                src={Logo}
                alt=""
                style={{ width: "80%", height: "100%", margin: "0 auto" }}
              />
              <Typography variant="h3">
                This website is currently not mobile responsive. We are working
                on that. Meanwhile, we encourage you to open this on a desktop
                or laptop computer.
              </Typography>
              <CustomButton type="ADD" onClick={handleClose}>
                Proceed
              </CustomButton>
            </Box>
          </CustomModal>
        </>
      )}
    </>
  );
}

export default Login;
