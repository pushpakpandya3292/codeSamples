import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomCheckBox from "@/components/CustomCheckBox";
import CustomModal from "@/components/CustomModal";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import {
  AutopsyEnum,
  EndLifeAuthorizationEnum,
  OrganDonationEnum,
} from "../../../constants";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import RecommendedChip from "@/components/RecommendedChip";

const EOL = [
  {
    title: "Vegetative State",
    description:
      "If I ever fall into a persistently vegetative state, I wish to have my misery reduced as painlessly as possible.",
    value: "Vegetative State",
    checked: false,
    key: "is_vegetative_state",
  },
  {
    title: "Senility",
    description:
      "If I become senile, I wish to die naturally and without any extraordinary medical treatment.",
    value: "Senility",
    checked: false,
    key: "is_senility",
  },
  {
    title: "No CPR",
    description:
      "If I am in an irreversible coma or a persistent vegetative state, I do not want any form of Cardio-Pulmonary Resuscitation (`CPR`).",
    value: "No CPR",
    checked: false,
    key: "is_no_cpr",
  },
  {
    title: "No additional treatment",
    description:
      "If I am already in an irreversible coma or persistent vegetative state and I develop some other illness or condition for which an additional course of treatment would be considered, I do not want any additional treatment to be initiated (for example, if I am in an irreversible coma and it is subsequently discovered that I have cancer, I do not want surgery, chemotherapy, and/or radiation)",
    value: "No additional treatment",
    checked: false,
    key: "is_no_additional_treatment",
  },
];

const healtcareOptions = [
  {
    label: "RIGHT TO DIE",
    primarylabel:
      "(Gives medical professionals and health agents authority to end my life)",
    value: EndLifeAuthorizationEnum[1],
  },
  {
    label: "PROLONG LIFE",
    primarylabel:
      "(Requests medical professionals and health agents to prolong my life as long as possible)",
    value: EndLifeAuthorizationEnum[2],
  },
];

const autopsyOptions = [
  {
    label: "Yes",
    value: AutopsyEnum.YES,
  },
  {
    label: "No, I don't want an autopsy done unless required by law",
    value: AutopsyEnum.NO,
  },
];

const DonateOrgansOptions = [
  {
    label: "Yes, I am ok with organ donation if it can help",
    value: OrganDonationEnum.YES,
  },
  {
    label: "No",
    value: OrganDonationEnum.NO,
  },
];

const HealthDesisions = () => {
  const { control, watch, setValue } = useFormContext();
  const [openprimarytransaction, setOpenPrimaryTransaction] = useState(false);
  const [EndOfLifeForPrimary, setEndOfLifeForPrimary] = useState(false);
  const [checkboxPrimary, setCheckboxPrimary] = useState(
    EOL.map((element, i) => {
      return {
        key: i,
        key_name: element.key,
        title: element.title,
        checked:
          watch("select_all_for_primary_health_decision")?.filter(
            (fields: any) => {
              return fields.key_name === element.key;
            },
          )?.length === 0
            ? false
            : true,
        setChecked: (e: any, index: number) => {
          const value = [...checkboxPrimary];
          value[index].checked = e;
          setCheckboxPrimary(value);
        },
      };
    }),
  );

  const handleOpenprimarytransaction = () => {
    setOpenPrimaryTransaction(true);
  };

  const handleClosepenprimarytransaction = () => {
    setOpenPrimaryTransaction(false);
  };

  useEffect(() => {
    const selected_checbox_primary_health_decision = checkboxPrimary.filter(
      (e) => e.checked,
    );
    setValue(
      "select_all_for_primary_health_decision",
      selected_checbox_primary_health_decision,
    );
    if (EOL.length === selected_checbox_primary_health_decision.length) {
      setEndOfLifeForPrimary(true);
    }
  }, [checkboxPrimary]);

  useEffect(() => {
    if (
      EOL.length !==
      watch("select_all_for_primary_health_decision")?.filter(
        (e: any) => e.checked,
      )?.length
    ) {
      setEndOfLifeForPrimary(false);
    }
  }, []);

  const changeAllCheckBoxes = (value: any) => {
    const checkBoxValues = [...checkboxPrimary];
    setEndOfLifeForPrimary(value);
    checkBoxValues.forEach((element, index) => {
      checkBoxValues[index].checked = value;
    });
    setCheckboxPrimary(checkBoxValues);
    setValue("select_all_for_primary_health_decision", checkBoxValues);
  };

  return (
    <Box>
      <Typography sx={{ pb: 2 }} variant="h2">
        Health Care Options
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <BoxWrapper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ pb: 1, mb: 2, display: "flex" }} variant="h3">
                Health agents power for&nbsp;
                <Typography
                  variant="h3"
                  sx={{
                    color: (theme) => theme.additionalColors?.tablightBlue,
                  }}
                >
                  {watch("primary_trustee_first_name")}{" "}
                  {watch("primary_trustee_last_name")}
                </Typography>
              </Typography>

              <Typography variant="h4" sx={{ mb: 2 }}>
                If you become in a persistent vegetative state, what
                instructions would you give your agents?
              </Typography>
              <Box>
                <Controller
                  name={"health_care_primary"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Health Care Options"}
                      select
                      sx={{ mt: 1 }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: { width: { xs: "min-content", md: "300px" } },
                          },
                        },
                      }}
                    >
                      {healtcareOptions?.map((option, index) => {
                        return (
                          <MenuItem key={index} value={option.value}>
                            <Typography
                              sx={{
                                color: "black",
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                fontWeight: "400",
                              }}
                            >
                              <strong>{option?.label}</strong>{" "}
                              {option.primarylabel}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </CustomTextField>
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Are you ok with donating your organs after death?
              </Typography>
              <Box>
                <Controller
                  name={"organ_donation_primary"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Organ Donation Options"}
                      select
                      sx={{ mt: 1 }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: { width: { xs: "min-content", md: "300px" } },
                          },
                        },
                      }}
                    >
                      {DonateOrgansOptions?.map((option, index) => {
                        return (
                          <MenuItem key={index} value={option.value}>
                            <Typography
                              sx={{
                                color: "black",
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                fontWeight: "400",
                              }}
                            >

                              {option?.label}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </CustomTextField>
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Are you ok with an autopsy being performed, if requested by law?
              </Typography>
              <Box>
                <Controller
                  name={"perform_autopsy_primary"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Autopsy Options"}
                      select
                      sx={{ mt: 1 }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: { width: { xs: "min-content", md: "300px" } },
                          },
                        },
                      }}
                    >
                      {autopsyOptions?.map((option, index) => {
                        return (
                          <MenuItem key={index} value={option.value}>
                            <Typography
                              sx={{
                                color: "black",
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                fontWeight: "400",
                              }}
                            >

                              {option?.label}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </CustomTextField>
                  )}
                />
              </Box>
            </Box>
          </BoxWrapper>
          <BoxWrapper sx={{ p: 2 }}>
            <Box>
              <Typography sx={{ pb: 1, mb: 2, display: "flex" }} variant="h3">
                Specific Situations for End of Life for&nbsp;
                <Typography
                  variant="h3"
                  sx={{
                    color: (theme) => theme.additionalColors?.tablightBlue,
                  }}
                >
                  {watch("primary_trustee_first_name")}{" "}
                  {watch("primary_trustee_last_name")}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#535F6B",
                  fontWeight: "400",
                  pb: 2,
                  lineHeight: "18px",
                }}
              >
                Select the categories in which your agent will take action.
              </Typography>
              {checkboxPrimary
                .filter((e) => e.checked)
                .map((element, index) => (
                  <Box key={index}>
                    <CustomCheckBox
                      key={index}
                      disabled={true}
                      checked={element.checked}
                      setChecked={() => { }}
                      type={"SQUARE"}
                    >
                      <Typography>{element.title}</Typography>
                    </CustomCheckBox>
                  </Box>
                ))}
              <Typography
                onClick={handleOpenprimarytransaction}
                sx={{
                  borderBottom: "1px solid #FDA440",
                  width: "max-content",
                  fontSize: "13px",
                  color: "#FDA440",
                  cursor: "pointer",
                }}
              >
                View Details or Edit Categories,
              </Typography>
            </Box>
          </BoxWrapper>
        </Grid>
      </Grid>

      <CustomModal
        open={openprimarytransaction}
        handleClose={handleClosepenprimarytransaction}
        width={{ xs: "100%", sm: "768px" }} height="auto"
      >
        <Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            View or edit categories
          </Typography>
          <CustomCheckBox
            checked={EndOfLifeForPrimary}
            setChecked={changeAllCheckBoxes}
            type={"SQUARE"}
          >
            <Typography>
              Select All transactions <RecommendedChip />
            </Typography>
          </CustomCheckBox>
          <Typography
            sx={{
              py: 1,
              my: "4px",
              fontSize: "13px",
              fontWeight: "400",
              color: "#535F6B",
            }}
          >
            Or deselect any categories below.
          </Typography>

          <Grid container spacing={2}>
            {EOL?.map((el, i) => (
              <Grid xs={12} key={i} item>
                <Controller
                  name={"select_all_for_primary_health_decision"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomCheckBox
                      disabled={EndOfLifeForPrimary}
                      checked={checkboxPrimary[i].checked}
                      setChecked={(e) => {
                        checkboxPrimary[i].setChecked(e, i);
                      }}
                      value={el?.value}
                      type={"SQUARE"}
                    >
                      <Typography>
                        {el?.title} <br />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#535F6B",
                            fontWeight: "400",
                          }}
                        >
                          {el?.description}
                        </span>
                      </Typography>
                    </CustomCheckBox>
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            sx={{ mt: 3, width: "150px", height: "45px" }}
            variant="contained"
            onClick={handleClosepenprimarytransaction}
          >
            Save
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default HealthDesisions;
