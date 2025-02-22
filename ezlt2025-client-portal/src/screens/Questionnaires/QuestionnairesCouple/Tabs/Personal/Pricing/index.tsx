import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  RadioGroup,
  Stack,
  Chip,
  InputAdornment,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RecommendedChip from "@/components/RecommendedChip";
import { Controller, useFormContext } from "react-hook-form";
import CustomModal from "@/components/CustomModal";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { ShippedToEnum, PaymentMethodsEnum } from "../../../constants";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Logo from "@/assets/img/Doc.png";
import Image from "next/image";
import CustomRadioButton from "@/components/CustomRadioButton";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { usePromotionCode } from "@/provider/promotion";
import { BoxWrapper } from "../../../Styled";
import usePlanPrice from "@/hooks/usePlanPrice";
import { useUserDetailListing } from "@/provider/profile";

const Pricing: React.FC = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  // const [showModal, setShowModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appledPromo, setAppledPromo] = useState(false);
  const promotionCode = usePromotionCode({});
  const [promoCodeError, setPromoCodeError] = useState<
    string | undefined | null
  >("");
  const [discount, setDiscount] = useState(0);
  const { couple_price, single_price, isLoading } = usePlanPrice();
  const [discountPercentage, setdiscountPercentage] = useState<
    number | undefined
  >(0);
  const sub_total =
    watch("marriage_status") === "SINGLE"
      ? single_price + watch("investment_properties_count") * 100
      : couple_price + watch("investment_properties_count") * 100;
  const total = (Number(sub_total) - discount).toFixed(2);
  const profileDetails = useUserDetailListing();

  const planPrice = couple_price;
  const investmentProperty = watch("investment_properties").length;
  const investmentPropertyPrice = (investmentProperty * 100).toFixed(2);
  const shippingPrice = (
    profileDetails?.data?.clientDetail?.shipping ?? 0
  ).toFixed(2);

  const handleApplyPromoCode = async () => {
    try {
      const PromoCodeValid = await promotionCode.mutateAsync({
        promo_code: promoCode,
      });
      if (PromoCodeValid?.id) {
        setdiscountPercentage(PromoCodeValid?.discountInPercentage);
        const discountAmount = parseInt(
          `${
            Number(total) *
            ((PromoCodeValid?.discountInPercentage as number) / 100)
          }`,
        );
        setDiscount(discountAmount);
        setAppledPromo(true);
      } else {
        setDiscount(0);
        setPromoCodeError("Invalid promo code");
      }
    } catch (error: any) {
      setDiscount(0);
      setPromoCodeError(error?.message);
    }
  };
  useEffect(() => {
    if (promoCode === "") {
      setDiscount(0);
      setPromoCodeError("");
    }
  }, [promoCode]);
  const handleDeletePromoCode = () => {
    setAppledPromo(false);
    setPromoCode("");
  };

  return (
    <>
      <Box mr={1} sx={{ pointerEvents: "none" }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h2">Estimate Pricing</Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#7A7A7A",
              lineHeight: "20px",
              fontWeight: 400,
            }}
          >
            Transparent all-in-one pricing. Subject to change if quit claims
            added.
          </Typography>
        </Box>
      </Box>

      <BoxWrapper>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                boxShadow: "0 0 13px 0px #cccccc87",
                borderRadius: "10px",
                padding: { xs: "10px", md: "20px" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                {/* <Typography
                  sx={{
                    fontSize: "22px",
                    color: "#000",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Order Summary
                </Typography> */}
                <Box>
                  <Typography variant="h3">Shopping Cart</Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                  >
                    No payment is required until answers approved at the end.
                  </Typography>
                </Box>

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
                      sx={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "500",
                      }}
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
                      Investment Property x{investmentProperty}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "500",
                      }}
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
                      sx={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "500",
                      }}
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
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      Document Assistance Fee
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "500",
                      }}
                    >
                      $ {Number(shippingPrice) !== 0 && "-"} {shippingPrice}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "flex-end",
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
                      }}
                    >
                      Sub Total
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#000",
                        fontWeight: "500",
                      }}
                    >
                      $ {Number(sub_total)}
                    </Typography>
                  </Box>
                  {appledPromo ? (
                    <>
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
                            justifyContent: {
                              xs: "flex-end",
                              md: "flex-start",
                            },
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
                                margin: "5px 0",
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
                              size="medium"
                              variant="filled"
                              onDelete={handleDeletePromoCode}
                            />
                          </Stack>
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
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "#000",
                                fontWeight: "500",
                              }}
                            >
                              $ {Number(discount.toFixed(2)) !== 0 && "-"}{" "}
                              {discount.toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </>
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
                            disabled
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
                            placeholder="Promo Code"
                            onChange={(e: any) => {
                              setPromoCode(e.target.value.trim());
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
                            // backgroundColor:'YELLOW'
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
                          }}
                        >
                          $ {Number(discount.toFixed(2)) !== 0 && "-"}{" "}
                          {discount.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
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
                    gap: {
                      xs: "8rem",
                      md: "5.5rem",
                      lg: "4.5rem",
                      xl: "4.5rem",
                    },
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
                      ? Number(
                          Number(total) + (Number(total) * 3) / 100,
                        ).toFixed(2)
                      : Number(total).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/** prev */}
            {/* <Box mb={1}>
            <Typography variant="h4" gutterBottom>
              Shopping Cart
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#7A7A7A",
                lineHeight: "20px",
                fontWeight: 400,
              }}
            >
              No payment is required until answers approved at the end.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "20%" } }}>
              <Image src={Logo} alt={"Logo"} width={100} height={100} />
            </Box>
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Typography>Document</Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                }}
              >
                1x -{" "}
                {watch("marriage_status") === "SINGLE" ? "Single" : "Couple"}{" "}
                Living Trust
              </Typography>
            </Box>
            <Box>
              {isLoading ? (
                <Skeleton width={"50px"} />
              ) : (
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "black",
                    lineHeight: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  $
                  {watch("marriage_status") === "SINGLE"
                    ? single_price
                    : couple_price}{" "}
                </Typography>
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  width: "20%",
                }}
                variant="h4"
              >
                Quit Claim:
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                  width: "60%",
                }}
              >
                Primary residence (included)
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: "bold",
                }}
              >
                $0
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  width: watch("investment_properties_count") ? "22.8%" : "20%",
                }}
                variant="h4"
              >
                Quit Claim:
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                  width: "60%",
                }}
              >
                Investment properties ($100 each)
                <Controller
                  name={"investment_properties_count"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      id="investment_properties_count"
                      name="investment_properties_count"
                      sx={{ width: "70px", height: "25px", ml: 1 }}
                      onChange={(e) => {
                        setValue(
                          "investment_properties_count",
                          parseInt(e.target.value),
                        );
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: { maxHeight: 220, width: "25px" },
                        },
                      }}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  )}
                />
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: "bold",
                }}
              >
                ${watch("investment_properties_count") * 100}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  width: "20%",
                }}
                variant="h4"
              >
                Delivery:
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                  width: "60%",
                }}
              >
                Shipping (included)
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: "bold",
                }}
              >
                $0
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4">Sub Total</Typography>
              {isLoading ? (
                <Skeleton width={"50px"} height={"20pxpx"} />
              ) : (
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "black",
                    lineHeight: "20px",
                    fontWeight: "bold",
                  }}
                >
                  ${sub_total}
                </Typography>
              )}
            </Box>
            {appledPromo ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Stack>
                  <Chip
                    sx={{
                      margin: "5px 0",
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
                    size="medium"
                    variant="filled"
                    onDelete={handleDeletePromoCode}
                  />
                  <Typography sx={{ fontSize: "10px", color: "#000" }}>
                    {discountPercentage}% Off
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {Number(discount.toFixed(2)) !== 0 && "-"} $
                  {discount.toFixed(2)}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 2,
                }}
              >
                <Typography variant="h4">Promo Code</Typography>
                <Box>
                  <CustomTextField
                    type="text"
                    placeholder="Enter code"
                    onChange={(e: any) => {
                      setPromoCode(e.target.value.trim());
                    }}
                    value={promoCode}
                    sx={{ width: { xs: "100%", md: "200px" }, mr: 1 }}
                    {...renderFieldProps(promoCodeError)}
                    InputProps={{
                      endAdornment: promoCode.length > 0 && (
                        <InputAdornment position="end">
                          {promotionCode?.isLoading && (
                            <CircularProgress size={"14px"} />
                          )}
                          {promoCodeError ? (
                            <Typography
                              sx={{
                                marginRight: "10px",
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
                          <IconButton onClick={handleApplyPromoCode} edge="end">
                            <Typography variant="h6">Apply</Typography>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h4">Total Estimate</Typography>
              {isLoading ? (
                <Skeleton width={"50px"} height={"20px"} />
              ) : (
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    lineHeight: "20px",
                    fontWeight: "bold",
                  }}
                >
                  ${Number(total).toLocaleString()}
                </Typography>
              )}
            </Box>
          </Box> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#cccccc45",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                p: "20px  ",
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontSize: "18px" }}>
                  Additional Required Fees (paid separate)
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#7A7A7A",
                    lineHeight: "20px",
                    fontWeight: 400,
                  }}
                >
                  These additional fees are required to finalize and fund your
                  documents
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4">
                  <strong>Notary Fees</strong> (licensed Notary Public in your
                  state)
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    Our in-office Notary (single/couple)
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    $150/$200
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    Your local Notary near you
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    $$$
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="h4">
                  <strong>Title Services Fees </strong>(processing and County
                  recorder fees)
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    Quit Claim (primary residence in CA)
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    $100
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    Quit Claim (investment property in CA)
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    $225
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    Affidavit of Death
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#7A7A7A",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                    fontWeight={400}
                  >
                    $100
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1,
                background: "#cccccc45",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                p: "20px  ",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                }}
                fontWeight={400}
                lineHeight={"20px"}
              >
                Notary fees are fixed per state law, however mobile travel fees
                may apply.
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                }}
                fontWeight={400}
                lineHeight={"20px"}
              >
                Government quit claim filing fees vary by state and county. You
                can personally file your quit claim, or we will recommend an
                expert title service that can file it for a nominal filing and
                tracking fee.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </BoxWrapper>
    </>
  );
};

export default Pricing;
