"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Stack, useMediaQuery } from "@mui/material";

// icons imports
import Logo from "@/assets/img/logo.png";
import Family from "@/assets/img/admin2.svg";
// project imports
import MainAuthWrapper from "../MainAuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "./AuthLogin";
import Link from "next/link";

export default function SignInForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
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
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Stack alignItems="center" justifyContent="center">
                        <Grid item sx={{ width: "300px", mb: 2 }}>
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
                          Welcome back to Admin Portal !
                        </Typography>
                        <Typography
                          color={theme.palette.primary.main}
                          fontSize="18px"
                          textAlign={matchDownSM ? "center" : "inherit"}
                          sx={{ fontWeight: 400, mb: 3 }}
                        >
                          Please sign in to continue.
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin loginProp={2} />
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
              background: (theme) => theme.palette.primary.main,
              height: "100vh",
            }}
          >
            <Image
              alt="Auth method"
              src={Family}
              style={{
                height: "auto",
                width: "80%",
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
