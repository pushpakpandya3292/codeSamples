import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  mainBox,
  boxStyle,
  titleStyle,
  inforStyle,
  subBox,
  subHeadingStyle,
} from "../index";

interface ITrusteeProps {
  burial_decision: number;
  financial_categories: Object | any;
  first_wish: string | null;
  life_authorization: number;
  organ_donation: number;
  perform_autopsy: number;
  second_wish: string | null;
  situation_categories: Object | any;
  springing_authorization: number;
  third_wish: string | null;
}

interface root {
  primary_trustee: ITrusteeProps;
  secondary_trustee: ITrusteeProps;
}

interface IInstructionsProps {
  data: root;
  isCouple: number;
}

export enum BurialEnum {
  "Unsure. Leave blank to add later or let your agents decide" = 0,
  "Wish to buried" = 1,
  "Wish to be cremated" = 2,
}

export enum SpringingAuthorizationEnum {
  "The POA is effective immediately" = 1,
  "The POA is effective only if and when declared INCAPACITATED by a medical professional (a “springing” power)." = 2,
}
export enum EndLifeAuthorizationEnum {
  "Gives medical professionals and  health agents authority to end my life" = 1,
  "Requests medical professionals and health agents to prolong my life as long as possible" = 2,
}

const Instructions: React.FC<IInstructionsProps> = ({ data, isCouple }) => {
  return (
    <>
      <Typography
        sx={{ pb: 1, fontSize: "22px", fontWeight: "600", color: "#535f6b" }}
      >
        Step 3 : INSTRUCTIONS
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
          <Typography sx={subHeadingStyle}>Power of Attorney Wishes</Typography>
          <Box>
            {/* <Typography
              sx={{
                mb: 2,
                pl: 2,
                fontWeight: "600",
                color: "#878787",
                fontSize: "14px",
              }}
            >
              Power of Attorney Wish
              <Divider
                sx={{
                  background: "#fda340",
                  height: "3px",
                  width: "20px",
                }}
              />
            </Typography> */}
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}></Typography>
              <Typography sx={titleStyle}>Primary Trustee</Typography>
              {isCouple == 2 && (
                <Typography sx={titleStyle}>Secondary Trustee</Typography>
              )}
            </Box>
            <Box sx={boxStyle}>
              <Typography
                sx={titleStyle}
              >{`Authorization (Springing power)`}</Typography>
              <Typography sx={inforStyle}>
                {data?.primary_trustee?.springing_authorization
                  ? SpringingAuthorizationEnum[
                      data?.primary_trustee?.springing_authorization
                    ]
                  : "-"}
              </Typography>
              {isCouple == 2 && (
                <Typography sx={inforStyle}>
                  {data?.secondary_trustee?.springing_authorization
                    ? SpringingAuthorizationEnum[
                        data?.secondary_trustee?.springing_authorization
                      ]
                    : "-"}
                </Typography>
              )}
            </Box>
            <Typography
              sx={{ mt: 1, pl: 2, fontWeight: "600", fontSize: "14px" }}
            >
              Financial categories
            </Typography>

            {data?.primary_trustee?.financial_categories &&
              Object.keys(data?.primary_trustee?.financial_categories).map(
                (category: any, index: number) => (
                  <Box key={index} sx={boxStyle}>
                    <Typography sx={titleStyle}>
                      {category.replaceAll("_", " ")}
                    </Typography>
                    <Typography sx={inforStyle} key={index}>
                      {data?.primary_trustee?.financial_categories[
                        `${category}`
                      ] !== null
                        ? data?.primary_trustee?.financial_categories[
                            `${category}`
                          ]
                          ? "Yes"
                          : "No"
                        : "-"}
                    </Typography>
                    {isCouple == 2 && (
                      <Typography sx={inforStyle} key={index}>
                        {data?.secondary_trustee?.financial_categories[
                          `${category}`
                        ] !== null
                          ? data?.secondary_trustee?.financial_categories[
                              `${category}`
                            ]
                            ? "Yes"
                            : "No"
                          : "-"}
                      </Typography>
                    )}
                  </Box>
                ),
              )}
          </Box>
          {/* {isCouple == 2 && (
            <>
              <Divider sx={{ my: 2, border: "0" }} />
              <Box>
                <Typography
                  sx={{
                    mb: 2,
                    pl: 2,
                    fontWeight: "600",
                    color: "#878787",
                    fontSize: "14px",
                  }}
                >
                  Power of Attorney Wish (secondary trustee)
                  <Divider
                    sx={{
                      background: "#fda340",
                      height: "3px",
                      width: "20px",
                    }}
                  />
                </Typography>
                <Box sx={boxStyle}>
                  <Typography
                    sx={titleStyle}
                  >{`Authorization (Springing power)`}</Typography>
                  <Typography sx={inforStyle}>
                    {data?.secondary_trustee?.springing_authorization
                      ? SpringingAuthorizationEnum[
                          data?.secondary_trustee?.springing_authorization
                        ]
                      : "-"}
                  </Typography>
                </Box>
                <Typography
                  sx={{ mt: 1, pl: 2, fontWeight: "600", fontSize: "14px" }}
                >
                  Financial categories
                </Typography>
                {data?.secondary_trustee?.financial_categories
                  ? Object.keys(
                      data?.secondary_trustee?.financial_categories,
                    ).map((category: any, index: number) => (
                      <Box key={index} sx={boxStyle}>
                        <Typography sx={titleStyle}>
                          {category.replaceAll("_", " ")}
                        </Typography>
                        <Typography sx={inforStyle} key={index}>
                          {data?.secondary_trustee?.financial_categories[
                            `${category}`
                          ] !== null
                            ? data?.secondary_trustee?.financial_categories[
                                `${category}`
                              ]
                              ? "Yes"
                              : "No"
                            : "-"}
                        </Typography>
                      </Box>
                    ))
                  : "-"}
              </Box>
            </>
          )} */}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Health Decisions</Typography>
          <Box>
            {/* <Typography
              sx={{
                mb: 2,
                pl: 2,
                fontWeight: "600",
                color: "#878787",
                fontSize: "14px",
              }}
            >
              Health decisions Wish (primary trustee)
              <Divider
                sx={{
                  background: "#fda340",
                  height: "3px",
                  width: "20px",
                }}
              />
            </Typography>{" "} */}
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}></Typography>
              <Typography sx={titleStyle}>Primary Trustee</Typography>
              {isCouple == 2 && (
                <Typography sx={titleStyle}>Secondary Trustee</Typography>
              )}
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Health Care Options</Typography>
              <Typography sx={inforStyle}>
                {data?.primary_trustee?.life_authorization
                  ? EndLifeAuthorizationEnum[
                      data?.primary_trustee?.life_authorization
                    ]
                  : "-"}
              </Typography>
              {isCouple == 2 && (
                <Typography sx={inforStyle}>
                  {data?.secondary_trustee?.life_authorization
                    ? EndLifeAuthorizationEnum[
                        data?.secondary_trustee?.life_authorization
                      ]
                    : "-"}
                </Typography>
              )}
            </Box>
            <Box sx={boxStyle}>
              <>
                <Typography sx={titleStyle}>Organ Donation</Typography>
                <Typography sx={inforStyle}>
                  {data?.primary_trustee?.organ_donation !== null
                    ? data?.primary_trustee?.organ_donation === 1
                      ? "Yes"
                      : "No"
                    : "-"}
                </Typography>
                {isCouple == 2 && (
                  <Typography sx={inforStyle}>
                    {data?.secondary_trustee?.organ_donation !== null
                      ? data?.secondary_trustee?.organ_donation === 1
                        ? "Yes"
                        : "No"
                      : "-"}
                  </Typography>
                )}
              </>
            </Box>
            <Box sx={boxStyle}>
              <>
                <Typography sx={titleStyle}>Perform Autopsy</Typography>
                <Typography sx={inforStyle}>
                  {data?.primary_trustee?.perform_autopsy !== null
                    ? data?.primary_trustee?.perform_autopsy === 1
                      ? "Yes"
                      : "No"
                    : "-"}
                </Typography>{" "}
                {isCouple == 2 && (
                  <Typography sx={inforStyle}>
                    {data?.secondary_trustee?.perform_autopsy !== null
                      ? data?.secondary_trustee?.perform_autopsy === 1
                        ? "Yes"
                        : "No"
                      : "-"}
                  </Typography>
                )}
              </>
            </Box>
            <Typography
              sx={{ mt: 1, pl: 2, fontWeight: "600", fontSize: "14px" }}
            >
              Specific Situations for End of Life
            </Typography>
            {data?.primary_trustee?.situation_categories
              ? Object.keys(data?.primary_trustee?.situation_categories).map(
                  (category: any, index: number) => (
                    <Box key={index} sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        {category.replaceAll("_", " ")}
                      </Typography>
                      <Typography sx={inforStyle} key={index}>
                        {data?.primary_trustee?.situation_categories[
                          `${category}`
                        ] !== null
                          ? data?.primary_trustee?.situation_categories[
                              `${category}`
                            ]
                            ? "Yes"
                            : "No"
                          : "-"}
                      </Typography>{" "}
                      {isCouple == 2 && (
                        <Typography sx={inforStyle}>
                          {data?.secondary_trustee?.situation_categories[
                            `${category}`
                          ] !== null
                            ? data?.secondary_trustee?.situation_categories[
                                `${category}`
                              ]
                              ? "Yes"
                              : "No"
                            : "-"}
                        </Typography>
                      )}
                    </Box>
                  ),
                )
              : "-"}
          </Box>
          {/* {isCouple == 2 && (
            <>
              <Divider sx={{ my: 2, border: "0" }} />
              <Box>
                <Typography
                  sx={{
                    mb: 2,
                    pl: 2,
                    fontWeight: "600",
                    color: "#878787",
                    fontSize: "14px",
                  }}
                >
                  Health decisions Wish (secondary trustee)
                  <Divider
                    sx={{
                      background: "#fda340",
                      height: "3px",
                      width: "20px",
                    }}
                  />
                </Typography>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Health Care Options</Typography>
                  <Typography sx={inforStyle}>
                    {data?.secondary_trustee?.life_authorization
                      ? EndLifeAuthorizationEnum[
                          data?.secondary_trustee?.life_authorization
                        ]
                      : "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Organ Donation</Typography>
                  <Typography sx={inforStyle}>
                    {data?.secondary_trustee?.organ_donation !== null
                      ? data?.secondary_trustee?.organ_donation === 1
                        ? "Yes"
                        : "No"
                      : "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Perform Autopsy</Typography>
                  {data?.secondary_trustee?.perform_autopsy && (
                    <Typography sx={inforStyle}>
                      {data?.secondary_trustee?.perform_autopsy !== null
                        ? data?.secondary_trustee?.perform_autopsy === 1
                          ? "Yes"
                          : "No"
                        : "-"}
                    </Typography>
                  )}
                </Box>
                <Typography
                  sx={{ mt: 1, pl: 2, fontWeight: "600", fontSize: "14px" }}
                >
                  Specific Situations for End of Life
                </Typography>
                {data?.secondary_trustee?.situation_categories
                  ? Object.keys(
                      data?.secondary_trustee?.situation_categories,
                    ).map((category: any, index: number) => (
                      <Box key={index} sx={boxStyle}>
                        <Typography sx={titleStyle}>
                          {category.replaceAll("_", " ")}
                        </Typography>
                        <Typography sx={inforStyle} key={index}>
                          {data?.secondary_trustee?.situation_categories[
                            `${category}`
                          ] !== null
                            ? data?.secondary_trustee?.situation_categories[
                                `${category}`
                              ]
                              ? "Yes"
                              : "No"
                            : "-"}
                        </Typography>
                      </Box>
                    ))
                  : "-"}
              </Box>
            </>
          )} */}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Burial Decisions</Typography>
          <Box>
            <Typography
              sx={{
                mb: 2,
                pl: 2,
                fontWeight: "600",
                color: "#878787",
                fontSize: "14px",
              }}
            >
              Burial decision for primary trustee
              <Divider
                sx={{
                  background: "#fda340",
                  height: "3px",
                  width: "20px",
                }}
              />
            </Typography>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>
                what are your desired plans for your remains after your death?
              </Typography>
              <Typography sx={inforStyle}>
                {BurialEnum[data?.primary_trustee?.burial_decision] || "-"}
              </Typography>
            </Box>
            {data?.primary_trustee?.burial_decision !== 0 && (
              <>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Wish for body laid/cremated
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_trustee?.first_wish || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Wish for funeral or memorial service
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_trustee?.second_wish || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Wish for post-death arrangements
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_trustee?.third_wish || "-"}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          {isCouple == 2 && (
            <>
              <Divider sx={{ my: 2, border: "0" }} />
              <Box>
                <Typography
                  sx={{
                    mb: 2,
                    pl: 2,
                    fontWeight: "600",
                    color: "#878787",
                    fontSize: "14px",
                  }}
                >
                  Burial decision for secondary trustee
                  <Divider
                    sx={{
                      background: "#fda340",
                      height: "3px",
                      width: "20px",
                    }}
                  />
                </Typography>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    what are your desired plans for your remains after your
                    death?
                  </Typography>
                  <Typography sx={inforStyle}>
                    {BurialEnum[data?.secondary_trustee?.burial_decision] ||
                      "-"}
                  </Typography>
                </Box>
                {data?.secondary_trustee?.burial_decision !== 0 && (
                  <>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Wish for body laid/cremated
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_trustee?.first_wish || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Wish for funeral or memorial service
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_trustee?.second_wish || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Wish for post-death arrangements
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_trustee?.third_wish || "-"}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Instructions;
