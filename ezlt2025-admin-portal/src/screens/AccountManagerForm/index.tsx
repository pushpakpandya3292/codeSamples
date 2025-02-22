"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import Pageheader from "@/components/PageHeader";
import AccountManagerListing from "./AccountManagerListing";
import CustomModal from "@/components/CustomModal";
import InvationForm from "./InvationForm";
import { AccountManagerStatusEnum, filtersAccountManager } from "@/constant";
import { useStats } from "@/provider/stats";

export default function AccountManagerForm() {
  const stats = useStats({});
  const [filterId, setFilterId] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const handleInvitationModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          mt: 1,
        }}
      >
        <Pageheader title="Account Administrator" />
        <Box>
          <Button
            sx={{
              background: (theme) => theme.palette.primary.main,
              ":disabled": {
                background: (theme) => theme.palette.primary.main,
              },
              height: "40px",
            }}
            // disabled={accountManagerLoading}
            onClick={handleInvitationModal}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Invite
          </Button>
        </Box>
      </Box>
      <FormControl>
        <RadioGroup
          value={filterId}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => setFilterId(e.target.value)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
              // flexWrap: "wrap",
              width: "100%",
            }}
          >
            {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
            {stats?.isFetching ? (
              <Skeleton height={50} width={100} sx={{ mr: 2 }} />
            ) : (
              <Card
                // onClick={() => {
                //   setFilterId(undefined);
                // }}
                style={{
                  cursor: "pointer",
                  // border: filterId == undefined ? "3px solid #fba440" : "0px",
                  // minWidth: "130px",
                  // margin: "10px",
                  background: "transparent",
                  boxShadow: "none",
                  // borderRadius: "16px",
                  // paddingBlock: 2,
                  // paddingInline: 4,
                  // height: "100px",
                  display: "flex",
                  paddingLeft: "10px",
                  // flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value={undefined}
                  control={<Radio />}
                  label={`Total (${
                    stats?.data?.count_account_manager_statuses
                      ? stats?.data?.count_account_manager_statuses[
                          `Total` as keyof typeof stats.data.count_account_manager_statuses
                        ]
                      : 0
                  })`}
                  sx={{
                    span: {
                      color: "#000000",
                      "&::hover": {
                        backgroundColor: "none !important",
                      },
                    },
                  }}
                />
                {/* <CardContent>
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: "24px" }}
                      align="center"
                    >
                      // @ts-ignore
                      {stats?.data?.count_account_manager_statuses
                        ? stats?.data?.count_account_manager_statuses[
                            `Total` as keyof typeof stats.data.count_account_manager_statuses
                          ]
                        : 0}
                    </Typography>
                    <Typography
                      sx={{ color: "grey", whiteSpace: "pre-line" }}
                      fontWeight={600}
                      fontSize={16}
                      align="center"
                    >
                      {"Total"}
                    </Typography>
                  </CardContent> */}
              </Card>
            )}
            {/* </Box> */}
            {filtersAccountManager.map((filter, i) => (
              // <Box key={i} sx={{ textAlign: "start", width: "fit-content" }}>
              //   <Box sx={{ display: "flex", justifyContent: "center" }}>
              <React.Fragment>
                {stats?.isFetching ? (
                  <Skeleton height={50} width={100} sx={{ mr: 2 }} />
                ) : (
                  <Card
                    // onClick={() => {
                    //   setFilterId(filter.value);
                    // }}
                    style={{
                      cursor: "pointer",
                      background: "transparent",
                      boxShadow: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <FormControlLabel
                      value={filter.value}
                      control={<Radio />}
                      label={`${filter.name} (${
                        stats?.data?.count_account_manager_statuses
                          ? stats?.data?.count_account_manager_statuses[
                              `${filter?.value}` as keyof typeof stats.data.count_account_manager_statuses
                            ]
                          : 0
                      })`}
                      sx={{
                        span: {
                          color: "#000000",
                          "&::hover": {
                            backgroundColor: "none !important",
                          },
                        },
                      }}
                    />
                    {/* <CardContent>
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: "24px" }}
                            align="center"
                          >
                            // @ts-ignore 
                            {stats?.data?.count_account_manager_statuses
                              ? stats?.data?.count_account_manager_statuses[
                                  `${filter?.value}` as keyof typeof stats.data.count_account_manager_statuses
                                ]
                              : 0}
                          </Typography>
                          <Typography
                            sx={{
                              color: "grey",
                              whiteSpace: "pre-line",
                              textDecorationLine:
                                filter.value === filterId
                                  ? "underline"
                                  : "none",
                            }}
                            fontWeight={600}
                            fontSize={16}
                            align="center"
                          >
                            {filter.name}
                          </Typography>
                        </CardContent> */}
                  </Card>
                )}
              </React.Fragment>
              //   </Box>
              // </Box>
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
      <Box>
        {/* <AuthLogin /> */}
        <AccountManagerListing status={filterId} />
      </Box>

      <CustomModal width={600} open={openModal} handleClose={handleCloseModal}>
        <Box>
          <InvationForm handleClose={handleCloseModal} />
        </Box>
      </CustomModal>
    </Box>
  );
}
