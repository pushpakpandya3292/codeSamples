"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { toast } from "react-toastify";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SummarizeIcon from "@mui/icons-material/Summarize";

import Loader from "@/components/Loader";
import Pageheader from "@/components/PageHeader";
import CustomModal from "@/components/CustomModal";
import { useUploader } from "@/provider/uploadDoc";
import CustomButton from "@/components/CustomButton";
import { useUserDetailListing } from "@/provider/profile";
import { usePostClientFile } from "@/provider/postClientFile";
import { useClientDocument } from "@/provider/getClientFile";
import CustomTextField from "@/components/CustomTextField/CustomTextField";
import { useDeleteClientFile } from "@/provider/deleteClientFile";
import Link from "next/link";
import moment from "moment";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import FolderIcon from "@mui/icons-material/Folder";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const fileUploader = {
  position: "relative",
  width: "100%",
  height: "130px",
  cursor: "pointer",
  border: "3px dotted #eee",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 11px #eee",
  marginTop: "16px",
};
const StyledTab = styled((props: any) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    marginTop: "10px",
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "#073763",
    "&.Mui-selected": {
      background: "#073763",
      borderRadius: "8px",
      color: "white",
      margin: "10px",
    },
    "&.Mui-disabled": {
      color: "grey",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  }),
);

interface DocumentData {
  id: string;
  fileName: string;
  createdAt: string;
  isClientRestricted: boolean;
  isUploadedByAdmin: boolean;
  updatedAt: string;
  isFinal: boolean;
  isGenerated: boolean;
  fileExtension: number;
  fileType: number;
  type: string;
  clientDetail: {
    id: string;
    trust_name: string;
    end_user: string;
    completed_date: string;
    delivery_option: string;
  };
  file: {
    id: string;
    path: string;
    __entity: string;
  };
}
interface DocumentsData {
  clientDetailId: string;
  trustName: string;
  files: DocumentData[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const CompeletedDocumentScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<null | DocumentData>(null);
  const [value, setValue] = React.useState("1");
  const [files, setFiles] = useState("");
  const [ClientDetailId, setClientDetailId] = useState("");
  const [filesOpend, setFilesOpend] = useState<any>([]);
  const [fileName, setFileName] = useState("");
  const [fileIcon, setFileIcon] = useState(
    <UploadFileIcon sx={{ fontSize: 50, color: "gray" }} />,
  );
  const profileDetail = useUserDetailListing({});
  const uploader = useUploader({});
  const postClientFile = usePostClientFile();
  const {
    data: clientDocumentFiles,
    refetch: refetchFiles,
    isFetching: documentfetching,
  } = useClientDocument({
    userId: profileDetail?.data?.id,
    isAll: true,
    limit: 1000,
  });

  const deleteClientFile = useDeleteClientFile();
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (clientDetailId: string) => {
    setClientDetailId(clientDetailId);
    setOpenModal(true);
  };
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
      try {
        let formData = new FormData();
        formData.append("file", files);
        const uploadResult = await uploader.mutateAsync({
          file: formData,
        });
        if (uploadResult.id) {
          try {
            const postfileResult = await postClientFile.mutateAsync({
              clientDetailId: ClientDetailId, //clientDetailId,
              fileId: uploadResult.id,
              //@ts-ignore
              fileName: fileName || files?.name,
              isClientRestricted: false,
            });
            setOpenModal(false);
            toast.success("File Uploaded Successfully", {
              position: "top-right",
            });
            setClientDetailId("");
            setFiles("");
            setFileName("");
            setFileIcon(
              <InsertDriveFileIcon sx={{ fontSize: 50, color: "gray" }} />,
            );
            refetchFiles();
          } catch (e: any) {
            toast.error("Error: " + e.message, {
              position: "top-right",
            });
          }
        }
      } catch (error: any) {
        toast.error("Error: File too large", { position: "top-right" });
        // toast.error("Error: " + error.message, { position: "top-right" });
      }
    }
  };

  const handleRemoveFile = async (file: any) => {
    const deletefileResult = await deleteClientFile.mutateAsync({
      fileId: file?.id,
    });
    if (deletefileResult.status === 200) {
      refetchFiles();
      setFile(null);
      toast.success("File Deleted Successfully", {
        position: "top-right",
      });
    }
  };
  const fileData: DocumentsData[] = useMemo(() => {
    setFilesOpend(new Array(clientDocumentFiles?.data?.length).fill(false));
    // @ts-ignore
    const data: DocumentsData[] = [
      // @ts-ignore
      ...new Set(
        clientDocumentFiles?.data?.map((item) => item.clientDetail.id),
      ),
    ].map((id) => {
      const details = clientDocumentFiles?.data?.filter(
        (file) => file.clientDetail.id === id,
      );
      // @ts-ignore
      const firstIndex = details[0];
      const trustName = `${
        firstIndex?.clientDetail?.marriage_status == 2 ? "Couple" : "Single"
      } Living Trust / ${firstIndex?.clientDetail?.trust_name} (${moment(
        firstIndex?.updatedAt,
      ).format("MM/DD/YYYY")})`;

      return {
        clientDetailId: firstIndex?.clientDetail?.id,
        trustName: trustName,
        files: details,
      };
    });
    return data;
  }, [clientDocumentFiles?.data]);

  if (profileDetail?.isFetching) {
    <Loader height="75vh" width="100%" />;
  }

  const handleCollapse = (index: number) => {
    const newFilesOpend = [...filesOpend];
    newFilesOpend[index] = !filesOpend[index];
    setFilesOpend(newFilesOpend);
  };

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Link
            href={params?.row?.file?.path || ""}
            target="_blank"
            rel="noopener noreferrer"
            locale={false}
            download
          >
            <RemoveRedEyeOutlined sx={{ color: "#4b8ad1" }} />
          </Link>
          <Link
            href={params?.row?.file?.path || ""}
            target="_blank"
            rel="noopener noreferrer"
            locale={false}
            download
          >
            <DownloadForOfflineOutlinedIcon sx={{ color: "#4b8ad1" }} />
          </Link>
        </Box>
      ),
    },
    {
      field: "DocName",
      headerName: "Doc Name",
      flex: 1,
      minWidth: 600,
      valueGetter: (params: GridValueGetterParams) => params?.row?.fileName,
    },
    {
      field: "Uploadedby",
      headerName: "Upload by",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => params?.row?.uploadedBy,
    },
    {
      field: "DateAdded",
      headerName: "Date Added",
      valueGetter: (params: GridValueGetterParams) =>
        `${moment(params.row?.createdAt).format("MM-DD-YYYY") || "-"}`,
      flex: 1,
      minWidth: 130,
    },
  ];
  return (
    <>
      <Box
        sx={{
          px: { xs: 1.5, md: "50px" },
          py: 1,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pageheader title="My completed Documents" />
        </Box>

        <Grid
          container
          alignItems={"baseline"}
          sx={{ mt: 2 }}

          // sx={{ ".MuiTabPanel-root": { padding: "0" }, mt: 3 }}
        >
          <Grid item xs={12} md={10}>
            {documentfetching ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "70vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : clientDocumentFiles?.data?.length ? (
              <Box>
                {clientDocumentFiles?.data?.length === 0 ? (
                  <Box>
                    <Typography variant="h3">{`No document uploaded`}</Typography>
                  </Box>
                ) : (
                  <Grid item xs={12}>
                    {fileData.map((Doc: DocumentsData, index: number) => {
                      return (
                        <Box
                          sx={{
                            background: "white",
                            mb: 2,
                            borderRadius: "6px",
                            boxShadow: "0 0 11px #eee",
                            py: { xs: 2, md: "auto" },
                            textAlign: { xs: "center", md: "inherit" },
                          }}
                          key={index}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              px: 2,
                              flexDirection: "row",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                cursor: "pointer",
                                userSelect: "none",
                                flexDirection: "row",
                                order: { xs: 1, md: 1 },
                              }}
                              onClick={() => handleCollapse(index)}
                            >
                              {filesOpend[index] ? (
                                <KeyboardArrowDownRoundedIcon />
                              ) : (
                                <KeyboardArrowRightRoundedIcon />
                              )}
                              <FolderIcon
                                fontSize="large"
                                sx={{
                                  color: (theme) =>
                                    theme.additionalColors?.tablightBlue,
                                }}
                              />
                              <Typography
                                variant="h4"
                                sx={{
                                  py: { xs: 0, md: 1 },
                                  my: { xs: 1, md: 2 },
                                  textAlign: {
                                    xs: "start",
                                    md: "center",
                                  },
                                }}
                              >
                                {Doc?.trustName}
                              </Typography>
                            </Box>
                            <Button
                              onClick={() =>
                                handleOpenModal(Doc.clientDetailId)
                              }
                              variant="contained"
                              sx={{
                                fontSize: "12px",
                                order: { xs: 1, md: 2 },
                                mb: { xs: "10px", md: "inherit" },
                                minWidth: "90px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ mr: 1, fontSize: "14px" }}
                              />
                              Upload
                            </Button>
                          </Box>
                          <Collapse in={filesOpend[index]}>
                            {filesOpend[index] && (
                              <Box
                                sx={{
                                  borderTop: "2px solid",
                                  // borderRadius: "5px",
                                  boxShadow: "0 0 11px #eee",
                                }}
                              >
                                <DataGrid
                                  rowSelection={false}
                                  rows={Doc?.files || []}
                                  columns={columns}
                                  // slots={{ toolbar: GridToolbar }}
                                  slotProps={{
                                    toolbar: {
                                      showQuickFilter: true,
                                    },
                                  }}
                                  getRowId={(row) => row.id}
                                  // getRowClassName={(params) =>
                                  //   params.indexRelativeToCurrentPage % 2 === 0
                                  //     ? "Mui-even"
                                  //     : "Mui-odd"
                                  // }

                                  hideFooterPagination
                                  sx={{
                                    "& .MuiDataGrid-footerContainer": {
                                      display: "none",
                                    },
                                  }}
                                />
                              </Box>
                            )}
                          </Collapse>
                        </Box>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            ) : (
              <Typography
                variant="h3"
                sx={{ mt: 3 }}
              >{`No document uploaded yet`}</Typography>
            )}
          </Grid>
        </Grid>

        <CustomModal
          width={450}
          open={file ? true : false}
          handleClose={() => setFile(null)}
        >
          <Typography variant="body1" sx={{ fontSize: "18px" }}>
            {"Are You Sure Want to Delete This file?"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
          >
            <CustomButton
              onClick={() => handleRemoveFile(file)}
              type="ADD"
              width="auto"
            >
              Yes
            </CustomButton>
            <CustomButton
              type="CANCEL"
              onClick={() => setFile(null)}
              width="auto"
            >
              No
            </CustomButton>
          </Box>
        </CustomModal>

        <CustomModal
          width={{ xs: 310, sm: 450 }}
          open={openModal}
          handleClose={handleCloseModal}
        >
          <Box>
            <CustomTextField
              value={fileName}
              label="Upload File Name"
              placeholder="Upload File Name"
              type="text"
              name="upload_file_name"
              onChange={handleName}
            />
            {/* Uploader  */}
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
                      {fileName ? fileName : "Upload File "}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <CustomButton
                disabled={!files}
                onClick={handleupload}
                type="ADD"
                width="auto"
              >
                Upload
              </CustomButton>
              <CustomButton
                type="CANCEL"
                onClick={handleCloseModal}
                width="auto"
              >
                Close
              </CustomButton>
            </Box>
          </Box>
        </CustomModal>
      </Box>
    </>
  );
};

export default CompeletedDocumentScreen;
