"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useClientCache } from "@/provider/ClientCache";
import MaritalStatus from "./maritalStatus";
import Plans from "./plan";
import { CartChoiceEnum, OnboardingFormikPropInterface } from "./constant";
import QualificationQuestion from "./QualificationQuestion";
import Profile from "./Profile";
import Property from "./Property";
import Shipping from "./Shipping";
import Summary from "./Summary";
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useUserDetailListing } from "@/provider/profile";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  paddingBottom: "30px",
};

interface IOnboardingProps {
  open?: boolean;
  handleClose?: () => void;
}
const phoneNumberPattern = /^\+\d{11}$/;
const Onboarding = ({ open, handleClose }: IOnboardingProps) => {
  const [activeStep, setActiveStep] = useState(0);
  // const [stopProfile, setStopProfile] = useState(true);
  const [showEndUserModal, setShowEndUserModal] = useState(false);
  const profileDetail = useUserDetailListing({});
  const clientCache = useClientCache(
    profileDetail.data && {
      key: `ONBOARDING${profileDetail.data?.id}${profileDetail?.data?.carts?.length || 0
        }`,
    },
  );
  //@ts-ignore
  const cacheValue = clientCache?.data?.data;
  const endUsers = [
    { value: CartChoiceEnum.SELF, label: "Self" },
    { value: CartChoiceEnum.CLIENT, label: "Client" },
    { value: CartChoiceEnum.OTHERS, label: "Others" },
  ];

  const initialValues: OnboardingFormikPropInterface = {
    marriage_status: cacheValue?.marriage_status || "COUPLE",
    //@ts-ignore
    additional_info: cacheValue?.additional_info || undefined,
    died_person: cacheValue?.died_person || undefined,
    last_married_person: cacheValue?.last_married_person || undefined,
    state: cacheValue?.state || "CA",
    planId: cacheValue?.planId || "",
    plan_to_entirely_disinherit:
      cacheValue?.plan_to_entirely_disinherit || undefined,
    need_a_special_needs_trust:
      cacheValue?.need_a_special_needs_trust || undefined,
    is_your_net_worth_greater:
      cacheValue?.is_your_net_worth_greater || undefined,
    are_you_in_a_nursing_home:
      cacheValue?.are_you_in_a_nursing_home || undefined,
    do_you_have_multiple: cacheValue?.do_you_have_multiple || undefined,
    are_there_pending_lawsuits:
      cacheValue?.are_there_pending_lawsuits || undefined,
    primary_first_name: cacheValue?.primary_first_name || "",
    primary_middle_name: cacheValue?.primary_middle_name || "",
    primary_last_name: cacheValue?.primary_last_name || "",
    primary_email: cacheValue?.primary_email || "",
    primary_mobile: cacheValue?.primary_mobile || "",
    secondary_first_name: cacheValue?.secondary_first_name || "",
    secondary_middle_name: cacheValue?.secondary_middle_name || "",
    secondary_last_name: cacheValue?.secondary_last_name || "",
    secondary_email: cacheValue?.secondary_email || "",
    secondary_mobile: cacheValue?.secondary_mobile || "",
    protect_home: cacheValue?.protect_home || true,
    no_of_investment_property: cacheValue?.no_of_investment_property || 0,
    shipping: cacheValue?.shipping || 0,
    notary: cacheValue?.notary || 0,
    quit_claim: cacheValue?.quit_claim || 0,
    discount: cacheValue?.discount || undefined,
    stateCheckbox: cacheValue?.stateCheckbox || true,
    end_user: cacheValue?.end_user || "",
    relation_with_end_user: cacheValue?.relation_with_end_user || "",
  };

  const validationSchema = Yup.object({
    marriage_status: Yup.string().required("Required"),
    end_user: Yup.string().required("Required"),
    relation_with_end_user: Yup.string().when("end_user", {
      is: (end_user: string) => end_user === CartChoiceEnum.OTHERS,
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    additional_info: Yup.string().required("Required"),
    died_person: Yup.string().when("additional_info", {
      is: (additionalInfo: string) => additionalInfo === "WIDOWED",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    last_married_person: Yup.string().when("additional_info", {
      is: (additionalInfo: string) => additionalInfo === "DIVORCED",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema,
    }),
    state: Yup.string().required("State is required"),
    primary_first_name: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z]*$/, "Only alphabets are allowed"),
    primary_last_name: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z\-]*$/, "Only alphabets are allowed"),

    primary_email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test("email-domain", "Invalid email", (value) => {
        if (!value) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }),
    primary_mobile: Yup.string()
      .matches(phoneNumberPattern, "Invalid number")
      .required("Phone number is required")
      .matches(/^(\S+$)/g, "No blank spaces allowed!"),
    secondary_first_name: Yup.string().when("marriage_status", {
      is: (field: string) => field === "COUPLE",
      then: (schema) =>
        schema
          .required("Required")
          .matches(/^[a-zA-Z]*$/, "Only alphabets are allowed"),
      otherwise: (schema) => schema.notRequired(),
    }),
    secondary_last_name: Yup.string().when("marriage_status", {
      is: (field: string) => field === "COUPLE",
      then: (schema) =>
        schema
          .required("Required")
          .matches(/^[a-zA-Z\-]*$/, "Only alphabets are allowed"),
      otherwise: (schema) => schema.notRequired(),
    }),

    secondary_email: Yup.string().when("marriage_status", {
      is: (field: string) => field === "COUPLE",
      then: (schema) =>
        schema
          .email("Invalid email")
          .test("email-domain", "Invalid email", (value) => {
            if (!value) return true;
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
    secondary_mobile: Yup.string().when("marriage_status", {
      is: (field: string) => field === "COUPLE",
      then: (schema) =>
        schema
          .matches(phoneNumberPattern, "Invalid number")
          .required("Phone number is required")
          .matches(/^(\S+$)/g, "No blank spaces allowed!")
          .notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),
    plan_to_entirely_disinherit: Yup.string().required(
      "Please select an option",
    ),
    need_a_special_needs_trust: Yup.string().required(
      "Please select an option",
    ),
    is_your_net_worth_greater: Yup.string().required("Please select an option"),
    are_you_in_a_nursing_home: Yup.string().required("Please select an option"),
    do_you_have_multiple: Yup.string().required("Please select an option"),
    are_there_pending_lawsuits: Yup.string().required(
      "Please select an option",
    ),
    no_of_investment_property: Yup.number().required("Required"),
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (clientCache.isSuccess) {
      const isEndUserOther =
        cacheValue?.end_user == CartChoiceEnum.OTHERS &&
          cacheValue?.relation_with_end_user
          ? false
          : true;
      if (!cacheValue) {
        setShowEndUserModal(true);
      } else {
        setShowEndUserModal(
          cacheValue?.end_user && isEndUserOther ? false : true,
        );
      }
    }
  }, [clientCache.isSuccess]);

  const formContext = (
    step: number,
    formik: FormikProps<OnboardingFormikPropInterface>,
  ) => {
    switch (step) {
      case 0:
        return (
          <MaritalStatus formik={formik} handleNext={handleNext} step={step} />
        );
      case 1:
        return (
          <Plans
            formik={formik}
            handleBack={handleBack}
            handleNext={handleNext}
            step={step}
          />
        );
      case 2:
        return (
          <QualificationQuestion
            formik={formik}
            handleBack={handleBack}
            handleNext={handleNext}
            step={step}
          />
        );
      case 3:
        return (
          <Profile
            formik={formik}
            handleBack={handleBack}
            handleNext={handleNext}
            step={step}
          />
        );
      case 4:
        return (
          <Property
            formik={formik}
            handleBack={handleBack}
            handleNext={handleNext}
            step={step}
          />
        );
      case 5:
        return (
          <Shipping
            formik={formik}
            handleBack={handleBack}
            handleNext={handleNext}
            step={step}
          />
        );

      case 6:
        return (
          <Summary
            formik={formik}
            handleBack={handleBack}
            handleNext={handleNext}
            step={step}
          />
        );
    }
  };
  return (
    <>
      {clientCache?.isFetching || profileDetail.isFetching ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { }}
          enableReinitialize={true}
        >
          {(formik) => (
            <form style={{ height: "100%" }}>
              <Modal
                open={showEndUserModal}
                // onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box
                  sx={{
                    ...style,
                    paddingBottom: "30px",
                    borderRadius: "12px",
                    background: "#fcfdff",
                    display: "flex",
                    flexDirection: "column",
                    width: "600px",
                    height: "400px",
                    pt: 2,
                    border: "1px solid #E0E0E0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 4,
                      }}
                    >
                      <Image
                        src={Logo}
                        alt=""
                        style={{
                          width: "326px",
                          height: "50px",
                          alignSelf: "center",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        background: "#fff",
                        borderRadius: "12px",
                        p: 2,
                        boxShadow: "0 0 11px #eee",
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "400px",
                        margin: "20px auto",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl
                            sx={{ mt: 3, width: "100%" }}
                            size="small"
                          >
                            <InputLabel id="end_user"> End User</InputLabel>
                            <Select
                              id="end_user"
                              name="end_user"
                              label="Grouping"
                              placeholder="ddndn"
                              value={formik.values.end_user}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "end_user",
                                  e.target.value,
                                  true,
                                )
                              }
                              MenuProps={{
                                PaperProps: {
                                  sx: { maxHeight: 220, width: "300px" },
                                },
                              }}
                            >
                              {endUsers.map((el) => (
                                <MenuItem key={el.value} value={el.value}>
                                  {el.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        {formik.values.end_user === CartChoiceEnum.OTHERS && (
                          <Grid item xs={12} mt={1}>
                            {/* <Typography sx={{ mb: 1 }}>
                                Relation with End User :
                              </Typography> */}
                            <CustomTextField
                              sx={{ width: "100%" }}
                              {...renderFieldProps(
                                formik.errors.relation_with_end_user && {
                                  message: formik.errors.relation_with_end_user,
                                },
                              )}
                              label="Relation with End User"
                              name="relation_with_end_user"
                              onChange={formik.handleChange}
                              value={formik.values.relation_with_end_user}
                            />
                          </Grid>
                        )}
                      </Grid>
                      <Button
                        variant="contained"
                        sx={{ width: "100%", mt: 2 }}
                        onClick={() => {
                          if (
                            !formik.errors["end_user"] &&
                            !formik.errors["relation_with_end_user"]
                          ) {
                            setShowEndUserModal(false);
                          } else {
                            toast.error("Please fill all the fields");
                          }
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>

              <Box
                sx={{
                  // ...style,

                  paddingBottom: "30px",
                  borderRadius: "12px",
                  background: "#fcfdff",
                  display: "flex",
                  flexDirection: "column",
                  width: "1180px",
                  height: "763px",
                  pt: 2,
                  border: "1px solid #E0E0E0",
                }}
              >
                {formContext(activeStep, formik)}
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Onboarding;
