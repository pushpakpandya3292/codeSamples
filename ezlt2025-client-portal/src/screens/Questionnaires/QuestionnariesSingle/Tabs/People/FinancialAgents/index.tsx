import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import AddTrustee from "./AddTrustee";
import {
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
} from "../../../constants";
import InfoBox from "@/components/InfoBox";

const FinancialAgents: React.FC = () => {
  const { getValues, watch, control } = useFormContext();
  const {
    primary_financial_agent_full_name,
    primary_trustee_financial_agent_relation,
    backup_financial_agent_full_name,
    backup_trustee_financial_agent_relation,
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
                    TrusteeChildRealtionEnum[
                      primary_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          primary_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          primary_trustee_financial_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
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
                    TrusteeChildRealtionEnum[
                      backup_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          backup_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          backup_trustee_financial_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
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
      </Grid>
      <AddTrustee
        open={openPrimary}
        handleClose={handlePrimaryClose}
        title="Select First Financial Agents"
        secondryTitle="Add First Financial Agents"
        isPrimary={true}
      />
      <AddTrustee
        open={openSecondary}
        handleClose={handleSecondaryClose}
        title="Select Second Financial Agents"
        secondryTitle="Add Second Financial Agents"
        isPrimary={false}
      />
    </Box>
  );
};

export default FinancialAgents;
