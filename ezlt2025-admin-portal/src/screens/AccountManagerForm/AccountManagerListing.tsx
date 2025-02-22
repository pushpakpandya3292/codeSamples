import CustomCard from "@/components/Card";
import {
  useAccountManagerListing,
  useBlockAccountManager,
  useDeleteAccountManager,
  useUnblockAccountManager,
} from "@/provider/accountManager";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CustomModal from "@/components/CustomModal";
import UpdateAccountManagerForm from "./UpdateAccountManagerForm";
import usePaginationState from "@/hooks/usePaginationState";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

interface AccountManagerListingProps {
  status: string | undefined;
}

function AccountManagerListing({ status }: AccountManagerListingProps) {
  const { pagination, setPagination, queryParams } = usePaginationState();

  const managerListing = useAccountManagerListing({
    ...queryParams,
    status: status,
  });

  const { rowCount } = usePaginationState(managerListing?.data?.total);

  const [openModal, setOpenModal] = useState(false);
  const [managerId, setManagerId] = useState("");
  const [manager, setManager] = useState({
    managerFirstName: "",
    managerLastName: "",
    managerId: "",
    managerEmail: "",
    managerAccessConfig: [],
  });
  const [managerEmail, setManagerEmail] = useState("");
  const [managerConfig, setManagerConfig] = useState<string[]>([]);

  type ConfirmationType = "delete" | "suspend" | "unsuspend";
  const confirmationTypes: ConfirmationType[] = [
    "delete",
    "suspend",
    "unsuspend",
  ];

  const [confirmationDialog, setConfirmationDialog] = useState<
    Record<ConfirmationType, boolean>
  >({
    delete: false,
    suspend: false,
    unsuspend: false,
  });
  const [selectedAccountManager, setSelectedAccountManager] =
    useState<string>("");

  const deleteAccountManager = useDeleteAccountManager({
    selectedAccountManager,
  });
  const blockAccountManager = useBlockAccountManager({
    selectedAccountManager,
  });
  const unblockAccountManager = useUnblockAccountManager({
    selectedAccountManager,
  });
  const handleUpdateModalOpen = (data: any) => {
    setManager({
      managerFirstName: data.user.firstName,
      managerLastName: data.user.lastName,
      managerId: data.id,
      managerEmail: data.user.email,
      managerAccessConfig: data.access_config.roles,
    });
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setManager({
      managerFirstName: "",
      managerLastName: "",
      managerId: "",
      managerEmail: "",
      managerAccessConfig: [],
    });
    setOpenModal(false);
  };

  const handleConfirmation = (type: ConfirmationType, data: any) => {
    setConfirmationDialog((prev) => ({ ...prev, [type]: true }));
    setSelectedAccountManager(data?.user?.id);
  };

  const handleCancel = (type: ConfirmationType) => {
    setConfirmationDialog((prev) => ({ ...prev, [type]: false }));
    setSelectedAccountManager("");
  };

  const handleAction = (action: "delete" | "suspend" | "unsuspend") => {
    const actionMap = {
      delete: deleteAccountManager,
      suspend: blockAccountManager,
      unsuspend: unblockAccountManager,
    };

    const mutation = actionMap[action];

    if (!selectedAccountManager) return;

    mutation.mutate(selectedAccountManager, {
      onSuccess: () => {
        setConfirmationDialog((prev) => ({ ...prev, [action]: false }));
        toast.success(
          `Admin administrator ${action}${
            action === "delete" ? "d" : "ed"
          } successfully`,
        );
        setSelectedAccountManager("");
        managerListing.refetch();
      },
      onError: (error) => {
        toast.error(`Failed to ${action} admin administrator.`);
        console.error(`Failed to ${action} admin administrator:`, error);
      },
    });
  };

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      maxWidth: 160,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            // gap: 1,
            alignItems: "center",
            // justifyContent: "center",
            "& .MuiTooltip-popper": {
              marginTop: "-4px",
            },
          }}
        >
          <Tooltip
            title={
              params?.row?.user?.deactivatedAt === null
                ? "Suspend"
                : "Unsuspend"
            }
            arrow
          >
            <IconButton
              onClick={() =>
                params?.row?.user?.deactivatedAt === null
                  ? handleConfirmation("suspend", params.row)
                  : handleConfirmation("unsuspend", params.row)
              }
            >
              <BlockIcon
                sx={{
                  color:
                    params?.row?.user?.deactivatedAt === null
                      ? "#c84545"
                      : "#72af38",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton
              onClick={() => {
                handleUpdateModalOpen(params.row);
              }}
            >
              <EditIcon sx={{ color: "#4b8ad1" }} />
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
      ),
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.user?.firstName,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params?.row?.user?.email,
    },
    {
      field: "Create Date",
      headerName: "updatedAt",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        moment(params.row.updatedAt).format("DD/MM/YYYY"),
    },
  ];

  return (
    <Box sx={{ height: "70vh", mt: 2 }}>
      <CustomCard>
        <DataGrid
          rowSelection={false}
          loading={managerListing.isLoading}
          rows={managerListing?.data?.data || []}
          columns={columns}
          getRowId={(row) => row.id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
          }
          density="compact"
          // columnVisibilityModel={columnVisibilityModel}
          slots={{
            toolbar: GridToolbar,
          }}
          // loading={partnerListing.isFetching}
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
      <CustomModal width={600} open={openModal} handleClose={handleCloseModal}>
        <Box>
          <UpdateAccountManagerForm
            managerDetails={manager}
            handleClose={handleCloseModal}
          />
        </Box>
      </CustomModal>
      {confirmationTypes.map((type: ConfirmationType) => (
        <Dialog
          key={type}
          open={confirmationDialog[type]}
          onClose={() => handleCancel(type)}
          disableScrollLock
        >
          <DialogTitle>{`${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Account Administrator`}</DialogTitle>
          <DialogContent>
            Are you sure you want to {type} this account administrator?
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
    </Box>
  );
}

export default AccountManagerListing;
