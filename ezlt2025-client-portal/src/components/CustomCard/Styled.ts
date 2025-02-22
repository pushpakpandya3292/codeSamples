import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardBox = styled(Box)<BoxProps>(
  ({ theme }) =>
    ({
      background: "#d3d0d02b",
      padding: "20px 15px",
      boxShadow: "0 0 10px 1px #e3e3e3",
      borderRadius: "10px",
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",

      ".MuiTypography-h3": {
        fontSize: "17px",
        alignSelf: "center",
        justifySelf: "center",
      },
      ".MuiTypography-h4": {
        alignSelf: "center",
        justifySelf: "center",
      },
      ".imageBox": {
        alignSelf: "center",
        justifySelf: "center",
      },
    } as any),
) as (props: BoxProps) => JSX.Element;

export const CardInnerBox = styled(Box)<BoxProps>(
  ({ theme }) =>
    ({
      display: "flex",
      flexDirection: "column",
      "h5.MuiTypography-root": { padding: "0", color: "#000" },
    } as any),
) as (props: BoxProps) => JSX.Element;
