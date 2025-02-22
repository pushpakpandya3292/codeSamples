"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { CameraAlt, Check, Close, Edit } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import Pageheader from "@/components/PageHeader";

import { useUserDetailListing, useUserUpdate } from "@/provider/profile";
import PaymentPopupSuccess from "@/components/PaymentPopup/Success";
import PaymentPopupFailed from "@/components/PaymentPopup/Fail";
import { PaymentEnum } from "./constants";
import Link from "next/link";

import Image from "next/image";
import Avatar from "@/assets/img/Doc.png";

import { useSession } from "next-auth/react";
import { MarriageStatusEnum } from "@/screens/Onboarding/constant";
import ProfileAlert from "@/components/ProfileAlert";
import Loader from "@/components/Loader";
import { useClientCache } from "@/provider/ClientCache";
import { useUploader } from "@/provider/uploadDoc";
import { toast } from "react-toastify";
import moment from "moment";
import placeHolder from "@/assets/img/placeholder-image.jpeg";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AddsCard from "@/components/AddsCard";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SendIcon from "@mui/icons-material/Send";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SideDrawer from "@/components/Drawer";
import EmailForm from "@/components/ReferForm.tsx";
import FeedbackForm from "@/components/FeedbackForm";
import referAfriend from "@/assets/img/refer.png";
import feedback from "@/assets/img/feedback.png";
import needHelp from "@/assets/img/help.png";
import useBreakPoints from "@/hooks/useBreakPoints";
import {
  getKeyOfEnum,
  PaymentStatusEnum,
  PaymentStatusMapEnum,
} from "@/constants/EnumData";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MailIcon from "@mui/icons-material/Mail";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Tour from "@/components/DashboardTutorial";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const data = [
  {
    title: "Understand Your Dashboard",
    description:
      "Learn how to easily navigate all the features, pages and parts of your dashboard.",
    videoUrl: "xxxxx",
    thumbnailUrl: "/images/video_slide1.jpg",
  },
  {
    title: "How to Start a New Document",
    description:
      "Learn how to pick a plan, open multiple documents for others and how to set up an account properly.",
    videoUrl: "xxxxx",
    thumbnailUrl: "/images/video_slide2.jpg",
  },
  {
    title: "How to Pick Your Trustees",
    description:
      "Learn how to select the right people to succeed you and what each position means.",
    videoUrl: "xxxxx",
    thumbnailUrl: "/images/video_slide3.jpg",
  },
  {
    title: "Tips to Write your Living Trust Wishes",
    description:
      "Learn the various categories and topics and corresponding sample answers to help write wishes faster.",
    videoUrl: "xxxxx",
    thumbnailUrl: "/images/video_slide3.jpg",
  },
  {
    title: "What to do when your binder arrives",
    description:
      "Get an overview of what we provide in your binder and what to expect to complete and fund your living trust.",
    videoUrl: "xxxxx",
    thumbnailUrl: "/images/video_slide3.jpg",
  },
];

enum SortDataByEnum {
  "ASCENDING" = "ASC",
  "DESCENDING" = "DESC",
}

function MainDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [openPaymentModalSuccess, setOpenPaymentModalSuccess] = useState(false);
  const [openPaymentModalFailed, setOpenPaymentModalFailed] = useState(false);
  // const [activeVideo, setActiveVideo] = useState(null);
  const [activeVideo, setActiveVideo] = useState<any>(null);

  const searchParams = useSearchParams();
  const payment = searchParams.get("payment");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({
    title: "",
    content: <></>,
  });
  const {
    isLoading: profileLoading,
    data: profileData,
    refetch,
  } = useUserDetailListing({
    isValid: status === "authenticated",
  });


  const uploader = useUploader({});
  const updateProfile = useUserUpdate({});
  const [sortBy, setSortBy] = useState(SortDataByEnum.DESCENDING);
  function sortByDate(a: any, b: any) {
    const dateA: any = new Date(a?.createdAt);
    const dateB: any = new Date(b?.createdAt);
    return sortBy === SortDataByEnum.ASCENDING ? dateA - dateB : dateB - dateA;
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
      setActiveVideo(data[0]);
  }, [data]);

  const Advertisments = [
    {
      title: "Refer a friend",
      description:
        "Enjoying EZ Living Trust? Share our website with your family and friends and you will give them a 10% discount.",
      buttonContent: "Send an email now",
      buttonIcon: <SendIcon />,
      backGroundColor: "#FCE5CD",
      image: referAfriend,
      onClick: () => {
        setDrawerContent({
          title: "Refer a friend",
          content: <EmailForm handleDrawerClose={handleDrawerClose} />,
        });
        handleDrawerOpen();
      },
      className: "referalContainer",
    },
    {
      title: "We 🩷 Feedback",
      className: "supportContainer",
      description:
        "We built EZ Living to help working families have access to an affordable, quality plan. Please share any feedback or ideas to get better.",
      buttonContent: "Share your ideas or Give a rating",
      buttonIcon: <TipsAndUpdatesIcon />,
      backGroundColor: "#FFF2CC",
      image: feedback,
      onClick: () => {
        setDrawerContent({
          title: "Your Feedback",
          content: <FeedbackForm handleDrawerClose={handleDrawerClose} />,
        });
        handleDrawerOpen();
      },
    },
    {
      className: "feedbackContainer",
      title: "Need Support?",
      description:
        "While we can't give legal advice, we can help with with general questions. You can set up a call, zoom or in person with our online calendar.",
      buttonContent: "Get support or set an appointment",
      buttonIcon: <CalendarMonthIcon />,
      backGroundColor: "#D9D9D9",
      image: needHelp,
      onClick: () => {
        router.push("/dashboards/support");
      },
    },
  ];
  useEffect(() => {
    if (payment === PaymentEnum.SUCCESS) {
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.delete("payment");
      newSearchParams.delete("payment_intent");
      newSearchParams.delete("payment_intent_client_secret");
      newSearchParams.delete("redirect_status");
      const newUrl = `${
        window.location.pathname
      }?${newSearchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      setOpenPaymentModalSuccess(true);
    } else if (payment === PaymentEnum.FAILED) {
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.delete("payment");
      newSearchParams.delete("payment_intent");
      newSearchParams.delete("payment_intent_client_secret");
      newSearchParams.delete("redirect_status");
      const newUrl = `${
        window.location.pathname
      }?${newSearchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
      setOpenPaymentModalFailed(true);
    }
  }, [payment]);
  useEffect(() => {
    if (uploader?.isSuccess) {
      updateProfile.mutate({
        photo: {
          id: uploader?.data?.id,
        },
      });
    }
  }, [uploader?.isSuccess]);

  useEffect(() => {
    if (updateProfile?.isSuccess) {
      setEditing(false);
      toast.success("Profile Picture Updated successfully", {
        position: "top-right",
      });
    }
  }, [updateProfile?.isSuccess]);

  const handleClosePaymentModal = () => {
    refetch();
    setOpenPaymentModalSuccess(false);
    setOpenPaymentModalFailed(false);
  };

  const handleCreateNewInterviewRedirect = () => {
    router.push(`/dashboards/other-interviews`);
  };

  const activePlaylist = data;

  if (profileLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ px: { xs: 2, sm: 2.5, md: 5 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: "15px", md: "0" },
            mt: { xs: "15px", md: "auto" },
          }}
        >
          <Pageheader title="Dashboard" />{" "}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={8}>
            <Grid container>
              <Grid className="questionnaireBox" xs={12} md={12} lg={6}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    marginBottom: "20px",
                    position: "relative",
                    height: "100%",
                    mr: 2,
                  }}
                >
                  <Box
                    sx={{
                      borderTopLeftRadius: 1,
                      borderTopRightRadius: 1,
                      background: (theme) => theme.palette.primary.main,
                      gap: 1,
                      p: 1.5,
                      px: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        className="star-burst"
                        variant="h4"
                        mb={1}
                        sx={{
                          fontSize: { xs: "16px", md: "17px" },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      >
                        Your Questionnaires{" "}
                      </Typography>
                      <Typography
                        variant="body1"
                        mt={1}
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      >
                        View your Questionnaires here.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 0.5,
                      }}
                    >
                      {profileData?.carts && profileData?.carts?.length > 0 && (
                        <Button
                          sx={{
                            width: "fit-content",
                            minWidth: "fit-content",
                            fontSize: "13px",
                            background: "red",
                            color: (theme) => theme.palette.text.secondary,
                            fontWeight: 600,
                            height: "100%",
                          }}
                          onClick={handleCreateNewInterviewRedirect}
                          size="small"
                          color="error"
                          variant="outlined"
                          className="startNewDocument"
                        >
                          Start a new document
                        </Button>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      overflow: "hidden",
                      overflowY: "auto",
                      maxHeight: "275px",
                      p: 2,
                    }}
                  >
                    {profileData?.carts && profileData?.carts?.length > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          onClick={() => {
                            sortBy === SortDataByEnum.ASCENDING
                              ? setSortBy(SortDataByEnum.DESCENDING)
                              : setSortBy(SortDataByEnum.ASCENDING);
                          }}
                          sx={{
                            width: "fit-content",
                            minWidth: "fit-content",
                            fontSize: "13px",
                            fontWeight: 600,
                            height: "30px",
                            mb: 1,
                          }}
                          color="primary"
                          variant="outlined"
                        >
                          Sort by date
                          {sortBy === SortDataByEnum.ASCENDING ? (
                            <ArrowUpwardRoundedIcon
                              sx={{ fontSize: "14px", ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardRoundedIcon
                              sx={{ fontSize: "14px", ml: 0.5 }}
                            />
                          )}
                        </Button>
                        <Box>
                          <Typography
                            sx={{ mb: 1, display: "inline" }}
                            variant="h4"
                          >
                            {profileLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              "Total Documents "
                            )}
                            <Typography variant="h4" sx={{ display: "inline" }}>
                              {profileLoading ? (
                                <Skeleton width={200} />
                              ) : (
                                <>
                                  {profileData?.carts?.length
                                    ? profileData?.carts?.length
                                    : "0"}
                                </>
                              )}
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    {profileLoading ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : !profileData?.carts ? (
                      <Box className="newQuestionnaireBtn">
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          Start your first living trust document.
                        </Typography>
                        <Button
                          sx={{
                            background: (theme) => theme.palette?.error?.dark,
                            ":disabled": {
                              background: (theme) => theme.palette.primary.dark,
                            },
                            height: "40px",
                            maxWidth: "fit-content",
                            fontSize: { xs: "14px", md: "large" },
                            textTransform: {
                              xs: "capitalize",
                              md: "uppercase",
                            },
                          }}
                          onClick={handleCreateNewInterviewRedirect}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          className="startNewDocument"
                        >
                          Start A New Document
                        </Button>
                      </Box>
                    ) : (
                      profileData?.carts?.sort(sortByDate).map((cart, i) => (
                        <Box
                          key={i}
                          sx={{
                            background: "#F0F7FF",
                            borderRadius: 2,
                            p: 2,
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 2,
                              flexDirection: {
                                xs: "row",
                                sm: "row",
                                md: "row",
                              },
                              textAlign: {
                                xs: "left",
                                sm: "left",
                                md: "inherit",
                              },
                            }}
                          >
                            <Typography variant="h4" sx={{ fontSize: "16px" }}>
                              {cart?.clientDetail?.trust_name || "-"}
                            </Typography>
                            <Typography
                              sx={{
                                background:
                                  cart?.payment_status === 2
                                    ? "#FFBFBF"
                                    : "#CCFFBF",
                                borderRadius: 10,
                                p: 1,
                                px: 2,
                                width: "100px",
                                maxWidth: "fit-content",
                                fontSize: "10px",
                                color:
                                  cart?.payment_status === 2
                                    ? "#C54646"
                                    : "#519000",
                              }}
                            >
                              {
                                PaymentStatusMapEnum[
                                  getKeyOfEnum(
                                    PaymentStatusEnum,
                                    cart?.payment_status,
                                  ) as keyof typeof PaymentStatusMapEnum
                                ]
                              }
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: { xs: "flex-start", md: "center" },
                              justifyContent: "space-between",
                              gap: 2,
                              mt: 1,
                              flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "row",
                                lg: "column",
                                xl: "row",
                              },
                              textAlign: {
                                xs: "left",
                                sm: "left",
                                md: "inherit",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: {
                                  xs: "row",
                                  sm: "row",
                                  md: "row",
                                  lg: "row",
                                },
                                gap: { xs: 1, md: 2 },
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="h4"
                                  sx={{ fontSize: "10px" }}
                                >
                                  Started
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: "14px", fontWeight: "400" }}
                                >
                                  {moment(cart?.createdAt).format(
                                    "MM/DD/YYYY",
                                  ) || "-"}
                                </Typography>
                              </Box>
                              <Divider
                                orientation={"vertical"}
                                sx={{
                                  height: { xs: "30px", lg: "30px" },
                                  background: (theme) =>
                                    theme.palette.text.disabled,
                                }}
                              />
                              <Box>
                                <Typography
                                  variant="h4"
                                  sx={{ fontSize: "10px" }}
                                >
                                  Steps complete
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: "14px", fontWeight: "400" }}
                                >
                                  {cart?.clientDetail
                                    ?.steps_completed_percentage
                                    ? `${cart?.clientDetail?.steps_completed_percentage?.toFixed(
                                        2,
                                      )}%`
                                    : "0.00%"}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{
                                  a: {
                                    color: "#00008B",
                                    textDecoration: "none",
                                  },
                                }}
                              >
                                {(() => {
                                  switch (true) {
                                    case cart?.clientDetail
                                      ?.steps_completed_percentage === 100 &&
                                      cart?.payment_status ===
                                        PaymentStatusEnum.REFUND:
                                      return (
                                        <>
                                          <Button
                                            className="continueInterView"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              background: (theme) =>
                                                theme.additionalColors
                                                  ?.tablightBlue,
                                              color: (theme) =>
                                                theme.palette.primary.light,
                                              borderRadius: "5px",
                                              padding: "5px 10px",
                                              fontFamily: "Roboto",
                                              textTransform: "capitalize",
                                              fontWeight: "400",
                                            }}
                                          >
                                            Refund
                                          </Button>
                                        </>
                                      );
                                    case cart?.clientDetail
                                      ?.steps_completed_percentage === 100 &&
                                      cart?.payment_status ===
                                        PaymentStatusEnum.PROCESSING:
                                      return (
                                        <>
                                          <Button
                                            className="continueInterView"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                              background: (theme) =>
                                                theme.additionalColors
                                                  ?.tablightBlue,
                                              color: (theme) =>
                                                theme.palette.primary.light,
                                              borderRadius: "5px",
                                              padding: "5px 10px",
                                              fontFamily: "Roboto",
                                              textTransform: "capitalize",
                                              fontWeight: "400",
                                            }}
                                          >
                                            Processing
                                          </Button>
                                        </>
                                      );
                                    case cart?.clientDetail
                                      ?.steps_completed_percentage === 100 &&
                                      cart?.payment_status ===
                                        PaymentStatusEnum.UNPAID:
                                      return (
                                        <>
                                          <Link
                                            href={`/dashboards/living-trust-interview/${cart.id}`}
                                          >
                                            <Button
                                              className="continueInterView"
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                background: (theme) =>
                                                  theme.palette.info.main,
                                                color: (theme) =>
                                                  theme.palette.primary.light,
                                                borderRadius: "5px",
                                                padding: "5px 20px",
                                                fontFamily: "Roboto",
                                                textTransform: "capitalize",
                                                fontWeight: "400",
                                              }}
                                            >
                                              Checkout
                                            </Button>
                                          </Link>
                                        </>
                                      );
                                    case cart?.clientDetail
                                      ?.steps_completed_percentage === 100 &&
                                      cart?.payment_status ===
                                        PaymentStatusEnum.PAID:
                                      return (
                                        <>
                                          <Link
                                            href={
                                              "/dashboards/completed-documents"
                                            }
                                          >
                                            <Button
                                              className="continueInterView"
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                background: (theme) =>
                                                  theme.palette.primary.main,
                                                color: (theme) =>
                                                  theme.palette.primary.light,
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                                fontFamily: "Roboto",
                                                textTransform: "capitalize",
                                                fontWeight: "400",
                                              }}
                                            >
                                              View document
                                            </Button>
                                          </Link>
                                        </>
                                      );
                                    default:
                                      return (
                                        <>
                                          <Link
                                            href={`/dashboards/living-trust-interview/${cart.id}`}
                                          >
                                            <Button
                                              className="continueInterView"
                                              variant="contained"
                                              color="error"
                                              sx={{
                                                background: (theme) =>
                                                  theme.palette.success.main,
                                                color: (theme) =>
                                                  theme.palette.primary.light,
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                                fontFamily: "Roboto",
                                                textTransform: "capitalize",
                                                fontWeight: "400",
                                              }}
                                            >
                                              Continue interview
                                            </Button>
                                          </Link>
                                        </>
                                      );
                                  }
                                })()}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                </Card>
              </Grid>
              <Grid className="profileDetails" xs={12} md={12} lg={6}>
                <Card
                  sx={{
                    px: 2,
                    pt: 1,
                    borderRadius: "16px",
                    marginBottom: "20px",
                    position: "relative",
                    mb: 2,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      gap: "5px",
                      marginTop: "5px",
                    }}
                  >
                    <Box>
                      {profileLoading ||
                      uploader?.isLoading ||
                      updateProfile?.isLoading ? (
                        <Skeleton
                          sx={{ height: "150px", width: "150px" }}
                          variant="circular"
                        />
                      ) : (
                        <>
                          <Image
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "cover",
                            }}
                            alt=""
                            //@ts-ignore
                            src={profileData?.photo?.path || Avatar}
                          />
                        </>
                      )}
                    </Box>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "18px",
                          mt: 2,
                          fontWeight: "500",
                          mx: 1,
                        }}
                      >
                        {profileLoading ? <Skeleton width={100} /> : "Welcome"}
                      </Typography>
                      <Typography variant="h2" sx={{ fontSize: "25px", mx: 1 }}>
                        {profileLoading ? (
                          <Skeleton width={200} />
                        ) : (
                          <>
                            {profileData?.firstName} {""}
                            {profileData?.lastName}
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid
                    sx={{
                      backgroundColor: "#F0F7FF",
                      borderRadius: 3,
                      p: 1,
                      py: 3,
                    }}
                    container
                  >
                    {/* <Grid item xs={12}>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: "15px",
                          }}
                        >
                          <Box>
                            {profileLoading ||
                            uploader?.isLoading ||
                            updateProfile?.isLoading ? (
                              <Skeleton
                                sx={{ height: "150px", width: "150px" }}
                                variant="circular"
                              />
                            ) : (
                              <>
                                <Image
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                  }}
                                  alt=""
                                  //@ts-ignore
                                  src={profileData?.photo?.path || Avatar}
                                />
                              </>
                            )}
                          </Box>
                          <Box>
                            <Typography
                              variant="h3"
                              sx={{
                                fontSize: "20px",
                                mt: 2,
                                fontWeight: "500",
                              }}
                            >
                              {profileLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                "Welcome"
                              )}
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: "25px" }}>
                              {profileLoading ? (
                                <Skeleton width={200} />
                              ) : (
                                <>
                                  {profileData?.firstName} {""}
                                  {profileData?.lastName}
                                </>
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid> */}

                    <Grid
                      item
                      py={1}
                      sx={{
                        py: 2,
                        px: 0,
                      }}
                      md={12}
                      lg={6}
                      xs={12}
                    >
                      <Box
                        sx={{
                          p: 1,
                          width: "100%",
                          gap: "2rem",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <MailIcon
                            sx={{ fontWeight: 100, fontSize: "20px" }}
                          />
                          <Typography
                            sx={{ mb: 1, fontWeight: 500 }}
                            variant="h3"
                          >
                            {profileLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              "Email"
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Tooltip title={profileData?.email} arrow>
                            <Typography
                              variant="h3"
                              sx={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                fontWeight: 400,
                              }}
                            >
                              {profileLoading ? (
                                <Skeleton width={200} />
                              ) : (
                                `${profileData?.email}`
                              )}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      py={1}
                      sx={{
                        py: 2,
                        px: 0,
                      }}
                      md={12}
                      lg={6}
                      xs={12}
                    >
                      <Box
                        sx={{
                          p: 1,
                          width: "100%",
                          gap: "2rem",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <RecordVoiceOverIcon
                            sx={{ fontWeight: 100, fontSize: "20px" }}
                          />
                          <Typography
                            sx={{ mb: 1, fontWeight: 500 }}
                            variant="h3"
                          >
                            {profileLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              "Referred by"
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              fontWeight: 400,
                            }}
                          >
                            {profileLoading ? (
                              <Skeleton width={200} />
                            ) : profileData?.liscensed_partner ? (
                              profileData?.liscensed_partner
                            ) : (
                              "--- "
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      py={1}
                      sx={{
                        py: 2,
                        px: 0,
                      }}
                      md={12}
                      lg={6}
                      xs={12}
                    >
                      <Box
                        sx={{
                          p: 1,
                          width: "100%",
                          gap: "2rem",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <VpnKeyIcon
                            sx={{ fontWeight: 100, fontSize: "20px" }}
                          />
                          <Typography
                            sx={{ mb: 1, fontWeight: 500 }}
                            variant="h3"
                          >
                            {profileLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              "Last Login"
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              fontWeight: 400,
                            }}
                          >
                            {profileLoading ? (
                              <Skeleton width={200} />
                            ) : (
                              //@ts-ignore
                              profileData?.lastLogin &&
                              //@ts-ignore
                              moment(new Date(profileData?.lastLogin)).format(
                                "ll",
                              )
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      py={1}
                      sx={{
                        py: 2,
                        px: 0,
                      }}
                      md={12}
                      lg={6}
                      xs={12}
                    >
                      <Box
                        sx={{
                          p: 1,
                          width: "100%",
                          gap: "2rem",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <DateRangeIcon
                            sx={{ fontWeight: 100, fontSize: "20px" }}
                          />
                          <Typography
                            sx={{ mb: 1, fontWeight: 500 }}
                            variant="h3"
                          >
                            {profileLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              "Account Opened"
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              fontWeight: 400,
                            }}
                          >
                            {profileLoading ? (
                              <Skeleton width={200} />
                            ) : (
                              profileData?.createdAt &&
                              moment(new Date(profileData?.createdAt)).format(
                                "ll",
                              )
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {/* <Grid item xs={12}>
                          <Box sx={{ p: 1 }}>
                            <Typography sx={{ mb: 1 }} variant="h4">
                              {profileLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                "Referred by"
                              )}
                            </Typography>
                            <Typography variant="h3">
                              {profileLoading ? (
                                <Skeleton width={200} />
                              ) : profileData?.liscensed_partner ? (
                                profileData?.liscensed_partner
                              ) : (
                                "-"
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ p: 1 }}>
                            <Typography sx={{ mb: 1 }} variant="h4">
                              {profileLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                "Last login"
                              )}
                            </Typography>
                            <Typography variant="h3">
                              {profileLoading ? (
                                <Skeleton width={200} />
                              ) : (
                                //@ts-ignore
                                profileData?.lastLogin &&
                                //@ts-ignore
                                moment(new Date(profileData?.lastLogin)).format(
                                  "ll",
                                )
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ p: 1 }}>
                            <Typography sx={{ mb: 1 }} variant="h4">
                              {profileLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                "Account Opened"
                              )}
                            </Typography>
                            <Typography variant="h3">
                              {profileLoading ? (
                                <Skeleton width={200} />
                              ) : (
                                profileData?.createdAt &&
                                moment(new Date(profileData?.createdAt)).format(
                                  "ll",
                                )
                              )}
                            </Typography>
                          </Box>
                        </Grid> */}
                  </Grid>
                  {/* <Link href="/dashboards/profile">
                    <Button
                      sx={{
                        position: "absolute",
                        right: "15px",
                        top: "15px",
                        maxWidth: "30px",
                        minWidth: "30px",
                      }}
                      variant="outlined"
                    >
                      <Edit fontSize="small" />
                    </Button>
                  </Link> */}
                </Card>
              </Grid>
              <Grid className="tutorialVideosContainer" xs={12}>
                <Card
                  sx={{
                    pb: 1,
                    borderRadius: "16px",
                    position: "relative",
                    my: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                      p: 1,
                      background: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    <PlaylistPlayIcon />{" "}
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "17px",
                        color: (theme) => theme.palette.text.secondary,
                      }}
                    >
                      Tutorial Videos
                    </Typography>
                  </Box>
                  <Grid container spacing={1} px={4} py={3}>
                    <Grid
                      item
                      // ml={2.5}
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={3.6}
                      sx={{
                        height: { xs: "auto", md: "350px" },
                        overflowX: "hidden",
                        overflowY: "auto",
                        mt: 1,
                        borderRadius: "5px",
                        border: "2px solid #000",
                        p: "0 !important",
                        order: { xs: 2, sm: 2, md: 1 },
                      }}
                    >
                      <Typography
                        sx={{
                          background: "#C3D7FF",
                          borderBottom: "2px solid #000",
                          lineHeight: "22px",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#000",
                          p: 1,
                        }}
                      >
                        {"Watch and Learn"}
                      </Typography>
                      {/* {playlistData?.data?.map((el, index) => (
                        <Box
                          key={index}
                          onClick={() => setActiveVideo(playlistData?.data[index])}
                          sx={{
                            display: "flex",
                            background: el.videoTitle === activeVideo?.videoTitle ? "#C3D7FF" : "",
                            p: 1,
                            borderBottom: "2px solid #000",
                            cursor: "pointer",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                lineHeight: "22px",
                                fontSize: "14px",
                                fontWeight: "500",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                color: "#000",
                              }}
                            >
                              <strong style={{ display: "block" }}>
                                {index + 1}. {el.videoTitle}
                              </strong>
                              <span style={{ fontSize: "12px" }}>
                                {el.videoDescription}
                              </span>
                            </Typography>
                          </Box>
                        </Box>
                      ))} */}

                      {activePlaylist.map((el: any, index) =>
                          <Box
                            key={index}
                            onClick={() => setActiveVideo(el)}
                            sx={{
                              display: "flex",
                              background: el === activeVideo ? "#C3D7FF" : "",
                              p: 1,
                              borderBottom: "2px solid #000",
                              cursor: "pointer",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  lineHeight: "22px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: "3",
                                  WebkitBoxOrient: "vertical",
                                  color: "#000",
                                }}
                              >
                                <strong style={{ display: "block" }}>
                                  {index + 1}. {el.videoTitle || el.title}
                                </strong>
                                <span style={{ fontSize: "12px" }}>
                                  {el.videoDescription || el.description}
                                </span>
                              </Typography>
                            </Box>
                          </Box>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8.4}
                      sx={{ order: { xs: 1, sm: 1, md: 2 } }}
                    >
                        <>
                          <Typography
                            variant="h4"
                            sx={{
                              fontSize: "16px",
                              fontWeight: "500",
                              background: "#C3D7FF",
                              display: "flex",
                              alignItems: "center",
                              borderRadius: "5px",
                              padding: "3px",
                              mb: 1,
                            }}
                          >
                            <PlayArrowRoundedIcon />{" "}
                            {activeVideo?.videoTitle || activeVideo?.title}
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "5px",
                              overflow: "hidden",
                              boxShadow: "0 0 10px 3px #ccc",
                            }}
                          >
                            <ReactPlayer
                              width={"100%"}
                              height={310}
                              controls
                              url={
                                activeVideo?.video?.file?.path ||
                                activeVideo?.videoUrl
                              }
                            />
                          </Box>
                        </>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {Advertisments?.map((item, index) => (
                <Box key={index}>
                  <AddsCard
                    buttonContent={item.buttonContent}
                    buttonIcon={item.buttonIcon}
                    onClick={item.onClick}
                    backgroundColor={item.backGroundColor}
                    title={item.title}
                    image={item.image}
                    description={item.description}
                    className={item.className}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ px: { xs: 1, md: 5 }, my: { xs: 1, md: 2 } }}>
        {/* <Grid container spacing={2} my={1}>
          {Advertisments?.map((item, index) => (
            <Grid key={index} item xs={12} md={12} lg={4}>
              <AddsCard
                buttonContent={item.buttonContent}
                buttonIcon={item.buttonIcon}
                onClick={item.onClick}
                backgroundColor={item.backGroundColor}
                title={item.title}
                image={item.image}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid> */}
        <PaymentPopupSuccess
          handleClosePaymentModal={handleClosePaymentModal}
          openPaymentModal={openPaymentModalSuccess}
        />
        <PaymentPopupFailed
          handleClosePaymentModal={handleClosePaymentModal}
          openPaymentModal={openPaymentModalFailed}
        />
      </Box>

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
          title={drawerContent.title}
          sx={{
            width: { xs: "100%", md: "800px" },
            ".MuiPaper-root.MuiPaper-elevation": {
              width: { xs: "100%", md: "800px" },
              maxWidth: { xs: "100%", md: "800px" },
            },
          }}
        >
          {drawerContent.content}
        </SideDrawer>
      </Backdrop>
    </>
  );
}

export default MainDashboard;
