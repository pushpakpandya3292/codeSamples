import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import {
  subBox,
  boxStyle,
  titleStyle,
  inforStyle,
  subHeadingStyle,
} from "../index";

interface root {
  is_committed: boolean;
  general_investing: string;
  health_insurance: string;
  is_questionnaire_completed: boolean;
  is_quoted: string;
  medicare_insurance: string;
  mortgage_insurance: string;
  other_popular_professional_services: string[];
  retirement_and_investing_plan: string;
  setup_ira: string;
}
interface IServicesProps {
  data: root;
  clientDetails: any;
}

const Services: React.FC<IServicesProps> = ({ data, clientDetails }) => {
  return (
    <>
      <Typography
        sx={{ pb: 1, fontSize: "22px", fontWeight: "600", color: "#535f6b" }}
      >
        Step 6 : SERVICES
      </Typography>
      <Box
        sx={{
          background: "#fcfcfc",
          width: "70%",
        }}
      >
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Protect your home</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Commitment to Fund Trust</Typography>
            <Typography sx={inforStyle}>
              {data?.is_committed ? "Yes" : "No"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Insurance Planning</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Mortgage or Life Insurance</Typography>
            <Typography sx={inforStyle}>
              {data?.mortgage_insurance || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Health Insurance</Typography>
            <Typography sx={inforStyle}>
              {data?.health_insurance || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Medicare Insurance</Typography>
            <Typography sx={inforStyle}>
              {data?.medicare_insurance || "-"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Retirement Plans</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>
              Help rollover your old Orphan 401(k) plan
            </Typography>
            <Typography sx={inforStyle}>
              {data?.retirement_and_investing_plan || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>
              Help you set up a new IRA, Roth or SEP IRA
            </Typography>
            <Typography sx={inforStyle}>{data?.setup_ira || "-"}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>
              Investing in Stocks, ETFs Index portfolios
            </Typography>
            <Typography sx={inforStyle}>
              {data?.general_investing || "-"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>
            Other Professional Services
          </Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>
              Other Popular Professional Services
            </Typography>
            <Typography sx={inforStyle}>
              {data?.other_popular_professional_services?.length === 0
                ? "-"
                : data?.other_popular_professional_services?.map(
                    (item, index) => (
                      <>
                        {item}
                        <br />
                      </>
                    ),
                  )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Services;
