"use client";
import React from "react";
import { Box } from "@mui/material";
import CustomCard from "@/components/Card";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import Pageheader from "@/components/PageHeader";
import { useSampleAnswerCategoryListing } from "@/provider/SampleAnswer";

const SampleAnswersListing = () => {
  const sampleAnswerCategoriesListing = useSampleAnswerCategoryListing({});
  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={`/dashboard/sample-answers/${params.row.category}`}>
            <EditIcon sx={{ color: "#4b8ad1" }} />
          </Link>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Template Name",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.category || "-"}`,
      flex: 1,
    },
    {
      field: "answersCouple",
      headerName: "No. of Answers (Couple)",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.coupleCount || "0"}`,
      flex: 1,
    },
    {
      field: "answersSingle",
      headerName: "No. of Answers (Single)",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.singleCount || "0"}`,
      flex: 1,
    },
  ];
  return (
    <Box>
      <Pageheader title="Sample Answers" />
      <CustomCard>
        <DataGrid
          rowSelection={false}
          rows={sampleAnswerCategoriesListing?.data || []}
          columns={columns}
          getRowId={(row) => row?.category}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "Mui-even" : "Mui-odd"
          }
          density="compact"
          slots={{
            toolbar: GridToolbar,
          }}
          loading={sampleAnswerCategoriesListing.isFetching}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </CustomCard>
    </Box>
  );
};

export default SampleAnswersListing;
