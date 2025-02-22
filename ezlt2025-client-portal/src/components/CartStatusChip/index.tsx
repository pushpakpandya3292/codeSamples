import React from "react";
import { Typography } from "@mui/material";
import {
  getKeyOfEnum,
  StatusChipEnum,
  StatusEnum,
  StatusEnumColors,
} from "@/constants/ChipsData";

interface CartStatusChipProps {
  cartStatus: string | null | undefined;
}

const CartStatusChip: React.FC<CartStatusChipProps> = ({ cartStatus }) => {
  return (
    <Typography
      variant="h5"
      sx={{
        color: cartStatus
          ? StatusEnumColors[
              getKeyOfEnum(
                StatusEnum,
                cartStatus,
              ) as keyof typeof StatusEnumColors
            ]
          : "#ccc",
        borderColor: cartStatus
          ? StatusEnumColors[
              getKeyOfEnum(
                StatusEnum,
                cartStatus,
              ) as keyof typeof StatusEnumColors
            ]
          : "#ccc",
        background: cartStatus
          ? `${
              StatusEnumColors[
                getKeyOfEnum(
                  StatusEnum,
                  cartStatus,
                ) as keyof typeof StatusEnumColors
              ]
            }15`
          : "#f1c40f12",
        border: "1px solid",
        padding: "0px 20px",
        height: "35px",
        lineHeight: "35px",
        borderRadius: "20px",
        width: "fit-content",
        fontSize: "14px",
        fontWeight: 600,
        px: 2,
      }}
    >
      {/* {cartStatus ? cartStatus : "-"} */}
      {cartStatus
        ? StatusChipEnum[
            getKeyOfEnum(StatusEnum, cartStatus) as keyof typeof StatusChipEnum
          ]
        : "-"}
    </Typography>
  );
};

export default CartStatusChip;
