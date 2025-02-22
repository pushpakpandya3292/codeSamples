"use client";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Loader";
import { useConfirmEmail } from "@/provider/ConfirmEmail";
import MainAuthWrapper from "@/screens/Auth/MainAuthWrapper";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  Divider,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import AuthCardWrapper from "@/screens/Auth/AuthCardWrapper";
import Link from "next/link";
import Logo from "@/assets/img/logo.png";
import Verified from "@/assets/img/verified.png";
import EmailVerified from "@/assets/img/verified-email.png";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import OtpInput from "@/components/OTPInput";

export default function EmailConfirmation() {
  const confirmEmail = useConfirmEmail();
  const searchParams = useSearchParams();
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  const [hash] = useState(searchParams.get("hash"));

  const handleConfirmEmail = async (_hash: string) => {
    const confirmationResult = await confirmEmail.mutateAsync({
      hash: _hash,
    });
  };

  useEffect(() => {
    if (hash) {
      handleConfirmEmail(hash);
    }
  }, []);

  useEffect(() => {
    if (confirmEmail.isSuccess) {
      toast.success("Email Verified Successfully", {
        position: "top-right",
      });
      redirect("/login");
    }
  }, [confirmEmail.isSuccess]);

  useEffect(() => {
    if (confirmEmail.isError) {
      toast.error("Error Verifying Email", {
        position: "top-right",
      });
    }
  }, [confirmEmail.isError]);
  const theme = useTheme();
  const numberOfInputField = 6;

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const handleInputChange = (value: string) => {
    if (value?.length === numberOfInputField) setOtpError(false);
    setOtp(value);
  };
  const handleSubmitOTP = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!otp || otp?.length < numberOfInputField) return setOtpError(true);
    console.log("Email verifiesdddddd");
    // try {
    // router.push("/reset-password");
    // } catch (error) {
    // handle error
    // }
  };

  return (
    <MainAuthWrapper>
      <Grid
        container
        justifyContent={matchDownSM ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid
          item
          md={6}
          lg={7}
          xs={12}
          sx={{ minHeight: "100vh", background: "#ffffff" }}
        >
          <Grid
            sx={{ height: "100vh" }}
            container
            alignItems={matchDownSM ? "center" : "flex-start"}
            justifyContent={matchDownSM ? "center" : "space-between"}
          >
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                spacing={5}
                m={2}
              >
                <AuthCardWrapper border={matchDownMD}>
                  <Stack alignItems="center" justifyContent="center">
                    <Grid item sx={{ width: "300px", mb: 3 }}>
                      <Image
                        src={Logo}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Grid>
                    {confirmEmail?.isLoading && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          alignContent: "center",
                          flexDirection: "column",
                          textAlign: "center",
                        }}
                      >
                        <CircularProgress sx={{ margin: "0 auto" }} />
                        <Typography variant="body2">
                          Email confirmation in process
                        </Typography>
                      </Box>
                    )}
                    <>
                      {!hash && (
                        <Box textAlign={"center"}>
                          {/* <MarkEmailReadIcon
                            sx={{
                              fontSize: "100px",
                              color: (theme) => theme.palette.text.disabled,
                            }}
                          /> 
                          <Typography
                            color={theme.palette.primary.main}
                            fontSize="22px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                            sx={{ fontWeight: 400, mb: 4 }}
                          >
                            Email sent please check your email to verify your
                            account.
                          </Typography> */}
                          <Typography
                            color={theme.palette.primary.main}
                            fontSize="26px"
                            textAlign="center"
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            Enter Verification Code
                          </Typography>
                          <Typography
                            color={theme.palette.text.primary}
                            fontSize="18px"
                            textAlign="center"
                            sx={{ fontWeight: 500, mb: 2 }}
                          >
                            We send you on mail.
                          </Typography>
                          <Typography
                            color={theme.palette.text.disabled}
                            fontSize="14px"
                            textAlign="center"
                            sx={{ fontWeight: 400, mb: 3 }}
                          >
                            We’ve send you code on john.****@company.com
                          </Typography>
                          <OtpInput
                            numInputs={numberOfInputField}
                            otp={otp}
                            setOtp={handleInputChange}
                            inputStyle={
                              otpError
                                ? { color: "red", borderColor: "red" }
                                : {}
                            }
                            onEnterKeyPress={handleSubmitOTP}
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ width: "100%", my: 3, textTransform: "none" }}
                            onClick={handleSubmitOTP}
                          >
                            Coutinue
                          </Button>
                          <Link
                            style={{
                              width: "100%",
                              textDecoration: "underline",
                              color: theme.palette.primary.dark,
                              marginTop: "16px",
                            }}
                            href="/login"
                          >
                            Go back to login
                          </Link>
                          <Divider sx={{ my: 2 }} />
                          <Typography
                            color={theme.palette.text.primary}
                            fontSize="14px"
                            textAlign="center"
                            sx={{ fontWeight: 500, mb: 3 }}
                          >
                            Did not receive the email? Check your spam filter,
                            or
                          </Typography>
                          <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            sx={{ width: "100%", textTransform: "none" }}
                            onClick={handleSubmitOTP}
                          >
                            Resend Code
                          </Button>
                        </Box>
                      )}
                      {confirmEmail?.isSuccess && (
                        <Box textAlign={"center"}>
                          <CheckCircleOutlineOutlinedIcon
                            sx={{ fontSize: "100px", color: "#1fb141" }}
                          />
                          <Typography
                            color={theme.palette.primary.main}
                            gutterBottom
                            sx={{ fontWeight: 600, fontSize: "22px" }}
                          >
                            Congratulations!
                          </Typography>
                          <Typography
                            color={theme.palette.primary.main}
                            fontSize="22px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                            sx={{ fontWeight: 400, mb: 3 }}
                          >
                            Your account has been activated
                          </Typography>
                          <Button
                            sx={{
                              background: theme.palette.primary.main,
                              ":disabled": {
                                background: theme.palette.primary.main,
                              },
                              height: "40px",
                              padding: "10px 0",
                            }}
                            disabled={confirmEmail?.isLoading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            <Link
                              style={{
                                width: "100%",
                                color: theme.palette.text.secondary,
                                textDecoration: "none",
                              }}
                              href="/login"
                            >
                              Processed to Sign In
                            </Link>
                          </Button>
                        </Box>
                      )}
                      {confirmEmail?.isError && (
                        <Box textAlign={"center"}>
                          {/* <Image
                                  src={Verified}
                                  alt=""
                                  width={56}
                                  height={56}
                                  style={{ display: "block", margin: "15px auto" }}
                                /> */}
                          <CancelOutlinedIcon
                            sx={{
                              fontSize: "100px",
                              color: theme.palette.error.main,
                            }}
                          />
                          <Typography
                            color={theme.palette.primary.main}
                            gutterBottom
                            sx={{
                              fontWeight: 600,
                              fontSize: "22px",
                              color: theme.palette.error.main,
                            }}
                          >
                            Error
                          </Typography>
                          <Typography
                            color={theme.palette.primary.main}
                            fontSize="22px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                            sx={{ fontWeight: 400, mb: 3 }}
                          >
                            Your email address could not be verified.
                          </Typography>
                          {/* <Button
                            sx={{
                              background: theme.palette.primary.main,
                              ":disabled": {
                                background: theme.palette.primary.main,
                              },
                              height: "40px",
                              padding: "10px 0"
                            }}
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            < Link style={{ width: "100%", color: theme.palette.text.secondary, textDecoration: "none" }} href="/login">
                              Processed to Sign In
                            </Link>
                          </Button> */}
                        </Box>
                      )}
                    </>
                  </Stack>
                </AuthCardWrapper>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={6}
          lg={5}
          sx={{
            position: "relative",
            alignSelf: "stretch",
            display: { xs: "none", md: "block" },
          }}
        >
          <Grid
            item
            container
            justifyContent="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: (theme) => theme.palette.primary.main,
              height: "100vh",
            }}
          >
            <Image
              alt="Auth method"
              src={EmailVerified}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainAuthWrapper>
  );
}
