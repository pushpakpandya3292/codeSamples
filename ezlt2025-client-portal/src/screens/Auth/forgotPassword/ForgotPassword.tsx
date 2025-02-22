"use client";
import * as React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, Stack, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import sideImage from "@/assets/img/signup.svg";
import { useTheme } from "@mui/material/styles";
import Logo from "@/assets/img/logo.png";
import { useForgotPassword } from "@/provider/forgot_password";
import CircularProgress from "@mui/material/CircularProgress";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import MainAuthWrapper from "../MainAuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";

interface IFormInput {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const { isLoading, isSuccess, mutate, isError, error, data } =
    useForgotPassword();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate(data);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Verification link send over email", {
        position: "top-right",
      });
      redirect("/login");
    } else if (isError) {
      error?.message
        ? toast.error(error?.message, { position: "top-right" })
        : toast.error("Operation Failed", { position: "top-right" });
    }
  }, [isSuccess, isError]);
  return (
    <MainAuthWrapper>
      <Grid
        container
        justifyContent={matchDownSM ? "center" : "space-between"}
        alignItems="center"
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        <Grid item md={6} lg={7} xs={12}>
          <Grid
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
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center">
                        <Grid item sx={{ width: "300px", mb: 1 }}>
                          <Image
                            src={Logo}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Grid>

                        <Typography
                          color={theme.palette.primary.main}
                          gutterBottom
                          variant={matchDownSM ? "h6" : "h3"}
                          sx={{ fontWeight: 500, letterSpacing: "-1px" }}
                        >
                          Forgot Password !
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <RegisterForm loginProp={2} /> */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                          variant="caption"
                          fontSize="16px"
                          sx={{ fontWeight: 500, letterSpacing: "0px" }}
                        >
                          Please Enter Your Email
                        </Typography>
                        <Controller
                          name={"email"}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <CustomTextField
                              {...field}
                              {...renderFieldProps(error)}
                              label="Email"
                              type="email"
                              name="email"
                              sx={{ mt: 2 }}
                            />
                          )}
                        />
                        <Box sx={{ mt: 2 }}>
                          <Button
                            sx={{
                              background: theme.palette.primary.main,
                              ":disabled": {
                                background: theme.palette.primary.main,
                              },
                              height: "50px",
                            }}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            {isLoading ? (
                              <CircularProgress
                                sx={{
                                  color: (theme) =>
                                    theme.palette.text.secondary,
                                }}
                                size={30}
                              />
                            ) : (
                              "Send"
                            )}
                          </Button>
                        </Box>
                      </form>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                        xs={12}
                      >
                        {/* @ts-ignore */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textDecoration: "none",
                            "& a": {
                              color: (theme) => theme.palette.text.primary,
                              fontWeight: "500",
                            },
                          }}
                        >
                          <Link href="/">Send me back</Link> to the sign in
                          screen.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
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
              height: "100vh",
              background: (theme) => theme.palette.primary.main,
            }}
          >
            <Image
              alt="Auth method"
              src={sideImage}
              style={{
                maxWidth: "100%",
                margin: "0 auto",
                display: "block",
                width: 400,
                position: "relative",
                zIndex: 5,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainAuthWrapper>
  );
}
