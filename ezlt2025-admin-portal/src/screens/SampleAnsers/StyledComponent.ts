import { Card, CardProps, styled } from "@mui/material";

export const CardContainer = styled(Card)<CardProps>(
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
