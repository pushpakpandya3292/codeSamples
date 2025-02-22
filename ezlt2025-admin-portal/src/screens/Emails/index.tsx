"use client";
import { useUserDetailListing } from "@/provider/profile";
import React, { useEffect } from "react";
import EmailListingScreen from "./ListingScreen";
import { redirect, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { Box } from "@mui/material";
import { useEmailCode } from "@/provider/emailCode";

const EmailWrapper: React.FC = () => {
  const profileDetail = useUserDetailListing({});
  const updateEmailCode = useEmailCode();
  const Params = useSearchParams();
  const code = Params.get("code");
  const location = Params.get("location");
  const accountsServer = Params.get("accounts-server");

  const sendZohoCode = async () => {
    if (
      code &&
      location &&
      accountsServer &&
      !profileDetail?.data?.isZohoCodeExist
    ) {
      const sendcode: any = await updateEmailCode.mutateAsync({
        code: code,
        accountServer: accountsServer,
        location: location,
      });
      if (sendcode?.status == 201) {
        profileDetail.refetch();
      }
    }
  };

  useEffect(() => {
    if (profileDetail?.data && !profileDetail?.data?.isZohoCodeExist && !code) {
      redirect(process.env.NEXT_PUBLIC_ZOHO_REDIRECT_URL as string);
    }
  }, [profileDetail?.data]);

  useEffect(() => {
    sendZohoCode();
  }, []);

  return (
    <>
      {profileDetail?.data?.isZohoCodeExist ? (
        <EmailListingScreen />
      ) : (
        <Box sx={{ height: "100%" }}>
          <Loader width="100%" height="100%" />
        </Box>
      )}
    </>
  );
};

export default EmailWrapper;
