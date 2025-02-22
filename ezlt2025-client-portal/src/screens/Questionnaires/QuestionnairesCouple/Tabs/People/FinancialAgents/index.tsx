import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import AddTrustee from "./AddTrustee";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { Controller, useFormContext } from "react-hook-form";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import {
  TrusteeBothRealtionWithPersonEnum,
  TrusteeChildBothRealtionEnum,
} from "../../../constants";
import InfoBox from "@/components/InfoBox";

const FinancialAgents: React.FC = () => {
  const { getValues, watch, control } = useFormContext();
  const {
    primary_financial_agent_full_name,
    secondary_primary_financial_agent_relation_primary,
    backup_financial_agent_full_name,
    secondary_primary_financial_agent_relation_backup,
    primary_financial_agent_full_name_secondary_trustee,
    secondary_primary_financial_agent_relation_primary_secondary_trustee,
    backup_financial_agent_full_name_secondary_trustee,
    secondary_primary_financial_agent_relation_backup_secondary_trustee,
  } = getValues();
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openSecondary, setOpenSecondary] = useState(false);
  const [forSecondaryTrustee, setForSecondaryTrustee] = useState(false);
  const handlePrimaryOpen = () => {
    setOpenPrimary(true);
  };
  const handleSecondaryOpen = () => {
    setOpenSecondary(true);
  };
  const handlePrimaryClose = () => {
    setForSecondaryTrustee(false);
    setOpenPrimary(false);
  };
  const handleSecondaryClose = () => {
    setForSecondaryTrustee(false);
    setOpenSecondary(false);
  };
  return (
    <Box>
      <Typography variant="h2">
        Financial Power of Attorney (POA) Agents
      </Typography>
      <Typography sx={{ mt: 1 }} variant="h5">
        Pre-select a trusted adult (and back-up) to be prepared to make medical
        decisions on your behalf.
      </Typography>
      <Grid container spacing={3} py={1}>
        <Grid xs={12} md={6} item>
          <InfoBox
            title="What is a financial Power of Attorney (POA) agent?"
            description="We pre-entered your selected successor Trustees as your POA agents. However, you can change or add a
new person. The POA is only in force when you are alive and no longer is in effect after death. The POA
may be able to assist with finances, banking, and credit matters if you are incapacitated (ie – coma) or
traveling for an extended period, if Effective Immediate selected in Chapter 3."
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <BoxWrapper sx={{ p: 2 }}>
            <Typography sx={{ pb: 2, display: "flex", gap: 0.5 }} variant="h3">
              Power of Attorney for{" "}
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
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ display: "flex", gap: 0.5 }} variant="h3">
                Immediate Power of Attorney :{" "}
                <Typography
                  variant="h3"
                  sx={{
                    color: (theme) => theme.additionalColors?.tablightBlue,
                  }}
                >
                  {watch("secondary_trustee_first_name")}{" "}
                  {watch("secondary_trustee_last_name")}
                </Typography>
              </Typography>
              {/*               
              <CustomTextField
                {...renderFieldProps()}
                disabled
                value={`${watch("secondary_trustee_first_name")} ${watch(
                  "secondary_trustee_last_name",
                )}`}
              /> */}
            </Box>
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h3">
                First Alternate POA
              </Typography>
              <Box
                sx={{
                  my: 1,
                  background: (theme) => theme.additionalColors?.formInputBg,
                  height: "40px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography variant="body1">
                  {primary_financial_agent_full_name &&
                  primary_financial_agent_full_name !== ""
                    ? `${primary_financial_agent_full_name},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_financial_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_financial_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_financial_agent_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No Power of Attorney Selected"}
                </Typography>
                <Button
                  onClick={handlePrimaryOpen}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.additionalColors?.lightBlue,
                    height: "26px",
                    boxShadow: "none",
                    color: "#333",
                    textTransform: "capitalize",
                    ":hover": {
                      background: (theme) => theme.additionalColors?.lightBlue,
                    },
                  }}
                >
                  {primary_financial_agent_full_name &&
                  primary_financial_agent_full_name !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"primary_financial_agent_full_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    {error?.message && (
                      <CustomErrorMessage error={error?.message ?? {}} />
                    )}
                  </>
                )}
              />
            </Box>
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h3">
                Second Alternate POA
              </Typography>
              <Box
                sx={{
                  my: 1,
                  background: (theme) => theme.additionalColors?.formInputBg,
                  height: "40px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography variant="body1">
                  {backup_financial_agent_full_name &&
                  backup_financial_agent_full_name !== ""
                    ? `${backup_financial_agent_full_name},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_financial_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_financial_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_financial_agent_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No Power of Attorney Selected"}
                </Typography>
                <Button
                  onClick={handleSecondaryOpen}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.additionalColors?.lightBlue,
                    height: "26px",
                    boxShadow: "none",
                    color: "#333",
                    textTransform: "capitalize",
                    ":hover": {
                      background: (theme) => theme.additionalColors?.lightBlue,
                    },
                  }}
                >
                  {backup_financial_agent_full_name &&
                  backup_financial_agent_full_name !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"backup_financial_agent_full_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    {error?.message && (
                      <CustomErrorMessage error={error?.message ?? {}} />
                    )}
                  </>
                )}
              />
            </Box>
          </BoxWrapper>
        </Grid>
        <Grid xs={12} md={6} item>
          <BoxWrapper sx={{ p: 2 }}>
            <Typography sx={{ pb: 2, display: "flex", gap: 0.5 }} variant="h3">
              Power of Attorney for{" "}
              <Typography
                variant="h3"
                sx={{
                  color: (theme) => theme.additionalColors?.tablightBlue,
                }}
              >
                {watch("secondary_trustee_first_name")}{" "}
                {watch("secondary_trustee_last_name")}
              </Typography>
            </Typography>
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ display: "flex", gap: 0.5 }} variant="h3">
                Immediate Power of Attorney :{" "}
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
              {/* <CustomTextField
                {...renderFieldProps()}
                disabled
                value={`${watch("primary_trustee_first_name")} ${watch(
                  "primary_trustee_last_name",
                )}`}
              /> */}
            </Box>
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h3">
                First Alternate POA
              </Typography>
              <Box
                sx={{
                  my: 1,
                  background: (theme) => theme.additionalColors?.formInputBg,
                  height: "40px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography variant="body1">
                  {primary_financial_agent_full_name_secondary_trustee &&
                  primary_financial_agent_full_name_secondary_trustee !== ""
                    ? `${primary_financial_agent_full_name_secondary_trustee},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No First Alternate POA"}
                </Typography>
                <Button
                  onClick={() => {
                    handlePrimaryOpen();
                    setForSecondaryTrustee(true);
                  }}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.additionalColors?.lightBlue,
                    height: "26px",
                    boxShadow: "none",
                    color: "#333",
                    textTransform: "capitalize",
                    ":hover": {
                      background: (theme) => theme.additionalColors?.lightBlue,
                    },
                  }}
                >
                  {primary_financial_agent_full_name_secondary_trustee &&
                  primary_financial_agent_full_name_secondary_trustee !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"primary_financial_agent_full_name_secondary_trustee"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    {error?.message && (
                      <CustomErrorMessage error={error?.message ?? {}} />
                    )}
                  </>
                )}
              />
            </Box>
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h3">
                Second Alternate POA
              </Typography>
              <Box
                sx={{
                  my: 1,
                  background: (theme) => theme.additionalColors?.formInputBg,
                  height: "40px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2,
                }}
              >
                <Typography variant="body1">
                  {backup_financial_agent_full_name_secondary_trustee &&
                  backup_financial_agent_full_name_secondary_trustee !== ""
                    ? `${backup_financial_agent_full_name_secondary_trustee},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No Second Alternate POA"}
                </Typography>
                <Button
                  onClick={() => {
                    handleSecondaryOpen();
                    setForSecondaryTrustee(true);
                  }}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.additionalColors?.lightBlue,
                    height: "26px",
                    boxShadow: "none",
                    color: "#333",
                    textTransform: "capitalize",
                    ":hover": {
                      background: (theme) => theme.additionalColors?.lightBlue,
                    },
                  }}
                >
                  {backup_financial_agent_full_name_secondary_trustee &&
                  backup_financial_agent_full_name_secondary_trustee !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>{" "}
              <Controller
                name={"backup_financial_agent_full_name_secondary_trustee"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    {error?.message && (
                      <CustomErrorMessage error={error?.message ?? {}} />
                    )}
                  </>
                )}
              />
            </Box>
          </BoxWrapper>
        </Grid>
      </Grid>
      <AddTrustee
        open={openPrimary}
        handleClose={handlePrimaryClose}
        title="Select First Financial Agents"
        secondryTitle="Add First Financial Agents"
        forSecondaryTrustee={forSecondaryTrustee}
        isPrimary={true}
      />
      <AddTrustee
        open={openSecondary}
        handleClose={handleSecondaryClose}
        title="Select Second Financial Agents"
        secondryTitle="Add Second Financial Agents"
        forSecondaryTrustee={forSecondaryTrustee}
        isPrimary={false}
      />
    </Box>
  );
};

export default FinancialAgents;
