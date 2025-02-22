import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import {
  subBox,
  boxStyle,
  titleStyle,
  inforStyle,
  subHeadingStyle,
} from "../index";
interface signaturetypes {
  id: string;
  path: string;
}

interface root {
  first_withness_address: any;
  first_withness_name: string;
  is_external_public_office: boolean;
  is_signed_document: boolean;
  public_office: string;
  public_office_country: string;
  public_office_name: string;
  second_withness_address: any;
  second_withness_name: string;
  signature: signaturetypes;
  signed_date: string;
  estate_plan_binder: string;
  shipped_to: string;
}

interface IOfficializeProps {
  data: root;
  isCouple: number;
}
export enum NotaryEnum {
  "Notary near me - I am unable to travel to your South Pasadena office and will find a Notary near me." = 1,
  "Local pick-up but use my own Notary" = 2,
  "Local pick-up and Notarize at your office - I will schedule a pick-up and date to Notarize in your office" = 3,
}

const Officialize: React.FC<IOfficializeProps> = ({ data, isCouple }) => {
  return (
    <>
      <Typography
        sx={{ pb: 1, fontSize: "22px", fontWeight: "600", color: "#535f6b" }}
      >
        Step 5 : LOGISTICS
      </Typography>
      <Box
        sx={{
          // borderRadius: 2,
          // p: 2,
          // boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
          background: "#fcfcfc",
          width: "70%",
        }}
      >
        {/* <Typography
          sx={{ pb: 1, fontSize: "18px", fontWeight: "700", color: "#333" }}
        >
          Witness
        </Typography> */}
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Delivery Method</Typography>
          <Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                Complete Estate Plan binder
              </Typography>
              <Typography sx={inforStyle}>
                {data?.estate_plan_binder || "-"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Shipping Instruction</Typography>
              <Typography sx={inforStyle}>{data?.shipped_to || "-"}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Box>
            <Typography sx={subHeadingStyle}>
              Witness
              {/* <Divider
                sx={{
                  background: "#fda340",
                  height: "3px",
                  width: "20px",
                }}
              /> */}
            </Typography>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}></Typography>
              <Typography sx={titleStyle}>Witness 1</Typography>
              <Typography sx={titleStyle}>Witness 2</Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Name</Typography>
              <Typography sx={inforStyle}>
                {data?.first_withness_name || "-"}
              </Typography>
              <Typography sx={inforStyle}>
                {data?.second_withness_name || "-"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Address</Typography>
              <Typography sx={inforStyle}>
                {data?.first_withness_address?.name || "-"}
              </Typography>
              <Typography sx={inforStyle}>
                {data?.second_withness_address?.name || "-"}
              </Typography>
            </Box>
          </Box>
          {/* <Divider sx={{ my: 2, border: "0" }} /> */}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        {/* <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>
            Witness 2
            <Divider
              sx={{
                background: "#fda340",
                height: "3px",
                width: "20px",
              }}
            />
          </Typography>

          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Name</Typography>
            <Typography sx={inforStyle}>
              {data?.second_withness_name || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Address</Typography>
            <Typography sx={inforStyle}>
              {data?.second_withness_address?.name || "-"}
            </Typography>
          </Box>
        </Box> */}
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Notary</Typography>
          <Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                Licensed Notary Public Officer
              </Typography>
              <Typography sx={inforStyle}>
                {
                  //@ts-ignore
                  NotaryEnum[data?.public_office] || "-"
                }
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Public office legal name</Typography>
              <Typography sx={inforStyle}>
                {data?.public_office_name || "-"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Public office county name</Typography>
              <Typography sx={inforStyle}>
                {data?.public_office_country || "-"}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Signing Date</Typography>
              <Typography sx={inforStyle}>
                {data?.signed_date
                  ? moment(data?.signed_date).format("MM-DD-YYYY")
                  : "-"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>
            Acknowledgement & Agreement
          </Typography>
          <Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Signature</Typography>
              <Typography sx={inforStyle}>
                {data?.signature?.path ? (
                  <img
                    src={`${data?.signature?.path}`}
                    alt="Signature"
                    style={{ height: "50px", width: "50px", marginTop: "10px" }}
                  />
                ) : (
                  "-"
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Officialize;
