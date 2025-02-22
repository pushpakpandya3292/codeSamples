import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const VideoButton = styled(Button)<ButtonProps>(
  ({ theme }) =>
    ({
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      minWidth: "64px",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
    } as any),
) as (props: ButtonProps) => JSX.Element;

export const VideoCard = styled(Card)<CardProps>(
  ({ theme }) =>
    ({
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgb(255, 255, 255)",
      padding: "20px",
      borderRadius: "10px",
      gap: "10px",
    } as any),
) as (props: CardProps) => JSX.Element;

export const VideoSecondHeading = styled(Typography)<TypographyProps>(
  ({ theme }) =>
    ({
      margin: "0px",
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    } as any),
) as (props: TypographyProps) => JSX.Element;
