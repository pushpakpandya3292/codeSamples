import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Radio,
  Divider,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import { styled } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import { PaymentMethodsEnum } from "../../../constants";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

// Styled card component with selection indicator
const PaymentCard = styled(Card)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    display: "flex",
    alignItems: "center",
    padding: 1,
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: selected
      ? `2px solid ${theme.palette.primary.main}`
      : "1px solid #e0e0e0",
    backgroundColor: selected ? "#f0f4ff" : "#fff",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
    },
    maxWidth: "400px",
  }),
);

const PaymentMethodSelection: React.FC = () => {
  const { control, watch, setValue } = useFormContext();

  const handleSelectMethod = (method: string) => {
    setValue("PaymentMethods", method);
  };

  return (
    <Box sx={{ minHeight: "50vh" }}>
      {/* Title */}
      <Typography variant="h2">Select how do you want to pay?</Typography>
      {/* Payment Options */}
      <Controller
        name={"PaymentMethods"}
        control={control}
        render={({ fieldState: { error } }) => (
          <Grid container direction="column" spacing={2} mt={1}>
            {/* Credit Card Option */}
            <Grid item>
              <PaymentCard
                selected={watch("PaymentMethods") === PaymentMethodsEnum.CARD}
                onClick={() => handleSelectMethod(PaymentMethodsEnum.CARD)}
              >
                <Radio
                  checked={watch("PaymentMethods") === PaymentMethodsEnum.CARD}
                  onChange={() => handleSelectMethod(PaymentMethodsEnum.CARD)}
                  value={PaymentMethodsEnum.CARD}
                  name="payment-method"
                  inputProps={{ "aria-label": "Credit card" }}
                />
                <CreditCardIcon
                  fontSize="large"
                  sx={{ color: "#333", marginRight: "16px" }}
                />
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Credit card
                  </Typography>
                  <Typography variant="caption">
                    An additional fee of 3% will be applied.
                  </Typography>
                </CardContent>
              </PaymentCard>
            </Grid>
            {/* Bank Account Option */}
            <Grid item>
              <PaymentCard
                selected={
                  watch("PaymentMethods") === PaymentMethodsEnum.BANK_ACCOUNT
                }
                onClick={() =>
                  handleSelectMethod(PaymentMethodsEnum.BANK_ACCOUNT)
                }
              >
                <Radio
                  checked={
                    watch("PaymentMethods") === PaymentMethodsEnum.BANK_ACCOUNT
                  }
                  onChange={() =>
                    handleSelectMethod(PaymentMethodsEnum.BANK_ACCOUNT)
                  }
                  value={PaymentMethodsEnum.BANK_ACCOUNT}
                  name="payment-method"
                  inputProps={{ "aria-label": "Bank account" }}
                />
                <AccountBalanceIcon
                  fontSize="large"
                  sx={{ color: "#333", marginRight: "16px" }}
                />
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Bank account
                  </Typography>
                  <Typography variant="caption">0% processing fee.</Typography>
                </CardContent>
              </PaymentCard>
            </Grid>

            <Divider sx={{ mt: 2, maxWidth: "400px", mx: 2 }} />
            <Grid item sx={{ width: "100%" }}>
              <PaymentCard
                sx={{
                  border: "none",
                  background: "#ffffff",
                  marginLeft: "7px",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
                selected={watch("PaymentMethods") === PaymentMethodsEnum.MANUAL}
                onClick={() => handleSelectMethod(PaymentMethodsEnum.MANUAL)}
              >
                <Radio
                  checked={
                    watch("PaymentMethods") === PaymentMethodsEnum.MANUAL
                  }
                  onChange={() => handleSelectMethod(PaymentMethodsEnum.MANUAL)}
                  value={PaymentMethodsEnum.MANUAL}
                  name="payment-method"
                  inputProps={{ "aria-label": "Other payment option" }}
                  sx={{
                    background:
                      watch("PaymentMethods") === PaymentMethodsEnum.MANUAL
                        ? "#fff"
                        : "#f0f4ff", // Light background for unchecked
                    padding: "0.5px",
                    paddingTop: "0px",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    gap: 1,
                    height: "50px",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                    Other payment option
                  </Typography>
                  {/* <Typography variant="caption">(invoice me)</Typography> */}
                </CardContent>
              </PaymentCard>
            </Grid>
            {error?.message && (
              <Typography
                sx={{
                  ml: 3,
                  mt: 1,
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "400",
                }}
              >
                {error?.message}
              </Typography>
            )}
          </Grid>
        )}
      />
    </Box>
  );
};

export default PaymentMethodSelection;
