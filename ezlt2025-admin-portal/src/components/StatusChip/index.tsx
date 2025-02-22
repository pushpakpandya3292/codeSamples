import React, { useMemo, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import {
  GeneralStatusEnumColors,
  getKeyOfEnum,
  StatusChipEnum,
  StatusEnum,
  StatusEnumColors,
  StatusEnumTimeLine,
} from "@/constant";
import { useClientDetail } from "@/provider/client/clientDetails";
import { useCartUpdate } from "@/provider/Cart";
import CustomModal from "../CustomModal";
import CustomCard from "../Card";
import CustomCheckBox from "../CustomCheckBox";
import moment from "moment";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Edit } from "@mui/icons-material";
interface StatusChipProps {
  status: string | null | undefined;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <Typography
      variant="h5"
      sx={{
        color: status
          ? `${
              GeneralStatusEnumColors[
                status as keyof typeof GeneralStatusEnumColors
              ]
            }`
          : "#ccc",
        borderColor: status
          ? GeneralStatusEnumColors[
              status as keyof typeof GeneralStatusEnumColors
            ]
          : "#ccc", // Border color based on status
        background: status
          ? `${
              GeneralStatusEnumColors[
                status as keyof typeof GeneralStatusEnumColors
              ]
            }15`
          : "#f1c40f12",
        border: "1px solid",
        px: 2,
        borderRadius: "20px",
        width: "fit-content",
        fontSize: "14px",
        fontWeight: 600,
      }}
    >
      {status ? status : "-"}
    </Typography>
  );
};

export default StatusChip;
