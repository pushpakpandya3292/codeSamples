"use client";
import * as React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Divider,
  Stack,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import sideImage from "@/assets/img/signup.svg";
import Logo from "@/assets/img/logo.png";
import { useResetPassword } from "@/provider/reset_password";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import MainAuthWrapper from "../MainAuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import { useTheme } from "@mui/material/styles";

interface IFormInput {
  password: string;
  confirm_password: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "The password must be at least 6 characters long.")
    .required("Password is required")
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Please include at least one uppercase, lowercase, alphanumeric and special characters.",
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});
export default function ResetPassword() {
  const Params = useSearchParams();
  const hash = Params.get("hash");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const { isLoading, isSuccess, mutate, isError, error, data } =
    useResetPassword();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate({ ...data, hash: hash });
  };
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully!", {
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
                          variant={"h1"}
                        >
                          Reset Password !
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                          variant="caption"
                          fontSize="16px"
                          sx={{ fontWeight: 500, letterSpacing: "0px" }}
                        >
                          Please Enter New Password
                        </Typography>
                        <Controller
                          name={"password"}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <CustomTextField
                              {...field}
                              {...renderFieldProps(error)}
                              type={showPassword ? "text" : "password"}
                              name="password"
                              autoComplete="new-password"
                              label="New Password"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="small"
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{ mt: 2 }}
                            />
                          )}
                        />
                        <Controller
                          name={"confirm_password"}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <CustomTextField
                              {...field}
                              {...renderFieldProps(error)}
                              type={showConfirmPassword ? "text" : "password"}
                              name="Confirm password"
                              autoComplete="new-password"
                              label="Confirm New Password"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowConfirmPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      size="small"
                                    >
                                      {showConfirmPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
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
                              "Reset Password"
                            )}
                          </Button>
                        </Box>
                      </form>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
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
