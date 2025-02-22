"use client";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import EmailFoldersMenu from "../EmailFoldersMenu";
import { EmailFolders } from "@/constant";
import { useEffect, useState } from "react";
import { useEmailListing } from "@/provider/email";
import SyncIcon from "@mui/icons-material/Sync";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import moment from "moment";
import { BoxWrapper } from "@/components/BoxWrapper";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArchiveIcon from "@mui/icons-material/Archive";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import OutboxIcon from "@mui/icons-material/Outbox";
import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
import EmailDetail, { ListingResponse } from "./EmailDetail";
import { useEmailContent } from "@/provider/emailContent";
import { toast } from "react-toastify";

const emailOptions = [
  "noreply@ezlivingtrust.com",
  "staff@ezlivingtrust.com",
  "hello@ezlivingtrust.com",
  "partners@ezlivingtrust.com",
];

const EmailListingScreen = () => {
  const [isDetailsOpened, setIsDetailsOpened] = useState(false);
  const [activeFolder, setActiveFolder] = useState(EmailFolders.INBOX);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(
    "noreply@ezlivingtrust.com",
  );
  const emailListing = useEmailListing({
    folderId: EmailFolders.INBOX,
    startIndex: startIndex,
    email: selectedEmail,
  });
  const {
    data: emailDetails,
    isLoading: emailContentLoading,
    mutate: emailContentMutate,
  } = useEmailContent();
  const [emailListingData, setEmailListingData] = useState<any>([]);
  const cleanToAddress = (address: string) =>
    address.replace(/&quot;|&lt;|&gt;|^Partners\s*/g, "");
  const filteredEmails = emailListingData.filter((email: any) => {
    const cleanedAddress = cleanToAddress(email.toAddress);
    return cleanedAddress === selectedEmail;
  });
  const [emailSelectedData, setEmailSelectedData] = useState<
    ListingResponse | undefined
  >();
  const [menuItems, setMenuItems] = useState(
    Object.values(EmailFolders)?.map((folder: any) => {
      return {
        folder,
        active: folder === EmailFolders.INBOX ? true : false,
      };
    }),
  );

  const getInitialEmails = async () => {
    const emaildata = await emailListing.mutateAsync(
      {
        folderId: EmailFolders.INBOX,
        startIndex: startIndex,
        email: selectedEmail,
      },
      {
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
    if (emaildata) {
      setEmailListingData(emaildata);
    }
  };

  useEffect(() => {
    getInitialEmails();
  }, [selectedEmail]);

  const handleDrawerClose = () => {
    setIsDetailsOpened(false);
  };

  const handleSelectItem = async (Item: any, _startIndex: number) => {
    const activeFolderName = menuItems.find((item: any) => item.active)?.folder;
    setActiveFolder(Item);
    setMenuItems(
      menuItems?.map((item: any) => ({
        ...item,
        active: item.folder === Item,
      })),
    );
    const emaildata = await emailListing.mutateAsync({
      folderId: Item,
      startIndex: _startIndex,
      email: selectedEmail,
    });
    if (emaildata) {
      if (Item === activeFolderName) {
        setEmailListingData([...emailListingData, ...emaildata]);
        setStartIndex(_startIndex);
      } else {
        if (emaildata) setEmailListingData(emaildata);
      }
    }
    setIsDetailsOpened(false);
  };

  const FolderIcon = (folder: EmailFolders, color: string, size?: number) => {
    switch (folder) {
      case EmailFolders.INBOX:
        return <InboxIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.DRAFTS:
        return <DraftsIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.TEMPLATES:
        return <ContentPasteIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.SNOOZED:
        return (
          <NotificationsPausedIcon sx={{ color: color, fontSize: size }} />
        );
      case EmailFolders.SENT:
        return <SendIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.SPAM:
        return <ReportIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.TRASH:
        return <DeleteIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.OUTBOX:
        return <OutboxIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.STARRED:
        return <StarBorderIcon sx={{ color: color, fontSize: size }} />;
      case EmailFolders.ARCHIVE:
        return <ArchiveIcon sx={{ color: color, fontSize: size }} />;
      default:
        return null;
    }
  };

  const handleEmailDetail = (email: any) => {
    emailContentMutate({
      folderId: email?.folderId,
      messageId: email?.messageId,
      email: selectedEmail,
    });
    setEmailSelectedData(email);
  };
  return (
    <>
      <Pageheader title="Email Listing" />
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          py: 1,
          mb: 2,
          overflowY: "hidden",
          overflowX: "scroll",
        }}
      >
        {emailOptions.map((email) => (
          <>
            <Box
              key={email}
              sx={{
                display: "flex",
                borderRadius: "10px",
                background: selectedEmail === email ? "#073763" : "#fff",
                color: selectedEmail === email ? "#fff" : "#000",
                border: "3px solid #073763",
                boxShadow:
                  "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
                cursor: "pointer",
                padding: "10px",
                transition: "linear 0.3s",
              }}
              onClick={() => {
                setSelectedEmail(email);
                setIsDetailsOpened(false);
              }}
            >
              <Typography
                sx={{
                  p: "5px 7px",
                  fontWeight: selectedEmail === email ? 800 : 400,
                }}
              >
                <strong>{email.split("@")[0]}</strong>@{email.split("@")[1]}
              </Typography>
            </Box>
          </>
        ))}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} xl={2}>
          <CustomCard autoHeight>
            <EmailFoldersMenu
              menuItems={menuItems}
              handleSelectItem={handleSelectItem}
              FolderIcon={FolderIcon}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={8} xl={10}>
          <CustomCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!isDetailsOpened && (
                <>
                  <Pageheader title={activeFolder} />
                  {emailListingData.length != 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Typography>
                        {1} - {emailListingData.length}
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {emailListing.isLoading && filteredEmails.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    gap: 1,
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                  <Typography variant="h5" sx={{ fontWeight: "500" }}>
                    Loading your {activeFolder}
                  </Typography>
                </Box>
              ) : filteredEmails.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    gap: 1,
                  }}
                >
                  {FolderIcon(activeFolder, "#000000", 50)}
                  <Typography variant="h5" sx={{ fontWeight: "500" }}>
                    Your {activeFolder} is empty
                  </Typography>
                </Box>
              ) : (
                <>
                  {isDetailsOpened ? (
                    <EmailDetail
                      handleDrawerClose={handleDrawerClose}
                      emailDetails={emailDetails}
                      isLoading={emailContentLoading}
                      emailListingData={emailSelectedData || undefined}
                      activeFolder={activeFolder}
                    />
                  ) : (
                    <BoxWrapper
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {emailListingData?.map((email: any, index: number) => (
                        <Box key={index}>
                          <Box>
                            <Box
                              key={index}
                              onClick={() => {
                                handleEmailDetail(email);
                                setIsDetailsOpened(true);
                              }}
                              sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                background: (theme) =>
                                  theme.palette.background.paper,
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={2.3}>
                                  <Typography
                                    sx={{
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                      fontSize: "16px",
                                      fontWeight: "500",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: email.fromAddress,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={8.7}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.text.disabled,
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                      // display: "flex",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#000000",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {email.subject}&nbsp;
                                    </span>
                                    - {email.summary}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                  <Typography
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.text.disabled,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {moment(
                                      Number(email.receivedTime),
                                    ).fromNow()}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            {emailListingData.length - 1 != index && (
                              <Divider />
                            )}
                          </Box>
                          {/* {emailListingData.length - 1 === index && (
                           
                          )} */}
                        </Box>
                      ))}
                      {emailListing.isLoading && filteredEmails.length !== 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress size={30} />
                        </Box>
                      ) : (
                        <Button
                          sx={{ maxWidth: "fit-content", margin: "auto" }}
                          disabled={emailListing.isLoading}
                          onClick={() => {
                            handleSelectItem(activeFolder, startIndex + 20);
                          }}
                          variant="contained"
                        >
                          Load more
                        </Button>
                      )}
                    </BoxWrapper>
                  )}
                </>
              )}
            </Box>
          </CustomCard>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailListingScreen;
// "use client";
// import CustomCard from "@/components/Card";
// import Pageheader from "@/components/PageHeader";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Divider,
//   Grid,
//   Typography,
// } from "@mui/material";
// import EmailFoldersMenu from "../EmailFoldersMenu";
// import { EmailFolders } from "@/constant";
// import { useEffect, useState } from "react";
// import { useEmailListing } from "@/provider/email";
// import SyncIcon from "@mui/icons-material/Sync";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import moment from "moment";
// import { BoxWrapper } from "@/components/BoxWrapper";
// import InboxIcon from "@mui/icons-material/Inbox";
// import SendIcon from "@mui/icons-material/Send";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import ReportIcon from "@mui/icons-material/Report";
// import DeleteIcon from "@mui/icons-material/Delete";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import ContentPasteIcon from "@mui/icons-material/ContentPaste";
// import OutboxIcon from "@mui/icons-material/Outbox";
// import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
// import EmailDetail, { ListingResponse } from "./EmailDetail";
// import { useEmailContent } from "@/provider/emailContent";
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// const EmailListingScreen = () => {
//   const [isDetailsOpened, setIsDetailsOpened] = useState(false);
//   const [activeFolder, setActiveFolder] = useState(EmailFolders.INBOX);
//   const [startIndex, setStartIndex] = useState(0);
//   const emailListing = useEmailListing({
//     folderId: EmailFolders.INBOX,
//     startIndex: startIndex,
//   });

//   const { data: emailDetails, isLoading: emailContentLoading, mutate: emailContentMutate } = useEmailContent()
//   const [emailListingData, setEmailListingData] = useState<any>([]);
//   const [emailSelectedData, setEmailSelectedData] = useState<ListingResponse | undefined>();
//   const [menuItems, setMenuItems] = useState(
//     Object.values(EmailFolders)?.map((folder: any) => {
//       return {
//         folder,
//         active: folder === EmailFolders.INBOX ? true : false,
//       }
//     }),
//   );
//   const [listingCount, setListingCount] = useState(20);
//   const getInitialEmails = async () => {
//     const emaildata = await emailListing.mutateAsync({
//       folderId: EmailFolders.INBOX,
//       startIndex: startIndex,
//     });
//     if (emaildata) {
//       setEmailListingData(emaildata);
//     }
//   };

//   useEffect(() => {
//     getInitialEmails();
//   }, []);

//   const handleDrawerClose = () => {
//     setIsDetailsOpened(false);
//   };
//   const handleNextPage = () => {
//     const nextPageStartIndex = startIndex + 20;
//     handleSelectItem(activeFolder, nextPageStartIndex, false);
//     setStartIndex(nextPageStartIndex);
//   };

//   const handlePreviousPage = () => {
//     if (startIndex >= 20) {
//       const prevPageStartIndex = startIndex - 20;
//       handleSelectItem(activeFolder, prevPageStartIndex, true);
//       setStartIndex(prevPageStartIndex);
//     }
//   };

//   const handleSelectItem = async (Item: any, _startIndex: number, isPrevious?: boolean) => {
//     const activeFolderName = menuItems.find((item: any) => item.active)?.folder;
//     setActiveFolder(Item);
//     setMenuItems(
//       menuItems?.map((item: any) => ({
//         ...item,
//         active: item.folder === Item,
//       })),
//     );
//     if (isPrevious) {
//       const updatedEmailListing = [...emailListingData]?.splice(0, emailListingData?.length - listingCount);
//       setEmailListingData(updatedEmailListing);
//       setListingCount(20);
//     }
//     else {
//       const emaildata = await emailListing.mutateAsync({
//         folderId: Item,
//         startIndex: _startIndex,
//       });
//       setListingCount(emaildata?.length);
//       if (emaildata) {
//         if (Item === activeFolderName) {
//           setEmailListingData([...emailListingData, ...emaildata]);
//         } else {
//           if (emaildata) setEmailListingData(emaildata);
//         }
//       }
//     }
//     setStartIndex(_startIndex);
//     setIsDetailsOpened(false)
//   };

//   const FolderIcon = (folder: EmailFolders, color: string, size?: number) => {
//     switch (folder) {
//       case EmailFolders.INBOX:
//         return <InboxIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.DRAFTS:
//         return <DraftsIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.TEMPLATES:
//         return <ContentPasteIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.SNOOZED:
//         return (
//           <NotificationsPausedIcon sx={{ color: color, fontSize: size }} />
//         );
//       case EmailFolders.SENT:
//         return <SendIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.SPAM:
//         return <ReportIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.TRASH:
//         return <DeleteIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.OUTBOX:
//         return <OutboxIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.STARRED:
//         return <StarBorderIcon sx={{ color: color, fontSize: size }} />;
//       case EmailFolders.ARCHIVE:
//         return <ArchiveIcon sx={{ color: color, fontSize: size }} />;
//       default:
//         return null;
//     }
//   };

//   const handleEmailDetail = (email: any) => {
//     emailContentMutate({
//       folderId: email?.folderId,
//       messageId: email?.messageId
//     })
//     setEmailSelectedData(email)
//   }
//   return (
//     <>
//       <Pageheader title="Email Listing" />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4} xl={2}>
//           <CustomCard autoHeight={"fit-content"}>
//             <EmailFoldersMenu
//               menuItems={menuItems}
//               handleSelectItem={handleSelectItem}
//               FolderIcon={FolderIcon}
//             />
//           </CustomCard>
//         </Grid>
//         <Grid item xs={12} md={8} xl={10}>
//           <CustomCard>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               {!isDetailsOpened && (
//                 <>
//                   <Pageheader title={activeFolder} />
//                   {!isDetailsOpened && emailListingData.length > 0 && (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         mt: 2,
//                       }}
//                     >
//                       <Button
//                         disabled={startIndex === 0}
//                         onClick={handlePreviousPage}
//                       >
//                         <NavigateBeforeIcon />
//                       </Button>
//                       {emailListingData.length !== 0 && (
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             gap: 2,
//                           }}
//                         >
//                           <Typography>
//                             {startIndex + 1} - {emailListingData.length}
//                           </Typography>
//                         </Box>
//                       )}
//                       <Button
//                         disabled={
//                           emailListing.isLoading ||
//                           emailListingData.length < 20 ||
//                           listingCount < 20
//                         }
//                         onClick={handleNextPage}
//                       >
//                         <NavigateNextIcon />
//                       </Button>
//                     </Box>
//                   )}
//                 </>
//               )}
//             </Box>
//             <Box sx={{ display: "flex", flexDirection: "column" }}>
//               {emailListing.isLoading ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     p: 2,
//                     gap: 1,
//                     height: "100%",
//                   }}
//                 >
//                   <CircularProgress />
//                   <Typography variant="h5" sx={{ fontWeight: "500" }}>
//                     Loading your {activeFolder}
//                   </Typography>
//                 </Box>
//               ) : emailListingData.length === 0 ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     p: 2,
//                     gap: 1,
//                   }}
//                 >
//                   {FolderIcon(activeFolder, "#000000", 50)}
//                   <Typography variant="h5" sx={{ fontWeight: "500" }}>
//                     Your {activeFolder} is empty
//                   </Typography>
//                 </Box>
//               ) : (
//                 <>
//                   {isDetailsOpened ? (
//                     <EmailDetail
//                       handleDrawerClose={handleDrawerClose}
//                       emailDetails={emailDetails}
//                       isLoading={emailContentLoading}
//                       emailListingData={emailSelectedData || undefined}
//                       activeFolder={activeFolder}
//                     />
//                   ) : (<BoxWrapper
//                     sx={{
//                       mt: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 1,
//                     }}
//                   >
//                     {emailListingData?.map((email: any, index: number) => (
//                       <Box key={index}>
//                         <Box>
//                           <Box
//                             key={index}
//                             onClick={() => {
//                               setIsDetailsOpened(true);
//                               handleEmailDetail(email)
//                             }}
//                             sx={{
//                               px: 2,
//                               py: 1,
//                               borderRadius: 1,
//                               background: (theme) =>
//                                 theme.palette.background.paper,
//                               cursor: "pointer",
//                               display: "flex",
//                               justifyContent: "space-between",
//                               width: "100%",
//                             }}
//                           >
//                             <Grid container spacing={2}>
//                               <Grid item xs={12} md={2.3}>
//                                 <Typography
//                                   sx={{
//                                     whiteSpace: "nowrap",
//                                     textOverflow: "ellipsis",
//                                     overflow: "hidden",
//                                     fontSize: "16px",
//                                     fontWeight: "500",
//                                   }}
//                                   dangerouslySetInnerHTML={{
//                                     __html: email.fromAddress,
//                                   }}
//                                 />
//                               </Grid>
//                               <Grid item xs={12} md={8.7}>
//                                 <Typography
//                                   variant="body2"
//                                   sx={{
//                                     color: (theme) => theme.palette.text.disabled,
//                                     whiteSpace: "nowrap",
//                                     textOverflow: "ellipsis",
//                                     overflow: "hidden",
//                                     // display: "flex",
//                                   }}
//                                 >
//                                   <span
//                                     style={{
//                                       color: "#000000",
//                                       fontWeight: "500",
//                                     }}
//                                   >
//                                     {email.subject}&nbsp;
//                                   </span>
//                                   - {email.summary}
//                                 </Typography>
//                               </Grid>
//                               <Grid item xs={12} md={1}>
//                                 <Typography
//                                   sx={{
//                                     color: (theme) => theme.palette.text.disabled,
//                                     fontSize: "14px",
//                                   }}
//                                 >
//                                   {moment(Number(email.receivedTime)).fromNow()}
//                                 </Typography>
//                               </Grid>
//                             </Grid>
//                           </Box>
//                           {emailListingData.length - 1 != index && <Divider />}
//                         </Box>
//                       </Box>
//                     ))}
//                   </BoxWrapper>)}
//                 </>
//               )}
//             </Box>
//           </CustomCard>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default EmailListingScreen;
