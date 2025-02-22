import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUploader } from "@/provider/upload";
import { usePostClientFile } from "@/provider/postClientFile";
import { useClientDocument } from "@/provider/getClientFile";
import { useDeleteClientFile } from "@/provider/deleteClientFile";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Pageheader from "@/components/PageHeader";
import CustomTextField from "@/components/CustomTextField/CustomTextField";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";
import { UploaderEnum } from "@/constant";

const fileUploader = {
  position: "relative",
  width: "100%",
  height: "130px",
  cursor: "pointer",
  border: "1px solid #eee",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 11px #eee",
  marginTop: "16px",
};

const UploadedDocuments = ({
  clientDetailId,
  userId,
}: {
  clientDetailId: string;
  userId: string;
}) => {
  const {
    data: clientDocumentFiles,
    refetch: refetchFiles,
    isLoading: clientDocumentLoading,
  }: any = useClientDocument({
    userId: userId,
    clientDetailId: clientDetailId,
    isAll: true,
    // limit: 1000
  });
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileIcon, setFileIcon] = useState(
    <UploadFileIcon sx={{ fontSize: 50, color: "gray" }} />,
  );
  const [files, setFiles] = useState("");
  const uploader = useUploader({});
  const postClientFile = usePostClientFile();
  const deleteClientFile = useDeleteClientFile();
  const [isRestricted, setIsRestricted] = useState(true);
  const handleFileChange = async (e: any) => {
    if (e.target.files) {
      const [file] = e.target.files;
      setFiles(file);
      setFileName(e.target.files[0].name);
      if (file.name.match(".pdf")) {
        setFileIcon(<PictureAsPdfIcon sx={{ fontSize: 50 }} />);
      } else if (file.name.match(".docx") || file.name.match(".doc")) {
        setFileIcon(<SummarizeIcon sx={{ fontSize: 50 }} />);
      } else if (
        file.name.match(".jpg") ||
        file.name.match(".jpeg") ||
        file.name.match(".png")
      ) {
        setFileIcon(<ImageIcon sx={{ fontSize: 50 }} />);
      } else {
        setFileIcon(<InsertDriveFileIcon sx={{ fontSize: 50 }} />);
      }
    }
  };
  const handleName = (e: any) => {
    setFileName(e.target.value);
  };
  const handleupload = async () => {
    if (files) {
      // const [file] = files;
      // if (file) {
      try {
        let formData = new FormData();
        formData.append("file", files);
        const uploadResult = await uploader.mutateAsync({
          file: formData,
        });
        if (uploadResult.id) {
          try {
            const postfileResult = await postClientFile.mutateAsync({
              clientDetailId: clientDetailId,
              fileId: uploadResult.id,
              //@ts-ignore
              fileName: fileName || files?.name,
              isClientRestricted: isRestricted,
            });
            setOpenModal(false);
            toast.success("File Uploaded Successfully", {
              position: "top-right",
            });
            setFiles("");
            setFileIcon(
              <UploadFileIcon sx={{ fontSize: 50, color: "gray" }} />,
            );
            if (postfileResult) {
              refetchFiles();
            }
          } catch (e) {
            toast.error("Error: File too large", { position: "top-right" });
          }
        }
      } catch (error: any) {
        toast.error("Error: " + error.message, { position: "top-right" });
      }
    }
  };
  const handleRemoveFile = async (id: any) => {
    const deletefileResult = await deleteClientFile.mutateAsync({
      fileId: id,
    });
    if (deletefileResult.status === 200) {
      refetchFiles();
      setFile(null);
      toast.success("File Deleted Successfully", {
        position: "top-right",
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFileName("");
    setFiles("");
    setFileIcon(<UploadFileIcon sx={{ fontSize: 50, color: "gray" }} />);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const columns: GridColDef[] = [
    {
      field: "filePath",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Box sx={{ display: "flex", gap: "10px", cursor: "pointer" }}>
            <FileDownloadOutlinedIcon
              onClick={() => handleDownload(params.row.file.path)}
            />
            {params?.row?.uploadedBy !== UploaderEnum.Automatic && (
              <DeleteIcon
                color="error"
                onClick={() => setFile(params.row.id)}
                sx={{ fontSize: "20px" }}
              />
            )}
            {params?.row?.isClientRestricted && (
              <PersonOffRoundedIcon
                sx={{ color: (theme) => theme.palette?.error?.main }}
              />
            )}
          </Box>
        </>
      ),
    },
    {
      field: "fileName",
      headerName: "File Name",
      flex: 1,
      valueGetter: (params) => params?.row?.fileName,
    },
    {
      field: "uploadedBy",
      headerName: "Upload by",
      flex: 1,
      // valueGetter: (params) => params?.row?.fileName,
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
            {params.row?.uploadedBy === UploaderEnum.Automatic ? (
              params.value
            ) : (
              <Typography color={(theme) => theme.palette?.text?.primary}>
                -
              </Typography>
            )}
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
    // {
    //   field: "updatedAt",
    //   headerName: "Date Updated",
    //   width: 150,
    //   valueGetter: (params) =>
    //     moment(params?.row?.updatedAt).format("MM-DD-YYYY"),
    // },
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pageheader title="Client Documents" />
        <Button onClick={handleOpenModal} variant="contained">
          <UploadFileIcon sx={{ mr: 1, fontSize: "14px" }} />
          Upload Document
        </Button>
      </Box>
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
      <Dialog
        open={file ? true : false}
        onClose={() => setFile(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "18px" }}>
          {"Are You Sure Want to Delete This file?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => handleRemoveFile(file)}
            sx={{ background: "#073763 !important", color: "#fff" }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setFile(null)}
            sx={{ background: "#fda440 !important", color: "#fff" }}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <CustomModal width={450} open={openModal} handleClose={handleCloseModal}>
        <Box>
          <CustomTextField
            label="Upload File Name"
            placeholder="Upload File Name"
            type="text"
            name="upload_file_name"
            value={fileName}
            onChange={handleName}
          />
          <Box sx={fileUploader}>
            {uploader.isLoading ? (
              <Box sx={{ textAlign: "center", mt: 2, width: "100%" }}>
                <CircularProgress size={30} />{" "}
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "gray" }}
                >
                  Uploading File
                </Typography>
              </Box>
            ) : (
              <>
                <TextField
                  type="file"
                  onChange={handleFileChange}
                  sx={{
                    height: "100%",
                    position: "absolute",
                    opacity: 0,
                    zIndex: "999",
                    ".MuiInputBase-root": {
                      height: "100%",
                    },
                    ".MuiInputBase-input": {
                      height: "100%",
                      cursor: "pointer",
                      padding: 0,
                    },
                  }}
                />
                <Box sx={{ textAlign: "center" }}>
                  {/* <UploadFileIcon sx={{ fontSize: 50, color: "gray" }} /> */}
                  {fileIcon}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "gray" }}
                  >
                    Upload File
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={isRestricted}
                  defaultChecked
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    "&.Mui-checked": {
                      color: (theme) => theme.palette.primary.main,
                    },
                  }}
                  onChange={() => setIsRestricted(!isRestricted)}
                />
              }
              label="Is Admin View Only"
            />
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
          >
            <CustomButton
              disabled={!files || uploader.isLoading}
              onClick={handleupload}
              type="ADD"
              width="auto"
            >
              Upload
            </CustomButton>
            <CustomButton type="CANCEL" onClick={handleCloseModal} width="auto">
              Close
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default UploadedDocuments;
