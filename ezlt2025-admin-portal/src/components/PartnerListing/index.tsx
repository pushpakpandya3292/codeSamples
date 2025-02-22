"use client";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomCard from "@/components/Card";
import { useStats } from "@/provider/stats";
import {
  CLIENT_PORTAL,
  FilterUserEnum,
  MarriageStatusEnum,
  PartnerStatusColors,
  PartnerStatusEnum,
  StatusEnum,
  StatusEnumTimeLine,
} from "@/constant";
import Pageheader from "@/components/PageHeader";
import { useClientListing } from "@/provider/client";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  usePartnerApproveStatus,
  usePartnerListing,
  usePartnerRejectStatus,
} from "@/provider/partner";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CustomModal from "../CustomModal";
import CustomTextField from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton";
import usePaginationState from "@/hooks/usePaginationState";
interface PartnerListingProps {
  status: undefined | string;
}

const PartnerListing: React.FC<PartnerListingProps> = ({ status }) => {
  const [partnerRejectionModal, setPartnerRejectionModal] = useState(false);
  const [partnerRejectionDetails, setPartnerRejectionDetails] = useState("");
  const [partnerRejectionId, setPartnerRejectionId] = useState("");

  const {
    pagination,
    setPagination,
    queryParams,
  } = usePaginationState();

  const partnerListing = usePartnerListing({...queryParams, status: status });

  const {
    rowCount,
  } = usePaginationState(partnerListing?.data?.total);
  const approvePartner = usePartnerApproveStatus({});
  const rejectParter = usePartnerRejectStatus({});

  const handleApprovePartner = async (id: string) => {
    const approvalReuslt = await approvePartner.mutateAsync({ partnerId: id });
    if (approvalReuslt) {
      toast.success("Partner Approved Successfully");
    }
  };
  const handleRejectPartnerDetailsModal = (id: string) => {
    setPartnerRejectionId(id);
    setPartnerRejectionModal(true);
  };
  const handleRejectPartner = async (reason: string) => {
    const approvalReuslt = await rejectParter.mutateAsync({
      partnerId: partnerRejectionId,
      data: { partnerStatusNote: reason },
    });
    if (approvalReuslt) {
      setPartnerRejectionModal(false);
      setPartnerRejectionId("");
      setPartnerRejectionDetails("");
      toast.success("Partner Request Rejected");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      minWidth: status == PartnerStatusEnum.WAITING_APPROVAL ? 250 : 80,
      maxWidth: status == PartnerStatusEnum.WAITING_APPROVAL ? 250 : 80,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={`/dashboard/partners/details/${params.row.id}`}>
            <RemoveRedEyeOutlined sx={{ color: "#4b8ad1" }} />
          </Link>
          {status == PartnerStatusEnum.WAITING_APPROVAL && (
            <>
              {/* <Tooltip title="Approve" placement="top"> */}
              <Button
                variant="contained"
                color="success"
                sx={{ px: 1, color: "#fff", py: 0, textTransform: "none" }}
                onClick={() => handleApprovePartner(params.row.id)}
              >
                {approvePartner.isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Approve"
                )}
              </Button>
              {/* </Tooltip> */}
              {/* <Tooltip title="Reject" placement="top"> */}
              <Button
                variant="outlined"
                color="error"
                sx={{ px: 1, py: 0, textTransform: "none" }}
                onClick={() => handleRejectPartnerDetailsModal(params.row.id)}
              >
                {rejectParter.isLoading &&
                partnerRejectionId == params.row.id ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Reject"
                )}
              </Button>
              {/* </Tooltip> */}
            </>
          )}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="h5"
          sx={{
            //@ts-ignore
            color: PartnerStatusColors[params?.row?.user?.partnerStatus],
            //@ts-ignore
            borderColor: PartnerStatusColors[params?.row?.user?.partnerStatus],

            background: `${
              //@ts-ignore
              PartnerStatusColors[params?.row?.user?.partnerStatus]
            }15`,
            border: "1px solid",
            px: 2,
            borderRadius: "20px",
            width: "fit-content",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {params?.row?.user?.partnerStatus}
        </Typography>
      ),
    },
    {
      field: "fullNameOnLicense",
      headerName: "Full Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "enrollmentStatus",
      headerName: "Enrollment Status",
      flex: 1,
      minWidth: 300,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.enrollmentStatus || "-",
    },
    {
      field: "liscenseState",
      headerName: "Liscense State",
      valueGetter: (params: GridValueGetterParams) =>
        params.row.liscenseState || "-",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "liscenseCRD",
      headerName: "License CRD",
      valueGetter: (params: GridValueGetterParams) =>
        params.row.liscenseCRD || "-",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "primaryLicenseType",
      headerName: "Primary License Type",
      valueGetter: (params: GridValueGetterParams) =>
        params.row.primaryLicenseType || "-",
      flex: 1,
      minWidth: 250,
    },
    // {
    //   field: "tier",
    //   headerName: "Tier",
    //   minWidth: 100,
    //   valueGetter: (params: GridValueGetterParams) => params.row.tier || "-",
    // },
    // {
    //   field: "otherLicense",
    //   headerName: "Other License",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Box sx={{ textWrap: "wrap", lineBreak: "anywhere" }}>
    //       {params.row.otherLicense == null
    //         ? "-"
    //         : params.row.otherLicense.map((item: any) => item).join(", ")}{" "}
    //     </Box>
    //   ),
    //   minWidth: 220,
    // },
    {
      field: "createdAt",
      headerName: "Date Joined",
      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row?.createdAt).format("MM-DD-YYYY") || "-",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "referredBy",
      headerName: "Referred By",
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.referredBy || "-",
      flex: 1,
      minWidth: 150,
    },
  ];

  return (
    <>
      <Box sx={{ height: "70vh", mt: 2 }}>
        <CustomCard>
          <DataGrid
            rowSelection={false}
            rows={partnerListing?.data?.data || []}
            columns={columns}
            getRowId={(row) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            // columnVisibilityModel={columnVisibilityModel}
            slots={{
              toolbar: GridToolbar,
            }}
            loading={partnerListing.isFetching}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            rowCount={rowCount}
            paginationModel={pagination}
            paginationMode="server"
            onPaginationModelChange={setPagination}
          />
        </CustomCard>
      </Box>
      <CustomModal
        width={600}
        open={partnerRejectionModal}
        handleClose={() => {}}
      >
        <Box>
          <Pageheader title="Rejection Reason" />
          <CustomTextField
            value={partnerRejectionDetails}
            placeholder="Add Rejection Reason"
            multiline
            type="email"
            size="small"
            rows={5}
            disabled={rejectParter.isLoading}
            onChange={(e) => setPartnerRejectionDetails(e.target.value)}
            maxRows={5}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <CustomButton
            type="ADD"
            onClick={() => {
              handleRejectPartner(partnerRejectionDetails);
            }}
            width="auto"
            disabled={rejectParter.isLoading}
          >
            {rejectParter.isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Reject"
            )}
          </CustomButton>
          <CustomButton
            type="CANCEL"
            onClick={() => {
              setPartnerRejectionModal(false);
              setPartnerRejectionId("");
              setPartnerRejectionDetails("");
            }}
            disabled={rejectParter.isLoading}
            width="auto"
          >
            Close
          </CustomButton>
        </Box>
      </CustomModal>
    </>
  );
};

export default PartnerListing;
