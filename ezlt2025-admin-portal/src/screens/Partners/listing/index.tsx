"use client";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import PartnerListing from "@/components/PartnerListing";
import { PartnerStatusEnum } from "@/constant";
import { useStats } from "@/provider/stats";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import React from "react";

interface Props {
  // Add any props you need here
}
const filters = [
  {
    title: "Waiting Approval",
    value: PartnerStatusEnum.WAITING_APPROVAL,
  },
  {
    title: "Active",
    value: PartnerStatusEnum.APPROVED,
  },
  {
    title: "Inactive",
    value: PartnerStatusEnum.REJECTED,
  },
  {
    title: "Registered Only",
    value: PartnerStatusEnum.REGISTERED,
  },
];

const PartnerListMain: React.FC<Props> = () => {
  const stats = useStats({});
  const [status, setStatus] = React.useState(undefined);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          mt: 1,
        }}
      >
        <Pageheader title="Partners" />
      </Box>
      {/* <Box sx={{ display: "flex", gap: 2 }}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          overflow: "hidden",
          overflowX: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {stats?.isFetching ? (
            <Skeleton height={150} width={150} sx={{ mr: 2 }} />
          ) : (
            <Card
              onClick={() => {
                setStatus(undefined);
              }}
              style={{
                cursor: "pointer",
                border: status === undefined ? "3px solid #fba440" : "0px",
                minWidth: "150px",
                margin: "10px",
                background: "rgb(255, 255, 255)",
                boxShadow:
                  "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
                borderRadius: "16px",
                paddingBlock: 2,
                paddingInline: 4,
                height: "100px",
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
                  {stats?.data?.count_partner_statuses?.Total}
                </Typography>
                <Typography
                  sx={{ color: "grey", whiteSpace: "pre-line" }}
                  fontWeight={600}
                  fontSize={16}
                  align="center"
                >
                  All Partners
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
        {filters.map((item: any, i: number) => (
          <Box key={i} sx={{ display: "flex", justifyContent: "center" }}>
            {stats?.isFetching ? (
              <Skeleton height={150} width={200} sx={{ mr: 2 }} />
            ) : (
              <Card
                onClick={() => {
                  setStatus(item.value);
                }}
                style={{
                  cursor: "pointer",
                  border: item?.value === status ? "3px solid #fba440" : "0px",
                  minWidth: "200px",
                  margin: "10px",
                  background: "rgb(255, 255, 255)",
                  boxShadow:
                    "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
                  borderRadius: "16px",
                  paddingBlock: 2,
                  paddingInline: 4,
                  height: "100px",
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
                    {/* @ts-ignore */}
                    {stats?.data?.count_partner_statuses
                      ? stats?.data?.count_partner_statuses[
                          item.value as keyof typeof stats.data.count_partner_statuses
                        ]
                      : 0}
                  </Typography>
                  <Typography
                    sx={{ color: "grey", whiteSpace: "pre-line" }}
                    fontWeight={600}
                    fontSize={16}
                    align="center"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        ))}
      </Box>
      {/* </Box> */}

      <PartnerListing status={status} />
    </>
  );
};

export default PartnerListMain;