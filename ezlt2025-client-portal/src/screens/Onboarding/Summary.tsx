//@ts-nocheck
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FormikProps } from "formik";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { useCreateCart } from "@/provider/Cart";
import ActionButton from "./ActionButton";
import {
  MarriageStatusEnum,
  OnboardingFormikPropInterface,
  SubMarriageStatusEnum,
} from "./constant";
import { DEMO_USER } from "../../../config";
import { useUserDetailListing } from "@/provider/profile";
import { useRouter } from "next/navigation";
import { on } from "events";

interface SummaryPropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
  handleBack: () => void;
}

const Summary = ({ formik, handleBack }: SummaryPropInterface) => {
  const createCart = useCreateCart({});
  const router = useRouter();
  const { couple_price, single_price } = usePlanPrice()
  const total =
    (formik.values.marriage_status === "COUPLE" ? couple_price : single_price) +
    //@ts-ignore
    parseInt(formik.values.shipping, 10) +
    //@ts-ignore
    parseInt(100 * formik.values.no_of_investment_property, 10);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      is_qualified: true,
      end_user: formik.values.end_user,
      relation_with_end_user: formik.values.relation_with_end_user,
      is_probate_primary_home: formik.values.protect_home,
      investment_properties_count: formik.values.no_of_investment_property,
      marriage_status: MarriageStatusEnum[formik.values.marriage_status],
      sub_marriage_status: SubMarriageStatusEnum[formik.values.additional_info],
      died_person: formik.values.died_person,
      last_married_person: formik.values.last_married_person,
      state: formik.values.state,
      notary: parseInt(formik.values.notary, 10),
      primary_trustee: {
        first_name: formik.values.primary_first_name,
        middle_name: formik.values.primary_middle_name,
        last_name: formik.values.primary_last_name,
        email: formik.values.primary_email,
        phone_no: formik.values.primary_mobile,
      },
      // Conditionally include secondary_trustee based on marital status
      ...(formik.values.marriage_status !== "SINGLE" && {
        secondary_trustee: {
          first_name: formik.values.secondary_first_name,
          middle_name: formik.values.secondary_middle_name,
          last_name: formik.values.secondary_last_name,
          email: formik.values.secondary_email,
          phone_no: formik.values.secondary_mobile,
        },
      }),
      planId: formik.values.planId,
      shipping: Math.abs(parseInt(formik.values.shipping, 10)),
      claim: parseInt(formik.values.quit_claim, 10),
    };
    const cart = await createCart.mutateAsync(formData);
    if (cart) {
      toast.success(
        "Welcome! your on boarding process completed successfully",
        { position: "top-right" },
      );
      router.push(`/dashboards/living-trust-interview/${cart.id}`, {
        scroll: false,
      });
    }
  };
  // useEffect(() => {
  //   if (createCart?.isSuccess) {
  //     toast.success(
  //       "Welcome! your on boarding process completed successfully",
  //       { position: "top-right" },
  //     );
  //     router.push(
  //       `/dashboards/living-trust-interview/${createCart?.data?.id}`,
  //       { scroll: false },
  //     );
  //   }
  // }, [createCart?.isSuccess]);

  useEffect(() => {
    if (createCart?.error) {
      toast.error("Error completing process", { position: "top-right" });
    }
  }, [createCart?.isError]);

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters from the phone number
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Check if the cleaned phone number is in the format +1234567890
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      // If it matches, format it as (123) 456-7890
      return `(${match[2]}) ${match[3]}-${match[4]}`;
    }
    // Otherwise, return the original phone number
    return phoneNumber;
  };

  // Format the primary mobile number
  const formattedPhoneNumber = formatPhoneNumber(formik.values.primary_mobile);

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
            Package Summary
          </Typography>
        </Box>
        <Box sx={{ mx: 6, mt: 2 }}>
          <Box
            sx={{
              background: "#fff",
              height: "92px",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 5,
            }}
          >
            <Box>
              <Typography
                sx={{ color: "#A3A5A7", fontSize: "14px", fontWeight: 600 }}
              >
                Name
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "#000", fontWeight: 400 }}
              >
                {formik.values.primary_first_name}{" "}
                {formik.values.primary_last_name}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ color: "#A3A5A7", fontSize: "14px", fontWeight: 600 }}
              >
                Email
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "#000", fontWeight: 400 }}
              >
                {formik.values.primary_email}
              </Typography>
            </Box>{" "}
            <Box>
              <Typography
                sx={{ color: "#A3A5A7", fontSize: "14px", fontWeight: 600 }}
              >
                Contact Number
              </Typography>
              <Typography
                sx={{ fontSize: "20px", color: "#000", fontWeight: 400 }}
              >
                {formattedPhoneNumber}
              </Typography>
            </Box>
          </Box>
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
                        ({formik.values.marriage_status})
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      {formik.values.marriage_status === "COUPLE"
                        ? `$ ${couple_price}.00`
                        : `$ ${single_price}.00`}
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
                        ({formik.values.shipping === 0 ? "Ship" : "Pickup"})
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      $ {formik.values.shipping}.00
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
                        {formik.values.protect_home ||
                          formik.values.no_of_investment_property !== 0
                          ? `(${formik.values.protect_home ? "1" : "0"
                          } Primary, ${formik.values.no_of_investment_property
                          }
                        investment)`
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
                      $ {100 * formik.values.no_of_investment_property}.00{" "}
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
                    sx={{ fontSize: "18px", color: "#fff", fontWeight: "600" }}
                  >
                    Checkout Estimate
                  </Typography>
                  <Typography
                    sx={{ fontSize: "18px", color: "#fff", fontWeight: "600" }}
                  >
                    $ {total}.00
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "grey",
                    fontWeight: "600",
                    px: 3,
                  }}
                >
                  Any promo or discounts can be entered at final checkout
                </Typography>
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
                    Government quit claim filing fees vary by state and county.
                    You can personally file your quit claim, or we will
                    recommend an expert title service that can file it for a
                    nominal filing and tracking fee.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ActionButton
        isNext
        isPrev
        handleNext={handleSubmit}
        handlePrev={handleBack}
        nextLabel="Get Started"
        loading={createCart?.isLoading}
      />
    </Box>
  );
};

export default Summary;
