import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import {
  mainBox,
  boxStyle,
  titleStyle,
  inforStyle,
  subBox,
  subHeadingStyle,
} from "../index";
import { useCart } from "@/provider/Cart";
import {
  DeliveryOptionEnum,
  MarriageStatusEnum,
  SubMarriageStatusEnum,
} from "@/constant";
interface Trustee {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  address: any;
  order: number;
  citizenship_status: string;
  employment_status: string;
  date_of_birth: string;
  estimated_annual_income: number;
  gender: number;
}

interface root {
  marriage_status: number;
  sub_marriage_status: number;
  trust_name: string;
  trust_type: number;
  trust_date: any;
  primary_trustee: Trustee;
  secondary_trustee: Trustee;
}
interface IPersonalInformationProps {
  data: any;
  clientId: string;
}

enum GenderEnum {
  "Male" = 1,
  "Female" = 2,
}
export enum TrustEnum {
  "New" = 1,
  "Restated" = 2,
}

export enum ShippedToEnum {
  "ME" = "Ship to someone else",
  "PRIMARY" = "Shipped to Primary Trustee",
  "PICKUP" = "Pick-up ONLY",
  "PICKUPNOTARY" = "Pick-up and Notarize in the EZ Living Trust office",
}
const PersonalInformation = ({ data, clientId }: IPersonalInformationProps) => {
  // const { data: OnBoardingData, isLoading } = useCart({ id: clientId });
  const formatPhoneNumber = (phoneNumber: string) => {
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
        sx={{
          pb: 1,
          fontSize: "22px",
          fontWeight: "600",
          color: "#535f6b",
          mt: -5,
        }}
      >
        At A Glance
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          p: 2,
          boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
          background: "#fcfcfc",
          width: "70%",
          mb: "30px",
        }}
      >
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>User</Typography>
          <Typography sx={inforStyle}>{data?.userName || "-"}</Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Ownership</Typography>
          <Typography sx={inforStyle}>
            {data?.endUser},{" "}
            {data?.clientDetail?.personal_form?.primary_trustee?.first_name
              ? data?.clientDetail?.personal_form?.primary_trustee?.first_name
              : "-"}{" "}
            {data?.clientDetail?.personal_form?.primary_trustee?.last_name
              ? data?.clientDetail?.personal_form?.primary_trustee?.last_name
              : "-"}
            {data?.clientDetail?.personal_form?.secondary_trustee?.first_name
              ? `, ${data?.clientDetail?.personal_form?.secondary_trustee?.first_name}`
              : ""}
            {data?.clientDetail?.personal_form?.secondary_trustee?.last_name
              ? data?.clientDetail?.personal_form?.secondary_trustee?.last_name
              : ""}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Trust Name</Typography>
          <Typography sx={inforStyle}>
            {data?.clientDetail?.personal_form?.trust_name || "-"}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Actions</Typography>
          <Typography sx={inforStyle}>
            {data?.clientDetail?.officialize_form?.delivery_option || "-"}
          </Typography>
        </Box>

        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Delivery Method</Typography>
          <Typography sx={inforStyle}>
            {data?.clientDetail?.officialize_form?.estate_plan_binder || "-"}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Shipping Instructions</Typography>
          <Typography sx={inforStyle}>
            {data?.clientDetail?.officialize_form?.shipped_to || "-"}
          </Typography>
        </Box>

        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Delivery Person</Typography>
          <Typography sx={inforStyle}>
            {data?.clientDetail?.officialize_form?.delivery_option ==
            DeliveryOptionEnum.SHIP
              ? data?.clientDetail?.officialize_form?.shipped_to ==
                ShippedToEnum.PRIMARY
                ? `${data?.clientDetail?.personal_form?.primary_trustee?.first_name} ${data?.clientDetail?.personal_form?.primary_trustee?.last_name}`
                : data?.clientDetail?.officialize_form?.shipping_name_for_doc
              : "None"}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Delivery Address</Typography>
          <Typography sx={inforStyle}>
            {data?.clientDetail?.officialize_form?.delivery_option ==
            DeliveryOptionEnum.SHIP
              ? data?.clientDetail?.officialize_form?.shipped_to ==
                ShippedToEnum.PRIMARY
                ? data?.clientDetail?.personal_form?.primary_trustee?.address
                    ?.name
                : data?.clientDetail?.officialize_form?.shipping_address_for_doc
                    ?.name
              : "Office"}
          </Typography>
        </Box>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Quit claims</Typography>
          <Typography sx={inforStyle}>{data?.quitClaims}</Typography>
        </Box>
      </Box>

      <Typography
        sx={{ pb: 1, fontSize: "22px", fontWeight: "600", color: "#535f6b" }}
      >
        Step 1 : ACCOUNT SETUP
      </Typography>
      <Box
        sx={{
          background: "#fcfcfc",
          width: "70%",
        }}
      >
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>{`Ownership`}</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Who is this document for?</Typography>
            <Typography sx={inforStyle}>{data?.endUser || "-"}</Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Martial Status</Typography>
            <Typography sx={inforStyle}>
              {MarriageStatusEnum[
                data?.clientDetail?.personal_form?.marriage_status
              ] || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Sub Marriage Status</Typography>
            <Typography sx={inforStyle}>
              {SubMarriageStatusEnum[
                data?.clientDetail?.personal_form?.sub_marriage_status
              ] || "-"}
            </Typography>
          </Box>
          {data?.clientDetail?.personal_form?.sub_marriage_status ===
            SubMarriageStatusEnum.Widowed && (
            <>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>
                  Deceased Spouse's Full Name
                </Typography>
                <Typography sx={inforStyle}>
                  {data?.clientDetail?.estate_primary_form?.died_person || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Spouse's deceased date</Typography>
                <Typography sx={inforStyle}>
                  {moment
                    .utc(data?.clientDetail?.estate_primary_form?.deceased_date)
                    .format("MM-DD-YYYY") || "-"}
                </Typography>
              </Box>
            </>
          )}
          {data?.clientDetail?.personal_form?.sub_marriage_status ===
            SubMarriageStatusEnum.Divorced && (
            <>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Ex-Spouse's Full Name</Typography>
                <Typography sx={inforStyle}>
                  {data?.clientDetail?.estate_primary_form
                    ?.last_married_person || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyle}>
                <Typography sx={titleStyle}>Divorce date</Typography>
                <Typography sx={inforStyle}>
                  {moment
                    .utc(data?.clientDetail?.estate_primary_form?.divorce_date)
                    .format("MM-DD-YYYY") || "-"}
                </Typography>
              </Box>
            </>
          )}
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Resident State</Typography>
            <Typography sx={inforStyle}>{data?.state || "-"}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>{`Qualifications`}</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>
              I agree with the statements below for this trust and Estate Plan.
            </Typography>
            <Typography sx={inforStyle}>Yes</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>{`Trustees Information`}</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}></Typography>
            <Typography sx={titleStyle}>Primary Trustee</Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={titleStyle}>Secondary Trustee</Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>First Name</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.first_name
                ? data?.clientDetail?.personal_form?.primary_trustee?.first_name
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee
                  ?.first_name
                  ? data?.clientDetail?.personal_form?.secondary_trustee
                      ?.first_name
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Middle Name</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.middle_name
                ? data?.clientDetail?.personal_form?.primary_trustee
                    ?.middle_name
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee
                  ?.middle_name
                  ? data?.clientDetail?.personal_form?.secondary_trustee
                      ?.middle_name
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Last Name</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.last_name
                ? data?.clientDetail?.personal_form?.primary_trustee?.last_name
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee?.last_name
                  ? data?.clientDetail?.personal_form?.secondary_trustee
                      ?.last_name
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Email</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.email
                ? data?.clientDetail?.personal_form?.primary_trustee?.email
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee?.email
                  ? data?.clientDetail?.personal_form?.secondary_trustee?.email
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Address</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.address?.name
                ? data?.clientDetail?.personal_form?.primary_trustee?.address
                    ?.name
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee?.address
                  ?.name
                  ? data?.clientDetail?.personal_form?.secondary_trustee
                      ?.address?.name
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>County</Typography>
            <Typography sx={inforStyle}>
              {
                //@ts-ignore
                data?.clientDetail?.personal_form?.primary_trustee?.county
                  ? //@ts-ignore
                    data?.clientDetail?.personal_form?.primary_trustee?.county
                  : "-"
              }
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {
                  //@ts-ignore
                  data?.clientDetail?.personal_form?.secondary_trustee?.county
                    ? //@ts-ignore
                      data?.clientDetail?.personal_form?.secondary_trustee
                        ?.county
                    : "-"
                }
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Mobile</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.phone_no
                ? formatPhoneNumber(
                    data?.clientDetail?.personal_form?.primary_trustee
                      ?.phone_no,
                  )
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee?.phone_no
                  ? formatPhoneNumber(
                      data?.clientDetail?.personal_form?.secondary_trustee
                        ?.phone_no,
                    )
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Date of Birth</Typography>

            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.date_of_birth
                ? moment
                    .utc(
                      data?.clientDetail?.personal_form?.primary_trustee
                        ?.date_of_birth,
                    )
                    .format("MM-DD-YYYY")
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee
                  ?.date_of_birth
                  ? moment
                      .utc(
                        data?.clientDetail?.personal_form?.secondary_trustee
                          ?.date_of_birth,
                      )
                      .format("MM-DD-YYYY")
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Gender</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee?.gender
                ? GenderEnum[
                    data?.clientDetail?.personal_form?.primary_trustee?.gender
                  ]
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee?.gender
                  ? GenderEnum[
                      data?.clientDetail?.personal_form?.secondary_trustee
                        ?.gender
                    ]
                  : "-"}
              </Typography>
            )}
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Citizenship</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.primary_trustee
                ?.citizenship_status
                ? data?.clientDetail?.personal_form?.primary_trustee
                    ?.citizenship_status
                : "-"}
            </Typography>
            {data?.clientDetail?.personal_form?.marriage_status == 2 && (
              <Typography sx={inforStyle}>
                {data?.clientDetail?.personal_form?.secondary_trustee
                  ?.citizenship_status
                  ? data?.clientDetail?.personal_form?.secondary_trustee
                      ?.citizenship_status
                  : "-"}
              </Typography>
            )}
          </Box>
        </Box>
        <Divider sx={{ my: 2, border: "0" }} />
        <Box sx={subBox}>
          <Typography sx={subHeadingStyle}>Trust Type and Name</Typography>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Trust Type</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.trust_type
                ? TrustEnum[data?.clientDetail?.personal_form?.trust_type]
                : "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography sx={titleStyle}>New Living Trust Name</Typography>
            <Typography sx={inforStyle}>
              {data?.clientDetail?.personal_form?.trust_name || "-"}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            {data?.clientDetail?.personal_form?.trust_type === 2 && (
              <>
                <Typography sx={titleStyle}>
                  Original Living Trust Date
                </Typography>
                <Typography sx={inforStyle}>
                  {data?.clientDetail?.personal_form?.trust_type === 2
                    ? data?.clientDetail?.personal_form?.trust_date
                    : "-"}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
      {/* {isLoading ? (
        <></>
      ) : ( */}
      {/* // )} */}
    </>
  );
};

export default PersonalInformation;
