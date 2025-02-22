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
import SingleTrusteeManagement from "@/assets/img/SingleTrusteeManagement.png";
import Image from "next/image";

const SuccessorTrustees: React.FC = () => {
  const { getValues, control } = useFormContext();
  const {
    primary_successor_full_name,
    primary_trustee_successor_relation,
    backup_successor_full_name,
    backup_trustee_successor_relation,
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
            Pre-select a trusted adult (and back-up) to execute your Trust
            wishes and assets after your death.
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
                  TrusteeChildRealtionEnum[
                    primary_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        primary_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        primary_trustee_successor_relation as keyof typeof TrusteeRealtionWithPersonEnum
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
            <Typography variant="h3" sx={{ mt: 2 }}>
              Secondary Successor{" "}
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
                {backup_successor_full_name && backup_successor_full_name !== ""
                  ? `${backup_successor_full_name}, 
                  ${
                    TrusteeChildRealtionEnum[
                      backup_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
                    ]
                      ? TrusteeChildRealtionEnum[
                          backup_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
                        ]
                      : TrusteeRealtionWithPersonEnum[
                          backup_trustee_successor_relation as keyof typeof TrusteeRealtionWithPersonEnum
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
                {backup_successor_full_name && backup_successor_full_name !== ""
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
          </BoxWrapper>
        </Grid>
        <Grid xs={12} md={6} item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image
              src={SingleTrusteeManagement}
              alt="Single Trustee Management"
              width={320}
              height={320}
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
