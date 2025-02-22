import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
const BackToHomePage: React.FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link
      style={{
        margin: matchDownSM ? "10px 0px 0px 0px" : "10px",
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        textDecorationLine: "none",
        color: "black",
      }}
      href="https://ezlivingtrust.com/"
    >
      <ArrowCircleLeftOutlinedIcon />
      Home
    </Link>
  );
};

export default BackToHomePage;
