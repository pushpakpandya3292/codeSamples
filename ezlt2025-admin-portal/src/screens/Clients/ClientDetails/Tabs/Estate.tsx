import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import {
  subBox,
  boxStyle,
  titleStyle,
  inforStyle,
  subHeadingStyle,
} from "../index";

interface root {
  anything_to_add_desc: string;
  business_social_desc: string;
  debts_loans_desc: string;
  division_assets_desc: string;
  gift_charity_desc: string;
  primary_address_questions: string;
  investment_properties: Array<Object>;
  is_same_address: boolean;
  mailing_address: any;
  primary_address: any;
  primary_address_property_detail: Object;
  quit_claim: string;
  residence_detail: string;
  retirements_investment_desc: string;
  trustee_compensation_desc: string;
  trustee_responsibility_desc: string;
  wishes_pets_desc: string;
}

interface IEstateProps {
  data: root;
}
function testJSON(text: any) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    return false;
  }
}
const Estate: React.FC<IEstateProps> = ({ data }) => {
  return (
    <>
      <Typography
        sx={{ pb: 1, fontSize: "22px", fontWeight: "600", color: "#535f6b" }}
      >
        Step 4 : ESTATE
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
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Primary home</Typography>
          <Typography
            sx={{ mb: 2, pl: 2, fontWeight: "600", color: "#878787" }}
          >
            Probate Protection (Primary residence)
            <Divider
              sx={{
                background: "#fda340",
                height: "3px",
                width: "20px",
              }}
            />
          </Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Primary home address</Typography>
            <Typography sx={inforStyle}>
              {data?.primary_address?.name || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Mailing Address</Typography>
            <Typography sx={inforStyle}>
              {data?.is_same_address
                ? "Same as primary address"
                : testJSON(data?.mailing_address)?.name || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>About primary residence</Typography>
            <Typography sx={inforStyle}>
              {data?.residence_detail || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Quit claim</Typography>
            <Typography sx={inforStyle}>{data?.quit_claim || "-"}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Property question</Typography>
            <Typography sx={inforStyle}>
              {
                //@ts-ignore
                data?.property_address_questions || "-"
              }
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Investment properties</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>
              Do you own investment property and want to prepare Quit Claims for
              100$ each?
            </Typography>
            <Typography sx={inforStyle}>
              {data?.investment_properties.length > 0 ? "Yes" : "No"}
            </Typography>
          </Box>
          {data?.investment_properties.length !== 0 &&
            data?.investment_properties?.map((property: any, index: number) => (
              <Box key={index}>
                <Typography
                  sx={{
                    mb: 2,
                    pl: 2,
                    mt: 1,
                    fontWeight: "600",
                    color: "#878787",
                  }}
                >
                  Investment Property {index + 1}
                  <Divider
                    sx={{
                      background: "#fda340",
                      height: "3px",
                      width: "20px",
                    }}
                  />
                </Typography>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Primary home address</Typography>
                  <Typography sx={inforStyle}>
                    {property?.primary_address?.name || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Mailing Address</Typography>
                  <Typography sx={inforStyle}>
                    {property?.is_same_address
                      ? "Same as primary address"
                      : testJSON(property?.mailing_address)?.name || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    About primary residence
                  </Typography>
                  <Typography sx={inforStyle}>
                    {property?.residence_detail || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Property question</Typography>
                  <Typography sx={inforStyle}>
                    {property?.property_address_questions || "-"}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Estate Wishes</Typography>
          <Box>
            <Typography
              sx={{ mb: 2, pl: 2, fontWeight: "600", color: "#878787" }}
            >
              Living Trust Wishes
              <Divider
                sx={{
                  background: "#fda340",
                  height: "3px",
                  width: "20px",
                }}
              />
            </Typography>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Minimum Age</Typography>
              <Typography sx={inforStyle}>
                {
                  //@ts-ignore
                  data?.trustee_responsibility_minimum_age === "unknown"
                    ? "-"
                    : //@ts-ignore
                      data?.trustee_responsibility_minimum_age || "-"
                }
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography
                sx={titleStyle}
              >{`Successor Trustee’s responsibilities`}</Typography>
              <Typography sx={inforStyle}>
                {data?.trustee_responsibility_desc || "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                Division of properties and tangible assets
              </Typography>
              <Typography sx={inforStyle}>
                {data?.division_assets_desc !== null
                  ? data?.division_assets_desc
                    ? data?.division_assets_desc
                    : "Skipped"
                  : "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                Gifts to other people or charities
              </Typography>
              <Typography sx={inforStyle}>
                {data?.gift_charity_desc !== null
                  ? data?.gift_charity_desc
                    ? data?.gift_charity_desc
                    : "Skipped"
                  : "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography
                sx={titleStyle}
              >{`Retirement, life insurance and other investments`}</Typography>
              <Typography sx={inforStyle}>
                {data?.retirements_investment_desc !== null
                  ? data?.retirements_investment_desc
                    ? data?.retirements_investment_desc
                    : "Skipped"
                  : "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Wishes for Pets</Typography>
              <Typography sx={inforStyle}>
                {data?.wishes_pets_desc !== null
                  ? data?.wishes_pets_desc
                    ? data?.wishes_pets_desc
                    : "Skipped"
                  : "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                Businesses and Social Media
              </Typography>
              <Typography sx={inforStyle}>
                {data?.business_social_desc !== null
                  ? data?.business_social_desc
                    ? data?.business_social_desc
                    : "Skipped"
                  : "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Debts or Loans</Typography>
              <Typography sx={inforStyle}>
                {data?.debts_loans_desc !== null
                  ? data?.debts_loans_desc
                    ? data?.debts_loans_desc
                    : "Skipped"
                  : "-"}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Other information added</Typography>
              <Typography sx={inforStyle}>
                {data?.anything_to_add_desc !== null
                  ? data?.anything_to_add_desc
                    ? data?.anything_to_add_desc
                    : "Skipped"
                  : "-"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* </Box>
      </Box> */}
    </>
  );
};

export default Estate;
