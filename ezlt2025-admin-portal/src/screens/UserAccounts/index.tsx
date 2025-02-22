"use client";

import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import LaunchIcon from "@mui/icons-material/Launch";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { useClientListing } from "@/provider/client";
import { useClientRedirect } from "@/provider/ClientLogin";
import { toast } from "react-toastify";
import { CLIENT_PORTAL, filtersUsersList } from "@/constant";
import usePaginationState from "@/hooks/usePaginationState";
import { useStats } from "@/provider/stats";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useActivateUser,
  useDeactivateUser,
  useDeleteUser,
} from "@/provider/client/clientDetails";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const UserAccounts = () => {
  const stats: any = useStats({});
  const [filterId, setFilterId] = useState<string | undefined>(
    filtersUsersList?.filters?.[0]?.value,
  );
  const { pagination, setPagination, queryParams } = usePaginationState();

  const clientListing = useClientListing({
    ...queryParams,
    filterId,
  });

  const { rowCount } = usePaginationState(clientListing?.data?.total);

  const clientRedirect = useClientRedirect();

  const [deleteReason, setDeleteReason] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  type ConfirmationType = "delete" | "suspend" | "unsuspend";
  const confirmationTypes: ConfirmationType[] = ["suspend", "unsuspend"];

  const [confirmationDialog, setConfirmationDialog] = useState<
    Record<ConfirmationType, boolean>
  >({
    delete: false,
    suspend: false,
    unsuspend: false,
  });
  const [selectedUser, setSelectedUser] = useState<string>("");

  const deactivateUser = useDeactivateUser({
    id: selectedUser,
    reason: deleteReason,
  });

  const activateUser = useActivateUser({
    id: selectedUser,
  });
  const deleteUser = useDeleteUser({
    id: selectedUser,
  });

  const handleConfirmation = (type: ConfirmationType, data: any) => {
    setConfirmationDialog((prev) => ({ ...prev, [type]: true }));
    setSelectedUser(data?.id);
  };

  const handleCancel = (type: ConfirmationType) => {
    setConfirmationDialog((prev) => ({ ...prev, [type]: false }));
    setSelectedUser("");
    if (type === "delete") {
      setDeleteConfirmed(false);
      setDeleteReason("");
    }
  };

  const handleAction = (action: "delete" | "suspend" | "unsuspend") => {
    const actionMap = {
      delete: deleteUser,
      suspend: deactivateUser,
      unsuspend: activateUser,
    };

    const mutation = actionMap[action];

    if (!selectedUser) return;

    mutation.mutate(selectedUser, {
      onSuccess: () => {
        setConfirmationDialog((prev) => ({ ...prev, [action]: false }));
        toast.success(
          `User ${action}${action === "delete" ? "d" : "ed"} successfully`,
        );
        setSelectedUser("");
        if (action === "delete") {
          setDeleteConfirmed(false);
          setDeleteReason("");
        }
        clientListing.refetch();
        stats.refetch();
      },
      onError: (error) => {
        toast.error(`Failed to ${action} user.`);
        console.error(`Failed to ${action} user:`, error);
      },
    });
  };

  useEffect(() => {
    clientListing.refetch();
    stats.refetch();
  }, []);

  useEffect(() => {
    if (clientRedirect.data) {
      toast.success("Redirecting to Client Portal");
      setTimeout(() => {
        window.open(`${CLIENT_PORTAL}${clientRedirect?.data?.accessToken}`);
      }, 1000);
    }
  }, [clientRedirect.isSuccess]);

  useEffect(() => {
    if (clientRedirect.isError) {
      toast.error("Something went wrong");
    }
  }, [clientRedirect.isError]);
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "Actions",
        headerName: "Actions",
        minWidth: 200,
        renderCell: (params) => {
          console.log("params", params);
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={async () => {
                  clientRedirect.mutate({
                    id: params.row.id,
                  });
                }}
              >
                <LaunchIcon sx={{ color: "#4b8ad1" }} />
              </IconButton>
              {/* </Button> */}
              <Link href={`/dashboard/user-account/detail/${params.row.id}`}>
                <IconButton>
                  <RemoveRedEyeOutlined sx={{ color: "#4b8ad1" }} />
                </IconButton>
              </Link>
              <Tooltip
                title={
                  params?.row?.deactivatedAt === null ? "Suspend" : "Unsuspend"
                }
                arrow
              >
                <IconButton
                  onClick={() =>
                    params?.row?.deactivatedAt === null
                      ? handleConfirmation("suspend", params?.row)
                      : handleConfirmation("unsuspend", params?.row)
                  }
                >
                  <BlockIcon
                    sx={{
                      color:
                        params?.row?.deactivatedAt === null
                          ? "#c84545"
                          : "#72af38",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  onClick={() => handleConfirmation("delete", params.row)}
                >
                  <DeleteIcon sx={{ color: "#c84545" }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
      {
        field: "fullName",
        headerName: "User Name",
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        flex: 1,
        minWidth: 200,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "carts",
        headerName: "Docs",
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.carts || "0"}`,
        flex: 1,
        minWidth: 80,
      },
      {
        field: "sumOfPayments",
        headerName: "Total Paid",
        valueGetter: (params: GridValueGetterParams) =>
          `$${params.row?.sumOfPayments || "0"}`,
        flex: 1,
        minWidth: 80,
      },
      {
        field: "heardBy",
        headerName: "User Source",
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.heardBy || "-"}`,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "reference_code",
        headerName: "Referral Code",
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.reference_code || "-"}`,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "createdAt",
        headerName: "Date Joined",
        flex: 1,
        minWidth: 80,
        valueGetter: (params) =>
          params.row.createdAt !== null
            ? moment(params.row.createdAt).format("MM-DD-YYYY")
            : "-",
      },
      {
        field: "joinedDays",
        headerName: "J Days",
        flex: 1,
        minWidth: 80,
        valueGetter: (params) =>
          `${
            params.row?.createdAt
              ? moment.utc(params.row?.createdAt).fromNow()
              : "-"
          }`,
      },
      {
        field: "lastLogin",
        headerName: "Last Login",
        flex: 1,
        minWidth: 100,
        valueGetter: (params) =>
          params.row.lastLogin !== null
            ? moment(params.row.lastLogin).format("MM-DD-YYYY-HH:mm")
            : "-",
      },
      {
        field: "lastLoginDays",
        headerName: "L Days",
        flex: 1,
        minWidth: 100,
        valueGetter: (params) =>
          `${
            params.row?.lastLogin
              ? moment.utc(params.row?.lastLogin).fromNow()
              : "-"
          }`,
      },
    ],
    [clientListing?.data?.data],
  );

  return (
    <>
      <Pageheader title="User Account" />
      <Box
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            textAlign: "start",
            borderRadius: "10px",
            padding: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              span: {
                transform: "scale(1)",
              },
              "&:before": {
                display: "none",
              },
            }}
          >
            <FormControl>
              <RadioGroup
                value={filterId}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setFilterId(e.target.value)}
              >
                {filtersUsersList.filters.map((filter: any, index: number) => {
                  return (
                    <React.Fragment>
                      {stats?.isFetching ? (
                        <Skeleton
                          height={33}
                          width={100}
                          sx={{ borderRadius: "2", marginRight: "10px" }}
                        />
                      ) : (
                        <Card
                          key={index}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "none",
                            paddingLeft: "10px",
                          }}
                        >
                          <FormControlLabel
                            value={filter.value}
                            control={<Radio />}
                            label={`${filter.name} (${
                              stats?.data
                                ? stats?.data[
                                    `${filter?.statskey}` as keyof typeof stats.data
                                  ]
                                : 0
                            })`}
                            sx={{
                              span: {
                                color: "#000000",
                                "&::hover": {
                                  backgroundColor: "none !important",
                                },
                              },
                            }}
                          />
                        </Card>
                      )}
                    </React.Fragment>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "80vh", mt: 2 }}>
        <CustomCard>
          <DataGrid
            rowSelection={false}
            rows={clientListing?.data?.data || []}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            loading={clientListing?.isFetching}
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
      {confirmationTypes.map((type: ConfirmationType) => (
        <Dialog
          key={type}
          open={confirmationDialog[type]}
          onClose={() => handleCancel(type)}
          disableScrollLock
        >
          <DialogTitle>{`${
            type.charAt(0).toUpperCase() + type.slice(1)
          } User`}</DialogTitle>
          <DialogContent>
            Are you sure you want to {type} this user?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleAction(type)}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Yes
            </Button>
            <Button
              onClick={() => handleCancel(type)}
              sx={{ textTransform: "none" }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      ))}
      <Modal
        open={confirmationDialog["delete"]}
        onClose={() => handleCancel("delete")}
        aria-labelledby="delete-user-modal"
        aria-describedby="delete-user-confirmation"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" mb={2}>
            Delete user
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <input
              type="checkbox"
              checked={deleteConfirmed}
              onChange={(e) => setDeleteConfirmed(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            <Typography>
              Are you sure you want to delete this user account?
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Reason for deletion"
            multiline
            rows={3}
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            disabled={!deleteConfirmed}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={() => handleAction("delete")}
              variant="contained"
              disabled={!deleteConfirmed}
              sx={{ textTransform: "none" }}
            >
              Yes
            </Button>
            <Button
              onClick={() => handleCancel("delete")}
              sx={{ textTransform: "none" }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserAccounts;
