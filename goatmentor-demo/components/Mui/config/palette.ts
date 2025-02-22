import { PaletteOptions } from "@mui/material";

const palette: PaletteOptions | undefined = {
  mode: "light",
  primary: {
    main: "#F4713B",
    light: "#FAA83E",
    dark: "#F7913D",
    contrastText: "#fff",
    "100": "#F9F6F3",
    "200": "#FFE9E0",
  },
  secondary: {
    main: "#4D4848",
    contrastText: "#F9F6F3",
  },
  info: {
    main: "#1540E9",
    light: "#E8E9FD",
    dark: "#002477",
  },
  warning: {
    main: "#E0D70A",
    light: "#FBFAE4",
    dark: "#876E00",
  },
  success: {
    main: "#10D01A",
    light: "#EAFAE6",
    dark: "#185701",
  },
  error: {
    main: "#FF3232",
    light: "#FFEBEE",
    dark: "#8A0005",
  },
  grey: {
    "50": "#FAFAFA",
    "100": "#F5F5F5",
    "200": "#EEEEEE",
    "300": "#E0E0E0",
    "400": "#BDBDBD",
    "500": "#9E9E9E",
    "600": "#757575",
    "700": "#616161",
    "800": "#424242",
    "900": "#212121",
  },
  background: {
    default: "#FFFFFF",
    surface: "#FAFAFA",
    surfaceSecondary: "#F9F6F3",
  },
  common: { white: "#FFFFFF", black: "#000000" },
  divider: "#BDBDBD",
};

export default palette;
