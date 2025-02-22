import React from "react";
import { useClientDocument } from "@/provider/getClientFile";

import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface QuestionnaireDocumentProps {
  clientDetailId?: string;
  userId?: string;
}

const QuestionnaireDocument: React.FC<QuestionnaireDocumentProps> = ({
  clientDetailId,
  userId,
}) => {
  const {
    data: clientDocumentFiles,
    refetch: refetchFiles,
    isLoading: clientDocumentLoading,
  }: any = useClientDocument({
    userId: userId,
    clientDetailId: clientDetailId,
    isGenerated: true,
  });
  const columns: GridColDef[] = [
    {
      field: "fileName",
      headerName: "File Name",
      flex: 1,
      valueGetter: (params) => params?.row?.fileName,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => params?.row?.type,
      renderCell: (params) => {
        let statusColor = "";
        let statusBoderColor = "";
        let statusBackground = "";
        switch (params.value) {
          case "draft":
            statusColor = "#f1c40f";
            (statusBoderColor = "#f1c40f"), (statusBackground = "#f1c40f12");
            break;
          case "completed":
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
              // background: statusBackground,
              fontWeight: 700,
              fontSize: "16px",
              fontFamily: "Roboto",
              borderRadius: "20px",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    // {
    //     field: "type",
    //     headerName: "Doc/PDF",
    //     flex: 1,
    // },
    {
      field: "createdAt",
      headerName: "Date Created",

      width: 150,
      valueGetter: (params) =>
        moment(params?.row?.createdAt).format("MM-DD-YYYY"),
    },
    {
      field: "updatedAt",
      headerName: "Date Updated",
      width: 150,
      valueGetter: (params) =>
        moment(params?.row?.updatedAt).format("MM-DD-YYYY"),
    },
    {
      field: "filePath",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Box sx={{ display: "flex", gap: "10px", cursor: "pointer" }}>
            <FileDownloadOutlinedIcon
              onClick={() => handleDownload(params.row.file.path)}
            />
          </Box>
        </>
      ),
    },
  ];
  const handleDownload = (filePath: string) => {
    window.open(`${filePath}`, "_ blank");
  };
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <>
      {clientDocumentLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box>
            {clientDocumentLoading ? (
              <Skeleton width={200} />
            ) : (
              <>
                <Box sx={{ height: "40vh", mt: 2 }}>
                  <DataGrid
                    rowSelection={false}
                    rows={clientDocumentFiles?.data || []}
                    columns={columns}
                    getRowId={(row: any) => generateRandom()}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "Mui-even"
                        : "Mui-odd"
                    }
                    density="compact"
                  />
                </Box>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default QuestionnaireDocument;
