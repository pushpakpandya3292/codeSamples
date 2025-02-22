"use client";
import CustomTextField from "@/components/CustomTextField/CustomTextField";
import Pageheader from "@/components/PageHeader";
import { usePartnerDetails } from "@/provider/partner";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  partnerId: string;
}

const PartnerDetails: React.FC<Props> = ({ partnerId }) => {
  // Your component logic here
  const partnerDetails = usePartnerDetails({ partnerId: partnerId });
  return (
    <Box>
      <Pageheader title="Partner Details" />
      <Box>
        <p>Partner Name: {partnerDetails.data?.fullNameOnLicense}</p>
        <p>
          Partner Organisation name: {partnerDetails.data?.organizationName}
        </p>
        <p>
          Partner Enrollment status: {partnerDetails.data?.enrollmentStatus}
        </p>
        <p>Partner Liscense CRD: {partnerDetails.data?.liscenseCRD}</p>
        <p>Rejection Reason: {partnerDetails.data?.user?.partnerStatusNote}</p>
      </Box>
      {/* <CustomTextField
        label={"Update Status"}
        value={statusEditValue}
        onChange={handleStatus}
        size="small"
        select
      >
        {selectedRowData?.status !== "Open" && (
          <MenuItem value={1}>Open</MenuItem>
        )}
        {selectedRowData?.status !== "InProcess" && (
          <MenuItem value={2}>In Process</MenuItem>
        )}
        {selectedRowData?.status !== "Resolved" && (
          <MenuItem value={3}>Resolved</MenuItem>
        )}
      </CustomTextField> */}
    </Box>
  );
};

export default PartnerDetails;
