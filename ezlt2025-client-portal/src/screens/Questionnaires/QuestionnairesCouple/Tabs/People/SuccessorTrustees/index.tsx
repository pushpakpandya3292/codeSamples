import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import AddTrustee from "./AddTrustee";
import { Controller, useFormContext } from "react-hook-form";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import {
  TrusteeBothRealtionWithPersonEnum,
  TrusteeChildBothRealtionEnum,
} from "../../../constants";
import InfoBox from "@/components/InfoBox";
import CouplesTrusteesManagement from "@/assets/img/CouplesTrusteesManagement.png";
import Image from "next/image";

const SuccessorTrustees: React.FC = () => {
  const { getValues, control, watch } = useFormContext();
  const {
    primary_successor_full_name,
    secondary_primary_successor_relation_primary,
    backup_successor_full_name,
    secondary_primary_successor_relation_backup,
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
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <Typography variant="h2">Successor Trustees</Typography>
          <Typography sx={{ mb: 1 }} variant="h5">
            Select a Primary person and back-up person to be your next in line
            to execute your wishes.
          </Typography>
          <InfoBox
            title="What is a Successor Trustee?"
            description="The “successor” Trustee is the responsible person you select to take over and manage all your affairs and
implement your wishes, if you become incapacitated (ie - coma) or after the death of all the main
Trustees. Many people select their most responsible adult child to the primary trustee or will ask a close
responsible friend to agree to be a “Successor Trustee.” Or you can hire an independent Fiduciary trustee
before you complete your document. We don’t offer a co-trusteeship due to challenges in getting two
people to agree on all decisions."
          />
          <BoxWrapper sx={{ p: 2, mt: 1 }}>
            <Box pb={2}>
              <Typography variant="h3">Primary Successor</Typography>
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
                  {primary_successor_full_name &&
                  primary_successor_full_name !== ""
                    ? `${primary_successor_full_name},
                ${
                  TrusteeChildBothRealtionEnum[
                    secondary_primary_successor_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                  ]
                    ? TrusteeChildBothRealtionEnum[
                        secondary_primary_successor_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                      ]
                    : TrusteeBothRealtionWithPersonEnum[
                        secondary_primary_successor_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
                      ]
                }`
                    : "No Primary Successor"}
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
                  {primary_successor_full_name &&
                  primary_successor_full_name !== ""
                    ? "Change"
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"primary_successor_full_name"}
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
            <Box>
              <Typography variant="h3">Secondary Successor </Typography>
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
                  {backup_successor_full_name &&
                  backup_successor_full_name !== ""
                    ? `${backup_successor_full_name}, 
                  ${
                    TrusteeChildBothRealtionEnum[
                      secondary_primary_successor_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                    ]
                      ? TrusteeChildBothRealtionEnum[
                          secondary_primary_successor_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                        ]
                      : TrusteeBothRealtionWithPersonEnum[
                          secondary_primary_successor_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
                        ]
                  }`
                    : "No Secondary Successor"}
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
                  {backup_successor_full_name &&
                  backup_successor_full_name !== ""
                    ? "Change"
                    : "Add"}
                </Button>
              </Box>
              <Controller
                name={"backup_successor_full_name"}
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
        </Grid>{" "}
        <Grid xs={12} md={6} item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image
              src={CouplesTrusteesManagement}
              alt="Couples Trustees Management"
              width={320}
              height={400}
            />
          </Box>
        </Grid>
      </Grid>
      <AddTrustee
        open={openPrimary}
        handleClose={handlePrimaryClose}
        title="Select Primary Successor"
        secondryTitle="Add Primary Successor"
        isPrimary={true}
      />
      <AddTrustee
        open={openSecondary}
        handleClose={handleSecondaryClose}
        title="Select Secondary Successor"
        secondryTitle="Add Secondary Successor"
        isPrimary={false}
      />
    </Box>
  );
};

export default SuccessorTrustees;
