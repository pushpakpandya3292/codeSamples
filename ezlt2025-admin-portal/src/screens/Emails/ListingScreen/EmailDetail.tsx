import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import Pageheader from "@/components/PageHeader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import moment from "moment";
import { useEmailAttachments } from "@/provider/email";
import { toast } from "react-toastify";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface EmailProps {
  attachments: {
    attachmentId: string;
    attachmentName: string;
    attachmentSize: number;
  }[];
  content: string;
  messageId: string;
}

export type ListingResponse = {
  summary: string;
  hasAttachment: string;
  sender: string;
  subject: string;
  receivedTime: string;
  messageId: string;
  fromAddress: string;
  flagid: string;
  toAddress: string;
  folderId: string;
  status: string;
  ccAddress: string;
};

interface EmailDetailProps {
  handleDrawerClose: () => void;
  emailDetails: EmailProps | undefined;
  isLoading: boolean;
  emailListingData: ListingResponse | undefined;
  activeFolder: string;
}

const EmailDetail: React.FC<EmailDetailProps> = ({
  handleDrawerClose,
  emailDetails,
  isLoading,
  emailListingData,
  activeFolder,
}) => {
  const emailAttachment = useEmailAttachments({});
  const [emailAttachmentId, setEmailAttachmentId] = useState("");
  function formatAttachmentSize(sizeInBytes: number) {
    const kb = sizeInBytes / 1024;
    const mb = kb / 1024;

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`; // Convert to MB and round to 2 decimal places
    } else {
      return `${kb.toFixed(2)} KB`; // Convert to KB and round to 2 decimal places
    }
  }
  const cleanToAddress = (address: string | undefined) =>
    address?.replace(/&quot;|&lt;|&gt;|^Partners\s*/g, "");
  const formattedDate = moment(emailListingData?.receivedTime, "x").format(
    "MMM D, YYYY, h:mm A",
  );
  const relativeTime = moment(emailListingData?.receivedTime, "x").fromNow();

  const getAttachmentLink = async (attachment: any) => {
    setEmailAttachmentId(attachment.attachmentId);
    emailAttachment
      .mutateAsync({
        email: cleanToAddress(emailListingData?.toAddress),
        folderId: emailListingData?.folderId,
        messageId: emailListingData?.messageId,
        attachmentId: attachment.attachmentId,
        attachmentName: attachment.attachmentName,
      })
      .then(async (response) => {
        // @ts-ignore
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([blob]));
        link.download = attachment.attachmentName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      })
      .catch((err) => {
        toast.error("Error downloading the file.", { position: "top-right" });
      });
  };

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ cursor: "pointer" }}>
            <KeyboardBackspaceIcon onClick={handleDrawerClose} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Typography variant="h5" sx={{ fontSize: "26px" }}>
                {emailListingData?.subject}
              </Typography>
              <Chip
                label={activeFolder}
                sx={{
                  borderRadius: "0", // Remove the border-radius
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Avatar>{<AccountCircleOutlinedIcon />}</Avatar>
              {emailListingData && (
                <Typography
                  variant="h6"
                  sx={{ fontSize: "14px" }}
                  dangerouslySetInnerHTML={{
                    __html: emailListingData?.toAddress,
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography>{`${formattedDate} (${relativeTime})`}</Typography>
            </Box>
          </Box>
          {emailDetails && (
            <Box
              dangerouslySetInnerHTML={{ __html: emailDetails?.content }}
            ></Box>
          )}
          {emailDetails?.attachments &&
            emailDetails?.attachments.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h6">
                    {emailDetails?.attachments.length}{" "}
                    {emailDetails?.attachments.length == 1
                      ? "attachment"
                      : "attachments"}
                  </Typography>
                  <Box
                    sx={{ py: 2, display: "flex", gap: 3, flexWrap: "wrap" }}
                  >
                    {emailDetails.attachments.map((attachment, index) => (
                      <Card
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          p: 3,
                          backgroundColor: "#f5f5f5",
                          borderRadius: 3,
                          boxShadow: "5px 4px 12px rgba(0, 0, 0, 0.1)",
                          maxWidth: "200px",
                          textAlign: "center",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          {attachment.attachmentName}
                        </Typography>

                        <Chip
                          label={`${formatAttachmentSize(
                            attachment?.attachmentSize,
                          )}`}
                          sx={{
                            backgroundColor: "#e0e0e0",
                            borderRadius: "20px",
                            fontWeight: "500",
                            color: "#555",
                            fontSize: "0.875rem",
                            maxWidth: "fit-content",
                          }}
                        />

                        <Button
                          onClick={() => getAttachmentLink(attachment)}
                          variant="contained"
                          sx={{
                            mt: 2,
                            backgroundColor: "#1e3a8a",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#1e40af",
                            },
                            //   borderRadius: "12px",
                            padding: 0.5,
                          }}
                          disabled={emailAttachment.isLoading}
                        >
                          {emailAttachment.isLoading &&
                          emailAttachmentId == attachment.attachmentId ? (
                            <CircularProgress size={30} color="inherit" />
                          ) : (
                            <FileDownloadOutlinedIcon sx={{ fontSize: 30 }} />
                          )}
                        </Button>
                      </Card>
                    ))}
                  </Box>
                </Box>
              </>
            )}
        </>
      )}
    </>
  );
};

export default EmailDetail;
