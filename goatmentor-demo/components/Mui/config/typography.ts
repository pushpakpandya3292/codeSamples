import { raleway } from "../font";

const typography = {
  fontFamily: raleway.style.fontFamily,
  displaylg: {
    fontSize: "56px",
    lineHeight: "64px",
    letterSpacing: "-0.896px",
    fontWeight: 700,
    "@media (max-width:767px)": {
      fontSize: "44px",
      lineHeight: "52px",
      letterSpacing: "0",
    },
    "@media (max-width:424px)": {
      fontSize: "36px",
      lineHeight: "48px",
    },
  },
  displaymd: {
    fontSize: "48px",
    lineHeight: "56px",
    letterSpacing: "0",
    fontWeight: 600,
    "@media (max-width:767px)": {
      fontSize: "36px",
      lineHeight: "48px",
    },
    "@media (max-width:424px)": {
      fontSize: "32px",
      lineHeight: "40px",
    },
  },
  displaysm: {
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "2.4px",
    fontWeight: 600,
    "@media (max-width:767px)": {
      fontSize: "21px",
      lineHeight: "27px",
      letterSpacing: "2.1px",
    },
    "@media (max-width:424px)": {
      fontSize: "16px",
      lineHeight: "21px",
      letterSpacing: "1.8px",
    },
  },
  headlinelg: {
    fontSize: "32px",
    lineHeight: "40px",
    letterSpacing: "0",
    fontWeight: 600,
    "@media (max-width:767px)": {
      fontSize: "28px",
      lineHeight: "36px",
    },
    "@media (max-width:424px)": {
      fontSize: "24px",
      lineHeight: "32px",
    },
  },
  headlinemd: {
    fontSize: "28px",
    lineHeight: "38px",
    letterSpacing: "0",
    fontWeight: 500,
    "@media (max-width:767px)": {
      fontSize: "24px",
      lineHeight: "32px",
    },
    "@media (max-width:424px)": {
      fontSize: "21px",
      lineHeight: "28px",
    },
  },
  headlinesm: {
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "0",
    fontWeight: 500,
    "@media (max-width:767px)": {
      fontSize: "21px",
      lineHeight: "28px",
    },
    "@media (max-width:424px)": {
      fontSize: "18px",
      lineHeight: "24px",
    },
  },
  titlelg: {
    fontSize: "22px",
    lineHeight: "28px",
    letterSpacing: "0",
    fontWeight: 600,
    "@media (max-width:424px)": {
      fontSize: "18px",
      lineHeight: "24px",
    },
  },
  titlemd: {
    fontSize: "18px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    fontWeight: 600,
    "@media (max-width:424px)": {
      fontSize: "16px",
      lineHeight: "20px",
    },
  },
  titlesm: {
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    fontWeight: 700,
    "@media (max-width:424px)": {
      fontSize: "14px",
      lineHeight: "18px",
    },
  },
  labellg: {
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.1px",
    fontWeight: 600,
    "@media (max-width:424px)": {
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
  labelmd: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.5px",
    fontWeight: 600,
    "@media (max-width:424px)": {
      fontSize: "12px",
      lineHeight: "16px",
    },
  },
  labelsm: {
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.5px",
    fontWeight: 600,
    "@media (max-width:424px)": {
      fontSize: "10px",
      lineHeight: "14px",
    },
  },
  bodylg: {
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.5px",
    fontWeight: 400,
    "@media (max-width:424px)": {
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
  bodymd: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
    fontWeight: 400,
    "@media (max-width:424px)": {
      fontSize: "12px",
      lineHeight: "16px",
    },
  },
  bodysm: {
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.4px",
    fontWeight: 400,
    "@media (max-width:424px)": {
      fontSize: "10px",
      lineHeight: "14px",
    },
  },
};

export default typography;

export const variantMapping = {
  displaylg: "h1",
  displaymd: "h2",
  displaysm: "span",
  headlinelg: "h3",
  headlinemd: "h4",
  headlinesm: "h5",
  titlelg: "h6",
  titlemd: "h6",
  titlesm: "h6",
  labellg: "span",
  labelmd: "span",
  labelsm: "span",
  bodylg: "p",
  bodymd: "p",
  bodysm: "p",
};
