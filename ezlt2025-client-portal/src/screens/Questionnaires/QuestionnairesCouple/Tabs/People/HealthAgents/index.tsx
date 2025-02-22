import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import AddTrustee from "./AddTrustee";
import {
  TrusteeBothRealtionWithPersonEnum,
  TrusteeChildBothRealtionEnum,
} from "../../../constants";
import InfoBox from "@/components/InfoBox";

const HealthAgents: React.FC = () => {
  const { getValues, watch, control } = useFormContext();
  const {
    primary_health_agent_full_name,
    secondary_primary_health_agent_relation_primary,
    backup_health_agent_full_name,
    secondary_primary_health_agent_relation_backup,
    primary_health_agent_full_name_secondary_trustee,
    secondary_primary_health_agent_relation_primary_secondary_trustee,
    backup_health_agent_full_name_secondary_trustee,
    secondary_primary_health_agent_relation_backup_secondary_trustee,
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
      <Typography variant="h2">Health Care Power Agents</Typography>
      <Typography sx={{ mt: 1 }} variant="h5">
        Pre-select a trusted adult (and back-up) to be prepared to make medical
        decisions on your behalf.
      </Typography>
      <Grid container spacing={3} py={1}>
        <Grid xs={12} md={6} item>
          <InfoBox
            title="What is a Health agent?"
            description="We pre-entered your selected successor Trustees as your health agents since most clients keep the same
persons for consistency and easier estate management. However, you can change or add a new person. In
the case of an emergency, the health agent is able to access health records and or make health decisions,
including life or death decisions."
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <BoxWrapper sx={{ p: 2 }}>
            <Typography sx={{ pb: 2 }} variant="h3">
              Health Agents for{" "}
              <Typography
                component={"span"}
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
              <Typography variant="h3">
                Immediate Health Agent :{" "}
                <Typography
                  variant="h3"
                  component={"span"}
                  sx={{
                    color: (theme) => theme.additionalColors?.tablightBlue,
                  }}
                >
                  {watch("secondary_trustee_first_name")}{" "}
                  {watch("secondary_trustee_last_name")}
                </Typography>
              </Typography>
              {/* <CustomTextField
                {...renderFieldProps()}
                disabled
                value={`${watch("secondary_trustee_first_name")} ${watch(
                  "secondary_trustee_last_name",
                )}`}
              /> */}
            </Box>
            <Box sx={{ pb: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h3">
                First Alternate Agent
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
                  {primary_health_agent_full_name &&
                  primary_health_agent_full_name !== ""
                    ? `${primary_health_agent_full_name},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_health_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_health_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_health_agent_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No First Alternate Agent"}
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
                  {primary_health_agent_full_name &&
                  primary_health_agent_full_name !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"primary_health_agent_full_name"}
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
                Second Alternate Agent
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
                  {backup_health_agent_full_name &&
                  backup_health_agent_full_name !== ""
                    ? `${backup_health_agent_full_name},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_health_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_health_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_health_agent_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No Second Alternate Agent"}
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
                  {backup_health_agent_full_name &&
                  backup_health_agent_full_name !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"backup_health_agent_full_name"}
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
            <Typography sx={{ display: "flex", gap: 0.5, pb: 2 }} variant="h3">
              Health Agents for{" "}
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
                Immediate Health Agent :{" "}
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
                First Alternate Agent
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
                  {primary_health_agent_full_name_secondary_trustee &&
                  primary_health_agent_full_name_secondary_trustee !== ""
                    ? `${primary_health_agent_full_name_secondary_trustee},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No First Alternate Agent"}
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
                  {primary_health_agent_full_name_secondary_trustee &&
                  primary_health_agent_full_name_secondary_trustee !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"primary_health_agent_full_name_secondary_trustee"}
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
                Second Alternate Agent
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
                  {backup_health_agent_full_name_secondary_trustee &&
                  backup_health_agent_full_name_secondary_trustee !== ""
                    ? `${backup_health_agent_full_name_secondary_trustee},
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No Second Alternate Agent"}
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
                  {backup_health_agent_full_name_secondary_trustee &&
                  backup_health_agent_full_name_secondary_trustee !== ""
                    ? `Change`
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"backup_health_agent_full_name_secondary_trustee"}
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
        title="Select First Health Agent"
        secondryTitle="Add First Health Agent"
        forSecondaryTrustee={forSecondaryTrustee}
        isPrimary={true}
      />
      <AddTrustee
        open={openSecondary}
        handleClose={handleSecondaryClose}
        title="Select Second Health Agent"
        secondryTitle="Add Second Health Agent"
        forSecondaryTrustee={forSecondaryTrustee}
        isPrimary={false}
      />
    </Box>
  );
};

export default HealthAgents;
