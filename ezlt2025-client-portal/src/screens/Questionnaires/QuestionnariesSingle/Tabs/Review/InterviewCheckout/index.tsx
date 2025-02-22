import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUserDetailListing } from "@/provider/profile";
import {
  PaymentEnum,
  PaymentMethodsEnum,
  ShippedToEnum,
} from "../../../constants";
import EditIcon from "@mui/icons-material/Edit";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import StripePayment from "./StripePayment";
import { useEffect, useState } from "react";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { usePromotionCode } from "@/provider/promotion";
import { DEMO_USER } from "../../../../../../../config";
import { toast } from "react-toastify";
import Logo from "@/assets/img/Doc.png";
import Image from "next/image";
import usePlanPrice from "@/hooks/usePlanPrice";
import ManualPayment from "./ManualPayment";

const StripeCheckout: React.FC = () => {
  const [promoCode, setPromoCode] = useState("");
  const [appledPromo, setAppledPromo] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState<
    string | undefined | null
  >("");
  const [discount, setDiscount] = useState(0);
  const promotionCode = usePromotionCode({});
  const [discountPercentage, setdiscountPercentage] = useState<
    number | undefined
  >(0);
  const { couple_price, single_price } = usePlanPrice();
  const { watch } = useFormContext();
  const investmentProperty = watch("investment_properties").length;
  const profileDetails = useUserDetailListing();
  const planPrice = single_price.toFixed(2);

  const shippingPrice = (
    profileDetails?.data?.clientDetail?.shipping ?? 0
  ).toFixed(2);
  const investmentPropertyPrice = (investmentProperty * 100).toFixed(2);
  const sub_total = (
    Number(planPrice) +
    Number(investmentPropertyPrice) -
    Number(shippingPrice)
  ).toFixed(2);
  const total = (Number(sub_total) - discount).toFixed(2);

  useEffect(() => {
    if (watch("defaultPromoCode") && single_price) {
      handleApplyPromoCode(watch("defaultPromoCode"));
    }
  }, [single_price]);

  const handleApplyPromoCode = async (_promoCode: string) => {
    try {
      setPromoCode(_promoCode);
      const PromoCodeValid = await promotionCode.mutateAsync({
        promo_code: _promoCode,
      });
      if (PromoCodeValid?.id) {
        setdiscountPercentage(PromoCodeValid?.discountInPercentage);
        const discountAmount = parseInt(
          `${
            Number(total) *
            ((PromoCodeValid?.discountInPercentage as number) / 100)
          }`,
        );
        // const discountAmount = parseInt(
        //   `${
        //     Number(total) *
        //     ((PromoCodeValid?.discountInPercentage as number) / 100)
        //   }`,
        // );
        setDiscount(discountAmount);
        setAppledPromo(true);
      } else {
        setDiscount(0);
        setPromoCode("");
        setPromoCodeError("Invalid promo code");
      }
    } catch (error: any) {
      setDiscount(0);
      setPromoCode("");
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    if (promoCode === "") {
      setDiscount(0);
      setTimeout(() => {
        setPromoCodeError("");
      }, 3000);
    }
  }, [promoCode]);
  const handleDeletePromoCode = () => {
    setAppledPromo(false);
    setPromoCode("");
  };

  return (
    <>
      <Box mt={1} mb={3}>
        {/* <Typography fontSize={16} sx={{ color: "black" }}>
          Final Checkout Price
        </Typography>{" "}
        <Typography fontSize={14} sx={{ color: "black", fontWeight: "normal" }}>
          Delivery method:{" "}
          {watch("shipped_to") == ShippedToEnum.PRIMARY
            ? `Shipped to ${watch("primary_trustee_first_name")} ${watch(
                "primary_trustee_last_name",
              )} (${watch("primary_trustee_address")?.name})`
            : watch("shipped_to") === ShippedToEnum.ME
            ? `Shipped to ${watch("shipping_name_for_doc")} (${
                watch("shipping_address_for_doc")?.name
              })`
            : watch("shipped_to") === ShippedToEnum.PICKUP
            ? "Pick-up ONLY"
            : "Pick-up and Notarize in the EZ Living Trust office"}
        </Typography> */}
      </Box>
      <Grid
        container
        padding={1}
        columnSpacing={{ sm: 2, md: 5 }}
        alignItems={"stretch"}
      >
        <Grid item xs={12} lg={6} md={12}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              boxShadow: "0 0 13px 0px #cccccc87",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "22px",
                  color: "#000",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} xl={12}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: { xs: "10px" },
                    }}
                  >
                    <Box>
                      <Typography sx={{ color: "black", display: "inline" }}>
                        Document :{" "}
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#7A7A7A",
                            lineHeight: "20px",
                            fontWeight: 400,
                            display: "inline",
                          }}
                        >
                          {watch("complete_trust_name")}{" "}
                          {watch("marriage_status") == "COUPLE" ? "Family" : ""}{" "}
                        </Typography>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#000", display: "inline" }}>
                        Delivery method :{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#7A7A7A",
                          lineHeight: "20px",
                          fontWeight: 400,
                          display: "inline",
                        }}
                      >
                        {watch("shipped_to") || "-"}
                        {/* {watch("shipped_to") === ShippedToEnum.PRIMARY
                          ? `Shipped to ${watch(
                              "primary_trustee_first_name",
                            )} ${watch("primary_trustee_last_name")} (${
                              watch("primary_trustee_address")?.name?.length >
                              20
                                ? watch(
                                    "primary_trustee_address",
                                  )?.name?.substring(0, 20) + "..."
                                : watch("primary_trustee_address")?.name
                            })`
                          : watch("shipped_to") === ShippedToEnum.ME
                          ? `Shipped to ${watch("shipping_name_for_doc")} (${
                              watch("shipping_address_for_doc")?.name?.length >
                              20
                                ? watch(
                                    "shipping_address_for_doc",
                                  )?.name?.substring(0, 20) + "..."
                                : watch("shipping_address_for_doc")?.name
                            })`
                          : watch("shipped_to") === ShippedToEnum.PICKUP
                          ? "Pick-up ONLY"
                          : "Pick-up and Notarize in the EZ Living Trust office"} */}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#000", display: "inline" }}>
                        Address :{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#7A7A7A",
                          lineHeight: "20px",
                          fontWeight: 400,
                          display: "inline",
                        }}
                      >
                        {watch("shipped_to") == ShippedToEnum.PRIMARY
                          ? `${watch("primary_trustee_first_name")} ${watch(
                              "primary_trustee_last_name",
                            )}, (${watch("primary_trustee_address")?.name})`
                          : watch("shipped_to") === ShippedToEnum.ME
                          ? `${watch("shipping_name_for_doc")}, (${
                              watch("shipping_address_for_doc")?.name
                            })`
                          : watch("shipped_to") === ShippedToEnum.PICKUP
                          ? "EZ Living Trust office"
                          : "EZ Living Trust office"}
                        {/* {watch("shipped_to") === ShippedToEnum.PRIMARY
                          ? ` ${
                              watch("primary_trustee_address")?.name?.length >
                              60
                                ? watch(
                                    "primary_trustee_address",
                                  )?.name?.substring(0, 60) + "........"
                                : watch("primary_trustee_address")?.name
                            }`
                          : watch("shipped_to") === ShippedToEnum.ME
                          ? ` ${
                              watch("shipping_address_for_doc")?.name?.length >
                              60
                                ? watch(
                                    "shipping_address_for_doc",
                                  )?.name?.substring(0, 60) + "..."
                                : watch("shipping_address_for_doc")?.name
                            }`
                          : watch("shipped_to") === ShippedToEnum.PICKUP
                          ? "EZ Living Trust office"
                          : "EZ Living Trust office"} */}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {/* <Grid item xs={12} md={6} lg={6} xl={6}>
                  <Box
                    sx={{
                      display: "flex",
                      height: "100%",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>Document</Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#7A7A7A",
                        lineHeight: "20px",
                        fontWeight: 400,
                      }}
                    >
                      1x -{" "}
                      {watch("marriage_status") === "SINGLE"
                        ? "Single"
                        : "Couple"}{" "}
                      Living Trust
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <Box
                    sx={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "black",
                        lineHeight: "20px",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      $
                      {watch("marriage_status") === "SINGLE"
                        ? single_price
                        : couple_price}{" "}
                    </Typography>
                  </Box>
                </Grid> */}
              </Grid>
              <Divider sx={{ my: 2 }} />
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
                    sx={{ fontSize: "16px", color: "black", fontWeight: "500" }}
                  >
                    $ {planPrice}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    // borderTop: '1px solid lightgray',
                    borderBottom: "1px solid lightgray",
                    // paddingTop: '8px',
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
                    Investment Property x{investmentProperty}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                  >
                    $ {investmentPropertyPrice}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    // borderTop: '1px solid lightgray',
                    borderBottom: "1px solid lightgray",
                    // paddingTop: '8px',
                    paddingBottom: "10px",
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
                    mb: 1,
                    // borderTop: '1px solid lightgray',
                    borderBottom: "1px solid lightgray",
                    // paddingTop: '8px',
                    paddingBottom: "10px",
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
                    Document Assistance Fee
                  </Typography>
                  <Typography
                    sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                  >
                    $ 0.00
                    {/* {Number(shippingPrice) !== 0 && "-"} {shippingPrice} */}
                  </Typography>
                </Box>
                {/* <Divider sx={{ my: 3 }} /> */}
                <Box
                  sx={{
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "10px",
                    // gap: "5.5rem",

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
                      textAlign: "right",
                    }}
                  >
                    Sub Total
                  </Typography>
                  <Typography
                    sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                  >
                    $ {Number(sub_total)}
                  </Typography>
                </Box>
                {appledPromo ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: {
                        xs: "1px solid lightgray",
                        md: "1px solid lightgray",
                      },
                      alignItems: "center",
                      flexWrap: { xs: "wrap", md: "nowrap" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "flex-end", md: "flex-start" },
                        gap: { xs: "6rem", md: "10px" },
                        width: { xs: "100%" },
                        borderBottom: {
                          xs: "1px solid lightgray",
                          md: "none",
                        },
                      }}
                    >
                      <Stack>
                        <Chip
                          sx={{
                            borderRadious: "none",
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            borderRadius: "10px !important",
                            backgroundColor: (theme) =>
                              `${theme.additionalColors?.lightBlue} !important`,
                            "& .MuiSvgIcon-root,.MuiChip-label": {
                              color: (theme) => theme.palette.primary.main,
                            },
                          }}
                          icon={<LocalOfferOutlinedIcon fontSize="small" />}
                          label={promoCode}
                          size="small"
                          variant="filled"
                          onDelete={handleDeletePromoCode}
                        />
                      </Stack>{" "}
                      <Typography
                        sx={{
                          fontSize: { xs: "15px", md: "10px" },
                          color: "#000",
                        }}
                      >
                        {discountPercentage}% Off
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        my: 2,
                        gap: "8rem",
                        width: { xs: "100%" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: "8rem", md: "5rem", lg: "4rem" },
                          width: { xs: "100%" },
                          justifyContent: { xs: "flex-end" },
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
                          Discount
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#000",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                        }}
                      >
                        $ {Number(discount.toFixed(2)) !== 0 && "-"}{" "}
                        {discount.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr",
                        lg: "1fr",
                        xl: "1fr 1fr",
                      },
                      gridGap: "10px",
                      borderBottom: {
                        xs: "1px solid lightgray",
                        md: "1px solid lightgray",
                      },
                      paddingTop: "0px",
                      // justifyContent: "space-between",
                      // xs: {flexWrap: 'wrap'}
                      flexWrap: {
                        xs: "wrap",
                        md: "wrap",
                        lg: "wrap",
                        xl: "nowrap",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: { xs: "100%" },
                        justifyContent: {
                          xs: "space-between",
                          md: "flex-start",
                        },
                        paddingTop: { xs: "10px" },
                        borderBottom: {
                          xs: "1px solid lightgray",
                          md: "1px solid lightgray",
                          lg: "1px solid lightgray",
                          xl: "none",
                        },
                        paddingBottom: { xs: "10px" },
                        // border: "1px solid red",
                      }}
                    >
                      <Box sx={{ flex: { xs: 2, md: 2, lg: 2 } }}>
                        <CustomTextField
                          sx={{
                            width: {
                              width: {
                                xs: "100%",
                                md: "100%",
                                lg: "max-content",
                              },
                            },
                          }}
                          type="text"
                          placeholder="Add Promo code"
                          onChange={(e: any) => {
                            setPromoCode(e.target.value.trim());
                          }}
                          onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === "Enter" && promoCode.trim() !== "") {
                              handleApplyPromoCode(promoCode);
                            }
                          }}
                          value={promoCode}
                          {...renderFieldProps(promoCodeError)}
                          InputProps={{
                            endAdornment: promoCode.length > 0 && (
                              <InputAdornment position="end">
                                {promotionCode?.isLoading && (
                                  <CircularProgress size={"14px"} />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                        {promoCodeError ? (
                          <Typography
                            sx={{
                              // marginRight: "10px",
                              padding: 0,
                              fontSize: "10px",
                              color: (theme) => theme.palette.error.main,
                            }}
                          >
                            {promoCodeError}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Button
                        sx={{ ml: 1, height: "36px" }}
                        variant="contained"
                        onClick={(e) => handleApplyPromoCode(promoCode)}
                        disabled={promotionCode.isLoading || promoCode === ""}
                      >
                        APPLY
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        // justifyContent: {xs: "flex-end" , md: 'flex-end' , lg: 'flex-end' , xl: 'flex-end' },
                        // border: "1px solid red",
                        gap: {
                          xs: "8rem",
                          md: "5.5rem",
                          lg: "10rem",
                          xl: "4rem",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          // alignItems: "center",
                          my: 2,
                          justifyContent: "space-between",
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
                          Discount
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "#000",
                          fontWeight: "500",
                          whiteSpace: "nowrap",
                        }}
                      >
                        $ {Number(discount.toFixed(2)) !== 0 && "-"}{" "}
                        {discount.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "flex-end",
                      // gap: "8rem",
                      justifyContent: {
                        xs: "flex-end",
                        md: "flex-end",
                        lg: "flex-end",
                      },
                      gap: { xs: "8rem", md: "5rem", lg: "4rem" },
                      borderBottom: "1px solid lightgray",
                      paddingBottom: "10px",
                      paddingTop: "10px",
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
                      Credit Card Fee 
                      {watch("PaymentMethods") === PaymentMethodsEnum.CARD ? ` (3%)` : ` (0%)`}

                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "500",
                      }}
                    >
                    {watch("PaymentMethods") === PaymentMethodsEnum.CARD ? `$ ${Number((Number(total) * 3) / 100).toFixed(2)}` : `$ 0.00`}

                    </Typography>
                  </Box>
                {/* <Divider sx={{ my: 3 }} /> */}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "flex-end",
                  justifyContent: {
                    xs: "flex-end",
                    md: "flex-end",
                    lg: "flex-end",
                  },

                  // gap: "4.5rem",
                  gap: { xs: "8rem", md: "5.5rem", lg: "4.5rem", xl: "4.5rem" },
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  borderBottom: "1px solid lightgray",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "400",
                    marginBottom: "5px",
                  }}
                >
                  Total amount to bill
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", color: "#000", fontWeight: "500" }}
                >
                  ${" "}
                  {watch("PaymentMethods") === PaymentMethodsEnum.CARD
                    ? Number(Number(total) + (Number(total) * 3) / 100).toFixed(
                        2,
                      )
                    : Number(total).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              boxShadow: "0 0 13px 0px #cccccc87",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {Number(total) !== 0 &&
              (profileDetails?.data?.role?.name !== "DemoClient" ? (
                <>
                  {watch("PaymentMethods") === PaymentMethodsEnum.MANUAL ? (
                    <ManualPayment
                      cartId={watch("cartId")}
                      promoCode={appledPromo ? promoCode : undefined}
                    />
                  ) : (
                    <StripePayment
                      chargeAmount={
                        watch("PaymentMethods") === PaymentMethodsEnum.CARD
                          ? (Number(total) + (Number(total) * 3) / 100) * 100
                          : Number(total) * 100
                      }
                      promoCode={appledPromo ? promoCode : ""}
                      paymentType={watch("PaymentMethods") as PaymentEnum}
                    />
                  )}
                </>
              ) : (
                <Typography variant="h6" color="error">
                  {` You can't proceed with payment in demo mode`}
                </Typography>
              ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StripeCheckout;
