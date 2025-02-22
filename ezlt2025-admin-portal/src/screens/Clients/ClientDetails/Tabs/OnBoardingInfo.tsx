import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { mainBox, boxStyle, titleStyle, inforStyle } from "../index";
import { BoxWrapper } from "@/components/BoxWrapper";
import { useCart } from "@/provider/Cart";

export enum SubMarriageStatusEnum {
  "Never Married" = 1,
  "Divorced" = 2,
  "Widowed" = 3,
  "Legally Married" = 11,
  "Common Law" = 12,
}

const OnBoardingInfo = ({ clientId }: { clientId: string }) => {
  const { data: OnBoardingData, isLoading } = useCart({ id: clientId });
  const planPrice = Number(
    OnBoardingData?.marriage_status === 1
      ? OnBoardingData?.plan?.single_price
      : OnBoardingData?.plan?.couple_price,
  );
  const shippingPrice = OnBoardingData?.shipping ? OnBoardingData?.shipping : 0;
  const total =
    planPrice +
    shippingPrice +
    100 * Number(OnBoardingData?.investment_properties_count);
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phoneNumber;
  };
  const mainHeading = {
    py: 0,
    my: 2,
    fontSize: "22px",
    fontWeight: "600",
    color: "#535f6b",
  };
  const planName = OnBoardingData?.plan?.name.toLowerCase();
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography sx={mainHeading}>
            Marital Status & Resident State
          </Typography>
          <BoxWrapper width={"60%"}>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                What is your Marital Status
              </Typography>
              <Typography sx={inforStyle}>
                {OnBoardingData?.marriage_status === 1 ? "Single" : "Couple"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Additional Info</Typography>
              <Typography sx={inforStyle}>
                {
                  //@ts-ignore
                  SubMarriageStatusEnum[OnBoardingData?.sub_marriage_status]
                }
              </Typography>
            </Box>
            {OnBoardingData?.marriage_status === 1 &&
              OnBoardingData?.died_person && (
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Died Person Name</Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.died_person || "-"}
                  </Typography>
                </Box>
              )}
            {OnBoardingData?.marriage_status === 1 &&
              OnBoardingData?.last_married_person && (
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Last Married Person Name
                  </Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.last_married_person || "-"}
                  </Typography>
                </Box>
              )}
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Resident State</Typography>
              <Typography sx={inforStyle}>{OnBoardingData?.state}</Typography>
            </Box>
          </BoxWrapper>
          {/* PICK A PLAN */}
          <Typography sx={mainHeading}>Pick a Plan</Typography>
          <BoxWrapper width={"60%"}>
            {/* <Box sx={boxStyle}>
                            <Typography sx={titleStyle}>ID</Typography>
                            <Typography sx={inforStyle}>
                                {OnBoardingData?.plan.id || "-"}
                            </Typography>
                        </Box> */}
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Package Name</Typography>
              <Typography sx={{ ...inforStyle, textTransform: "capitalize" }}>
                {planName || "-"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Description</Typography>
              <Typography sx={inforStyle}>
                {OnBoardingData?.plan?.description || "-"}
              </Typography>
            </Box>
            {OnBoardingData?.marriage_status === 1 ? (
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Price</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.plan?.single_price || "-"}
                </Typography>
              </Box>
            ) : (
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Price</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.plan?.couple_price || "-"}
                </Typography>
              </Box>
            )}

            {/* <Box sx={boxStyle}>
                            <Typography sx={titleStyle}>Main</Typography>
                            <Typography sx={inforStyle}>
                                {OnBoardingData?.plan.is_main ? "Yes" : "No" || "-"}
                            </Typography>
                        </Box> */}
          </BoxWrapper>
          {/* Profile */}
          <Typography sx={mainHeading}>Profile</Typography>
          <BoxWrapper width={"60%"}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: "10px 0",
                }}
              >
                Primary Trustee
              </Typography>
              {/* <Box sx={boxStyle}>
                                <Typography sx={titleStyle}>ID</Typography>
                                <Typography sx={inforStyle}>
                                    {OnBoardingData?.primary_trustee?.id || "-"}
                                </Typography>
                            </Box> */}
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>First Name</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.primary_trustee?.first_name || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Middle Name</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.primary_trustee?.middle_name || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Last Name</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.primary_trustee?.last_name || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Email</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.primary_trustee?.email || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Phone</Typography>
                <Typography sx={inforStyle}>
                  {OnBoardingData?.primary_trustee?.phone_no
                    ? formatPhoneNumber(
                        OnBoardingData.primary_trustee?.phone_no,
                      )
                    : "-"}
                </Typography>
              </Box>
              {/* <Box sx={boxStyle}>
                                <Typography sx={titleStyle}>Order</Typography>
                                <Typography sx={inforStyle}>
                                    {OnBoardingData?.primary_trustee?.order || "-"}
                                </Typography>
                            </Box> */}
            </Box>
            {OnBoardingData?.marriage_status === 2 && (
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "22px",
                    fontWeight: "600",
                    margin: "10px 0",
                  }}
                >
                  Secondary Trustee
                </Typography>
                {/* <Box sx={boxStyle}>
                                        <Typography sx={titleStyle}>ID</Typography>
                                        <Typography sx={inforStyle}>
                                            {OnBoardingData?.secondary_trustee?.id || "-"}
                                        </Typography>
                                    </Box> */}
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>First Name</Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.secondary_trustee?.first_name || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Middle Name</Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.secondary_trustee?.middle_name || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Last Name</Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.secondary_trustee?.last_name || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Email</Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.secondary_trustee?.email || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Phone</Typography>
                  <Typography sx={inforStyle}>
                    {OnBoardingData?.secondary_trustee?.phone_no
                      ? formatPhoneNumber(
                          OnBoardingData?.secondary_trustee?.phone_no,
                        )
                      : "-"}
                  </Typography>
                </Box>
                {/* <Box sx={boxStyle}>
                                        <Typography sx={titleStyle}>Order</Typography>
                                        <Typography sx={inforStyle}>
                                            {OnBoardingData?.secondary_trustee?.order || "-"}
                                        </Typography>
                                    </Box> */}
              </Box>
            )}
          </BoxWrapper>
          {/* Properties */}
          <Typography sx={mainHeading}>Properties</Typography>
          <BoxWrapper width={"60%"}>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Probate Primary Home</Typography>
              <Typography sx={inforStyle}>
                {OnBoardingData?.is_probate_primary_home ? "Yes" : "No"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                Investment Properties Count
              </Typography>
              <Typography sx={inforStyle}>
                {OnBoardingData?.investment_properties_count
                  ? OnBoardingData?.investment_properties_count
                  : 0}
              </Typography>
            </Box>
          </BoxWrapper>
          {/* Shipping & Notary */}
          <Typography sx={mainHeading}>Shipping & Notary</Typography>
          <BoxWrapper width={"60%"}>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Shipping</Typography>
              <Typography sx={inforStyle}>
                {OnBoardingData?.shipping ? OnBoardingData?.shipping : 0}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Notary</Typography>
              <Typography sx={inforStyle}>{OnBoardingData?.notary}</Typography>
            </Box>
          </BoxWrapper>
          {/* Package Summary */}
          <Typography sx={mainHeading}>Package Summary</Typography>
          <BoxWrapper width={"100%"}>
            <Grid columnSpacing={6} sx={{ mt: 3 }} container>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: "12px",
                    py: 3,
                    boxShadow: "0 0 11px #eee",
                  }}
                >
                  <Box sx={{ px: 3 }}>
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
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        Complete Living Trust{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#ED7D2B",
                          }}
                        >
                          {OnBoardingData?.marriage_status
                            ? OnBoardingData?.marriage_status === 1
                              ? "(SINGLE)"
                              : "(COUPLE)"
                            : "(-)"}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        ${" "}
                        {OnBoardingData?.marriage_status === 1
                          ? OnBoardingData?.plan?.single_price
                          : OnBoardingData?.plan?.couple_price}
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
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        Shipping{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#ED7D2B",
                          }}
                        >
                          ({OnBoardingData?.shipping === 0 ? "Ship" : "Pickup"})
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        $ {OnBoardingData?.shipping || 0}.00
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
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        Quit Claim{" "}
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#ED7D2B",
                          }}
                        >
                          {OnBoardingData?.is_probate_primary_home ||
                          OnBoardingData?.investment_properties_count !== 0
                            ? `(${
                                OnBoardingData?.is_probate_primary_home
                                  ? "1"
                                  : "0"
                              } Primary, ${
                                OnBoardingData?.investment_properties_count
                              } investment)`
                            : "(none)"}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        ${" "}
                        {100 *
                          Number(OnBoardingData?.investment_properties_count)}
                        .00
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        Sub total
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        $ {total}.00
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                      background: (theme) => theme.palette.primary.main,
                      px: 3,
                      py: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    >
                      Checkout Estimate
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    >
                      $ {total}.00
                    </Typography>
                  </Box>
                  {/* <Typography
                                        sx={{
                                            fontSize: "16px",
                                            color: "grey",
                                            fontWeight: "600",
                                            px: 3,
                                        }}
                                    >
                                        Any promo or discounts can be entered at final checkout
                                    </Typography> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#000",
                      mb: 1,
                      fontWeight: "600",
                    }}
                  >
                    Other required fees, paid separately.
                  </Typography>
                  <Box
                    sx={{
                      // height: "251px",
                      background: "rgba(219, 219, 219, 0.30)",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#000",
                        mb: "4px",
                      }}
                    >
                      Notary Fees
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        Your Notary Public
                      </Typography>
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        $$$
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        Our Notary Public (Single)
                      </Typography>
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        $150
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        Our Notary Public (Couple)
                      </Typography>
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        $200
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#000",
                        mb: "4px",
                      }}
                    >
                      Title Services Fees
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        Quit Claim filed (personal property in CA)
                      </Typography>
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        $80
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        Quit Claim filed (investment property in CA)
                      </Typography>
                      <Typography sx={{ color: "#000", fontWeight: "400" }}>
                        $200
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#000",
                      mt: 1,
                      fontWeight: "600",
                    }}
                  >
                    Goverment Fees.
                  </Typography>
                  <Box
                    sx={{
                      // height: "251px",
                      background: "rgba(219, 219, 219, 0.30)",
                      borderRadius: "10px",
                      padding: "16px",
                      mt: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#535F6B",
                        fontWeight: "400",
                        // width: "370px",
                        fontStyle: "italic",
                        lineHeight: "16px",
                      }}
                    >
                      Notary fees are fixed per state law, however mobile travel
                      fees may apply.
                      <Divider
                        sx={{
                          my: "4px",
                          background: "transparent",
                          borderBottom: "none",
                        }}
                      />
                      Government quit claim filing fees vary by state and
                      county. You can personally file your quit claim, or we
                      will recommend an expert title service that can file it
                      for a nominal filing and tracking fee.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </BoxWrapper>
        </>
      )}
    </>
  );
};

export default OnBoardingInfo;
