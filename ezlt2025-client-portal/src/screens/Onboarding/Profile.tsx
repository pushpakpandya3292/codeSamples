import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import CustomSwitch from "@/components/OnboardingCard/Switch";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { useCreateClientCache } from "@/provider/ClientCache";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import { OnboardingFormikPropInterface } from "./constant";
import ActionButton from "./ActionButton";
import { DEMO_USER } from "../../../config";
import { useUserDetailListing } from "@/provider/profile";

interface ProfilePropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
  handleBack: () => void;
}

const Profile = ({ handleBack, handleNext, formik }: ProfilePropInterface) => {
  const creatCache = useCreateClientCache({});
  const profileDetail = useUserDetailListing({ isValid: true });
  const [showError, setShowError] = useState(false);

  const validateStep = async (val: any) => {
    event?.preventDefault();
    const err = await formik.validateForm();
    let errors: any = {};

    if (!formik.values.primary_first_name) {
      errors.primary_first_name = "Required";
    }
    if (!formik.values.primary_last_name) {
      errors.primary_last_name = "Required";
    }

    if (!formik.values.primary_email) {
      errors.primary_email = "Email is Required";
    }

    if (!formik.values.primary_mobile) {
      errors.primary_mobile = "Required";
    }

    if (formik.values.marriage_status === "COUPLE") {
      if (!formik.values.secondary_first_name) {
        errors.secondary_first_name = "Required";
      }
      if (!formik.values.secondary_last_name) {
        errors.secondary_last_name = "Required";
      }
    }
    if (formik.errors) {
      errors = { ...errors, ...formik.errors };
    }
    return { ...errors, ...err };
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        rowGap: "20px",
        overflowY: "scroll",
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
            Profile
          </Typography>
        </Box>
        <Box sx={{ mx: 6, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#A3A5A7",
                mb: 2,
              }}
            >
              What is your Marital Status
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  mr: 1,
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#A3A5A7",
                }}
              >
                Couple
              </Typography>
              <CustomSwitch
                checked={
                  formik.values.marriage_status === "SINGLE" ? true : false
                }
                setChecked={() => {}}
              />
              <Typography
                sx={{
                  ml: 1,
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#A3A5A7",
                }}
              >
                Single
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{ mt: 2, color: "#000", lineHeight: "20px", fontWeight: "400" }}
          >
            The do-it-yourself, EZ Living Trust is designed for individuals and
            couples who want an easy, simple estate plans to make sure their
            property and assets avoid Probate court. Complicated Estate plans
            should consult an attorney for assistance. Any YES answer may be an
            indication that you may need to hire an attorney.
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
            <Typography
              sx={{ fontSize: "14px", fontWeight: 700, color: "#000", mb: 2 }}
            >
              Primary Person (First Trustee)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  sx={{ width: "300px" }}
                  {...renderFieldProps(
                    showError &&
                      formik.errors.primary_first_name && {
                        message: formik.errors.primary_first_name,
                      },
                  )}
                  label="Legal First Name"
                  name="primary_first_name"
                  onChange={formik.handleChange}
                  value={formik.values.primary_first_name}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  sx={{ width: "300px" }}
                  {...renderFieldProps(
                    showError &&
                      formik.errors.primary_middle_name && {
                        message: formik.errors.primary_middle_name,
                      },
                  )}
                  label="Middle Name or Initial"
                  name="primary_middle_name"
                  onChange={formik.handleChange}
                  value={formik.values.primary_middle_name}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  sx={{ width: "300px" }}
                  {...renderFieldProps(
                    showError &&
                      formik.errors.primary_last_name && {
                        message: formik.errors.primary_last_name,
                      },
                  )}
                  label="Legal Last Name"
                  name="primary_last_name"
                  onChange={formik.handleChange}
                  value={formik.values.primary_last_name}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  sx={{ width: "300px" }}
                  {...renderFieldProps(
                    showError &&
                      formik.errors.primary_email && {
                        message: formik.errors.primary_email,
                      },
                  )}
                  label="Email Address"
                  name="primary_email"
                  onChange={formik.handleChange}
                  value={formik.values.primary_email}
                  type="email"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ width: "300px" }}>
                  <PhoneNumberField
                    label={"Mobile Number"}
                    value={formik.values.primary_mobile}
                    onChange={(val) =>
                      formik.setFieldValue("primary_mobile", val)
                    }
                    {...renderFieldProps(
                      showError &&
                        formik.errors.primary_mobile && {
                          message: formik.errors.primary_mobile,
                        },
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {formik.values.marriage_status === "COUPLE" && (
            <Box
              sx={{
                mt: 1,
                background: "#fff",
                borderRadius: "12px",
                p: 2,
                boxShadow: "0 0 11px #eee",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: 700, color: "#000", mb: 2 }}
              >
                Secondary person (Second Trustee)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <CustomTextField
                    sx={{ width: "300px" }}
                    {...renderFieldProps()}
                    label="Legal First Name"
                    {...renderFieldProps(
                      showError &&
                        formik.errors.secondary_first_name && {
                          message: formik.errors.secondary_first_name,
                        },
                    )}
                    name="secondary_first_name"
                    onChange={formik.handleChange}
                    value={formik.values.secondary_first_name}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextField
                    sx={{ width: "300px" }}
                    {...renderFieldProps()}
                    label="Middle Name or Initial"
                    {...renderFieldProps(
                      showError &&
                        formik.errors.secondary_middle_name && {
                          message: formik.errors.secondary_middle_name,
                        },
                    )}
                    onChange={formik.handleChange}
                    value={formik.values.secondary_middle_name}
                    name="secondary_middle_name"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextField
                    sx={{ width: "300px" }}
                    {...renderFieldProps()}
                    label="Legal Last Name*"
                    {...renderFieldProps(
                      showError &&
                        formik.errors.secondary_last_name && {
                          message: formik.errors.secondary_last_name,
                        },
                    )}
                    onChange={formik.handleChange}
                    value={formik.values.secondary_last_name}
                    name="secondary_last_name"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextField
                    sx={{ width: "300px" }}
                    {...renderFieldProps()}
                    label="Email Address (Optional)"
                    {...renderFieldProps(
                      showError &&
                        formik.errors.secondary_email && {
                          message: formik.errors.secondary_email,
                        },
                    )}
                    onChange={formik.handleChange}
                    value={formik.values.secondary_email}
                    name="secondary_email"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ width: "300px" }}>
                    <PhoneNumberField
                      label={"Mobile Number (Optional)"}
                      value={formik.values.secondary_mobile}
                      onChange={(val) =>
                        formik.setFieldValue("secondary_mobile", val)
                      }
                      {...renderFieldProps(
                        showError &&
                          formik.errors.secondary_mobile && {
                            message: formik.errors.secondary_mobile,
                          },
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
      <ActionButton
        isNext
        isPrev
        handleNext={async () => {
          const errors = await validateStep(formik.values);
          formik.setErrors(errors);
          if (Object.keys(errors).length === 0) {
            creatCache.mutate({
              key: `ONBOARDING${profileDetail.data?.id}${
                profileDetail?.data?.carts?.length || 0
              }`,
              data: formik.values,
              form_type: 1,
            });
            handleNext();
          } else {
            setShowError(true);
          }
        }}
        handlePrev={handleBack}
      />
    </Box>
  );
};

export default Profile;
