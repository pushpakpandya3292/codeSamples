import CustomeDateTimePicker from "@/components/CustomDateTimePicker";
import CustomToggle from "@/components/CustomSwitch";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  usePromoCodeCreate,
  usePromoCodeListing,
  useUpdatePromoCode,
} from "@/provider/PromoCode";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormData {
  code: string;
  discountInPercentage: number;
  discountInFixedAmount: number | undefined;
  totalUsesAllowed: number;
  limitPerUser: number | undefined;
  expiryDate: string;
  isUnlimitedTotalUses: boolean;
  isUnlimitedTotalUsesPerUser: boolean;
  description: string;
}
const Validationschema = Yup.object().shape({
  code: Yup.string().required("This Field is required"),
  discountInPercentage: Yup.number()
    .typeError("Experience should be a number")
    .min(1, "Discount should be greater then 0")
    .required("This Field is required"),
  discountInFixedAmount: Yup.number().notRequired(),
  isUnlimitedTotalUses: Yup.boolean().notRequired(),
  isUnlimitedTotalUsesPerUser: Yup.boolean().notRequired(),
  limitPerUser: Yup.number().when("isUnlimitedTotalUsesPerUser", {
    is: (field: boolean) => field === true,
    then: (schema) =>
      schema
        .typeError("Experience should be a number")
        .positive("Experience should be a positive number")
        .integer("Experience should be a whole number")
        .min(1, "Number should be greated then 0")
        .required("This field is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  totalUsesAllowed: Yup.number().when("isUnlimitedTotalUses", {
    is: (field: boolean) => field === true,
    then: (schema) =>
      schema
        .typeError("Experience should be a number")
        .positive("Experience should be a positive number")
        .integer("Experience should be a whole number")
        .min(1, "Number should be greated then 0")
        .required("This field is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiryDate: Yup.string().required("This Field is required"),
  description: Yup.string().required("This Field is required"),
});

interface ProCodeFormProps {
  handleDrawerClose: () => void;
  promoCodeData?: any;
  isPromoCodeUpdate: boolean;
}

const ProCodeForm: React.FC<ProCodeFormProps> = ({
  handleDrawerClose,
  promoCodeData,
  isPromoCodeUpdate,
}) => {
  const {
    mutate: onCreatePromoCode,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = usePromoCodeCreate();
  const {
    mutate: onUpdatePromoCode,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = useUpdatePromoCode({ id: promoCodeData?.id });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(Validationschema),
    defaultValues: {
      code: isPromoCodeUpdate ? promoCodeData?.code : "",
      discountInPercentage: isPromoCodeUpdate
        ? promoCodeData?.discountInPercentage
        : 0,
      discountInFixedAmount: isPromoCodeUpdate
        ? promoCodeData?.discountInFixedAmount
        : 0,
      totalUsesAllowed: isPromoCodeUpdate ? promoCodeData?.totalUsesAllowed : 0,
      limitPerUser: isPromoCodeUpdate ? promoCodeData?.limitPerUser : 0,
      expiryDate: isPromoCodeUpdate ? promoCodeData?.expiryDate : "",
      isUnlimitedTotalUses: isPromoCodeUpdate
        ? promoCodeData?.isUnlimitedTotalUses
        : false,
      isUnlimitedTotalUsesPerUser: isPromoCodeUpdate
        ? promoCodeData?.isUnlimitedTotalUsesPerUser
        : false,
      description: isPromoCodeUpdate ? promoCodeData?.description : "",
    },
  });
  const resetForm = () => {
    isPromoCodeUpdate && promoCodeData
      ? reset(promoCodeData)
      : reset({
          code: "",
          discountInPercentage: 0,
          discountInFixedAmount: 0,
          totalUsesAllowed: 0,
          limitPerUser: 0,
          expiryDate: "",
          isUnlimitedTotalUses: false,
          isUnlimitedTotalUsesPerUser: false,
          description: "",
        });
  };
  const onSubmit = (data: FormData) => {
    isPromoCodeUpdate
      ? onUpdatePromoCode(
          {
            // id: promoCodeData?.id,
            code: data?.code,
            discountInPercentage: data?.discountInPercentage,
            discountInFixedAmount: data?.discountInFixedAmount,
            totalUsesAllowed: data?.totalUsesAllowed,
            limitPerUser: data?.limitPerUser,
            expiryDate: new Date(
              new Date(data.expiryDate).setUTCHours(23, 59, 59, 999),
            ).toUTCString(),
            isUnlimitedTotalUses: data?.isUnlimitedTotalUses,
            isUnlimitedTotalUsesPerUser: data?.isUnlimitedTotalUsesPerUser,
            description: data?.description,
          },
          {
            onSuccess: () => {
              toast.success("Promo code updated successfully");
              reset();
              handleDrawerClose();
            },
            onError: () => {
              toast.error(createError?.message);
              handleDrawerClose();
            },
          },
        )
      : onCreatePromoCode(
          {
            code: data?.code,
            discountInPercentage: data?.discountInPercentage,
            discountInFixedAmount: data?.discountInFixedAmount,
            totalUsesAllowed: data?.totalUsesAllowed,
            limitPerUser: data?.limitPerUser,
            expiryDate: new Date(
              new Date(data.expiryDate).setUTCHours(23, 59, 59, 999),
            ).toUTCString(),
            isUnlimitedTotalUses: !data?.isUnlimitedTotalUses,
            isUnlimitedTotalUsesPerUser: !data?.isUnlimitedTotalUsesPerUser,
            description: data?.description,
          },
          {
            onSuccess: () => {
              toast.success("Promo code created successfully");
              reset();
              handleDrawerClose();
            },
            onError: (error) => {
              toast.error(error?.message);
              handleDrawerClose();
            },
          },
        );
  };
  useEffect(() => {
    resetForm();
  }, [promoCodeData, isPromoCodeUpdate]);
  return (
    <Box sx={{ p: 4 }}>
      <form
        //@ts-ignore
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name={"code"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  {...renderFieldProps(error)}
                  label={"Promo Code"}
                  placeholder="Enter Promo Code"
                  type="text"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name={"discountInPercentage"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  {...renderFieldProps(error)}
                  label={"Discount"}
                  placeholder="Discount"
                  type="text"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name={"expiryDate"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomeDateTimePicker
                  {...field}
                  {...renderFieldProps(error)}
                  onChange={(date) => {
                    setValue("expiryDate", dayjs(date).endOf("day").format());
                  }}
                  labelShrink={true}
                  minDate={dayjs()}
                  label={"Expiry Date"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name={"description"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  {...renderFieldProps(error)}
                  label={"Message/Description"}
                  type="text"
                  size="small"
                  placeholder="Message/Description"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} mt={-1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                "& label.MuiFormControlLabel-root": {
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                },
              }}
            >
              <Controller
                name={"isUnlimitedTotalUses"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <CustomToggle
                      {...field}
                      setChecked={(value: boolean) => {
                        setValue("isUnlimitedTotalUses", value);
                        setValue("totalUsesAllowed", 0);
                      }}
                      checked={watch("isUnlimitedTotalUses")}
                      label="Do you want to limit total usage of this promo code"
                    />
                    {error?.message && (
                      <Typography
                        sx={{
                          mt: 1,
                          color: "red",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {error?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              {watch("isUnlimitedTotalUses") && (
                <Controller
                  name={"totalUsesAllowed"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      {...renderFieldProps(error)}
                      // disabled={watch("isUnlimitedTotalUses") ? true : false}
                      label={"Total User Allowed"}
                      type="text"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} mt={-1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                "& label.MuiFormControlLabel-root": {
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                },
              }}
            >
              <Controller
                name={"isUnlimitedTotalUsesPerUser"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <CustomToggle
                      {...field}
                      setChecked={(value: boolean) => {
                        setValue("isUnlimitedTotalUsesPerUser", value);
                        setValue("limitPerUser", 0);
                      }}
                      checked={watch("isUnlimitedTotalUsesPerUser")}
                      label="Do you want to limit total number of usage per user"
                    />
                    {error?.message && (
                      <Typography
                        sx={{
                          mt: 1,
                          color: "red",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {error?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              {watch("isUnlimitedTotalUsesPerUser") && (
                <Controller
                  name={"limitPerUser"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      {...renderFieldProps(error)}
                      // disabled={
                      //   watch("isUnlimitedTotalUsesPerUser") ? true : false
                      // }
                      label={"Limit Per User"}
                      type="text"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              aria-label="Submit"
              disabled={isCreateLoading || isUpdateLoading}
              sx={{
                height: "45px",

                background: (theme) =>
                  theme.additionalColors?.background.tertiary,
                color: (theme) => theme.palette.primary.main,
                borderRadius: "5px",
                padding: "12px 30px",
                fontSize: "16px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
                fontWeight: "600",
              }}
            >
              {isCreateLoading || isUpdateLoading ? (
                <CircularProgress size={24} />
              ) : isPromoCodeUpdate ? (
                "Update Promo Code"
              ) : (
                "Generate Promo Code"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProCodeForm;
