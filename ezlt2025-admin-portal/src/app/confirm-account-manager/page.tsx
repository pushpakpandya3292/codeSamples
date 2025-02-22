"use client";
import { useConfirmEmail } from "@/provider/ConfirmEmail";
import MainAuthWrapper from "@/screens/Auth/MainAuthWrapper";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  useMediaQuery,
} from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AuthCardWrapper from "@/screens/Auth/AuthCardWrapper";
import Logo from "@/assets/img/logo.png";
import sideImage from "@/assets/img/signup.svg";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUpdatePassword } from "@/provider/manager-password-change";
import { toast } from "react-toastify";

interface IFormInput {
  password: string;
  confirm_password: string;
}
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "The password must be at least 6 characters long.")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
      "Please include at alphanumeric and special characters.",
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    arrow
    placement="right-start"
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[2],
    fontSize: 11,
  },
}));

export default function EmailConfirmation() {
  const searchParams = useSearchParams();
  const [hash] = useState(searchParams.get("hash"));
  const [showPassword, setShowPassword] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const {
    mutateAsync: updatePassword,
    isSuccess: pdatePasswordSuccess,
    isError: pdatePasswordError,
    error,
    isLoading,
  } = useUpdatePassword({
    accoutnManagerId: hash,
  });
  const router = useRouter();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };
  // useEffect(() => {
  //   if (pdatePasswordSuccess) {
  //     redirect("/login")
  //   }
  // }, [pdatePasswordSuccess]);

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
    updatePassword({
      password: data.password,
      confirm_password: data.confirm_password,
    });
  };
  useEffect(() => {
    if (pdatePasswordSuccess) {
      toast.success("Password changed successfully", { position: "top-right" });
      redirect("/login");
    } else if (pdatePasswordError) {
      error?.message
        ? toast.error(error?.message, { position: "top-right" })
        : toast.error("Failed to change password", { position: "top-right" });
    }
  }, [pdatePasswordSuccess, pdatePasswordError]);
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
                    <>
                      {hash && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} md={12}>
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography color="inherit">
                                      1 uppercase
                                      <br />1 lowercase
                                      <br />1 number
                                      <br />1 special character
                                      <br />6 characters min
                                    </Typography>
                                  </React.Fragment>
                                }
                                open={showToolTip}
                              >
                                <Box>
                                  <Controller
                                    name="password"
                                    control={control}
                                    render={({
                                      field,
                                      fieldState: { error },
                                    }) => (
                                      <CustomTextField
                                        {...field}
                                        {...renderFieldProps(error)}
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        autoComplete="new-password"
                                        label="Password"
                                        onFocus={() => setShowToolTip(true)}
                                        onBlur={() => setShowToolTip(false)}
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                  handleClickShowPassword
                                                }
                                                onMouseDown={
                                                  handleMouseDownPassword
                                                }
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
                                </Box>
                              </HtmlTooltip>
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Controller
                                name="confirm_password"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                  <CustomTextField
                                    {...field}
                                    {...renderFieldProps(error)}
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    name="password"
                                    autoComplete="new-password"
                                    label="Confirm Password"
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                              handleClickShowConfirmPassword
                                            }
                                            onMouseDown={
                                              handleMouseDownPassword
                                            }
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
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <Button
                              sx={{
                                background: theme.palette.primary.main,
                                ":disabled": {
                                  background: theme.palette.primary.main,
                                },
                                height: "40px",
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
                                "Set Password"
                              )}
                            </Button>
                          </Box>
                        </form>
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
