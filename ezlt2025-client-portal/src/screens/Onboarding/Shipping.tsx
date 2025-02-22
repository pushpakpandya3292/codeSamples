import Image from "next/image";
import { FormikProps } from "formik";
import { Box, Grid, RadioGroup, Typography } from "@mui/material";
import Logo from "@/assets/img/logo.png";
import CustomRadioButton from "@/components/CustomRadioButton";
import { useCreateClientCache } from "@/provider/ClientCache";
import { OnboardingFormikPropInterface } from "./constant";
import ActionButton from "./ActionButton";
import { DEMO_USER } from "../../../config";
import { useUserDetailListing } from "@/provider/profile";

interface ShippingPropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
  handleBack: () => void;
}

const Shipping = ({
  handleBack,
  handleNext,
  formik,
}: ShippingPropInterface) => {
  const creatCache = useCreateClientCache({});
  const profileDetail = useUserDetailListing({ isValid: true });
  const quit_Clam_value = 100 * formik.values.no_of_investment_property;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
        <Image
          src={Logo}
          alt=""
          style={{ width: "326px", height: "50px", alignSelf: "center" }}
        />
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "58px",
            mt: "20px",
          }}
        >
          <Typography
            sx={{ fontSize: "32px", fontWeight: "600", color: "#FFF" }}
          >
            Shipping & Notary
          </Typography>
        </Box>
        <Box sx={{ mx: 6, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                style={{ width: "380px", height: "auto" }}
                src="/images/binding.svg"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: "18px", fontWeight: "700", mb: 1 }}>
                Let’s prepare your package
              </Typography>
              <Typography sx={{ color: "#535F6B", fontWeight: 400 }}>
                Estate Planning Documents
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  background: "#fff",
                  borderRadius: "12px",
                  p: 2,
                  boxShadow: "0 0 11px #eee",
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 1 }}>
                  Shipping{" "}
                  <span style={{ color: "#ED7D2B", fontSize: "14px" }}>
                    (pick one)*
                  </span>
                </Typography>
                <RadioGroup
                  name="shipping"
                  value={formik.values.shipping}
                  onChange={formik.handleChange}
                >
                  <CustomRadioButton
                    label={
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            width: "320px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          Please ship to my mailing address
                        </Typography>
                        <Typography
                          sx={{
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          $0.00
                        </Typography>
                      </Box>
                    }
                    value={0}
                  />
                  <CustomRadioButton
                    label={
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            width: "320px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          I will pick-up in South Pasadena, CA
                        </Typography>
                        <Typography
                          sx={{
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          $-15.00
                        </Typography>
                      </Box>
                    }
                    value={-15}
                  />
                </RadioGroup>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  background: "#fff",
                  borderRadius: "12px",
                  p: 2,
                  boxShadow: "0 0 11px #eee",
                }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 1 }}>
                  Notary{" "}
                  <span style={{ color: "#ED7D2B", fontSize: "14px" }}>
                    (pick one)*
                  </span>
                </Typography>
                <RadioGroup
                  name="notary"
                  value={formik.values.notary}
                  onChange={formik.handleChange}
                >
                  <CustomRadioButton
                    label={
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            width: "320px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          I will find a notary near me
                        </Typography>
                        <Typography
                          sx={{
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          $0.00
                        </Typography>
                      </Box>
                    }
                    value={0}
                  />
                  <CustomRadioButton
                    label={
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            width: "320px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          Notarize in your South Pasadena office (Single)
                        </Typography>
                        <Typography
                          sx={{
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          $150.00
                        </Typography>
                      </Box>
                    }
                    value={150}
                  />
                  <CustomRadioButton
                    label={
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            width: "320px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          Notarize in your South Pasadena office (Couple)
                        </Typography>
                        <Typography
                          sx={{
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          $200.00
                        </Typography>
                      </Box>
                    }
                    value={200}
                  />
                </RadioGroup>
              </Box>
              {/* <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 1 }}>
                  Quit Claim{" "}
                  <span style={{ color: "#ED7D2B", fontSize: "14px" }}>
                    (pick one)*
                  </span>
                </Typography>
                <RadioGroup
                  name="quit_claim"
                  value={formik.values.quit_claim}
                  onChange={formik.handleChange}
                >
                  <CustomRadioButton
                    label={
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            width: "320px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          I have {formik.values.no_of_investment_property}{" "}
                          additional investment property
                        </Typography>
                        <Typography
                          sx={{
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          ${100 * formik.values.no_of_investment_property}.00
                        </Typography>
                      </Box>
                    }
                    value={100 * formik.values.no_of_investment_property}
                  />
                </RadioGroup>
              </Box> */}
              {/* <Typography
                sx={{
                  fontSize: "12px",
                  color: "#535F6B",
                  fontWeight: "400",
                  mt: 4,
                  width: "370px",
                  fontStyle: "italic",
                  lineHeight: "16px",
                }}
              >
                Government quit claim filing fees vary by state and county. You
                can personally file your quit claim, or we will recommend an
                expert title service that can file it for a nominal filing and
                tracking fee.
              </Typography> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ActionButton
        isNext
        isPrev
        handleNext={() => {
          creatCache.mutate({
            key: `ONBOARDING${profileDetail.data?.id}${
              profileDetail?.data?.carts?.length || 0
            }`,
            data: formik.values,
            form_type: 1,
          });
          handleNext();
        }}
        handlePrev={handleBack}
      />
    </Box>
  );
};

export default Shipping;
