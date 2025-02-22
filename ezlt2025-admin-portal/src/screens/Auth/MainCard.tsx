import React from "react";

// material-ui
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  CardProps,
  CardHeaderProps,
  CardContentProps,
} from "@mui/material";

// project imports
// @ts-ignore
import { KeyedObject } from "types";

// constant
const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string | number;
  elevation?: number;
  title?: React.ReactNode | string;
}

const MainCard = ({
  border = false,
  boxShadow,
  children,
  content = true,
  contentClass = "",
  contentSX = {},
  darkTitle,
  secondary,
  shadow,
  sx = {},
  title,
  ...others
}: MainCardProps) => {
  return (
    <Card
      {...others}
      sx={{
        boxShadow: "none",
        ...sx,
      }}
    >
      {!darkTitle && title && (
        <CardHeader sx={headerSX} title={title} action={secondary} />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={headerSX}
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}
      {title && <Divider />}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
};

export default MainCard;
