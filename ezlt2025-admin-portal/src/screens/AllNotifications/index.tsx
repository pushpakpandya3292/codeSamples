"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Pageheader from "@/components/PageHeader";
import { useFirebaseNotificationListing } from "@/provider/firebaseNotification";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NotificationItem, { NotificationProps } from "@/components/Notification";

const LIMIT = 10;
let totalPages = 0;
function AllNotifications() {
  const [page, setPage] = useState(1);

  const {
    data: firebaseNotification,
    refetch: firebaseNotificationRefetch,
    isLoading: notificationLoading,
  } = useFirebaseNotificationListing({
    limit: LIMIT,
    page: page,
  });
  if (firebaseNotification?.total) {
    totalPages = Math.ceil(firebaseNotification?.total / LIMIT);
  }
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pageheader title="Notifications" />
      </Box>
      {notificationLoading ? (
        <Box
          sx={{
            width: "40%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "40%",
            position: "relative",
            mb: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          {firebaseNotification?.data ? (
            <Box
              sx={{
                overflowX: "hidden",
                overflowY: "auto",
                minHeight: "50vh",
                height: "76vh",
              }}
            >
              {firebaseNotification?.data?.map((element, index) => (
                <NotificationItem
                  key={index}
                  element={element}
                  // handleClickNotification={handleClickNotification}
                />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%%",
                position: "relative",
                height: "450px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>No notification found</Typography>
            </Box>
          )}
          {totalPages > 0 && (
            <Box
              sx={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                margin: "auto",
                width: "100%",
                textAlign: "center",
                background: "#f6f9ff",
                padding: "15px 0px",
                "& button.MuiButtonBase-root": {
                  maxWidth: "40px",
                  minWidth: "40px",
                  borderRadius: "0",
                  border: "0",
                  m: "3px",
                },
              }}
            >
              <Button
                variant="contained"
                onClick={handlePreviousPage}
                disabled={page === 1 || notificationLoading}
              >
                <NavigateBeforeIcon />
              </Button>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isStart = pageNumber <= 2;
                const isEnd = pageNumber >= totalPages - 1;
                const isNearCurrentPage =
                  pageNumber >= page - 1 && pageNumber <= page + 1;
                if (isStart || isEnd || isNearCurrentPage) {
                  return (
                    <Button
                      key={pageNumber}
                      variant={page === pageNumber ? "contained" : "outlined"}
                      onClick={() => handlePageClick(pageNumber)}
                      sx={{ minWidth: "40px", mx: 0.5 }}
                    >
                      {pageNumber}
                    </Button>
                  );
                }
                if (pageNumber === 3 && page > 5) {
                  return <span key={pageNumber}>...</span>;
                } else if (
                  pageNumber === totalPages - 2 &&
                  page < totalPages - 4
                ) {
                  return <span key={pageNumber}>...</span>;
                }

                return null;
              })}

              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={page === totalPages || notificationLoading}
              >
                <NavigateNextIcon />
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default AllNotifications;
