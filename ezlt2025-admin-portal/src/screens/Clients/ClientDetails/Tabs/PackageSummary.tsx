import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { PaymentMethodEnum } from "@/constant";
import { useBillSummary } from "@/provider/client/billSummary";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CustomeDateTimePicker from "@/components/CustomDateTimePicker";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useCart, useCartUpdateManualDetails } from "@/provider/Cart";
import { toast } from "react-toastify";
const mainBox = {
  borderRadius: 2,
  p: 2,
  boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
  background: "#fcfcfc",
  width: "50%",
  height: "max-content",
};

export enum PaymentStatusEnum {
  "PAID" = 1,
  "UNPAID" = 2,
  "REFUND" = 3,
  "PROCESSING" = 4,
}
function PackageSummary(userId: any) {
  const {
    data: billSummary,
    isLoading: summaryLoading,
    refetch,
  } = useBillSummary({
    id: userId,
  });
  const updateManualDetails = useCartUpdateManualDetails({});
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      final_invoice_amount: "",
      final_payment_type: "",
      check_number: "",
      final_cleared_date: "",
    },
  });

  const estPayment = (3 / 100) * (billSummary?.discountedTotal || 0);

  const updateInvoiceInfo = async () => {
    try {
      if (
        !(
          watch("final_invoice_amount") &&
          !Number(watch("final_invoice_amount"))
        )
      ) {
        const res = await updateManualDetails.mutateAsync({
          id: userId.userId,
          data: {
            finalInvoiceAmount:
              Number(watch("final_invoice_amount")) || undefined,
            finalPaymentType: watch("final_payment_type"),
            commission: Number(watch("check_number")) || undefined,
            finalClearedDate: watch("final_cleared_date") || undefined,
          },
        });
        if (res) {
          refetch();
          toast.success("Invoice details updated successfully");
        }
      } else {
        toast.error("Please enter valid final invoice amount");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (billSummary) {
      setValue("final_invoice_amount", `${billSummary?.finalInvoiceAmount}`);
      setValue("final_payment_type", billSummary?.finalPaymentType || "");
      setValue("check_number", `${billSummary?.commission}`);
      setValue("final_cleared_date", billSummary?.finalClearedDate || "");
    }
  }, [billSummary]);

  const formatCurrency = (inputValue: string, previousValue: string) => {
    let numericValue = inputValue.replace(/[^0-9.]/g, "");
    if (numericValue !== inputValue) {
      return previousValue;
    }
    const parts = numericValue.split(".");
    const wholePart = parts[0] || "";
    let decimalPart = parts[1] || "";

    if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0, 2);
    }
    return decimalPart ? `${wholePart}.${decimalPart}` : wholePart;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: "final_invoice_amount" | "check_number",
  ) => {
    const formattedValue = formatCurrency(e.target.value, watch(inputName));
    setValue(inputName, formattedValue);
    e.target.value = formattedValue;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Box sx={mainBox}>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: "18px", fontWeight: "700", color: "#333" }}
            >
              Order Summary
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#ffffff",
                backgroundColor:
                  billSummary?.isPaidStatus == PaymentStatusEnum.PAID
                    ? "#02d677"
                    : billSummary?.isPaidStatus === PaymentStatusEnum.PROCESSING
                    ? "#4c8cd3"
                    : "#fc140b",
                borderRadius: "6px",
                px: 2,
                py: 0.5,
                textTransform: "uppercase",
              }}
              // sx={{
              //   background:
              //     billSummary?.isPaidStatus !== PaymentStatusEnum.PAID
              //       ? "orange"
              //       : "green",
              //   py: 1,
              //   px: 2,
              //   borderRadius: "8px",
              //   color: "white",
              //   fontWeight: 600,
              // }}
            >
              {billSummary?.isPaidStatus
                ? PaymentStatusEnum[billSummary?.isPaidStatus as any]
                : "-"}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {summaryLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  borderBottom: "1px solid lightgray",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Complete Living Trust and Estate Plan
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  $ {billSummary?.packagePrice?.toFixed(2)}
                </Typography>
              </Box>
              {/* <Divider /> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  borderBottom: "1px solid lightgray",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Investment Properties x
                  {billSummary?.investmentPropertiesCount || 0}
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  ${" "}
                  {billSummary?.investmentPropertiesTotalPrice?.toFixed(2) || 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  borderBottom: "1px solid lightgray",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Additional Documents
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  $ 0.00
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  borderBottom: "1px solid lightgray",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                  }}
                >
                  Preparation Assistance
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  $ 0.00
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid lightgray",
                  paddingBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    xs: "flex-end",
                    md: "flex-end",
                    lg: "flex-end",
                  },
                  gap: { xs: "8rem", md: "5.5rem", lg: "5rem" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  Sub Total
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  ${" "}
                  {(
                    Number(billSummary?.packagePrice) +
                    Number(billSummary?.investmentPropertiesTotalPrice)
                  )?.toFixed(2) || "0.00"}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid lightgray",
                  // paddingBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    xs: "flex-end",
                    md: "flex-end",
                    lg: "flex-end",
                  },
                  gap: { xs: "8rem", md: "5.5rem", lg: "5rem" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    my: 2,
                  }}
                >
                  Discount {billSummary?.promoCodePercent || 0}%
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  ${" "}
                  {(billSummary?.promoCodeDiscount || 0)?.toFixed(2) || "0.00"}
                </Typography>
              </Box>
              {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#00000073",
                  fontWeight: "600",
                }}
              >
                Promo code total {billSummary?.promoCodePercent || 0}%
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#000", fontWeight: "600" }}
              >
                ${billSummary?.promoCodeDiscount || 0}
              </Typography>
            </Box> */}
              <Box
                sx={{
                  borderBottom: "1px solid lightgray",
                  // paddingBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    xs: "flex-end",
                    md: "flex-end",
                    lg: "flex-end",
                  },
                  gap: { xs: "8rem", md: "5.5rem", lg: "5rem" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    my: 2,
                  }}
                >
                  Credit Card Fee (3%)
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  {PaymentMethodEnum[
                    billSummary?.paymentMethod as keyof typeof PaymentMethodEnum
                  ] == PaymentMethodEnum.card
                    ? `$ ${estPayment}`
                    : "$ 0.00"}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid lightgray",
                  // paddingBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: {
                    xs: "flex-end",
                    md: "flex-end",
                    lg: "flex-end",
                  },
                  gap: { xs: "8rem", md: "5.5rem", lg: "5rem" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    my: 2,
                  }}
                >
                  Total amount billed:
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  ${billSummary?.amountPaid?.toFixed(2) || 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  // borderBottom: "1px solid lightgray",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                    mt: 2,
                  }}
                >
                  Referring agent:
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  {billSummary?.referringAgent || "-"}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={mainBox}>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: "18px", fontWeight: "700", color: "#333" }}
            >
              Notes for Invoice
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {summaryLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} item>
                  <Controller
                    name={"final_invoice_amount"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        InputLabelProps={{ shrink: true }}
                        {...renderFieldProps(error)}
                        label={"Final Receipt Amount"}
                        placeholder="Enter Final Receipt Amount"
                        type="number"
                        size="small"
                        value={field.value}
                        onChange={(e) =>
                          handleChange(e, "final_invoice_amount")
                        }
                        InputProps={{
                          inputMode: "decimal",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ color: "black" }}
                            >
                              <Typography sx={{ color: "grey" }}>$</Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={12} item>
                  <Controller
                    name={"final_payment_type"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        InputLabelProps={{ shrink: true }}
                        {...renderFieldProps(error)}
                        label={"Payment type and note"}
                        placeholder="Enter Payment type and note"
                        type="text"
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={12} item>
                  <Controller
                    name={"check_number"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        InputLabelProps={{ shrink: true }}
                        {...renderFieldProps(error)}
                        label={"Final Net Pay"}
                        placeholder="Enter Final Net Pay $"
                        type="Number"
                        size="small"
                        value={field.value}
                        onChange={(e) => handleChange(e, "check_number")}
                        InputProps={{
                          inputMode: "decimal",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ color: "black" }}
                            >
                              <Typography sx={{ color: "grey" }}>$</Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={12} item>
                  <Controller
                    name={"final_cleared_date"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        InputLabelProps={{ shrink: true }}
                        {...renderFieldProps(error)}
                        label={"Final cleared date"}
                        placeholder="Enter Final cleared date"
                        type="date"
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={updateInvoiceInfo}
                    disabled={updateManualDetails.isLoading}
                  >
                    {updateManualDetails.isLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PackageSummary;
