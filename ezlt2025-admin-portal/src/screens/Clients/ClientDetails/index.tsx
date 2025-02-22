"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import moment from "moment";
import Image from "next/image";
import { usePDF, Resolution, Margin } from "react-to-pdf";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
  Backdrop,
  MenuItem,
  styled,
} from "@mui/material";

import CustomCard from "@/components/Card";
import SideDrawer from "@/components/Drawer";
import Pageheader from "@/components/PageHeader";
import { useClientDetail } from "@/provider/client/clientDetails";

import Estate from "./Tabs/Estate";
import Services from "./Tabs/Services";
import Officialize from "./Tabs/Officialize";
import Instructions from "./Tabs/Instructions";
import PersonalInformation from "./Tabs/Personal";
import PackageSummary from "./Tabs/PackageSummary";
import PropertyDetails from "./Tabs/PropertyDetails";
import PeopleInformation from "./Tabs/PeopleInformation";
import UploadedDocuments from "./Tabs/UploadedDocuments";
import QuestionnaireDocument from "./Tabs/QuestionnaireDocument";
import OnBoardingInfo from "./Tabs/OnBoardingInfo";
import dynamic from "next/dynamic";
import CartStatusChip from "@/components/CartStatusChip";
import {
  filtersQuestionnaire,
  FilterUserChipEnum,
  FilterUserEnum,
  getKeyOfEnum,
  getMainStatus,
  MarriageStatusEnum,
} from "@/constant";
import { BoxWrapper } from "@/components/BoxWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import StatusChip from "@/components/StatusChip";

const Editor = dynamic(() => import("@/components/EmailComposer"), {
  ssr: false,
});

interface IClientDetailsProps {
  clientId: string;
}
export const mainBox = {
  borderRadius: 2,
  p: 2,
  boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
  background: "#fcfcfc",
  width: "100%",
};
export const subBox = {
  // borderRadius: "16px",
  borderTopRightRadius: "16px",
  borderTopLeftRadius: "16px",
  boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
  background: "#fcfcfc",
};
export const boxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  width: "100%",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  padding: "0 15px",
};
export const titleStyle = {
  fontSize: "14px",
  color: "#000000",
  marginBottom: "0",
  fontWeight: "800",
  width: "40%",
  padding: "6px 0",
};
export const subHeadingStyle = {
  pb: 1,
  fontSize: "18px",
  fontWeight: "700",
  color: "#333",
  background: (theme: any) => theme.additionalColors?.lightBlue,
  borderTopRightRadius: "16px",
  borderTopLeftRadius: "16px",
  px: 2,
  py: 1,
  mb: 2,
};
export const inforStyle = {
  fontWeight: "400",
  borderLeft: "1px solid #ccc",
  padding: "6px 10px",
  width: "60%",
  fontSize: "14px",
};

const boxStyleForBoxes = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
};
const titleStyleForBoxes = {
  fontSize: "14px",
  color: "#000000",
  marginBottom: "0",
  fontWeigth: "500",
  width: "45%",
  padding: "2px 0",
};
const inforStyleForBoxes = {
  fontWeight: "500",
  fontSize: "14px",
  width: "55%",
};

const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    marginTop: "10px",
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "#073763",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    background: "#E3E3E3",
    "&.Mui-selected": {
      background: "#4B8AD1",
      color: "white",
    },
    "&.Mui-disabled": {
      color: "#E3E3E3",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  }),
);

const ClientDetails = ({ clientId }: IClientDetailsProps) => {
  const router = useRouter();
  const [value, setValue] = useState("1");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    data: profileDetail,
    isLoading: usersLoading,
    isFetching: userFetching,
    refetch: refetchProfile,
  } = useClientDetail({ id: clientId });
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const { toPDF, targetRef } = usePDF({
    filename: `${profileDetail?.clientDetail?.personal_form?.primary_trustee?.first_name} ${profileDetail?.clientDetail?.personal_form?.primary_trustee?.last_name} - ${profileDetail?.clientDetail?.personal_form?.trust_name}`,
    resolution: Resolution.NORMAL,
    page: {
      margin: Margin.SMALL,
    },
    overrides: {
      pdf: {
        compress: true,
      },
    },
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          mt: 1,
        }}
      >
        <Pageheader
          isBack
          title="Questionnaire Summary "
          active={
            usersLoading
              ? ""
              : `${profileDetail?.clientDetail?.personal_form?.trust_name}`
          }
        />
        <Button onClick={() => setDrawerOpen(true)} variant="contained">
          Compose Email
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <CustomCard padding={"0px"}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  background: (theme) => theme.additionalColors?.lightBlue,
                  borderTopRightRadius: "16px",
                  borderTopLeftRadius: "16px",
                  px: 2,
                  py: 1,
                  mb: 2,
                }}
              >
                User Overview
              </Typography>

              <Box sx={{ ...boxStyleForBoxes }}>
                <Typography sx={titleStyleForBoxes}>User Name</Typography>
                <Typography
                  sx={{
                    ...inforStyleForBoxes,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    if (!usersLoading) {
                      router.push(
                        `/dashboard/user-account/detail/${profileDetail?.userId}`,
                      );
                    }
                  }}
                >
                  {profileDetail?.userName || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>User Email</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.userEmail || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Referal Partner</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.referralPartner || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>
                  User Established
                </Typography>
                <Typography sx={inforStyleForBoxes}>
                  {moment(profileDetail?.userEstablished).format("MM-DD-YYYY")}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}># of Docs</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.noOfDocs}
                </Typography>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard padding={"0px"}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  background: (theme) => theme.additionalColors?.lightBlue,
                  borderTopRightRadius: "16px",
                  borderTopLeftRadius: "16px",
                  px: 2,
                  py: 1,
                  mb: 1,
                }}
              >
                Document Overview
              </Typography>

              <Box sx={{ ...boxStyleForBoxes }}>
                <Typography sx={titleStyleForBoxes}>User Name</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.userName || "-"}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Package</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.clientDetail?.personal_form?.marriage_status
                    ? `LT-${
                        profileDetail?.clientDetail?.personal_form
                          ?.marriage_status === MarriageStatusEnum.Couple
                          ? "C"
                          : "I"
                      } `
                    : "-"}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Trust Name</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.clientDetail?.personal_form?.trust_name ||
                    "-"}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Primary Trustee</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.clientDetail?.personal_form?.primary_trustee
                    ?.first_name &&
                  profileDetail?.clientDetail?.personal_form?.primary_trustee
                    ?.last_name
                    ? `${profileDetail?.clientDetail?.personal_form?.primary_trustee?.first_name} ${profileDetail?.clientDetail?.personal_form?.primary_trustee?.last_name}`
                    : "-"}
                </Typography>
              </Box>
              {profileDetail?.clientDetail?.personal_form
                ?.secondary_trustee && (
                <Box sx={boxStyleForBoxes}>
                  <Typography sx={titleStyleForBoxes}>
                    Secondary Trustee
                  </Typography>
                  <Typography sx={inforStyleForBoxes}>
                    {`${profileDetail?.clientDetail?.personal_form?.secondary_trustee?.first_name} ${profileDetail?.clientDetail?.personal_form?.secondary_trustee?.last_name}` ||
                      "-"}
                  </Typography>
                </Box>
              )}
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Quit Claims</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.quitClaims}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Resident state</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.state || "-"}
                </Typography>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard padding={"0px"}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  background: (theme) => theme.additionalColors?.lightBlue,
                  borderTopRightRadius: "16px",
                  borderTopLeftRadius: "16px",
                  px: 2,
                  py: 1,
                  mb: 1,
                }}
              >
                Document Actions
              </Typography>

              <Box sx={{ ...boxStyleForBoxes }}>
                <Typography sx={titleStyleForBoxes}>Main Status</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.filterUserStatus && (
                    <StatusChip
                      status={getMainStatus(
                        filtersQuestionnaire,
                        profileDetail?.filterUserStatus,
                      )}
                    />
                  )}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Status</Typography>
                <Typography sx={inforStyleForBoxes}>
                  <StatusChip
                    status={
                      FilterUserChipEnum[
                        getKeyOfEnum(
                          FilterUserEnum,
                          profileDetail?.filterUserStatus,
                        ) as keyof typeof FilterUserChipEnum
                      ]
                    }
                  />
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Action</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.clientDetail?.officialize_form
                    ?.delivery_option || "-"}
                </Typography>
              </Box>
              {/* <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Deliver to</Typography>
                <Typography sx={inforStyleForBoxes}>-</Typography>
              </Box> */}
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Days</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.days}
                </Typography>
              </Box>
              <Box sx={boxStyleForBoxes}>
                <Typography sx={titleStyleForBoxes}>Days Out</Typography>
                <Typography sx={inforStyleForBoxes}>
                  {profileDetail?.daysOut}
                </Typography>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          {/* <StyledTab label="Onboarding Info" value="1" sx={{ color: "#000" }} /> */}
          <StyledTab
            label="Questionnaire Summary"
            value="1"
            sx={{ color: "#000" }}
          />
          <StyledTab
            label="Property Quit Claim"
            value="2"
            sx={{ color: "#000" }}
          />
          <StyledTab label="Summary Payment" value="3" sx={{ color: "#000" }} />
          {/* <StyledTab
            label="Questionnaire Document"
            value="4"
            sx={{ color: "#000" }}
          /> */}
          <StyledTab label="Documents" value="4" sx={{ color: "#000" }} />
        </TabList>

        {usersLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CustomCard autoHeight>
            <Box>
              <TabPanel value="1" sx={{ px: 0 }}>
                {/* Personal Information */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="contained" onClick={() => toPDF()}>
                    Download PDF
                  </Button>
                </Box>
                <Box ref={targetRef}>
                  {/* <OnBoardingInfo clientId={clientId} />
                  <Box sx={{ py: 1 }}></Box> */}
                  <PersonalInformation
                    clientId={clientId}
                    data={profileDetail}
                  />
                  <Box sx={{ py: 1 }}></Box>
                  {/* People Information */}
                  <PeopleInformation
                    data={profileDetail?.clientDetail?.people_form}
                    isCouple={
                      profileDetail?.clientDetail?.personal_form
                        ?.marriage_status
                    }
                  />
                  <Box sx={{ py: 1 }}></Box>
                  {/* Instructions */}
                  <Instructions
                    data={profileDetail?.clientDetail?.instructions_form}
                    isCouple={
                      profileDetail?.clientDetail?.personal_form
                        ?.marriage_status
                    }
                  />
                  <Box sx={{ py: 1 }}></Box>
                  {/* Estate */}
                  <Estate
                    data={profileDetail?.clientDetail?.estate_primary_form}
                  />

                  <Box sx={{ py: 1 }}></Box>
                  {/* Officialize */}
                  <Officialize
                    data={profileDetail?.clientDetail?.officialize_form}
                    isCouple={
                      profileDetail?.clientDetail?.personal_form
                        ?.marriage_status
                    }
                  />

                  <Box sx={{ py: 1 }}></Box>
                  {/* Services */}
                  <Services
                    data={profileDetail?.clientDetail?.service_form}
                    clientDetails={profileDetail?.clientDetail?.personal_form}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                {/* Property Details */}
                <PropertyDetails
                  data={profileDetail?.clientDetail?.estate_primary_form}
                />
              </TabPanel>
              <TabPanel value="3" sx={{ px: 0, pt: 0 }}>
                <PackageSummary userId={clientId} />
              </TabPanel>
              {/* <TabPanel value="4">
                <QuestionnaireDocument
                  clientDetailId={profileDetail?.clientDetailId}
                  userId={profileDetail?.userId}
                />
              </TabPanel> */}
              <TabPanel value="4" sx={{ px: 0 }}>
                <UploadedDocuments
                  clientDetailId={profileDetail?.clientDetailId}
                  userId={profileDetail?.userId}
                />
              </TabPanel>
            </Box>
          </CustomCard>
        )}
      </TabContext>

      <Backdrop
        sx={{
          color: "#fff",
        }}
        open={drawerOpen}
      >
        <SideDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          title="New Message"
        >
          {profileDetail?.userEmail && (
            <Editor
              userEmail={profileDetail?.userEmail}
              drawerOpen={drawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
        </SideDrawer>
      </Backdrop>
    </>
  );
};

export default ClientDetails;
