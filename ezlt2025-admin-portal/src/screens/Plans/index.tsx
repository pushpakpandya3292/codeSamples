"use client";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import { usePlans } from "@/provider/Plans";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CustomModal from "@/components/CustomModal";
import UpdatePlanModal from "./UpdatePlanModal";
import usePaginationState from "@/hooks/usePaginationState";

const Plans: React.FC = () => {
  const {
    pagination,
    setPagination,
    queryParams,
  } = usePaginationState();

  const plans = usePlans({
    ...queryParams,
  });
  const {
    rowCount,
  } = usePaginationState(plans?.data?.total);
 
  const [planDetails, setPlanDetails] = useState({
    planId: "",
    planName: "",
    description: "",
    couplePrice: 0,
    singlePrice: 0,
  });
  const [updatePlanModal, setUpdatePlanModal] = useState(false);
  const handleCloseModal = () => {
    setPlanDetails;
    ({
      planId: "",
      planName: "",
      description: "",
      couplePrice: 0,
      singlePrice: 0,
    });
    setUpdatePlanModal(false);
  };
  const handleUpdateModalOpen = (data: any) => {
    setPlanDetails({
      planId: data.id,
      planName: data.name,
      description: data.description,
      couplePrice: data.couple_price,
      singlePrice: data.single_price,
    });
    setUpdatePlanModal(true);
  };
  const column: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <EditIcon
          sx={{ color: "#4b8ad1", cursor: "pointer" }}
          onClick={() => {
            handleUpdateModalOpen(params.row);
          }}
        />
      ),
    },
    {
      field: "PlanName",
      headerName: "PlanName",
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.name || "-"}`,
      flex: 1,
    },
    {
      field: "Description",
      headerName: "Description",
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.description || "-"}`,
      flex: 1,
    },
    {
      field: "CouplePrice",
      headerName: "Couple Price",
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>
          $ {params?.row?.couple_price || "-"}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "SinglePrice",
      headerName: "Single Price",
      renderCell: (params) => (
        <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>
          $ {params?.row?.single_price || "-"}
        </Typography>
      ),
      flex: 1,
    },
  ];
  return (
    <Box>
      <Pageheader title="Plans" />
      <CustomCard>
        <DataGrid
          rowSelection={false}
          rows={plans?.data?.data || []}
          columns={column}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
          }
          density="compact"
          slots={{
            toolbar: GridToolbar,
          }}
          loading={plans.isFetching}
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
      <CustomModal
        width={600}
        open={updatePlanModal}
        handleClose={handleCloseModal}
      >
        <Box>
          <UpdatePlanModal
            planDetails={planDetails}
            handleClose={handleCloseModal}
          />
        </Box>
      </CustomModal>
    </Box>
  );
};

export default Plans;
