import {
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const SampleButton = styled(Button)<ButtonProps>(
  ({ theme }) =>
    ({
      background: theme.additionalColors?.tablightBlue,
      color: theme.palette?.primary?.light,
      fontSize: "16px",
      fontWeight: "400",
      textTransform: "capitalize",
      "&:hover": {
        background: theme.additionalColors?.tablightBlue,
        color: theme.palette?.primary?.light,
      },
    } as any),
) as (props: ButtonProps) => JSX.Element;

export const TutorialText = styled(Typography)<TypographyProps>(
  ({ theme }) =>
    ({
      color: theme.additionalColors?.tablightBlue,
      fontSize: "14px",
      fontWeight: "600",
      textTransform: "capitalize",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 1,
      // textDecoration: "underline",
    } as any),
) as (props: TypographyProps) => JSX.Element;
