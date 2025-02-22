import Loader from "@/components/Loader";
import Pageheader from "@/components/PageHeader";
import { useUserDetailListing } from "@/provider/profile";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  MarriageStatusEnum,
  MarriageStatusForProfileEnum,
  SubMarriageStatusForProfileEnum,
} from "../Onboarding/constant";
import { useRouter } from "next/navigation";
import moment from "moment";
import { toast } from "react-toastify";
import { useDeleteCart } from "@/provider/Cart";
import usePlanPrice from "@/hooks/usePlanPrice";
import {
  getKeyOfEnum,
  PaymentStatusEnum,
  PaymentStatusMapEnum,
} from "@/constants/EnumData";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SearchIcon from "@mui/icons-material/Search";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";

const MyInterviews: React.FC = () => {
  const { isLoading: profileLoading, data: profileData } = useUserDetailListing(
    {},
  );
  const router = useRouter();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteCartId, setDeleteCartId] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCarts = profileData?.carts
    ?.filter((cart) => {
      switch (filterCriteria) {
        case "Paid":
          return cart.payment_status === PaymentStatusEnum.PAID;
        case "Not-Paid":
          return cart.payment_status === PaymentStatusEnum.UNPAID;
        case "Couple":
          return (
            cart.clientDetail.marriage_status === MarriageStatusEnum.COUPLE
          );
        case "Single":
          return (
            cart.clientDetail.marriage_status === MarriageStatusEnum.SINGLE
          );
        case "Newest":
          return true; // Sorting is handled separately
        case "Percent":
          return cart.clientDetail.steps_completed_percentage >= 0; // Adjust logic as needed
        default:
          return true;
      }
    })
    .filter((cart) =>
      searchQuery && cart?.clientDetail?.trust_name
        ? cart?.clientDetail?.trust_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true,
    )
    .sort((a, b) =>
      filterCriteria === "Newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : 0,
    );

  const handleInterviewRedirect = (cart: any) => {
    router.push(`/dashboards/living-trust-interview/${cart.id}`);
  };

  const handleViewDocument = () => {
    router.push("/dashboards/completed-documents");
  };
  const handleCreateNewInterviewRedirect = () => {
    router.push(`/dashboards/other-interviews`);
  };

  const deleteCard = useDeleteCart();

  const onDelete = () => {
    if (deleteCartId) {
      deleteCard.mutate(
        { id: deleteCartId },
        {
          onSuccess: () => {
            setIsDeleteModal(false);
            setDeleteCartId("");
          },
          onError: () => {
            setIsDeleteModal(false);
            setDeleteCartId("");
          },
        },
      );
    } else {
      setIsDeleteModal(false);
      setDeleteCartId("");
    }
  };
  useEffect(() => {
    if (deleteCard?.isSuccess) {
      toast.success("Questionnare deleted successfully", {
        position: "top-right",
      });
    }
  }, [deleteCard?.isSuccess]);

  useEffect(() => {
    if (deleteCard?.isError) {
      toast.error("Error deleting questionnare", {
        position: "top-right",
      });
    }
  }, [deleteCard?.isError]);
  return (
    <Box
      sx={{
        px: { xs: 1.5, md: "50px" },
        py: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Pageheader title="My Questionnaires" />
          <Typography sx={{ mt: { xs: 0, md: -2 } }}>
            View each legal document details here that have been created
          </Typography>
        </Box>

        {profileData?.carts && (
          <Button
            sx={{
              background: (theme) => theme.palette?.error?.dark,
              ":disabled": {
                background: (theme) => theme.palette.primary.dark,
              },
              height: "40px",
              mt: 2,
              maxWidth: "fit-content",
              lineHeight: { xs: "1", md: "inherit" },
            }}
            // disabled={loading}
            onClick={handleCreateNewInterviewRedirect}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Start A New Document
          </Button>
        )}
      </Box>

      {profileLoading ? (
        <Loader width="100%" height="70vh" />
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          {!profileData?.carts ? (
            <Box>
              <Typography
                sx={{
                  fontSize: "22px",
                  color: "#333",
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                Welcome, {profileData?.firstName} {profileData?.lastName}
              </Typography>
              <Button
                sx={{
                  background: (theme) => theme.palette.error.dark,
                  ":disabled": {
                    background: (theme) => theme.palette.primary.main,
                  },
                  height: "40px",
                  mt: 1,
                  maxWidth: "fit-content",
                  textTransform: "capitalize",
                  lineHeight: { xs: "1", md: "inherit" },
                }}
                // disabled={loading}
                onClick={handleCreateNewInterviewRedirect}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create Your First Living Trust
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search by Trust Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    sx={{ maxWidth: "300px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl variant="outlined" size="small">
                    <InputLabel>Filter By</InputLabel>
                    <Select
                      value={filterCriteria}
                      onChange={(e) => setFilterCriteria(e.target.value)}
                      label="Filter By"
                      inputProps={{ "aria-label": "Filter by" }}
                      sx={{
                        width: "150px",
                        fontSize: "14px",
                        color: "#666", // Adjust text color
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Newest">Newest to Oldest</MenuItem>
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Not-Paid">Not-Paid</MenuItem>
                      <MenuItem value="Percent">Percent Completed</MenuItem>
                      <MenuItem value="Couple">Couple</MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {filteredCarts?.map((cart, i) => (
                <Grid item sm={12} md={6} xl={4} key={i}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      p: 2,
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#fff",
                      border: "1px solid #E6E6E6",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      minHeight: "180px",
                      gap: 1.5,
                    }}
                  >
                    {/* Header Section */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            {cart?.clientDetail?.trust_name || "-"}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#4C8CD3",
                              mt: 0.5,
                            }}
                          >
                            {cart?.clientDetail?.state &&
                            cart?.clientDetail?.marriage_status
                              ? `${cart.clientDetail?.end_user}, ${
                                  MarriageStatusForProfileEnum[
                                    cart.clientDetail?.marriage_status
                                  ]
                                }, ${
                                  SubMarriageStatusForProfileEnum[
                                    cart.clientDetail?.sub_marriage_status
                                  ]
                                }, ${cart?.clientDetail?.state}`
                              : "-"}
                          </Typography>
                        </Box>
                        {/* Payment Status */}
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#ffffff",
                            backgroundColor:
                              cart?.payment_status === PaymentStatusEnum.PAID
                                ? "#02d677"
                                : cart?.payment_status ===
                                  PaymentStatusEnum.PROCESSING
                                ? "#4c8cd3"
                                : "#fc140b",
                            borderRadius: "6px",
                            px: 2,
                            py: 0.5,
                            textTransform: "uppercase",
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
                    </Box>
                    <Divider />
                    {/* Details Section */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Interview Status
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color:
                              cart?.clientDetail?.steps_completed_percentage ===
                              100
                                ? "#02D677"
                                : "#FC140B",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {cart?.clientDetail?.steps_completed_percentage ===
                          100 ? (
                            <>
                              <GppGoodRoundedIcon
                                sx={{ fontSize: "16px", marginRight: "3px" }}
                                color="success"
                              />
                              Completed
                            </>
                          ) : (
                            <>
                              <ErrorRoundedIcon
                                sx={{ fontSize: "16px", marginRight: "3px" }}
                                color="error"
                              />
                              Incomplete
                            </>
                          )}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Completed
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#000",
                          }}
                        >
                          {cart?.clientDetail?.steps_completed_percentage || 0}%
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Chapter
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#000",
                          }}
                        >
                          {cart.clientDetail?.steps_completed || 0} of 7
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Actions
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor:
                              cart?.clientDetail?.steps_completed_percentage ===
                                100 &&
                              cart?.payment_status === PaymentStatusEnum.UNPAID
                                ? "#4C8CD3"
                                : cart?.clientDetail
                                    ?.steps_completed_percentage === 100 &&
                                  cart?.payment_status ===
                                    PaymentStatusEnum.PAID
                                ? "#02D677"
                                : cart?.clientDetail
                                    ?.steps_completed_percentage === 100 &&
                                  cart?.payment_status ===
                                    PaymentStatusEnum.PROCESSING
                                ? "#4c8cd3"
                                : "#FC140B",
                            color: "#fff",
                            textTransform: "uppercase",
                            fontSize: "12px",
                            px: 2,
                            height: "25px",
                          }}
                          onClick={() =>
                            cart?.clientDetail?.steps_completed_percentage ===
                              100 &&
                            cart?.payment_status === PaymentStatusEnum.PAID
                              ? handleViewDocument()
                              : cart?.clientDetail
                                  ?.steps_completed_percentage === 100 &&
                                cart?.payment_status ===
                                  PaymentStatusEnum.PROCESSING
                              ? null
                              : handleInterviewRedirect(cart)
                          }
                        >
                          {cart?.clientDetail?.steps_completed_percentage ===
                            100 &&
                          cart?.payment_status === PaymentStatusEnum.UNPAID
                            ? "Checkout"
                            : cart?.clientDetail?.steps_completed_percentage ===
                                100 &&
                              cart?.payment_status === PaymentStatusEnum.PAID
                            ? "Preview"
                            : cart?.clientDetail?.steps_completed_percentage ===
                                100 &&
                              cart?.payment_status ===
                                PaymentStatusEnum.PROCESSING
                            ? "Processing"
                            : "Continue"}
                        </Button>
                      </Box>
                    </Box>
                    <Divider />
                    {/* Footer Section */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ maxWidth: "120px" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Fiduciaries
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#000",
                            whiteSpace: "normal", // Ensures wrapping
                            wordBreak: "break-word", // Breaks long words
                          }}
                        >
                          {cart.clientDetail?.PrimaryTrustee?.first_name}{" "}
                          {cart.clientDetail?.PrimaryTrustee?.last_name}
                          {cart.clientDetail?.SecondaryTrustee && (
                            <>
                              ,<br />
                              {
                                cart.clientDetail?.SecondaryTrustee?.first_name
                              }{" "}
                              {cart.clientDetail?.SecondaryTrustee?.last_name}
                            </>
                          )}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Date Created
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#000",
                          }}
                        >
                          {moment(cart?.createdAt).format("MM/DD/YYYY")}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#646464",
                            mb: 0.5,
                          }}
                        >
                          Date Paid
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: "#000",
                          }}
                        >
                          {cart?.paidAt
                            ? moment(cart?.paidAt).format("MM/DD/YYYY")
                            : "-"}
                        </Typography>
                      </Box>

                      <Button
                        variant="text"
                        color="error"
                        onClick={() => {
                          setIsDeleteModal(true);
                          setDeleteCartId(cart?.id);
                        }}
                        disabled={
                          cart.payment_status !== PaymentStatusEnum.UNPAID
                        }
                      >
                        <DeleteRoundedIcon sx={{ fontSize: "20px" }} />
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
      <Dialog open={isDeleteModal}>
        <Box
          sx={{
            width: "450px",
            height: "240px",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "28px", mb: 2, fontWeight: 700 }}>
                Delete Questionnare
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  textAlign: "center",
                  lineHeight: "32px",
                }}
              >
                Are you sure you want to delete this questionnare?. <br /> This
                action cannot be undone.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="inherit"
                variant="contained"
                sx={{ mr: 2, width: "120px" }}
                onClick={() => {
                  setIsDeleteModal(false);
                  setDeleteCartId("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => onDelete()}
                sx={{ width: "120px" }}
                variant="contained"
                color="error"
              >
                {deleteCard?.isLoading ? (
                  <CircularProgress size={25} />
                ) : (
                  "Delete"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MyInterviews;
