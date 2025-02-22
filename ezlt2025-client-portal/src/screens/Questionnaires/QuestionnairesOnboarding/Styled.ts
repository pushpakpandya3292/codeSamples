import MuiBox, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const BoxWrapper = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      borderRadius: "12px",
      padding: "20px",
      border: `1px solid ${theme.additionalColors?.mainBorder}`,
    } as any),
) as (props: BoxProps) => JSX.Element;

export const ToggleBox = styled(MuiBox)<BoxProps>(
  ({ theme }) =>
    ({
      // background: theme.palette.primary.main,
      background: theme.palette.text.secondary,
      border: "1px solid #E9E9E9",
      borderRadius: "12px",
      padding: "10px 20px",
      width: "100%",
    } as any),
) as (props: BoxProps) => JSX.Element;
