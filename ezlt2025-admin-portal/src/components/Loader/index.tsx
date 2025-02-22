import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";

interface LoaderProps {
  height?: string;
  width?: string;
}

export default function Loader({ height, width }: LoaderProps) {
  return (
    <Box
      sx={{
        height: height || "100vh",
        width: width || "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Image
        src={Logo}
        alt=""
        style={{
          width: "234px",
          height: "36px",
          alignSelf: "center",
          marginBottom: "20px",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="44px"
        height="44px"
        viewBox="0 0 128 128"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
        <g>
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#0162e8"
            fillOpacity="1"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#f8fbfe"
            fillOpacity="0.03"
            transform="rotate(30 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#e8f1fd"
            fillOpacity="0.09"
            transform="rotate(60 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#d4e5fb"
            fillOpacity="0.17"
            transform="rotate(90 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#bed7f9"
            fillOpacity="0.25"
            transform="rotate(120 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#a6c8f7"
            fillOpacity="0.35"
            transform="rotate(150 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#8eb9f5"
            fillOpacity="0.44"
            transform="rotate(180 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#74a9f2"
            fillOpacity="0.55"
            transform="rotate(210 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#5b99f0"
            fillOpacity="0.65"
            transform="rotate(240 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#428aee"
            fillOpacity="0.75"
            transform="rotate(270 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#2b7cec"
            fillOpacity="0.84"
            transform="rotate(300 64 64)"
          />
          <path
            d="M40.73 13.1l-4.04-7A63.67 63.67 0 0 1 61.5.06v8a55.83 55.83 0 0 0-20.77 5.05z"
            fill="#166fea"
            fillOpacity="0.92"
            transform="rotate(330 64 64)"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64"
            calcMode="discrete"
            dur="1080ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </Box>
  );
}
