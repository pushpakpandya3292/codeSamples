"use client";
import { faCookieBite } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ONBOARDING_PAGES } from "./constants";

const ConsentBanner = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const consent = localStorage.getItem("cookiesConsent");
    const pagesHidden = [...ONBOARDING_PAGES, "/oauth"].some((e) =>
      pathname.startsWith(e)
    );
    if (!consent && !pagesHidden) setShow(true);
  }, [pathname]);

  function gtag() {
    // @ts-ignore
    dataLayer.push(arguments);
  }

  const grant = () => {
    const consent = {
      ad_user_data: "granted",
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
    };
    // @ts-ignore
    gtag("consent", "update", consent);
    localStorage.setItem("cookiesConsent", JSON.stringify(consent));

    setShow(false);
  };

  const deny = () => {
    const consent = {
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
    };

    // @ts-ignore
    gtag("consent", "update", consent);
    localStorage.setItem("cookiesConsent", JSON.stringify(consent));

    setShow(false);
  };

  return (
    <>
      {children}
      {show && (
        <Box
          sx={{
            position: "fixed",
            zIndex: "10",
            background: "var(--background)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--modal)",
            bottom: "1rem",
            right: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: 4,
            maxWidth: "30rem",
          }}>
          <Typography variant="headlinelg">
            <FontAwesomeIcon
              icon={faCookieBite}
              color="var(--primary)"
              style={{ marginRight: "1rem" }}
            />
            Cookie Settings
          </Typography>
          <Typography variant="bodymd" color="var(--text-subtitle)">
            We use cookies to analyze user interaction with our website. It
            helps us provide a better, personalized experience for you. By
            clicking on &quot;Accept All&quot;, you agree that we can store and
            share cookies in your device according to our policy.
          </Typography>
          <Stack direction="row" gap={2}>
            <Button
              onClick={(e) => deny()}
              variant="outlined"
              size="large"
              sx={{ flex: 1 }}>
              Necessary Only
            </Button>
            <Button
              onClick={(e) => grant()}
              variant="contained"
              size="large"
              sx={{ flex: 1 }}>
              Accept All
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ConsentBanner;
