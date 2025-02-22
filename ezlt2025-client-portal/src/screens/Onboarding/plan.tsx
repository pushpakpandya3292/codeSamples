"use client";
import { useEffect } from "react";
import { FormikProps } from "formik";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { MainCard } from "@/components/OnboardingCard";
import { OnboardingFormikPropInterface } from "./constant";
import ActionButton from "./ActionButton";
import Logo from "@/assets/img/logo.png";
import { useCreateClientCache } from "@/provider/ClientCache";
import { useUserDetailListing } from "@/provider/profile";
import { DEMO_USER } from "../../../config";

interface PlansPropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
  handleBack: () => void;
}

const Plans = ({ handleNext, handleBack, formik }: PlansPropInterface) => {
  const creatCache = useCreateClientCache({});
  const profileDetail = useUserDetailListing({ isValid: true });
  const validateStep = (val: any) => {
    event?.preventDefault();
    let errors: any = {};
    if (!formik.values.planId) {
      errors.planId = "Required";
    }
    return errors;
  };

  useEffect(() => {
    if (formik.errors.planId) {
      toast.error("Please select plan", { position: "top-right" });
    }
  }, [formik.errors.planId]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
        <Image
          src={Logo}
          alt=""
          style={{ width: "326px", height: "50px", alignSelf: "center" }}
        />
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "58px",
            mt: "20px",
          }}
        >
          <Typography
            sx={{ fontSize: "32px", fontWeight: "600", color: "#FFF" }}
          >
            Pick a Plan
          </Typography>
        </Box>
        <Box sx={{ mx: 6, mt: 2 }}>
          <MainCard formik={formik} />
        </Box>
      </Box>

      <ActionButton
        isNext
        isPrev
        handleNext={async () => {
          const errors = validateStep(formik.values);
          formik.setErrors(errors);
          if (Object.keys(errors).length === 0) {
            creatCache.mutate({
              key: `ONBOARDING${profileDetail.data?.id}${
                profileDetail?.data?.carts?.length || 0
              }`,
              data: formik.values,
              form_type: 1,
            });
            handleNext();
          }
        }}
        handlePrev={handleBack}
      />
    </Box>
  );
};

export default Plans;
