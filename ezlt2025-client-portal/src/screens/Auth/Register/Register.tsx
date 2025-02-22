"use client";
import * as React from "react";
import Link from "next/link";
import { Divider, Stack, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import sideImage from "@/assets/img/signup.png";
import { useTheme } from "@mui/material/styles";
import RegisterForm from "./RegisterForm";
import Logo from "@/assets/img/logo.png";
import MainAuthWrapper from "../MainAuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";

export default function RegisterUser() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <MainAuthWrapper>
      <Grid
        container
        justifyContent={matchDownSM ? "center" : "space-between"}
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item md={6} lg={7} xs={12} sx={{ background: "#ffffff" }}>
          <Grid
            container
            alignItems={matchDownSM ? "center" : "flex-start"}
            justifyContent={matchDownSM ? "center" : "space-between"}
            sx={{ height: "100vh" }}
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
                          sx={{ fontWeight: 400, fontSize: "18px" }}
                        >
                          Get Started !
                        </Typography>
                        <Typography
                          color={theme.palette.primary.main}
                          fontSize="18px"
                          textAlign={matchDownSM ? "center" : "inherit"}
                          sx={{ fontWeight: 400, mb: 1 }}
                        >
                          It takes a minute to open a new account
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <RegisterForm loginProp={2} />
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
                              color: (theme) => theme.palette.primary.main,
                              fontWeight: "400",
                            },
                          }}
                        >
                          Already have an account? <Link href="/">Sign In</Link>
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
              height: "100%",
              background: (theme) => theme.palette.primary.main,
            }}
          >
            <Image
              alt="Auth method"
              src={sideImage}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                // maxWidth: "100%",
                // margin: "0 auto",
                // display: "block",
                // width: 400,
                // position: "relative",
                // zIndex: 5,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainAuthWrapper>
  );
}
