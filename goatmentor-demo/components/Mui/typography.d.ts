import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    displaylg: React.CSSProperties;
    displaymd: React.CSSProperties;
    displaysm: React.CSSProperties;
    headlinelg: React.CSSProperties;
    headlinemd: React.CSSProperties;
    headlinesm: React.CSSProperties;
    titlelg: React.CSSProperties;
    titlemd: React.CSSProperties;
    titlesm: React.CSSProperties;
    labellg: React.CSSProperties;
    labelmd: React.CSSProperties;
    labelsm: React.CSSProperties;
    bodylg: React.CSSProperties;
    bodymd: React.CSSProperties;
    bodysm: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    displaylg?: React.CSSProperties;
    displaymd?: React.CSSProperties;
    displaysm?: React.CSSProperties;
    headlinelg?: React.CSSProperties;
    headlinemd?: React.CSSProperties;
    headlinesm?: React.CSSProperties;
    titlelg: React.CSSProperties;
    titlemd: React.CSSProperties;
    titlesm: React.CSSProperties;
    labellg: React.CSSProperties;
    labelmd: React.CSSProperties;
    labelsm: React.CSSProperties;
    bodylg: React.CSSProperties;
    bodymd: React.CSSProperties;
    bodysm: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displaylg: true;
    displaymd: true;
    displaysm: true;
    headlinelg: true;
    headlinemd: true;
    headlinesm: true;
    titlelg: true;
    titlemd: true;
    titlesm: true;
    labellg: true;
    labelmd: true;
    labelsm: true;
    bodylg: true;
    bodymd: true;
    bodysm: true;
    //
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}
