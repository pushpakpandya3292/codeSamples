"use client";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { OnboardingFormikPropInterface, states } from "./constant";
import ActionButton from "./ActionButton";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import CustomRadioButton from "@/components/CustomRadioButton";
import { useCreateClientCache } from "@/provider/ClientCache";
import { useUserDetailListing } from "@/provider/profile";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import CustomCheckBox from "@/components/CustomCheckBox";
import { legal_cities } from "@/constants/LegalCities";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 53,
  height: 34,
  padding: 6,
  "& .MuiSwitch-switchBase": {
    marginTop: 1,
    padding: 0,
    transform: "translateX(4px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(29px)",

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 22,
    height: 22,
    marginTop: 4,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

interface MaritalStatusPropInterface {
  formik: FormikProps<OnboardingFormikPropInterface>;
  handleNext: () => void;
  step: number;
}
const MaritalStatus = ({
  formik,
  handleNext,
  step,
}: MaritalStatusPropInterface) => {
  const [showError, setShowError] = useState(false);
  const profileDetail = useUserDetailListing({ isValid: true });
  const creatCache = useCreateClientCache({});
  const [maritalStatus, setMaritalStatus] = useState(
    formik.values.marriage_status,
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaritalStatus = event.target.checked ? "SINGLE" : "COUPLE";
    // Update the Formik values based on the new marital status
    formik.setValues({
      ...formik.values,
      marriage_status: newMaritalStatus,
      additional_info: undefined,
    });

    setMaritalStatus(newMaritalStatus);
  };
  useEffect(() => {
    if (formik.values.additional_info === "WIDOWED") {
      formik.setValues({
        ...formik.values,
        last_married_person: undefined,
      });
    } else if (formik.values.additional_info === "DIVORCED") {
      formik.setValues({
        ...formik.values,
        died_person: undefined,
      });
    } else {
      formik.setValues({
        ...formik.values,
        last_married_person: undefined,
        died_person: undefined,
      });
    }
  }, [formik.values.additional_info]);

  const validateStep = (val: any) => {
    event?.preventDefault();
    let errors: any = {};
    if (!formik.values.marriage_status) {
      errors.marriage_status = "Required";
    }
    if (!formik.values.additional_info) {
      errors.additional_info = "Required";
    }
    if (
      !formik.values.died_person &&
      formik.values.additional_info === "WIDOWED"
    ) {
      errors.died_person = "Required";
    }
    if (
      !formik.values.last_married_person &&
      formik.values.additional_info === "DIVORCED"
    ) {
      errors.last_married_person = "Required";
    }
    if (!formik.values.state) {
      errors.state = "State is required";
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
      <Box>
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
            style={{ width: "326px", height: "50px", alignSelf: "center" }}
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
            maxWidth: "550px",
            margin: "20px auto",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            What is your Marital Status
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <Typography
              sx={{ fontSize: "14px", color: "#535F6B", fontWeight: "400" }}
            >
              Couple
            </Typography>
            <MaterialUISwitch
              sx={{ m: 1 }}
              value={maritalStatus}
              onChange={handleChange}
              checked={maritalStatus === "SINGLE" ? true : false}
            />

            <Typography
              sx={{ fontSize: "14px", color: "#535F6B", fontWeight: "400" }}
            >
              Single
            </Typography>
          </Box>
          {maritalStatus === "COUPLE" ? (
            <RadioGroup
              name="additional_info"
              onChange={formik.handleChange}
              value={formik.values.additional_info}
              sx={{ mt: 2 }}
            >
              <Box>
                <CustomRadioButton
                  value="LEGALLY_MARRIED"
                  label="Legally Married"
                />
                <CustomRadioButton value="COMMON_LAW" label="Common Law" />
              </Box>
            </RadioGroup>
          ) : (
            <>
              <RadioGroup
                name="additional_info"
                onChange={formik.handleChange}
                value={formik.values.additional_info}
                sx={{ mt: 2 }}
              >
                <Box>
                  <CustomRadioButton
                    value="NEVER_MARRIED"
                    label="Never Married "
                  />
                  <CustomRadioButton value="WIDOWED" label="Widowed" />
                  <CustomRadioButton
                    value="DIVORCED"
                    label="Unmarried (previously married)"
                  />
                </Box>
              </RadioGroup>
              {formik.values.marriage_status === "SINGLE" &&
                formik.values.additional_info === "WIDOWED" && (
                  <CustomTextField
                    sx={{ width: "300px", marginTop: "15px" }}
                    {...renderFieldProps(
                      showError &&
                        formik.errors.died_person && {
                          message: formik.errors.died_person,
                        },
                    )}
                    label="Deceased Spouse’s Full Name"
                    name="died_person"
                    onChange={formik.handleChange}
                    value={formik.values.died_person}
                  />
                )}
              {formik.values.marriage_status === "SINGLE" &&
                formik.values.additional_info === "DIVORCED" && (
                  <CustomTextField
                    sx={{ width: "300px", marginTop: "15px" }}
                    {...renderFieldProps(
                      showError &&
                        formik.errors.last_married_person && {
                          message: formik.errors.last_married_person,
                        },
                    )}
                    label="Ex-Spouse’s Full Name"
                    name="last_married_person"
                    onChange={formik.handleChange}
                    value={formik.values.last_married_person}
                  />
                )}
            </>
          )}
          {showError && formik.errors.additional_info && (
            <Typography sx={{ fontSize: "12px", color: "red" }}>
              {formik.errors.additional_info}
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            my: 2,
            textAlign: "center",
          }}
        >
          Select your Resident State
        </Typography>
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
            maxWidth: "550px",
            margin: "0 auto",
          }}
        >
          <Box mb={2} width={"400px"}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                color={(theme) => theme?.palette?.primary?.main}
                variant="body2"
              >
                Automatic Instant Legal Document View{" "}
              </Typography>
              <Typography
                mt={1}
                color={(theme) => theme?.palette?.primary?.main}
                variant="body1"
              >
                After you complete your questionnaire, you can instantly view a
                PDF of your legal documents, to approve and checkout.{" "}
              </Typography>
            </Box>
            <Box textAlign={"center"} mt={1}>
              {legal_cities.map((e, index) => (
                <Box key={index}>
                  <CustomCheckBox
                    setChecked={(value) => {
                      formik.setFieldValue("stateCheckbox", value);
                      if (value) {
                        formik.setFieldValue("state", e.value, true);
                      } else {
                        formik.setFieldValue("state", "", true);
                      }
                    }}
                    checked={formik.values.stateCheckbox}
                    value={formik.values.stateCheckbox}
                    type="CIRCLE"
                  >
                    <Typography
                      variant="body2"
                      color={(theme) => theme?.palette?.primary?.main}
                    >
                      {e.label}
                    </Typography>
                  </CustomCheckBox>
                </Box>
              ))}
              <Typography
                color={(theme) => theme?.palette?.primary?.main}
                variant="body1"
                sx={{ fontStyle: "italic" }}
              >
                See below for all other states.{" "}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.additionalColors?.mainBorder}`,
              width: "400px",
              padding: "15px",
            })}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                color={(theme) => theme?.palette?.primary?.main}
                variant="body2"
              >
                Manual Document Preparation{" "}
              </Typography>
              <Typography
                mt={1}
                color={(theme) => theme?.palette?.primary?.main}
                variant="body1"
              >
                The following states require 2-3 business day to prepare your
                business days to prepare after checkout.{" "}
              </Typography>
            </Box>

            <FormControl sx={{ mt: 3, width: "100%" }} size="small">
              <InputLabel id="state">State</InputLabel>
              <Select
                id="state"
                name="state"
                label="Grouping"
                placeholder="ddndn"
                disabled={formik.values.stateCheckbox}
                value={
                  legal_cities.filter((e) => e.value === formik.values.state)
                    .length > 0
                    ? ""
                    : formik.values.state
                }
                onChange={(e) =>
                  formik.setFieldValue("state", e.target.value, true)
                }
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 220, width: "200px" } },
                }}
              >
                {states.map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {showError && formik.errors.state && (
            <FormHelperText sx={{ color: "red" }}>
              {formik.errors.state}
            </FormHelperText>
          )}
        </Box>
      </Box>

      <ActionButton
        isNext
        handleNext={() => {
          const errors = validateStep(formik.values);
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
      />
    </Box>
  );
};

export default MaritalStatus;
