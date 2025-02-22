import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import {
  AutopsyEnum,
  BurialCopyForDisplayEnum,
  BurialEnum,
  EndLifeAuthorizationCopyForDisplayEnum,
  OrganDonationEnum,
  SpringingAuthorizationCopyForDisplayEnum,
} from "@/screens/Questionnaires/QuestionnairesCouple/constants";
import {
  StyledTypography,
  stepsMainHeadingStyle,
  subHeadingStyle,
} from "../index";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";

interface checkboxTypes {
  key: number;
  title: string;
  checked: boolean;
  setChecked: () => void;
}

const ThirdStep = ({ handleChangeStep }: any) => {
  const { watch } = useFormContext();
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Grid my={2}>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h2" sx={stepsMainHeadingStyle}>
              Instructions
            </Typography>
            <BorderColorTwoToneIcon
              color="primary"
              onClick={handleOpenModal}
              sx={{
                background: (theme) =>
                  theme.additionalColors?.background.tertiary,
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "26px",
                p: "4px",
              }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontSize: "14px" }}>
            Step 3 of 6
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            my: 1,
            ml: "-7px",
            borderRadius: 2,
            p: 2,
            boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
            background: "#fcfcfc",
          }}
        >
          <StyledTypography>Power of Attorney (Financial POA)</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Box>
                <Typography variant="h5">
                  {" "}
                  {`Financial agents powers for ${watch(
                    "primary_trustee_first_name",
                  )} ${watch("primary_trustee_last_name")}`}
                </Typography>
                <Typography>
                  {
                    SpringingAuthorizationCopyForDisplayEnum[
                      watch(
                        "power_of_attorny_primary",
                      ) as keyof typeof SpringingAuthorizationCopyForDisplayEnum
                    ]
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">All Financial Transactions</Typography>
                {watch("select_all_for_primary_power_of_attorney").map(
                  (item: checkboxTypes, index: number) => (
                    <Typography lineHeight={"20px"} key={index}>
                      {item.title}
                    </Typography>
                  ),
                )}
              </Box>
            </Box>
          </BoxWrapper>
          <BoxWrapper sx={{ width: "100%", mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Box>
                <Typography variant="h5">
                  {" "}
                  {`Financial agents powers for ${watch(
                    "secondary_trustee_first_name",
                  )} ${watch("secondary_trustee_last_name")}`}
                </Typography>
                <Typography>
                  {
                    SpringingAuthorizationCopyForDisplayEnum[
                      watch(
                        "power_of_attorny_secondary",
                      ) as keyof typeof SpringingAuthorizationCopyForDisplayEnum
                    ]
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">All Financial Transactions</Typography>
                {watch("select_all_for_secondary_power_of_attorney").map(
                  (item: checkboxTypes, index: number) => (
                    <Typography lineHeight={"20px"} key={index}>
                      {item.title}
                    </Typography>
                  ),
                )}
              </Box>
            </Box>
          </BoxWrapper>
          <StyledTypography>{`Health Decisions`}</StyledTypography>
          <Typography variant="h3">
            {" "}
            {`Health agents power for ${watch(
              "primary_trustee_first_name",
            )} ${watch("primary_trustee_last_name")}`}
          </Typography>
          <BoxWrapper sx={{ width: "100%", mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Box>
                <Typography variant="h5">Health Care Options</Typography>
                <Typography>
                  {
                    EndLifeAuthorizationCopyForDisplayEnum[
                      watch(
                        "health_care_primary",
                      ) as keyof typeof EndLifeAuthorizationCopyForDisplayEnum
                    ]
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Autospy Options</Typography>
                <Typography>
                  {
                    OrganDonationEnum[
                      watch(
                        "perform_autopsy_primary",
                      ) as keyof typeof OrganDonationEnum
                    ]
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Organ Donation Options</Typography>
                <Typography>
                  {
                    AutopsyEnum[
                      watch(
                        "organ_donation_primary",
                      ) as keyof typeof AutopsyEnum
                    ]
                  }
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: "16px" }}>
              <Typography variant="h5">
                Specific Situations for End of Life for{" "}
                {watch("primary_trustee_first_name")}{" "}
                {watch("primary_trustee_last_name")}
              </Typography>
              {watch("select_all_for_primary_health_decision").map(
                (item: checkboxTypes, index: number) => (
                  <Typography key={index}>{item.title}</Typography>
                ),
              )}
            </Box>
          </BoxWrapper>
          <Typography variant="h3" my={2}>
            {" "}
            {`Health agents power for ${watch(
              "secondary_trustee_first_name",
            )} ${watch("secondary_trustee_last_name")}`}
          </Typography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Box>
                <Typography variant="h5">Health Care Options</Typography>
                <Typography>
                  {
                    EndLifeAuthorizationCopyForDisplayEnum[
                      watch(
                        "health_care_secondary",
                      ) as keyof typeof EndLifeAuthorizationCopyForDisplayEnum
                    ]
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Autospy Options</Typography>
                <Typography>
                  {
                    OrganDonationEnum[
                      watch(
                        "perform_autopsy_secondary",
                      ) as keyof typeof OrganDonationEnum
                    ]
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Organ Donation Options</Typography>
                <Typography>
                  {
                    AutopsyEnum[
                      watch(
                        "organ_donation_secondary",
                      ) as keyof typeof AutopsyEnum
                    ]
                  }
                </Typography>
              </Box>
            </Box>
            <Box mt={"16px"}>
              <Typography variant="h5">
                Specific Situations for End of Life for{" "}
                {watch("secondary_trustee_first_name")}{" "}
                {watch("secondary_trustee_last_name")}
              </Typography>
              {watch("select_all_for_secondary_health_decision").map(
                (item: checkboxTypes, index: number) => (
                  <Typography key={index}>{item.title}</Typography>
                ),
              )}
            </Box>
          </BoxWrapper>
          <StyledTypography>{`Burial Decisions`}</StyledTypography>
          <Typography variant="h3" my={2}>
            Primary Trustee
          </Typography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Box>
              <Typography variant="h5">
                {watch("primary_trustee_first_name")}{" "}
                {watch("primary_trustee_last_name")}, what are your desired
                plans for your remains after your death?
              </Typography>
              <Typography>
                {
                  BurialCopyForDisplayEnum[
                    watch(
                      "burial_decisions_for_primary",
                    ) as keyof typeof BurialCopyForDisplayEnum
                  ]
                }
              </Typography>
            </Box>
            {watch("burial_decisions_for_primary") === BurialEnum[1] ||
            watch("burial_decisions_for_primary") === "CREMATED" ? (
              <>
                {watch("burial_decisions_for_primary") === BurialEnum[2] && (
                  <>
                    <Box mt={"16px"}>
                      <Typography variant="h5">
                        {watch("primary_trustee_first_name")}{" "}
                        {watch("primary_trustee_last_name")}, how or where would
                        you like your ashes to be dispersed?
                      </Typography>
                      <Typography>
                        {watch("body_buried_cremated_primary")}
                      </Typography>
                    </Box>
                  </>
                )}
                {watch("burial_decisions_for_primary") === BurialEnum[1] && (
                  <>
                    <Box mt={"16px"}>
                      <Typography variant="h5">
                        {watch("primary_trustee_first_name")}{" "}
                        {watch("primary_trustee_last_name")}, how would you like
                        your body to be laid to rest?
                      </Typography>
                      <Typography>
                        {watch("body_buried_cremated_primary")}
                      </Typography>
                    </Box>
                  </>
                )}
                <Box mt={"16px"}>
                  <Typography variant="h5">
                    {watch("primary_trustee_first_name")}{" "}
                    {watch("primary_trustee_last_name")}, Do you have a
                    preference for a funeral or memorial service?
                  </Typography>
                  <Typography>{watch("funeral_service_primary")}</Typography>
                </Box>
                <Box mt={"16px"}>
                  <Typography variant="h5">
                    {watch("primary_trustee_first_name")}{" "}
                    {watch("primary_trustee_last_name")}, Have you already made
                    any arrangements to let your family know?
                  </Typography>
                  <Typography>
                    {watch("post_death_arrangement_primary")}
                  </Typography>
                </Box>
              </>
            ) : (
              <></>
            )}
          </BoxWrapper>
          <Typography variant="h3" my={2}>
            Secondary Trustee
          </Typography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Box>
              <Typography variant="h5">
                {watch("secondary_trustee_first_name")}{" "}
                {watch("secondary_trustee_last_name")}, what are your desired
                plans for your remains after your death?
              </Typography>
              <Typography>
                {
                  BurialCopyForDisplayEnum[
                    watch(
                      "burial_decisions_for_secondary",
                    ) as keyof typeof BurialCopyForDisplayEnum
                  ]
                }
              </Typography>
            </Box>
            {watch("burial_decisions_for_secondary") === BurialEnum[1] ||
            watch("burial_decisions_for_secondary") === "CREMATED" ? (
              <>
                {watch("burial_decisions_for_secondary") === BurialEnum[2] && (
                  <>
                    <Box mt={"16px"}>
                      <Typography variant="h5">
                        {watch("secondary_trustee_first_name")}{" "}
                        {watch("secondary_trustee_last_name")}, how or where
                        would you like your ashes to be dispersed?
                      </Typography>
                      <Typography>
                        {watch("body_buried_cremated_secondary")}
                      </Typography>
                    </Box>
                  </>
                )}
                {watch("burial_decisions_for_secondary") === BurialEnum[1] && (
                  <>
                    <Box mt={"16px"}>
                      <Typography variant="h5">
                        {watch("secondary_trustee_first_name")}{" "}
                        {watch("secondary_trustee_last_name")}, how would you
                        like your body to be laid to rest?
                      </Typography>
                      <Typography>
                        {watch("body_buried_cremated_secondary")}
                      </Typography>
                    </Box>
                  </>
                )}
                <Box mt={"16px"}>
                  <Typography variant="h5">
                    {watch("secondary_trustee_first_name")}{" "}
                    {watch("secondary_trustee_last_name")}, Do you have a
                    preference for a funeral or memorial service?
                  </Typography>
                  <Typography>{watch("funeral_service_secondary")}</Typography>
                </Box>
                <Box mt={"16px"}>
                  <Typography variant="h5">
                    {watch("secondary_trustee_first_name")}{" "}
                    {watch("secondary_trustee_last_name")}, Have you already
                    made any arrangements to let your family know?
                  </Typography>
                  <Typography>
                    {watch("post_death_arrangement_secondary")}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography>
                {watch("burial_decisions_for_secondary") === BurialEnum.NONE}
              </Typography>
            )}
          </BoxWrapper>
        </Grid>
      </Grid>
      {/* EDIT MODAL */}
      <EditPopUp
        handleChangeStep={() => handleChangeStep(2)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default ThirdStep;
