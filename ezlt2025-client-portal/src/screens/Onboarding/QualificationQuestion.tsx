//@ts-nocheck
import { useState } from "react";
import { FormikProps } from "formik";
import Image from "next/image";
import { Box, Button, Grid, RadioGroup, Typography } from "@mui/material";
import Logo from "@/assets/img/logo.png";
import CustomModal from "@/components/CustomModal";
import CustomRadioButton from "@/components/CustomRadioButton";
import { useCreateClientCache } from "@/provider/ClientCache";
import { OnboardingFormikPropInterface } from "./constant";
import ActionButton from "./ActionButton";
import { DEMO_USER } from "../../../config";
import { useUserDetailListing } from "@/provider/profile";
import { signOut } from "next-auth/react";
import CustomButton from "@/components/CustomButton";

const arr = [
  {
    key: "plan_to_entirely_disinherit",
    value: "Do you plan to entirely disinherit any of your children?",
  },
  {
    key: "are_you_in_a_nursing_home",
    value:
      "Are you in a nursing home, incapacitated, or developing capacity issues?",
  },
  {
    key: "need_a_special_needs_trust",
    value:
      "Do you need a Special Needs Trust for a permanently disabled child?",
  },
  {
    key: "do_you_have_multiple",
    value: "Do you have multiple and complex real estate assets or businesses?",
  },
  {
    key: "is_your_net_worth_greater",
    value: "Is your net worth greater than $3 million (per person)?",
  },

  {
    key: "are_there_pending_lawsuits",
    value:
      "Are there pending lawsuits or potential litigation issues involving your estate?",
  },
];

interface QualificationPropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
  handleBack: () => void;
}

const QualificationQuestion = ({
  handleBack,
  handleNext,
  formik,
}: QualificationPropInterface) => {
  const creatCache = useCreateClientCache({});
  const profileDetail = useUserDetailListing({ isValid: true });
  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const hasYesAnswer = () => {
    //@ts-ignore
    return arr.some((question) => formik.values[question.key] === "yes");
  };

  const handleModalOpen = () => {
    if (hasYesAnswer()) {
      setShowModal(true);
    } else {
      handleNext();
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCloseAccountModal = () => {
    setShowAccountModal(false);
  };
  const handleOpenAccountModal = () => {
    setShowAccountModal(true);
  };

  const validateStep = () => {
    event?.preventDefault();
    let errors: any = {};
    if (!formik.values.plan_to_entirely_disinherit) {
      errors.plan_to_entirely_disinherit = "Please select an option";
    }
    if (!formik.values.need_a_special_needs_trust) {
      errors.need_a_special_needs_trust = "Please select an option";
    }

    if (!formik.values.is_your_net_worth_greater) {
      errors.is_your_net_worth_greater = "Please select an option";
    }
    if (!formik.values.are_you_in_a_nursing_home) {
      errors.are_you_in_a_nursing_home = "Please select an option";
    }
    if (!formik.values.do_you_have_multiple) {
      errors.do_you_have_multiple = "Please select an option";
    }
    if (!formik.values.are_there_pending_lawsuits) {
      errors.are_there_pending_lawsuits = "Please select an option";
    }

    return errors;
  };

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
            Qualification questions
          </Typography>
        </Box>
        <Box sx={{ mx: 6, mt: 2 }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#000000",
              lineHeight: "20px",
              fontWeight: 400,
            }}
          >
            The do-it-yourself, EZ Living Trust is designed for individuals and
            couples who want easy, simple estate plans to make sure their
            property and assets avoid Probate court. Complicated Estate plans
            should consult an attorney for assistance. Any YES answer may be an
            indication that you may need to hire an attorney.
          </Typography>
          <Grid sx={{ mt: 4 }} container spacing={2}>
            {arr.map((question) => {
              const fieldName = question.key;
              return (
                <Grid key={question.key} item xs={12} md={6}>
                  <Box
                    sx={{
                      mt: 2,
                      background: "#fff",
                      borderRadius: "12px",
                      p: 2,
                      boxShadow: "0 0 11px #eee",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        mb: "10px",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#000000",
                      }}
                    >
                      {question.value}
                    </Typography>

                    <>
                      <RadioGroup
                        name={question.key}
                        onChange={formik.handleChange}
                        //@ts-ignore
                        value={formik.values[question.key]}
                        row
                        sx={{
                          "& label": {
                            marginBottom: "0",
                            height: "20px !important",
                          },
                        }}
                      >
                        <CustomRadioButton value="yes" label={"Yes"} />
                        <CustomRadioButton value="no" label={"No"} />
                      </RadioGroup>
                      {showError && (
                        <Typography
                          sx={{
                            fontSize: "12px",
                            mt: 1,
                            color: (theme) => theme.palette.error.main,
                          }}
                        >
                          {formik.errors[question.key]}
                        </Typography>
                      )}
                    </>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <ActionButton
        isNext
        isPrev
        handleNext={async () => {
          const errors = validateStep(formik.values);
          formik.setErrors(errors);
          if (Object.keys(errors).length === 0) {
            handleModalOpen();
            creatCache.mutate({
              key: `ONBOARDING${profileDetail.data?.id}${
                profileDetail?.data?.carts?.length || 0
              }`,
              data: formik.values,
              form_type: 1,
            });
          } else {
            setShowError(true);
          }
        }}
        handlePrev={handleBack}
      />
      <CustomModal width={{ xs: "100%", sm: "558px" }} open={showModal} handleClose={handleClose}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "600", color: "#000", mb: 4 }}
          >
            {`Sorry, you don't qualify for an EZ Living Trust estate plan`}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#000",
              textAlign: "center",
              mb: 3,
              lineHeight: "28px",
              px: 3,
            }}
          >
            Our do it yourself legal documents are designed primarily for basic
            estate planning and probate avoidance. By not agreeing to one or
            more items below, your document needs appear to be more complex. We
            recommend you find an Estate Planning attorney to help. You can
            checking our blog for local attorneys or visit www.avvo.com
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: 2,
            }}
          >
            <Button onClick={handleClose} variant="contained">
              Review my answers
            </Button>
            <Button
              variant="contained"
              sx={{ background: "#fda440" }}
              onClick={handleOpenAccountModal}
            >
              Close my account
            </Button>

            {/* <Button sx={{ ml: 2, backgroundColor: "#F00" }} variant="contained">
              Delete Account
            </Button> */}
          </Box>
        </Box>
      </CustomModal>
      <CustomModal
        width={350}
        open={showAccountModal}
        handleClose={handleCloseAccountModal}
      >
        <Box>
          <Typography sx={{ mb: 2 }} variant="body1">
            Are you sure want to close your account?
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            <Box sx={{ width: { sm: "100%", md: "50%" } }}>
              <CustomButton type="ADD" 
              onClick={() => signOut({
                callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
              })}
              >
                Yes
              </CustomButton>
            </Box>
            <Box sx={{ width: { sm: "100%", md: "50%" } }}>
              <CustomButton type="CANCEL" onClick={handleCloseAccountModal}>
                Unsure
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default QualificationQuestion;
