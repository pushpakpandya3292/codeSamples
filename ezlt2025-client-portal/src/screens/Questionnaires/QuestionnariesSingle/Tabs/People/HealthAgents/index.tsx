import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import AddTrustee from "./AddTrustee";
import { Controller, useFormContext } from "react-hook-form";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import {
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
} from "../../../constants";
import InfoBox from "@/components/InfoBox";

const HealthAgents: React.FC = () => {
  const { getValues, watch, control } = useFormContext();
  const {
    primary_health_agent_full_name,
    primary_trustee_health_agent_relation,
    backup_health_agent_full_name,
    backup_trustee_health_agent_relation,
  } = getValues();
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openSecondary, setOpenSecondary] = useState(false);
  const handlePrimaryOpen = () => {
    setOpenPrimary(true);
  };
  const handleSecondaryOpen = () => {
    setOpenSecondary(true);
  };
  const handlePrimaryClose = () => {
    setOpenPrimary(false);
  };
  const handleSecondaryClose = () => {
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
            <Typography sx={{ pb: 2, display: "flex", gap: 0.5 }} variant="h3">
              Health Agents for{" "}
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
                    TrusteeChildRealtionEnum[
                      primary_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          primary_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          primary_trustee_health_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
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
                    TrusteeChildRealtionEnum[
                      backup_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          backup_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          backup_trustee_health_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
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
      </Grid>
      <AddTrustee
        open={openPrimary}
        handleClose={handlePrimaryClose}
        title="Select First Health Agent"
        secondryTitle="Add First Health Agent"
        isPrimary={true}
      />
      <AddTrustee
        open={openSecondary}
        handleClose={handleSecondaryClose}
        title="Select Second Health Agent"
        secondryTitle="Add Second Health Agent"
        isPrimary={false}
      />
    </Box>
  );
};

export default HealthAgents;
