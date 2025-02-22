"use-client";
import React, { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, IconButton, Typography } from "@mui/material";

// third party
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// assets
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  useAccountManager,
  useAccountManagerUpdate,
} from "@/provider/accountManager";
import { ClearIcon } from "@mui/x-date-pickers";
import { usePlanUpdate } from "@/provider/Plans";

declare module "@mui/material/styles" {
  interface Theme {
    customInput: any;
  }
}

interface IFormInput {
  planId: string;
  planName: string;
  description: string;
  couplePrice: number;
  singlePrice: number;
}

interface UpdatePlanModalProps {
  planDetails: {
    planId: string;
    planName: string;
    description: string;
    couplePrice: number;
    singlePrice: number;
  };
  handleClose: () => void;
}

const UpdatePlanModal = ({
  planDetails,
  handleClose,
}: UpdatePlanModalProps) => {
  const theme = useTheme();
  const planUpdate = usePlanUpdate({});
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    couplePrice: Yup.number()
      .min(1, "Minimum $1 is allowed")
      .required("Couple Price is required")
      .typeError("Price should be a number"),
    singlePrice: Yup.number()
      .min(1, "Minimum $1 is allowed")
      .required("Single Price is requireds")
      .typeError("Price should be a number"),
  });
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      description: planDetails.description,
      couplePrice: planDetails.couplePrice,
      singlePrice: planDetails.singlePrice,
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await planUpdate.mutateAsync({
        planId: planDetails.planId,
        data: {
          description: data.description,
          couple_price: data.couplePrice,
          single_price: data.singlePrice,
        },
      });
      toast.success("Plan Updated.", {
        position: "top-right",
      });
      handleClose();
      reset();
    } catch (error: any) {
      if (error?.message) {
        toast.error(error?.message, { position: "top-right" });
      } else {
        toast.error("Failed to update", { position: "top-right" });
      }
    }
  };
  return (
    <form
      //@ts-ignore
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: "600",
          fontSize: "22px",
          textTransform: "capitalize",
        }}
      >
        Update Plan
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CustomTextField
          value={planDetails.planName}
          {...renderFieldProps()}
          disabled={true}
          label="Plan Name"
          type="Plan Name"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Controller
            name={"couplePrice"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                {...field}
                {...renderFieldProps(error)}
                label="Couple Price"
              />
            )}
          />
          <Controller
            name={"singlePrice"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                {...field}
                {...renderFieldProps(error)}
                label="Single Price"
              />
            )}
          />
        </Box>
        <Controller
          name={"description"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              {...field}
              {...renderFieldProps(error)}
              label="Plan Description"
              multiline
              rows={4}
            />
          )}
        />
        <Box>
          <Button
            sx={{
              background: theme.palette.primary.main,
              ":disabled": {
                background: theme.palette.primary.main,
              },
              height: "40px",
            }}
            disabled={planUpdate.isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {planUpdate.isLoading ? (
              <CircularProgress
                sx={{ color: (theme) => theme.palette.text.secondary }}
                size={30}
              />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </Box>
      <IconButton sx={{ position: "absolute", top: "15px", right: "20px" }}>
        <ClearIcon onClick={handleClose} />
      </IconButton>
    </form>
  );
};

export default UpdatePlanModal;
