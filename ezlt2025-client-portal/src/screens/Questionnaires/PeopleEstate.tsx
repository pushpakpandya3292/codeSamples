import React from "react";
import { ILIVING_TRUST_QUESTIONS } from "./QuestionnairesCouple/types";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Group from "@/assets/icons/Group.svg";

interface Props {
  InterviewValues: ILIVING_TRUST_QUESTIONS;
}

const PeopleEstate: React.FC<Props> = ({ InterviewValues }) => {
  const {
    primary_trustee_first_name,
    primary_trustee_last_name,
    secondary_trustee_first_name,
    secondary_trustee_last_name,
    living_childern,
    living_childern_details,
    deceased_childern,
    deceased_childern_details,
    primary_trustee_childern,
    primary_trustee_childern_details,
    secondary_trustee_childern,
    secondary_trustee_childern_details,
    primary_health_agent_full_name,
    backup_health_agent_full_name,
    primary_successor_full_name,
    backup_successor_full_name,
    primary_financial_agent_full_name,
    backup_financial_agent_full_name,
    primary_health_agent_full_name_secondary_trustee,
    backup_health_agent_full_name_secondary_trustee,
    primary_financial_agent_full_name_secondary_trustee,
    backup_financial_agent_full_name_secondary_trustee,
    primary_guardian_full_name,
    backup_guardian_full_name,
    isChildUnderAge,
  }: ILIVING_TRUST_QUESTIONS = InterviewValues;

  return (
    <Card
      sx={{
        borderRadius: "16px",
        mt: 2
        // marginTop: { md: "-100px", lg: "-280px" },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 2.5,
          gap: 1.25,
          height: "Fit-content",
          //   background: (theme) => theme.additionalColors?.background.primary,
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1.25,
            background: (theme) => theme.additionalColors?.background.secondary,
            border: "1px solid #D9ECFF",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              // justifyContent: "center",
              //   flexDirection: "column",
              gap: 2,
            }}
          >
            <Image src={Group} alt="" />
            <Typography
              //   variant="h6"
              sx={{
                fontWeight: "500",
                fontFamily: "Roboto",
                fontStyle: "normal",
                lineHeight: "normal",
                color: "#535F6B",
                fontSize: "18px",
              }}
            >
              People in your Estate
            </Typography>
          </Box>
          <Box sx={{ pt: 2 }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: (theme) => theme.palette.text.disabled,
              }}
            >
              Initial Trustee :
            </Typography>
            <Box
              sx={{
                background: "#DCE7FD",
                // (theme) => theme.palette.primary.main,
                width: "fit-content",
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography
                component={"li"}
                sx={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {primary_trustee_first_name} {primary_trustee_last_name}
              </Typography>
              {secondary_trustee_first_name && (
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {secondary_trustee_first_name} {secondary_trustee_last_name}
                </Typography>
              )}
            </Box>
          </Box>
          {living_childern_details.length > 0 && living_childern && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                Living Children :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {living_childern_details.map((child: any, index: number) => {
                  return (
                    <Typography
                      key={index}
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {child.full_Name}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          )}
          {deceased_childern_details.length > 0 && deceased_childern && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                Deceased Children :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {deceased_childern_details.map((child: any, index: number) => {
                  return (
                    <Typography
                      key={index}
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {child.full_Name}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          )}
          {primary_trustee_childern_details &&
            primary_trustee_childern &&
            primary_trustee_childern_details?.length > 0 && (
              <Box sx={{ pt: 2 }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {`${primary_trustee_first_name}'s Other Children`} :
                </Typography>
                <Box
                  sx={{
                    background: "#DCE7FD",
                    // (theme) => theme.palette.primary.main,
                    width: "fit-content",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {primary_trustee_childern_details.map(
                    (child: any, index: number) => {
                      return (
                        <Typography
                          key={index}
                          component={"li"}
                          sx={{
                            fontSize: "13px",
                            fontWeight: 400,
                            color: (theme) => theme.palette.text.disabled,
                          }}
                        >
                          {child.full_Name}
                        </Typography>
                      );
                    },
                  )}
                </Box>
              </Box>
            )}
          {secondary_trustee_childern_details &&
            secondary_trustee_childern &&
            secondary_trustee_childern_details.length > 0 && (
              <Box sx={{ pt: 2 }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {`${secondary_trustee_first_name}'s Other Children`} :
                </Typography>
                <Box
                  sx={{
                    background: "#DCE7FD",
                    // (theme) => theme.palette.primary.main,
                    width: "fit-content",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {secondary_trustee_childern_details.map(
                    (child: any, index: number) => {
                      return (
                        <Typography
                          key={index}
                          component={"li"}
                          sx={{
                            fontSize: "13px",
                            fontWeight: 400,
                            color: (theme) => theme.palette.text.disabled,
                          }}
                        >
                          {child.full_Name}
                        </Typography>
                      );
                    },
                  )}
                </Box>
              </Box>
            )}
          {primary_successor_full_name && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {`Successor Trustees`} :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {primary_successor_full_name}
                </Typography>
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {backup_successor_full_name}
                </Typography>
              </Box>
            </Box>
          )}
          {primary_health_agent_full_name && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {`${primary_trustee_first_name}'s Heatlh Agents`} :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {primary_health_agent_full_name}
                </Typography>
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {backup_health_agent_full_name}
                </Typography>
              </Box>
            </Box>
          )}
          {primary_financial_agent_full_name && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {`${primary_trustee_first_name}'s Financial Agents`} :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {primary_financial_agent_full_name}
                </Typography>
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {backup_financial_agent_full_name}
                </Typography>
              </Box>
            </Box>
          )}
          {primary_health_agent_full_name_secondary_trustee && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {`${secondary_trustee_first_name}'s Heatlh Agents`} :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {primary_health_agent_full_name_secondary_trustee}
                </Typography>
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {backup_health_agent_full_name_secondary_trustee}
                </Typography>
              </Box>
            </Box>
          )}
          {primary_financial_agent_full_name_secondary_trustee && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {`${secondary_trustee_first_name}'s Financial Agents`} :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {primary_financial_agent_full_name_secondary_trustee}
                </Typography>
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {backup_financial_agent_full_name_secondary_trustee}
                </Typography>
              </Box>
            </Box>
          )}
          {primary_guardian_full_name && isChildUnderAge && (
            <Box sx={{ pt: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.disabled,
                }}
              >
                {`Guardians`} :
              </Typography>
              <Box
                sx={{
                  background: "#DCE7FD",
                  // (theme) => theme.palette.primary.main,
                  width: "fit-content",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {primary_guardian_full_name}
                </Typography>
                <Typography
                  component={"li"}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  {backup_guardian_full_name}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default PeopleEstate;
