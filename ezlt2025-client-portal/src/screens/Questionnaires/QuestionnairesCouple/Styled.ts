import MuiBox, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const BlueBoxWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      borderRadius: "12px",
      padding: "20px",
      background: theme.additionalColors?.boxBackgroundBlue,
      border: `1px solid ${theme.additionalColors?.boxBackgroundBlue} !important`,
    } as any),
) as (props: BoxProps) => JSX.Element;

export const BoxWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      borderRadius: "12px",
       [theme.breakpoints.up("xs")]: {
    padding: "15px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "20px",
  },
      border: `1px solid ${theme.additionalColors?.mainBorder}`,
    } as any),
) as (props: BoxProps) => JSX.Element;

export const ToggleBox = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      // background: theme.palette.primary.main,
      background: theme.additionalColors?.lightBlue,
      border: "1px solid #E9E9E9",
      borderRadius: "12px",
      padding: "10px 20px",
      width: "100%",
    } as any),
) as (props: BoxProps) => JSX.Element;
