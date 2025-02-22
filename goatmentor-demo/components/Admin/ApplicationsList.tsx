"use client";
import Avatar from "@/components/Common/Avatar";
import { NextLinkComposed } from "@/components/Mui/Link";
import { TECHNICAL_SKILLS } from "@/utils/constants";
import { faSliders } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack, Typography } from "@mui/material";
import { ApplicationStatus } from "@prisma/client";
import { getCookie, setCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import LoadingIndicator from "../Common/LoadingIndicator";
import { ApplicationsFilter } from "./ApplicationsFilters";

interface Props {
  applications: {
    position: {
      title: string;
      uid: string;
    };
    uid: string;
    status: ApplicationStatus;
    interviewed: boolean;
    skills: {
      name: string;
      level: number;
    }[];
    adminRatings: {
      name: string;
      level: number;
    }[];
    user: {
      fullName: string;
      photo: string | null;
    };
  }[];
  positions: {
    uid: string;
    title: string;
  }[];
}

const ApplicationsFilters = dynamic(() => import("./ApplicationsFilters"));

const cookieFilterKey = "applicant_filter"

const ApplicationsList = ({ applications, positions }: Props) => {
  const [filter, setFilter] = useState<ApplicationsFilter>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const applicantFilter = getCookie(cookieFilterKey)

  useEffect(() => {
    if (applicantFilter) {
      const getFilters = JSON.parse(applicantFilter as string) ?? undefined;
      setFilter(getFilters)
    }
  }, [])

  const openSettings = () => setFiltersOpen(true);

  const closeFilters = (e: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setFiltersOpen(false);
  };

  const handleSetFilter = (value: ApplicationsFilter) => {
    setFilter(value)
    setCookie(cookieFilterKey, JSON.stringify(value))
  }

  const result = () =>
    applications
      .filter((e) => e.status === filter?.status || !filter?.status)
      .filter((e) =>
        filter?.position === "all" || !filter?.position
          ? true
          : e.position.uid === filter?.position
      )
      .filter((e) => (filter?.interviewed === false ? !e.interviewed : true))
      .filter((e) => (filter?.notInterviewed === false ? e.interviewed : true))
      .filter((e) =>
        filter?.skills.length
          ? filter?.skills.every((skill) => {
            TECHNICAL_SKILLS.map((e) => e.key).includes(skill)
              ? // return all based on admin ratings of technical skills
              (e.adminRatings.find((j) => j.name === skill)?.level ?? 0) > 3
              : filter?.interviewed === false
                ? //  return not interviewed based on self rated skills
                (e.skills.find((j) => j.name === skill)?.level ?? 0) > 3
                : filter?.notInterviewed === false
                  ? //  return interviewed based on admin rated skills
                  (e.adminRatings.find((j) => j.name === skill)?.level ?? 0) > 3
                  : //  return all based on both self & admin rated skills
                  Math.max(
                    e.adminRatings.find((j) => j.name === skill)?.level ?? 0,
                    e.skills.find((j) => j.name === skill)?.level ?? 0
                  ) > 3;
          })
          : true
      )
      .sort((a, b) =>
        filter?.sortBy
          ? TECHNICAL_SKILLS.map((e) => e.key).includes(filter?.sortBy)
            ? (b.adminRatings.find((j) => j.name === filter?.sortBy)?.level ??
              0) -
            (a.adminRatings.find((j) => j.name === filter?.sortBy)?.level ??
              0)
            : filter?.interviewed === false
              ? // sort based on self rated skills
              (b.skills.find((j) => j.name === filter?.sortBy)?.level ?? 0) -
              (a.skills.find((j) => j.name === filter?.sortBy)?.level ?? 0)
              : filter?.notInterviewed === false
                ? // sort based on admin rated skills
                (b.adminRatings.find((j) => j.name === filter?.sortBy)?.level ??
                  0) -
                (a.adminRatings.find((j) => j.name === filter?.sortBy)?.level ??
                  0)
                : // sort based on both self & admin rated skills
                (b.skills.find((j) => j.name === filter?.sortBy)?.level ?? 0) +
                (b.adminRatings.find((j) => j.name === filter?.sortBy)?.level ??
                  0) *
                2 -
                (a.skills.find((j) => j.name === filter?.sortBy)?.level ?? 0) +
                (a.adminRatings.find((j) => j.name === filter?.sortBy)?.level ??
                  0) *
                2
          : b.skills.reduce((acc, cur) => acc + cur.level, 0) -
          a.skills.reduce((acc, cur) => acc + cur.level, 0)
      );

  return (
    <Stack gap={2}>
      <Stack
        direction="row"
        gap={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap">
        <Typography variant="headlinelg" color="var(--text-title)">
          Job Applications
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faSliders} size="lg" />}
          onClick={openSettings}>
          Filters
        </Button>
      </Stack>

      {filtersOpen && (
        <Suspense fallback={<LoadingIndicator />}>
          <ApplicationsFilters
            open={filtersOpen}
            onClose={closeFilters}
            positions={positions}
            filter={filter}
            onSubmit={handleSetFilter}
          />
        </Suspense>
      )}

      <Stack gap={1}>
        {result().map((application) => (
          <Stack
            key={application.uid}
            direction="row"
            gap={{ xs: 2, md: 4 }}
            alignItems="center"
            sx={{
              padding: "1rem 0",
              borderBottom: "1px solid var(--border)",
            }}>
            <Avatar
              src={application.user.photo}
              width={56}
              alt="Profile Photo"
            />
            <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
              <Typography variant="titlelg" className="text-ellipsis">
                {application.user.fullName}
              </Typography>
              <Typography
                variant="labelmd"
                className="text-ellipsis"
                color="var(--text-subtitle)">
                {application.position.title}
              </Typography>
            </Stack>
            <Button
              size="small"
              variant="outlined"
              component={NextLinkComposed}
              to={`/admin/careers/${application.uid}`}>
              View
            </Button>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ApplicationsList;
