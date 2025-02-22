"use client";

import LoadingButton from "@/components/Common/LoadingButton";
import { NextLinkComposed } from "@/components/Mui/Link";
import { app } from "@/firebase";
import { firebaseError } from "@/utils/firebaseErrors";
import { useToast } from "@/utils/toast";
import { faArrowLeft, faEnvelopeDot } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecoverAccount = () => {
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  const auth = getAuth(app);
  const search = useSearchParams();
  const client_id = search.get("client_id");
  const redirect_uri = search.get("redirect_uri");

  const { showToast } = useToast();

  const resend = async () => {
    setResending(true);
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/oauth/login?client_id=${client_id}&redirect_uri=${redirect_uri}`,
    })
      .then(() => {
        showToast("success", "Recovery email resent");
      })
      .catch((error) => {
        showToast("error", firebaseError(error.code));
      });
    setResending(false);
  };

  useEffect(() => {
    setEmail(localStorage.getItem("recoveryEmail") ?? "your email");
  }, []);
  return (
    <>
      <IconButton
        color="secondary"
        sx={{
          alignSelf: "flex-start",
          padding: `1rem`,
          aspectRatio: 1,
        }}>
        <FontAwesomeIcon icon={faEnvelopeDot} size="lg" />
      </IconButton>
      <Stack gap={1}>
        <Typography variant="headlinelg">Recover Account</Typography>
        <Typography>
          All done! We’ve sent a recovery link to{" "}
          <span className="text-primary">{email}</span>
        </Typography>
      </Stack>
      <Stack gap={2}>
        <LoadingButton
          variant="contained"
          size="large"
          onClick={resend}
          loading={resending}>
          Click to Resend
        </LoadingButton>
        <Button
          variant="text"
          size="large"
          component={NextLinkComposed}
          to={`/oauth/login${location.search}`}
          startIcon={
            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "1rem" }} />
          }>
          Back to Login
        </Button>
      </Stack>
    </>
  );
};

export default RecoverAccount;
