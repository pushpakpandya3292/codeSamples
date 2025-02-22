import { Box, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import {
  mainBox,
  boxStyle,
  titleStyle,
  inforStyle,
  subBox,
  subHeadingStyle,
} from "../index";

const PeopleInformation = ({ data, isCouple }: any) => {
  const formatedPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters from the phone number
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Check if the cleaned phone number is in the format +1234567890
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phoneNumber;
  };

  return (
    <>
      <Typography
        sx={{ pb: 1, fontSize: "22px", fontWeight: "600", color: "#535f6b" }}
      >
        Step 2 : PEOPLE INFORMATION
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
          <Typography sx={subHeadingStyle}>Our Family</Typography>
          <Box sx={boxStyle} mb={2}>
            <Typography sx={titleStyle}>Living Children</Typography>
            <Typography sx={inforStyle}>
              {data?.living_children?.length > 0 ? "Yes" : "No"}
            </Typography>
          </Box>
          {data?.living_children?.length != 0 && (
            <>
              {data?.living_children.map((el: any, index: number) => (
                <Box key={index}>
                  <Typography
                    sx={{
                      mb: 2,
                      pl: 2,
                      fontWeight: "600",
                      color: "#878787",
                      fontSize: "14px",
                    }}
                  >
                    Living Children {index + 1}
                    <Divider
                      sx={{
                        background: "#fda340",
                        height: "3px",
                        width: "20px",
                      }}
                    />
                  </Typography>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Full Name</Typography>
                    <Typography sx={inforStyle}>{el.fullname}</Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Date of Birth</Typography>
                    <Typography sx={inforStyle}>
                      {moment(el.date_of_birth).format("MM-DD-YYYY")}
                    </Typography>
                  </Box>
                  {/* <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Age</Typography>
                    <Typography sx={inforStyle}>{el.age || "-"}</Typography>
                  </Box> */}
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Email</Typography>
                    <Typography sx={inforStyle}>{el?.email || "-"}</Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Mobile</Typography>
                    <Typography sx={inforStyle}>
                      {formatedPhoneNumber(el.phone_no) || "-"}
                    </Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>
                      Relation with Primary Trustee
                    </Typography>
                    <Typography sx={inforStyle}>
                      {el?.relation_with_primary_trustee || "-"}
                    </Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    {el?.relation_with_secondary_trustee && (
                      <>
                        <Typography sx={titleStyle}>
                          Relation with Secondary Trustee
                        </Typography>
                        <Typography sx={inforStyle}>
                          {el?.relation_with_secondary_trustee || "-"}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box sx={boxStyle}>
                    {el?.relation_with_both_trustee && (
                      <>
                        <Typography sx={titleStyle}>
                          Relation with both
                        </Typography>
                        <Typography sx={inforStyle}>
                          {el?.relation_with_both_trustee || "-"}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Box sx={boxStyle}>
                    {el?.address?.name && (
                      <>
                        <Typography sx={titleStyle}>Address</Typography>
                        <Typography sx={inforStyle}>
                          {el?.address?.name || "-"}
                        </Typography>
                      </>
                    )}
                  </Box>
                  {index !== data?.living_children?.length - 1 && (
                    <Divider sx={{ mt: 2, border: "0" }} />
                  )}
                </Box>
              ))}
            </>
          )}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Deceased Children</Typography>
          <Box sx={boxStyle} mb={2}>
            <Typography sx={titleStyle}>Deceased Children</Typography>
            <Typography sx={inforStyle}>
              {data?.deceased_children?.length > 0 ? "Yes" : "No"}
            </Typography>
          </Box>
          {data?.deceased_children?.length != 0 && (
            <>
              {data?.deceased_children.map((el: any, index: number) => (
                <Box key={index}>
                  <Typography
                    sx={{
                      mb: 2,
                      pl: 2,
                      fontWeight: "600",
                      color: "#878787",
                      fontSize: "14px",
                    }}
                  >
                    Deceased Children {index + 1}
                    <Divider
                      sx={{
                        background: "#fda340",
                        height: "3px",
                        width: "20px",
                      }}
                    />
                  </Typography>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Full Name</Typography>
                    <Typography sx={inforStyle}>{el.fullname}</Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Date of Birth</Typography>
                    <Typography sx={inforStyle}>
                      {moment(el.date_of_birth).format("MM-DD-YYYY")}
                    </Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography sx={titleStyle}>Date of Decease</Typography>
                    <Typography sx={inforStyle}>
                      {moment(el.date_of_decease).format("MM-DD-YYYY")}
                    </Typography>
                  </Box>
                  {index !== data?.deceased_children?.length - 1 && (
                    <Divider sx={{ my: 2, border: "0" }} />
                  )}
                </Box>
              ))}
            </>
          )}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        {isCouple == 2 && (
          <>
            <Box sx={subBox}>
              <Typography sx={subHeadingStyle}>Other Children</Typography>
              {data?.primary_trustee_other_children?.length ? (
                <>
                  {data?.primary_trustee_other_children.map(
                    (el: any, index: number) => (
                      <Box key={index}>
                        <Typography
                          sx={{
                            mb: 2,
                            pl: 2,
                            fontWeight: "600",
                            color: "#878787",
                            fontSize: "14px",
                          }}
                        >
                          Primary Trustee Children {index + 1}
                          <Divider
                            sx={{
                              background: "#fda340",
                              height: "3px",
                              width: "20px",
                            }}
                          />
                        </Typography>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Full Name</Typography>
                          <Typography sx={inforStyle}>{el.fullname}</Typography>
                        </Box>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Date of Birth</Typography>
                          <Typography sx={inforStyle}>
                            {moment(el.date_of_birth).format("MM-DD-YYYY")}
                          </Typography>
                        </Box>
                        {/* <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Age</Typography>
                          <Typography sx={inforStyle}>
                            {el.age || "-"}
                          </Typography>
                        </Box> */}
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Email</Typography>
                          <Typography sx={inforStyle}>
                            {el?.email || "-"}
                          </Typography>
                        </Box>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Mobile</Typography>
                          <Typography sx={inforStyle}>
                            {formatedPhoneNumber(el.phone_no) || "-"}
                          </Typography>
                        </Box>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>
                            Relation with Primary Trustee
                          </Typography>
                          <Typography sx={inforStyle}>
                            {el?.relation_with_trustee || "-"}
                          </Typography>
                        </Box>
                        {el?.relation_with_secondary_trustee && (
                          <>
                            <Box sx={boxStyle}>
                              <Typography sx={titleStyle}>
                                Relation with Secondary Trustee
                              </Typography>
                              <Typography sx={inforStyle}>
                                {el?.relation_with_secondary_trustee || "-"}
                              </Typography>
                            </Box>
                            <Box sx={boxStyle}>
                              <Typography sx={titleStyle}>
                                Relation with Both
                              </Typography>
                              <Typography sx={inforStyle}>
                                {el?.relation_with_secondary_trustee || "-"}
                              </Typography>
                            </Box>
                          </>
                        )}
                        {index !==
                          data?.primary_trustee_other_children?.length - 1 && (
                          <Divider sx={{ my: 2, border: "0" }} />
                        )}
                      </Box>
                    ),
                  )}
                </>
              ) : (
                // <Typography sx={{ color: "gray", fontSize: "14px" }}>
                //   No Primary Trustee Children found !
                // </Typography>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Primary Trustee living children
                  </Typography>
                  <Typography sx={inforStyle}>{"-"}</Typography>
                </Box>
              )}
              {data?.secondary_trustee_other_children?.length ? (
                <>
                  {data?.secondary_trustee_other_children.map(
                    (el: any, index: number) => (
                      <Box key={index}>
                        <Typography
                          sx={{
                            mt: 1,
                            mb: 2,
                            pl: 2,
                            fontWeight: "600",
                            color: "#878787",
                            fontSize: "14px",
                          }}
                        >
                          Secondary Trustee Children {index + 1}
                          <Divider
                            sx={{
                              background: "#fda340",
                              height: "3px",
                              width: "20px",
                            }}
                          />
                        </Typography>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Full Name</Typography>
                          <Typography sx={inforStyle}>{el.fullname}</Typography>
                        </Box>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Date of Birth</Typography>
                          <Typography sx={inforStyle}>
                            {moment(el.date_of_birth).format("MM-DD-YYYY")}
                          </Typography>
                        </Box>
                        {/* <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Age</Typography>
                          <Typography sx={inforStyle}>
                            {el.age || "-"}
                          </Typography>
                        </Box> */}
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Email</Typography>
                          <Typography sx={inforStyle}>
                            {el?.email || "-"}
                          </Typography>
                        </Box>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Mobile</Typography>
                          <Typography sx={inforStyle}>
                            {formatedPhoneNumber(el.phone_no) || "-"}
                          </Typography>
                        </Box>
                        {/* <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>
                            Relation with Primary Trustee
                          </Typography>
                          <Typography sx={inforStyle}>
                            {el?.relation_with_primary_trustee || "-"}
                          </Typography>
                        </Box> */}
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>
                            Relation with Secondary Trustee
                          </Typography>
                          <Typography sx={inforStyle}>
                            {el?.relation_with_trustee || "-"}
                          </Typography>
                        </Box>
                        {/* <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>
                            Relation with Both
                          </Typography>
                          <Typography sx={inforStyle}>
                            {el?.relation_with_secondary_trustee || "-"}
                          </Typography>
                        </Box> */}
                        {index !==
                          data?.secondary_trustee_other_children?.length -
                            1 && <Divider sx={{ my: 2, border: "0" }} />}
                      </Box>
                    ),
                  )}
                </>
              ) : (
                // <Typography sx={{ color: "gray", fontSize: "14px" }}>
                //   No Secondary Trustee Children found !
                // </Typography>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Secondary Trustee living children
                  </Typography>
                  <Typography sx={inforStyle}>{"-"}</Typography>
                </Box>
              )}
            </Box>
            <Divider sx={{ my: 2, border: "0" }} />
          </>
        )}
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Successor Trustees</Typography>
          {data?.primary_successor ? (
            <>
              <Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}></Typography>
                  <Typography sx={titleStyle}>Primary Successor</Typography>
                  <Typography sx={titleStyle}>Secondary Successor</Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Full Name</Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_successor?.fullname}
                  </Typography>{" "}
                  <Typography sx={inforStyle}>
                    {data?.secondary_successor?.fullname || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Email</Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_successor?.email || "-"}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.secondary_successor?.email || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Mobile</Typography>
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(data?.primary_successor?.phone_no) ||
                      "-"}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(data?.secondary_successor?.phone_no) ||
                      "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Primary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_successor?.relation_with_primary_trustee ||
                      "-"}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.secondary_successor?.relation_with_primary_trustee ||
                      "-"}
                  </Typography>
                </Box>
                {data?.primary_successor?.relation_with_secondary_trustee && (
                  <>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Secondary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_successor
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_successor
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Both
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_successor?.relation_with_both_trustee ||
                          "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_successor
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                    </Box>
                  </>
                )}
                {data?.primary_successor?.address?.name && (
                  <>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Address</Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_successor?.address?.name || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_successor?.address?.name || "-"}
                      </Typography>
                    </Box>
                  </>
                )}
                {/* <Divider sx={{ my: 2, border: "0" }} /> */}
              </Box>
            </>
          ) : (
            // <Typography sx={{ color: "gray", fontSize: "14px" }}>
            //   No Primary Successor Trustees found !
            // </Typography>
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Primary Trustee</Typography>
              <Typography sx={inforStyle}>{"-"}</Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>
            Primary Trustee Health Agents
          </Typography>
          {data?.primary_health_agents?.first_agent ? (
            <>
              <Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}></Typography>
                  <Typography sx={titleStyle}>Primary Health Agent</Typography>

                  <Typography sx={titleStyle}>
                    Secondary Health Agent
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Full Name</Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_health_agents?.first_agent?.fullname}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_health_agents?.second_agent?.fullname || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Email</Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_health_agents?.first_agent?.email || "-"}
                  </Typography>{" "}
                  <Typography sx={inforStyle}>
                    {data?.primary_health_agents?.second_agent?.email || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Mobile</Typography>
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(
                      data?.primary_health_agents?.first_agent?.phone_no,
                    ) || "-"}
                  </Typography>{" "}
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(
                      data?.primary_health_agents?.second_agent?.phone_no,
                    ) || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Primary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_health_agents?.first_agent
                      ?.relation_with_primary_trustee || "-"}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_health_agents?.second_agent
                      ?.relation_with_primary_trustee || "-"}
                  </Typography>
                </Box>
                {data?.primary_health_agents?.first_agent
                  ?.relation_with_secondary_trustee && (
                  <>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Secondary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_health_agents?.first_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_health_agents?.second_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Both
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_health_agents?.first_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {data?.primary_health_agents?.second_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                    </Box>
                  </>
                )}
                {data?.primary_health_agents?.first_agent?.address?.name && (
                  <>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Address</Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_health_agents?.first_agent?.address
                          ?.name || "-"}
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {data?.primary_health_agents?.second_agent?.address
                          ?.name || "-"}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </>
          ) : (
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>First Alternate Agent</Typography>
              <Typography sx={inforStyle}>{"-"}</Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        {isCouple == 2 && (
          <>
            <Box sx={subBox}>
              <Typography sx={subHeadingStyle}>
                Secondary Trustee Health Agents
              </Typography>
              {data?.secondary_health_agents?.first_agent ? (
                <>
                  <Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}></Typography>
                      <Typography sx={titleStyle}>
                        Primary Health Agent
                      </Typography>
                      <Typography sx={titleStyle}>
                        Secondary Health Agent
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Full Name</Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.first_agent?.fullname}
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.second_agent
                          ?.fullname || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Email</Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.first_agent?.email ||
                          "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.second_agent?.email ||
                          "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Mobile</Typography>
                      <Typography sx={inforStyle}>
                        {formatedPhoneNumber(
                          data?.secondary_health_agents?.first_agent?.phone_no,
                        ) || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.second_agent
                          ?.phone_no || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Primary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.first_agent
                          ?.relation_with_primary_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.second_agent
                          ?.relation_with_primary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Secondary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.first_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.second_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Both
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.first_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {data?.secondary_health_agents?.second_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                    </Box>
                    {data?.secondary_health_agents?.first_agent?.address
                      ?.name && (
                      <>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Address</Typography>
                          <Typography sx={inforStyle}>
                            {data?.secondary_health_agents?.first_agent?.address
                              ?.name || "-"}
                          </Typography>{" "}
                          <Typography sx={inforStyle}>
                            {data?.secondary_health_agents?.second_agent
                              ?.address?.name || "-"}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>First Alternate Agent</Typography>
                  <Typography sx={inforStyle}>{"-"}</Typography>
                </Box>
              )}
            </Box>
            <Divider sx={{ my: 2, border: 0 }} />
          </>
        )}
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>
            Primary Trustee Financial Agents
          </Typography>
          {data?.primary_financial_agents?.first_agent ? (
            <>
              <Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}></Typography>
                  <Typography sx={titleStyle}>
                    Primary Financial Agent
                  </Typography>
                  <Typography sx={titleStyle}>
                    Secondary Financial Agent
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Full Name</Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_financial_agents?.first_agent?.fullname}
                  </Typography>{" "}
                  <Typography sx={inforStyle}>
                    {data?.primary_financial_agents?.second_agent?.fullname ||
                      "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Email</Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_financial_agents?.first_agent?.email || "-"}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_financial_agents?.second_agent?.email || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Mobile</Typography>
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(
                      data?.primary_financial_agents?.first_agent?.phone_no,
                    ) || "-"}
                  </Typography>{" "}
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(
                      data?.primary_financial_agents?.second_agent?.phone_no,
                    ) || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Primary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_financial_agents?.first_agent
                      ?.relation_with_primary_trustee || "-"}
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.primary_financial_agents?.second_agent
                      ?.relation_with_primary_trustee || "-"}
                  </Typography>
                </Box>
                {data?.primary_financial_agents?.first_agent
                  ?.relation_with_secondary_trustee && (
                  <>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Secondary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_financial_agents?.first_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_financial_agents?.second_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Both
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_financial_agents?.first_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.primary_financial_agents?.second_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </>
          ) : (
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>First Alternate Agent</Typography>
              <Typography sx={inforStyle}>{"-"}</Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        {isCouple == 2 && (
          <>
            <Box sx={subBox}>
              <Typography sx={subHeadingStyle}>
                Secondary Trustee Financial Agents
              </Typography>
              {data?.secondary_financial_agents?.first_agent ? (
                <>
                  <Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}></Typography>
                      <Typography sx={inforStyle}>
                        Primary Financial Agent
                      </Typography>
                      <Typography sx={inforStyle}>
                        Secondary Financial Agent
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Full Name</Typography>
                      <Typography sx={inforStyle}>
                        {
                          data?.secondary_financial_agents?.first_agent
                            ?.fullname
                        }
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.second_agent
                          ?.fullname || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Email</Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.first_agent?.email ||
                          "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.second_agent
                          ?.email || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>Mobile</Typography>
                      <Typography sx={inforStyle}>
                        {formatedPhoneNumber(
                          data?.secondary_financial_agents?.first_agent
                            ?.phone_no,
                        ) || "-"}
                      </Typography>{" "}
                      <Typography sx={inforStyle}>
                        {formatedPhoneNumber(
                          data?.secondary_financial_agents?.second_agent
                            ?.phone_no,
                        ) || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Primary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.first_agent
                          ?.relation_with_primary_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.second_agent
                          ?.relation_with_primary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Secondary Trustee
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.first_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.second_agent
                          ?.relation_with_secondary_trustee || "-"}
                      </Typography>
                    </Box>
                    <Box sx={boxStyle}>
                      <Typography sx={titleStyle}>
                        Relation with Both
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.first_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                      <Typography sx={inforStyle}>
                        {data?.secondary_financial_agents?.second_agent
                          ?.relation_with_both_trustee || "-"}
                      </Typography>
                    </Box>
                    {data?.secondary_financial_agents?.first_agent?.address
                      ?.name && (
                      <>
                        <Box sx={boxStyle}>
                          <Typography sx={titleStyle}>Address</Typography>
                          <Typography sx={inforStyle}>
                            {data?.secondary_financial_agents?.first_agent
                              ?.address?.name || "-"}
                          </Typography>
                          <Typography sx={inforStyle}>
                            {data?.secondary_financial_agents?.second_agent
                              ?.address?.name || "-"}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>First Alternate Agent</Typography>
                  <Typography sx={inforStyle}>{"-"}</Typography>
                </Box>
              )}
            </Box>
            <Divider sx={{ my: 2, border: "0" }} />
          </>
        )}
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Guardians</Typography>
          {data?.guardian?.first_agent ? (
            <>
              <Typography
                sx={{ fontWeight: "600", color: "#878787", fontSize: "14px" }}
              >
                Primary Guardian
                <Divider
                  sx={{
                    background: "#fda340",
                    height: "3px",
                    width: "20px",
                  }}
                />
              </Typography>
              <Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Full Name</Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.first_agent?.fullname}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Email</Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.first_agent?.email || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Mobile</Typography>
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(
                      data?.guardian?.first_agent?.phone_no,
                    ) || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Primary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.first_agent
                      ?.relation_with_primary_trustee || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Secondary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.first_agent
                      ?.relation_with_secondary_trustee || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Relation with Both</Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.first_agent
                      ?.relation_with_secondary_trustee || "-"}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          ) : (
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Primary Trustee</Typography>
              <Typography sx={inforStyle}>{"-"}</Typography>
            </Box>
          )}
          {data?.guardian?.second_agent ? (
            <>
              <Typography
                sx={{ fontWeight: "600", color: "#878787", fontSize: "14px" }}
              >
                Secondary Guardian
                <Divider
                  sx={{
                    background: "#fda340",
                    height: "3px",
                    width: "20px",
                  }}
                />
              </Typography>

              <Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Full Name</Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.second_agent?.fullname}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Email</Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.second_agent?.email || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Mobile</Typography>
                  <Typography sx={inforStyle}>
                    {formatedPhoneNumber(
                      data?.guardian?.second_agent?.phone_no,
                    ) || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Primary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.second_agent
                      ?.relation_with_primary_trustee || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>
                    Relation with Secondary Trustee
                  </Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.second_agent
                      ?.relation_with_secondary_trustee || "-"}
                  </Typography>
                </Box>
                <Box sx={boxStyle}>
                  <Typography sx={titleStyle}>Relation with Both</Typography>
                  <Typography sx={inforStyle}>
                    {data?.guardian?.second_agent
                      ?.relation_with_secondary_trustee || "-"}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2, border: "0" }} />
            </>
          ) : (
            <Box sx={boxStyle}>
              <Typography sx={titleStyle}>Secondary Trustee</Typography>
              <Typography sx={inforStyle}>{"-"}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PeopleInformation;
