"use client";
import CustomCard from "@/components/Card";
import OrderListing from "@/components/OrdersListing";
import Pageheader from "@/components/PageHeader";
import { filtersOrder, StatusEnum } from "@/constant";
import { useStats } from "@/provider/stats";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

const Orders: React.FC = () => {
  const stats = useStats({});
  const [status, setStatus] = React.useState<string | undefined>("PIPELINE");
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0,
          mt: 1,
        }}
      >
        <Pageheader title="Orders (Post-Checkout)" />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          {stats?.isFetching ? (
            <Skeleton height={150} width={130} sx={{ mr: 2 }} />
          ) : (
            <Card
              onClick={() => {
                setStatus("PIPELINE");
              }}
              style={{
                cursor: "pointer",
                border: status == "PIPELINE" ? "3px solid #fba440" : "0px",
                minWidth: "130px",
                margin: "10px",
                background: "rgb(255, 255, 255)",
                boxShadow:
                  "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
                borderRadius: "16px",
                paddingBlock: 2,
                paddingInline: 4,
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "24px" }}
                  align="center"
                >
                  {stats?.data
                    ? stats?.data?.count_order_stasuses[
                        `PIPELINE_COUNT` as keyof typeof stats.data.count_order_stasuses
                      ]
                    : 0}
                </Typography>
                <Typography
                  sx={{ color: "grey", whiteSpace: "pre-line" }}
                  fontWeight={600}
                  fontSize={16}
                  align="center"
                >
                  Pipeline
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box> */}
        {filtersOrder.map((section, i) => (
          <Box
            key={i}
            sx={{
              textAlign: "start",
              backgroundColor: "#ffffff",
              border: "1px solid #bacffa",
              borderRadius: "10px",
              width: i === 0 ? "80%" : "20%",
              padding: "0",
              marginBottom: "15px",
              boxShadow: "0px 2px 5px #bacffa63",
            }}
          >
            <Box
              sx={{ padding: "6px 15px", borderBottom: "1px solid #bacffa" }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ margin: "0", fontSize: "16px" }}
              >
                {section.headerName}
                {/* ({stats?.data
                  ? stats?.data?.count_order_stasuses[
                      `${section?.headerStatsKey}` as keyof typeof stats.data.count_order_stasuses
                    ]
                  : 0}
                ) */}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                padding: "10px 15px",
                span: {
                  transform: "scale(1)",
                },
                "&:before": {
                  display: "none",
                },
              }}
            >
              {section?.headerName === "Pipeline" ? (
                // <Box sx={{ display: "flex", justifyContent: "center" }}>
                stats?.isFetching ? (
                  <Skeleton
                    height={33}
                    width={150}
                    sx={{ borderRadius: "15px" }}
                  />
                ) : (
                  <Card
                    onClick={() => {
                      setStatus("PIPELINE");
                    }}
                    style={{
                      cursor: "pointer",
                      border:
                        status == "PIPELINE"
                          ? "1px solid #073763"
                          : "1px solid #000000",
                      padding: "5px 15px",
                      borderRadius: "100px",
                      backgroundColor:
                        status == "PIPELINE" ? "#073763" : "#ffffff",
                      // minWidth: "130px",
                      // margin: "10px",
                      // background: "rgb(255, 255, 255)",
                      // boxShadow:
                      //   "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
                      // borderRadius: "16px",
                      // paddingBlock: 2,
                      // paddingInline: 4,
                      // height: "150px",
                      // display: "flex",
                      // flexDirection: "column",
                      // justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "0px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: status == "PIPELINE" ? "#ffffff" : "#000000",
                          whiteSpace: "pre-line",
                        }}
                        fontWeight={400}
                        fontSize={14}
                        align="center"
                      >
                        All
                        {/* {stats?.data
                          ? stats?.data?.count_order_stasuses[
                              `PIPELINE_COUNT` as keyof typeof stats.data.count_order_stasuses
                            ]
                          : 0} */}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              ) : // </Box>
              null}
              {section.filters.map((filter: any, index: number) => (
                <React.Fragment key={index}>
                  {stats?.isFetching ? (
                    <Skeleton
                      height={33}
                      width={150}
                      sx={{ borderRadius: "15px" }}
                    />
                  ) : (
                    <Card
                      key={index}
                      onClick={() => {
                        setStatus(filter.value);
                      }}
                      style={{
                        cursor: "pointer",
                        border:
                          filter.value === status
                            ? "1px solid #073763"
                            : "1px solid #000000",
                        backgroundColor:
                          filter.value === status ? "#073763" : "#ffffff",
                        padding: "5px 15px",
                        borderRadius: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          padding: "0px",
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              filter.value === status ? "#ffffff" : "#000000",
                            whiteSpace: "pre-line",
                          }}
                          fontWeight={400}
                          fontSize={14}
                          align="center"
                        >
                          {`${filter.name} (${
                            stats?.data
                              ? stats?.data?.count_order_stasuses[
                                  `${filter?.statskey}` as keyof typeof stats.data.count_order_stasuses
                                ]
                              : 0
                          })`}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <OrderListing status={status} />
    </Box>
  );
};

export default Orders;
