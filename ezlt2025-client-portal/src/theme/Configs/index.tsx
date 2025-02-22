import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.

export let getDesignTokens = (mode: PaletteMode) => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: "#073763",
              dark: "#404040",
              light: "#FFFFFF",
            },
            secondary: {
              main: "#0076BB",
              light: "#F4F4F4",
              dark: "#FFFFFF",
            },
            text: {
              primary: "#000",
              secondary: "#FFFFFF",
              disabled: "#535F6B",
            },
            background: {
              default: "#F4F4F4",
            },
            error: {
              main: "#fc0303",
              dark: "#FF4133",
            },
            success: {
              main: "#4CAF50",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#073763",
              dark: "#FFFFFF",
              light: "#404040",
            },
            secondary: {
              main: "#0076BB",
              light: "#303030",
              dark: "#FFFFFF",
            },
            text: {
              primary: "#fff",
              secondary: "#404040",
              disabled: "#535F6B",
            },
            background: {
              default: "#303030",
            },
            error: {
              main: "#fc0303",
              dark: "#FF4133",
            },
            success: {
              main: "#4CAF50",
            },
          }),
    },
    additionalColors: {
      ...(mode === "light"
        ? {
            lightGrey: "#0000001A",
            lightBlue: "#C3D7FF",
            boxBackgroundBlue: "#4b8ad121",
            tablightBlue: "#4B8AD1",
            darkGreen: "#10AB0C",
            tablightGrey: "#E3E3E3",
            primaryTranslucent: "#0093e766",
            primaryBlack: "rgba(255, 255, 255, 1)",
            secondryBlack: "rgba(0, 0, 0, 0.12)",
            inputBg: "#f6f6f6",
            formInputBg: "#F0F7FF",
            orange: "#FDA440",
            disabledInputbg: "#F1F1F1",
            button: {
              bg: "#510759",
              text: "#fff",
              cancelbg: "#FFC9C8",
              canceltext: "#EF5E5A",
            },
            background: {
              primary: "#FFFFFF",
              secondary: "#F6F9FF",
              tertiary: "#C3D7FF",
            },
            mainBorder: "#E9E9E9",
          }
        : {
            lightGrey: "#0000001A",
            lightBlue: "#C3D7FF",
            boxBackgroundBlue: "#4b8ad121",
            tablightBlue: "#4B8AD1",
            darkGreen: "#10AB0C",
            tablightGrey: "#E3E3E3",
            primaryTranslucent: "#0093e766",
            primaryBlack: "rgba(0, 0, 0, 0.24)",
            secondryBlack: "rgba(0, 0, 0, 0.26)",
            inputBg: "#0d0a10",
            formInputBg: "#F0F7FF",
            orange: "#FDA440",
            disabledInputbg: "#F1F1F1",
            button: {
              bg: "#ffffff",
              text: "#000",
              cancelbg: "#FFC9C8",
              canceltext: "#EF5E5A",
            },
            background: {
              primary: "#404040",
              secondary: "#F6F9FF",
              tertiary: "#C3D7FF",
            },
            mainBorder: "#E9E9E9",
          }),
    },
    borderRadius: {
      radius1: "8px",
      radius2: "16px",
      radius3: "32px",
    },
    height: {
      barHeight: "58px",
      tabHeight: "43px",
    },
    shape: {
      borderRadius: 5,
    },
    shadow: {
      boxShadow: "0px 4px 48px rgba(0, 0, 0, 0.2)",
    },
  });

  theme = createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            minHeight: "100vh",
            minWidth: "100%",
          },
          body: {
            position: "absolute",
            minHeight: "100vh",
            minWidth: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "#__next": {
              minHeight: "100%",
            },
            main: {
              minHeight: "100vh",
              marginBottom: "50px",
            },
            scrollbarColor: theme.palette.background,
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: theme.palette.background,
              width: "5px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: theme.palette.primary.dark,
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: theme.palette.primary.dark,
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: theme.palette.primary.dark,
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: theme.palette.primary.dark,
              },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            "& label": {
              color: theme.palette.text.primary,
            },
            "& label.Mui-focused": {
              color: theme.palette.primary.dark,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: theme.palette.primary.dark,
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.dark,
                borderWidth: "0.12rem",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#c4c4c4",
                fontFamily: "Roboto",
                fontWeight: "400",
              },
              "&.Mui-error fieldset": {
                borderColor: theme.palette.error.main,
              },
            },
          },
        },
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
            marginBottom: "0px !important",
            "& label": {
              color: theme.palette.text.primary,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            background: "#fff",
            borderRadius: "10px",
            border: "none",
            ".css-yrdy0g-MuiDataGrid-columnHeaderRow": {
              fontSize: "15px",
              fontWeight: "900",
            },
            ".MuiDataGrid-row": {
              fontSize: "13px",
            },
            ".MuiDataGrid-columnHeaders.MuiDataGrid-withBorderColor.css-1iyq7zh-MuiDataGrid-columnHeaders":
              {
                background: "#F4F6F9",
                minHeight: "45px !important",
              },
            ".MuiDataGrid-columnHeader": {
              background: "#f4f6f9",
              color: "#909090",
              height: "45px !important",
              fontWeight: "500",
            },
            ".Mui-even": {
              background: "#dedede",
            },
            ".Mui-odd": {
              background: "#f2f2f2",
            },
            ".MuiDataGrid-columnHeaders": { border: "none" },
            ".MuiInputBase-root": {
              border: "1px solid #DCDCDC",
              padding: "5px",
              borderRadius: "10px",
              background: "#F4F6F9",
              display: "flex",
              flexDirection: "row-reverse",
              "&::before": { display: "none" },
              "&::after": { display: "none" },
            },
            ".MuiInputBase-input": { order: "1" },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              color: "#000",
              fontWeight: "600",
            },
            ".MuiButton-startIcon": {
              color: "#C84545",
            },
            ".MuiDataGrid-cell": {
              color: "#191919",
              fontSize: "12px",
              fontWeight: 500,
            },
            ".MuiDataGrid-toolbarContainer": {
              padding: "10px",
            },
          },
        },
      },
    },
    typography: {
      h1: {
        fontWeight: "600",
        fontFamily: "Roboto",
        fontStyle: "normal",
        lineHeight: "normal",
        fontSize: "26px",
        color: theme.additionalColors?.orange,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      h2: {
        color: theme.palette.text.primary,
        fontFamily: "Roboto",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "normal",
      },
      h3: {
        color: theme.palette.text.primary,
        fontFamily: "Roboto",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "normal",
      },
      h4: {
        color: theme.palette.text.primary,
        fontFamily: "Roboto",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
      },
      h5: {
        color: theme.palette.text.disabled,
        fontFamily: "Roboto",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "24px",
      },
      h6: {
        color: theme.palette.primary.main,
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "16.41px",
      },
      body1: {
        color: theme.palette.primary.main,
        fontFamily: "Roboto",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
      },
      body2: {
        color: theme.palette.text.disabled,
        fontFamily: "Roboto",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "normal",
      },
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      "& > label": {
        top: 23,
        left: 0,
        color: theme.palette.grey[500],
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      "& > div > input": {
        padding: "30.5px 14px 11.5px !important",
      },
      "& legend": {
        display: "none",
      },
      "& fieldset": {
        top: 0,
      },
    },
  });
  return theme;
};
