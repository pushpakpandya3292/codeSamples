declare module "@mui/material/styles" {
  interface Theme {
    additionalColors?: {
      lightGrey: string;
      lightBlue: string;
      boxBackgroundBlue: string;
      tablightBlue: string;
      darkGreen: string;
      tablightGrey: string;
      primaryBlack: string;
      secondryBlack: string;
      primaryTranslucent: string;
      inputBg: string;
      formInputBg: string;
      orange: string;
      disabledInputbg: string;
      button: {
        bg: string;
        text: string;
        cancelbg: string;
        canceltext: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      mainBorder: string;
    };
    borderRadius: {
      radius1: string;
      radius2: string;
      radius3: string;
    };
    height: {
      barHeight: string;
      tabHeight: string;
    };
    shadow: {
      boxShadow: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    additionalColors?: {
      lightGrey: string;
      lightBlue: string;
      boxBackgroundBlue: string;
      tablightBlue: string;
      darkGreen: string;
      tablightGrey: string;
      primaryBlack: string;
      secondryBlack: string;
      primaryTranslucent: string;
      inputBg: string;
      formInputBg: string;
      orange: string;
      disabledInputbg: string;

      button: {
        bg: string;
        text: string;
        cancelbg: string;
        canceltext: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      mainBorder: string;
    };
    borderRadius?: {
      radius1?: string;
      radius2?: string;
      radius3?: string;
    };
    height?: {
      barHeight: string;
      tabHeight: string;
    };
    shadow?: {
      boxShadow?: string;
    };
  }
}

export {};
