"use client";
import { APP_KEY_STYLE } from "@/components/Admin/SSOAppPreview";
import Avatar from "@/components/Common/Avatar";
import { NextLinkComposed } from "@/components/Mui/Link";
import { useToast } from "@/utils/toast";
import { faCopy } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { SsoApp } from "@prisma/client";
import { SyntheticEvent, useState } from "react";

interface Props {
  ssoApps: SsoApp[];
}

const AppsList = ({ ssoApps }: Props) => {
  const { showToast } = useToast();

  const [expanded, setExpanded] = useState<string | false>("chapter1");
  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const copyKey = (label: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key);
      showToast("success", `${label} copied to clipboard`);
    } else {
      showToast("error", `Failed to copy ${label}`);
    }
  };
  return (
    <>
      {ssoApps.map((app, i) => (
        <Accordion
          key={`app${i}`}
          expanded={expanded === `app${i + 1}`}
          onChange={handleChange(`app${i + 1}`)}>
          <AccordionSummary
            aria-controls={`app${i + 1}-content`}
            id={`app${i + 1}-header`}>
            <Stack
              key={app.clientId}
              direction="row"
              gap={{ xs: 2, md: 4 }}
              alignItems="center">
              <Avatar
                src={app.logo}
                width={42}
                alt="App Logo"
                borderRadius="0"
                objectFit="contain"
              />
              <Typography
                variant="titlelg"
                className="text-ellipsis"
                sx={{ flex: 1 }}>
                {app.name}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "1rem",
            }}>
            <Stack
              direction="row"
              gap={2}
              justifyContent="space-between"
              flexWrap="wrap">
              <Typography variant="titlesm">Client ID:</Typography>
              <Typography
                variant="labelmd"
                color="var(--text-subtitle)"
                onClick={() => copyKey("Client ID", app.clientId)}
                sx={APP_KEY_STYLE}>
                {app.clientId}
                <FontAwesomeIcon
                  icon={faCopy}
                  color="var(--text-subtitle)"
                  size="1x"
                  style={{ marginLeft: "0.25rem" }}
                />
              </Typography>
            </Stack>
            <Stack
              direction="row"
              gap={2}
              justifyContent="space-between"
              flexWrap="wrap">
              <Typography variant="titlesm">Client Secret:</Typography>
              <Typography
                variant="labelmd"
                color="var(--text-subtitle)"
                onClick={() => copyKey("Client Secret", app.clientSecret)}
                sx={APP_KEY_STYLE}>
                {app.clientSecret}
                <FontAwesomeIcon
                  icon={faCopy}
                  color="var(--text-subtitle)"
                  size="1x"
                  style={{ marginLeft: "0.25rem" }}
                />
              </Typography>
            </Stack>
            <Button
              size="large"
              variant="outlined"
              component={NextLinkComposed}
              to={`/admin/apps/create?update=${app.clientId}`}>
              Update
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default AppsList;
