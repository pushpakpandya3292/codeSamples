"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Button, Divider, Stack, useMediaQuery } from "@mui/material";

// icons imports
import Logo from "@/assets/img/logo.png";
import Family from "@/assets/img/signin.jpg";
// project imports
import MainAuthWrapper from "../MainAuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "./AuthLogin";
import Link from "next/link";
import BackToHomePage from "@/components/BackToHomePage";

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
            <BackToHomePage />
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
                          Welcome back to Client Portal!
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
                          {`Don't have an Account?`}{" "}
                          <Link href="register">Register</Link>
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
              background: (theme) => theme.palette.primary.main,
              height: "100vh",
            }}
          >
            <Image
              alt="Auth method"
              src={Family}
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

// <Grid container component="main" sx={{ height: "100vh" }}>
//   <CssBaseline />
//   <Grid
//     item
//     xs={false}
//     sm={4}
//     md={7}
//     sx={{
//       backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
//       backgroundRepeat: "no-repeat",
//       backgroundColor: (t) =>
//         t.palette.mode === "light"
//           ? t.palette.grey[50]
//           : t.palette.grey[900],
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//     }}
//   />
//   <Grid
//     item
//     xs={12}
//     sm={8}
//     md={5}
//     component={Paper}
//     elevation={6}
//     square
//     sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
//   >
//     <Box
//       sx={{
//         my: 8,
//         mx: 4,
//         width: "70%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Image src={logo} alt="logo" height="40" />
//       <Typography
//         component="h1"
//         variant="h5"
//         sx={{ fontWeight: 500, color: "#4b8ad0" }}
//       >
//         Welcome back to Client Portal !
//       </Typography>
//       <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
//         Please sign in to continue.
//       </Typography>
//       <Box
//         component="form"
//         noValidate
//         onSubmit={handleSubmit}
//         sx={{ mt: 1 }}
//       >
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="email"
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           autoFocus
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           name="password"
//           label="Password"
//           type="password"
//           id="password"
//           autoComplete="current-password"
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           Sign In
//         </Button>
//         <Grid container>
//           <Grid item xs>
//             <Link href="#" variant="body2">
//               Forgot password?
//             </Link>
//           </Grid>
//           <Grid item>
//             <Link href="#" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Grid>
//         </Grid>
//         <Copyright sx={{ mt: 5 }} />
//       </Box>
//     </Box>
//   </Grid>
// </Grid>
