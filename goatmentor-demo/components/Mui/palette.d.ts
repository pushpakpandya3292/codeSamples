import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColorOptions {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
    "50"?: string;
    "100"?: string;
    "200"?: string;
    "300"?: string;
    "400"?: string;
    "500"?: string;
    "600"?: string;
    "700"?: string;
    "800"?: string;
    "900"?: string;
  }

  interface TypeBackground {
    default: string;
    surface: string;
    surfaceSecondary: string;
  }

  interface TypeText {
    title: string;
    body: string;
    subtitle: string;
    primary: string;
  }
}
