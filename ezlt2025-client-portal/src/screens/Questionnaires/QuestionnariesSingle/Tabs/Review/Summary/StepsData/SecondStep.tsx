import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import {
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
} from "../../../../constants";
import {
  StyledTypography,
  stepsMainHeadingStyle,
  subHeadingStyle,
} from "../index";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnariesSingle/Styled";

const SecondStep = ({ handleChangeStep }: any) => {
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
        <Grid xs={12} sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h2" sx={stepsMainHeadingStyle}>
              People Information
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
            Step 2 of 6
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
          <StyledTypography>{`My Family`}</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Living Children</Typography>
                <Typography>
                  {watch("living_childern") == false || undefined
                    ? "No"
                    : "Yes"}
                </Typography>
              </Grid>
              {watch("living_childern") == true && (
                <>
                  {watch("living_childern_details").map(
                    (child: any, index: number) => (
                      <>
                        <Grid
                          container
                          sx={{ my: 1, ml: 0 }}
                          xs={12}
                          spacing={2}
                        >
                          <Grid item xs={12}>
                            <Typography fontWeight={600} sx={subHeadingStyle}>
                              Child {index + 1} Info
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Full Name</Typography>
                            <Typography>{child?.full_Name}</Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Date of Birth</Typography>
                            <Typography>
                              {dayjs(child?.date_of_birth).format("MM-DD-YYYY")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Age</Typography>
                            <Typography>{child?.age}</Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Email</Typography>
                            {child?.email ? (
                              <Typography>{child?.email}</Typography>
                            ) : (
                              <Typography>N/A</Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Mobile</Typography>
                            {child?.mobile ? (
                              <Typography>{child?.mobile}</Typography>
                            ) : (
                              <Typography>N/A</Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">
                              Relation with Primary Trustee
                            </Typography>

                            <Typography>
                              {
                                TrusteeChildRealtionEnum[
                                child?.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                                ]
                              }
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="h5">{`Child's Residence Address`}</Typography>
                            <Typography>
                              {typeof child?.address == "string"
                                ? child?.address
                                : child?.address?.name}
                            </Typography>
                          </Grid>
                          {child?.living_childern_have_any_children && (
                            <Grid item xs={12} md={3}>
                              <Typography variant="h5">{`Child's Child Full Name`}</Typography>
                              <Typography>
                                {child?.living_child_children_full_name}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                        {watch("living_childern_details").length > 1 && (
                          <Divider sx={{ my: 1, width: "100%" }} />
                        )}
                      </>
                    ),
                  )}
                </>
              )}
            </Grid>
          </BoxWrapper>
          <BoxWrapper width={"100%"} mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Deceased Children</Typography>
                <Typography>
                  {watch("deceased_childern") == false || undefined
                    ? "No"
                    : "Yes"}
                </Typography>
              </Grid>
              {watch("deceased_childern") == true && (
                <>
                  {watch("deceased_childern_details").map(
                    (child: any, index: number) => (
                      <>
                        <Grid container sx={{ my: 2, ml: 2 }} xs={12}>
                          <Grid item xs={12}>
                            <Typography fontWeight={600} sx={subHeadingStyle}>
                              Child {index + 1} Info
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Full Name</Typography>
                            <Typography>{child?.full_Name}</Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Date of Birth</Typography>
                            <Typography>
                              {dayjs(child?.date_of_birth).format("MM-DD-YYYY")}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography variant="h5">Date of death</Typography>
                            <Typography>
                              {dayjs(child?.date_of_decease).format(
                                "MM-DD-YYYY",
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    ),
                  )}
                </>
              )}
            </Grid>
          </BoxWrapper>
          <StyledTypography>Successor Trustees</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Typography fontWeight={600} sx={subHeadingStyle}>
              Primary Successor
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Full Name</Typography>
                <Typography>{watch("primary_successor_full_name")}</Typography>
              </Grid>
              {watch("primary_successor_email") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Email</Typography>
                  <Typography>{watch("primary_successor_email")}</Typography>
                </Grid>
              )}
              {watch("primary_successor_phone_number") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Mobile</Typography>
                  <Typography>
                    {watch("primary_successor_phone_number")}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} md={3}>
                <Typography variant="h5">
                  Relation with Primary Trustee
                </Typography>

                <Typography>
                  {TrusteeRealtionWithPersonEnum[
                    watch(
                      "primary_trustee_successor_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                    ? TrusteeRealtionWithPersonEnum[
                    watch(
                      "primary_trustee_successor_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                    : TrusteeChildRealtionEnum[
                    watch(
                      "primary_trustee_successor_relation",
                    ) as keyof typeof TrusteeChildRealtionEnum
                    ]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Residence Address</Typography>
                <Typography>
                  {typeof watch("primary_successor_address") == "string"
                    ? watch("primary_successor_address")
                    : watch("primary_successor_address")?.name}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={600} sx={subHeadingStyle}>
              Secondary Successor
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Full Name</Typography>
                <Typography>{watch("backup_successor_full_name")}</Typography>
              </Grid>
              {watch("backup_successor_email") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Email</Typography>
                  <Typography>{watch("backup_successor_email")}</Typography>
                </Grid>
              )}
              {watch("backup_successor_phone_number") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Mobile</Typography>
                  <Typography>
                    {watch("backup_successor_phone_number")}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={3}>
                <Typography variant="h5">
                  Relation with Primary Trustee
                </Typography>
                <Typography>
                  {TrusteeRealtionWithPersonEnum[
                    watch(
                      "backup_trustee_successor_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                    ? TrusteeRealtionWithPersonEnum[
                    watch(
                      "backup_trustee_successor_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                    : TrusteeChildRealtionEnum[
                    watch(
                      "backup_trustee_successor_relation",
                    ) as keyof typeof TrusteeChildRealtionEnum
                    ]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Residence Address</Typography>
                <Typography>
                  {typeof watch("backup_successor_address") == "string"
                    ? watch("backup_successor_address")
                    : watch("backup_successor_address")?.name}
                </Typography>
              </Grid>
            </Grid>
          </BoxWrapper>

          {/* ==================================HEALTH AGENT===================================== */}
          <StyledTypography>Health Agents</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Typography fontWeight={600} sx={subHeadingStyle}>
              {`First alternate Health Agent`}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Full Name</Typography>
                <Typography>
                  {watch("primary_health_agent_full_name")}
                </Typography>
              </Grid>
              {watch("primary_health_agent_email") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Email</Typography>
                  <Typography>{watch("primary_health_agent_email")}</Typography>
                </Grid>
              )}
              {watch("primary_health_agent_phone_number") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Mobile</Typography>
                  <Typography>
                    {watch("primary_health_agent_phone_number")}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={3}>
                <Typography variant="h5">
                  Relation with Primary Trustee
                </Typography>
                {/* <Typography>
              {watch("primary_trustee_financial_agent_relation")}
            </Typography> */}
                <Typography>
                  {TrusteeRealtionWithPersonEnum[
                    watch(
                      "primary_trustee_health_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                    ? TrusteeRealtionWithPersonEnum[
                    watch(
                      "primary_trustee_health_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                    : TrusteeChildRealtionEnum[
                    watch(
                      "primary_trustee_health_agent_relation",
                    ) as keyof typeof TrusteeChildRealtionEnum
                    ]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Residence Address</Typography>
                <Typography>
                  {typeof watch("primary_health_agent_address") == "string"
                    ? watch("primary_health_agent_address")
                    : watch("primary_health_agent_address")?.name}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={600} sx={subHeadingStyle}>
              {`Second alternate Health Agent`}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Full Name</Typography>
                <Typography>
                  {watch("backup_health_agent_full_name")}
                </Typography>
              </Grid>
              {watch("backup_health_agent_email") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Email</Typography>
                  <Typography>{watch("backup_health_agent_email")}</Typography>
                </Grid>
              )}
              {watch("backup_health_agent_phone_number") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Mobile</Typography>
                  <Typography>
                    {watch("backup_health_agent_phone_number")}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={3}>
                <Typography variant="h5">
                  Relation with Primary Trustee
                </Typography>

                <Typography>
                  {TrusteeRealtionWithPersonEnum[
                    watch(
                      "backup_trustee_health_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                    ? TrusteeRealtionWithPersonEnum[
                    watch(
                      "backup_trustee_health_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                    : TrusteeChildRealtionEnum[
                    watch(
                      "backup_trustee_health_agent_relation",
                    ) as keyof typeof TrusteeChildRealtionEnum
                    ]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Residence Address</Typography>
                <Typography>
                  {typeof watch("backup_health_agent_address") == "string"
                    ? watch("backup_health_agent_address")
                    : watch("backup_health_agent_address")?.name}
                </Typography>
              </Grid>
            </Grid>
          </BoxWrapper>
          {/* ========================FINANCIAL AGENT=============================== */}

          <StyledTypography>Financial Agents</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Typography fontWeight={600} sx={subHeadingStyle}>
              First alternate Financial Agent
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Full Name</Typography>
                <Typography>
                  {watch("primary_financial_agent_full_name")}
                </Typography>
              </Grid>
              {watch("primary_financial_agent_email") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Email</Typography>
                  <Typography>
                    {watch("primary_financial_agent_email")}
                  </Typography>
                </Grid>
              )}
              {watch("primary_financial_agent_phone_number") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Mobile</Typography>
                  <Typography>
                    {watch("primary_financial_agent_phone_number")}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={3}>
                <Typography variant="h5">
                  Relation with Primary Trustee
                </Typography>

                <Typography>
                  {TrusteeRealtionWithPersonEnum[
                    watch(
                      "primary_trustee_financial_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                    ? TrusteeRealtionWithPersonEnum[
                    watch(
                      "primary_trustee_financial_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                    : TrusteeChildRealtionEnum[
                    watch(
                      "primary_trustee_financial_agent_relation",
                    ) as keyof typeof TrusteeChildRealtionEnum
                    ]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Residence Address</Typography>
                <Typography>
                  {typeof watch("primary_financial_agent_address") == "string"
                    ? watch("primary_financial_agent_address")
                    : watch("primary_financial_agent_address")?.name}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography fontWeight={600} sx={subHeadingStyle}>
              Second alternate Financial Agent
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Full Name</Typography>
                <Typography>
                  {watch("backup_financial_agent_full_name")}
                </Typography>
              </Grid>
              {watch("backup_financial_agent_email") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Email</Typography>
                  <Typography>
                    {watch("backup_financial_agent_email")}
                  </Typography>
                </Grid>
              )}
              {watch("backup_financial_agent_phone_number") && (
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Mobile</Typography>
                  <Typography>
                    {watch("backup_financial_agent_phone_number")}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={3}>
                <Typography variant="h5">
                  Relation with Primary Trustee
                </Typography>

                <Typography>
                  {TrusteeRealtionWithPersonEnum[
                    watch(
                      "backup_trustee_financial_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                    ? TrusteeRealtionWithPersonEnum[
                    watch(
                      "backup_trustee_financial_agent_relation",
                    ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                    : TrusteeChildRealtionEnum[
                    watch(
                      "backup_trustee_financial_agent_relation",
                    ) as keyof typeof TrusteeChildRealtionEnum
                    ]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h5">Residence Address</Typography>
                <Typography>
                  {typeof watch("backup_financial_agent_address") == "string"
                    ? watch("backup_financial_agent_address")
                    : watch("backup_financial_agent_address")?.name}
                </Typography>
              </Grid>
            </Grid>
          </BoxWrapper>
          {/* =======================================GUARDIANS======================================= */}

          <StyledTypography>Guardians</StyledTypography>
          {watch("isChildUnderAge") ? (
            <BoxWrapper sx={{ width: "100%" }}>
              <Typography
                fontWeight={600}
                sx={{ color: "#333", fontSize: "16px", mb: 2 }}
              >
                First Alternate Guardian
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Full Name</Typography>
                  <Typography>{watch("primary_guardian_full_name")}</Typography>
                </Grid>
                {watch("primary_guardian_email") && (
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5">Email</Typography>
                    <Typography>{watch("primary_guardian_email")}</Typography>
                  </Grid>
                )}
                {watch("primary_guardian_phone_number") && (
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5">Mobile</Typography>
                    <Typography>
                      {watch("primary_guardian_phone_number")}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">
                    Relation with Primary Trustee
                  </Typography>

                  <Typography>
                    {TrusteeRealtionWithPersonEnum[
                      watch(
                        "primary_trustee_guardian_relation",
                      ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                      ? TrusteeRealtionWithPersonEnum[
                      watch(
                        "primary_trustee_guardian_relation",
                      ) as keyof typeof TrusteeRealtionWithPersonEnum
                      ]
                      : TrusteeChildRealtionEnum[
                      watch(
                        "primary_trustee_guardian_relation",
                      ) as keyof typeof TrusteeChildRealtionEnum
                      ]}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">Residence Address</Typography>
                  <Typography>
                    {typeof watch("primary_guardian_address") == "string"
                      ? watch("primary_guardian_address")
                      : watch("primary_guardian_address")?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography fontWeight={600} sx={subHeadingStyle}>
                Second Alternate Guardian
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">Full Name</Typography>
                  <Typography>{watch("backup_guardian_full_name")}</Typography>
                </Grid>
                {watch("backup_guardian__email") && (
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5">Email</Typography>
                    <Typography>{watch("backup_guardian__email")}</Typography>
                  </Grid>
                )}
                {watch("backup_guardian_phone_number") && (
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5">Mobile</Typography>
                    <Typography>
                      {watch("backup_guardian_phone_number")}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} md={3}>
                  <Typography variant="h5">
                    Relation with Primary Trustee
                  </Typography>

                  <Typography>
                    {TrusteeRealtionWithPersonEnum[
                      watch(
                        "backup_trustee_guardian_relation",
                      ) as keyof typeof TrusteeRealtionWithPersonEnum
                    ]
                      ? TrusteeRealtionWithPersonEnum[
                      watch(
                        "backup_trustee_guardian_relation",
                      ) as keyof typeof TrusteeRealtionWithPersonEnum
                      ]
                      : TrusteeChildRealtionEnum[
                      watch(
                        "backup_trustee_guardian_relation",
                      ) as keyof typeof TrusteeChildRealtionEnum
                      ]}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">Residence Address</Typography>
                  <Typography>
                    {typeof watch("backup_guardian_address") == "string"
                      ? watch("backup_guardian_address")
                      : watch("backup_guardian_address").name}
                  </Typography>
                </Grid>
              </Grid>
            </BoxWrapper>
          ) : (
            "N/A"
          )}
        </Grid>
      </Grid>
      <EditPopUp
        handleChangeStep={() => handleChangeStep(1)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default SecondStep;
