import React from "react";
import FirstStep from "./StepsData/FirstStep";
import SecondStep from "./StepsData/SecondStep";
import ThirdStep from "./StepsData/ThirdStep";
import FourthStep from "./StepsData/FourthStep";
import FifthStep from "./StepsData/FifthStep";
import SixthStep from "./StepsData/SixthStep";
import { Typography, TypographyProps, styled } from "@mui/material";

export const stepsMainHeadingStyle = {
  fontSize: "28px",
  textTransform: "uppercase",
  "@media (max-width:600px)": {
    fontSize: "18px",
  },
};
export const subHeadingStyle = {
  color: "#333",
  fontSize: "18px",
  my: 2,
  "@media (max-width:600px)": {
    fontSize: "14px",
  },
};
export const StyledTypography = styled(Typography)<TypographyProps>(
  ({ theme }) =>
  ({
    fontSize: { xs: "14", md: "18px" },
    margin: "10px 0",
    fontWeight: 600,
    position: "relative",
    width: "100%",
    background: "#073763",
    padding: "10px 10px",
    color: "#fff",
    textTransform: "capitalize",
    // "&::before": {
    //   content: "''",
    //   position: "absolute",
    //   width: "50%",
    //   height: "2px",
    //   bottom: 0,
    //   left: 0,
    //   background: "#000",
    // },
  } as any),
) as (props: TypographyProps) => JSX.Element;
const Review = ({ handleChange }: any) => {
  return (
    <>
      <Typography variant="h2">
        Final Review (Scroll down to approve your answers)
      </Typography>
      <Typography variant="h5">
        Please scroll down and carefully review your answers. Your Living Trust
        and Estate Plan will be generated from these answers.
      </Typography>
      <FirstStep handleChangeStep={handleChange} />
      <SecondStep handleChangeStep={handleChange} />
      <ThirdStep handleChangeStep={handleChange} />
      <FourthStep handleChangeStep={handleChange} />
      <FifthStep handleChangeStep={handleChange} />
      <SixthStep handleChangeStep={handleChange} />
    </>
  );
};

export default Review;
