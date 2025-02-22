"use client";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import { open, inprocess, resolved } from "@/assets/icons";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Image from "next/image";
import { useSupportListing, useSupportStatusUpdate } from "@/provider/support";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import { ChangeEvent, useState } from "react";
import CustomTextField from "@/components/CustomTextField/CustomTextField";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SideDrawer from "@/components/Drawer";
import dynamic from "next/dynamic";
import usePaginationState from "@/hooks/usePaginationState";
import { useStats } from "@/provider/stats";
const Editor = dynamic(() => import("@/components/EmailComposer"), {
  ssr: false,
});

export enum SupportStatusEnum {
  "Open" = 1,
  "InProcess" = 2,
  "Resolved" = 3,
}

const filters = [
  {
    value: SupportStatusEnum.Open,
    name: "Open",
  },
  { value: SupportStatusEnum.InProcess, name: "In Process" },
  { value: SupportStatusEnum.Resolved, name: "Resolved" },
];

interface SelectedRowDataProp {
  id: string | undefined;
  contactBy: number;
  name: string;
  email: string;
  mobile: string;
  topic: string;
  message: string;
  status: string;
}

interface ISupport {
  id: string;
  name: string;
  email: string;
  mobile: string;
  topic: string;
  message: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  contactBy: string;
  user: string;
}
[];

export const SupportListingColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    flex: 1,
  },
  {
    field: "contactBy",
    headerName: "Contact me by",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      let statusColor = "";
      let statusBoderColor = "";
      let statusBackground = "";
      switch (params.value) {
        case "Open":
          statusColor = "#e74c3c";
          (statusBoderColor = "#e74c3c"), (statusBackground = "#e74c3c17");
          break;
        case "InProcess":
          statusColor = "#f1c40f";
          (statusBoderColor = "#f1c40f"), (statusBackground = "#f1c40f12");
          break;
        case "Resolved":
          statusColor = "#2ecc71";
          (statusBoderColor = "#2ecc71"), (statusBackground = "#2ecc711a");
          break;
        default:
          statusColor = "black";
          (statusBoderColor = "black"), (statusBackground = "black");
          break;
      }
      return (
        <Typography
          sx={{
            color: statusColor,
            borderColor: statusBoderColor,
            background: statusBackground,
            fontWeight: 500,
            fontSize: "12px",
            fontFamily: "Roboto",
            padding: "10px 30px",
            borderRadius: "20px",
          }}
        >
          {params.value}
        </Typography>
      );
    },
  },
];

const SupportListing = () => {
  const [statusEdit, setStatusEdit] = useState(false);
  const [statusEditValue, setStatusEditValue] = useState("");
  const [filterId, setFilterId] = useState<number>(1);
  const [detailView, setDetailView] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<SelectedRowDataProp>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const stats = useStats({});

  const {
    pagination,
    setPagination,
    queryParams,
  } = usePaginationState();

  const supportListing = useSupportListing({
    ...queryParams,
    filterId: filterId,
  });

  const {
    rowCount,
  } = usePaginationState(supportListing?.data?.total);

  const statusUpdate = useSupportStatusUpdate({
    id: selectedRowData?.id || "",
  });

  const [openStatusCount, inProcessStatusCount, resolvedStatusCount] = [
    stats?.data?.total_open_support_statuses,
    stats?.data?.total_inprocess_support_statuses,
    stats?.data?.total_resolved_support_statuses,
  ];

  // const filteredData = supportListing?.data?.data?.filter(
  //   (row) => row.status === SupportStatusEnum[filterId],
  // );
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = (_email: string) => {
    setUserEmail(_email);
    setDrawerOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RemoveRedEyeOutlined
            onClick={() => {
              setSelectedRowData(params.row);
              setDetailView(true);
            }}
            sx={{ color: "#4b8ad1", cursor: "pointer" }}
          />
          <EmailOutlinedIcon
            onClick={() => handleDrawerOpen(params.row?.email)}
            sx={{ color: "#4b8ad1", cursor: "pointer" }}
            fontSize="small"
          />
        </Box>
      ),
    },
    ...SupportListingColumn,
  ];

  const handleCloseDetailView = () => {
    setDetailView(false);
    setStatusEdit(false);
  };
  const handleStatus = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    statusUpdate?.mutate(
      {
        id: selectedRowData?.id,
        status: Number(event.target.value),
      },
      {
        onSuccess: () => {
          setDetailView(false);
          setStatusEdit(false);
        },
      },
    );
    setStatusEdit(false);
  };

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
        <Pageheader title="Support Listing" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard border={filterId === 1 ? "3px solid #fba440" : "0px"}>
              <Box
                onClick={() => setFilterId(1)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                  cursor: "pointer",
                }}
              >
                <Image src={open} width={64} height={64} alt="user" />
                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    {openStatusCount}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    Open
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard border={filterId === 2 ? "3px solid #fba440" : "0px"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                  cursor: "pointer",
                }}
                onClick={() => setFilterId(2)}
              >
                <Image src={inprocess} width={64} height={64} alt="user" />
                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    {inProcessStatusCount}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    In Process
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard border={filterId === 3 ? "3px solid #fba440" : "0px"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                  cursor: "pointer",
                }}
                onClick={() => setFilterId(3)}
              >
                <Image src={resolved} width={64} height={64} alt="user" />
                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    {resolvedStatusCount}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    Resolved
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
      </Grid>
      <Box sx={{ height: "70vh", mt: 2 }}>
        <CustomCard>
          <DataGrid
            rowSelection={false}
            // rows={filteredData || []}
            rows={supportListing?.data?.data || []}
            columns={columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            slots={{
              toolbar: GridToolbar,
            }}
            loading={supportListing.isFetching}
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
        open={detailView}
        handleClose={handleCloseDetailView}
      >
        {selectedRowData && (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h5"
                  sx={{
                    // fontSize: "22px",
                    fontWeight: "600",
                    marginBottom: "0",
                  }}
                >
                  Detail Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  {statusUpdate?.isLoading ? (
                    <Stack alignItems="center">
                      <CircularProgress size="1rem" />
                    </Stack>
                  ) : statusEdit ? (
                    <CustomTextField
                      label={"Select a Option"}
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
                    </CustomTextField>
                  ) : (
                    <Typography
                      sx={{
                        color:
                          selectedRowData?.status === "Open"
                            ? "#e74c3c"
                            : selectedRowData?.status === "InProcess"
                            ? "#f1c40f"
                            : "#2ecc71",
                        borderColor:
                          selectedRowData?.status === "Open"
                            ? "#e74c3c"
                            : selectedRowData?.status === "InProcess"
                            ? "#f1c40f"
                            : "#2ecc71",
                        background:
                          selectedRowData?.status === "Open"
                            ? "#e74c3c17"
                            : selectedRowData?.status === "InProcess"
                            ? "#f1c40f12"
                            : "#2ecc711a",
                        border: "1px solid",
                        padding: "0px 20px",
                        height: "40px",
                        lineHeight: "40px",
                        borderRadius: "20px",
                      }}
                    >
                      {selectedRowData?.status}
                    </Typography>
                  )}
                  {statusEdit ? (
                    <CloseIcon onClick={() => setStatusEdit(false)} />
                  ) : (
                    <DriveFileRenameOutlineOutlinedIcon
                      onClick={() => setStatusEdit(true)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Contact Me By
                </Typography>
                <Typography>{selectedRowData?.contactBy}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Name
                </Typography>
                <Typography>{selectedRowData?.name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Email
                </Typography>
                <Typography>{selectedRowData?.email}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Mobile
                </Typography>
                <Typography>{selectedRowData?.mobile}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Topic
                </Typography>
                <Typography>{selectedRowData?.topic}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "18px", fontWeight: "500" }}
                >
                  Message
                </Typography>
                <Typography>{selectedRowData?.message}</Typography>
              </Grid>
            </Grid>
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton
            type="CANCEL"
            onClick={handleCloseDetailView}
            width="auto"
          >
            Close
          </CustomButton>
        </Box>
      </CustomModal>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={drawerOpen}
      >
        <SideDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          title="New Message"
        >
          {userEmail && (
            <Editor
              userEmail={userEmail}
              drawerOpen={drawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
        </SideDrawer>
      </Backdrop>
    </>
  );
};

export default SupportListing;
