import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  // Checkbox,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";

// third party
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter, useParams, useSearchParams } from "next/navigation";

// assets
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

import { toast } from "react-toastify";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import Image from "next/image";

// ===============================|| JWT LOGIN ||=============================== //

declare module "@mui/material/styles" {
  interface Theme {
    customInput: any;
  }
}

interface IFormInput {
  email: string;
  password: string;
}

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const router = useRouter();
  const theme = useTheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Must be a valid email")
      .matches(/^\S*$/, "Email cannot contain spaces")
      .max(255)
      .required("Email is required")
      .test("no-spaces", "Email cannot start or end with spaces", (value) => {
        return value === value.trim(); // Ensure no leading or trailing spaces
      }),
    password: Yup.string().max(255).required("Password is required"),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [autherror, setAutherror] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);

    const { email, password } = data;
    const SignIn = await signIn("credentials", {
      ...{
        email: email.trim(),
        password: password,
      },
      redirect: false,
    });
    if (SignIn?.status === 200) {
      // router.push("/onboarding", { scroll: false });
      router.push("/dashboards", { scroll: false });
      toast.success("Login Successful", { position: "top-right" });
      setLoading(false);
    } else {
      toast.error(
        SignIn?.error !== "undefined"
          ? SignIn?.error
          : "Email or Password is invalid",
        { position: "top-right" },
      );
      setAutherror(true);
      setTimeout(() => {
        setAutherror(false);
      }, 5000);
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    const SignIn = await signIn("google");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {autherror && (
          <Typography
            sx={{
              color: (theme) => theme.palette.error.main,
              textAlign: "center",
              mb: 2,
            }}
          >
            Email or Password is invalid
          </Typography>
        )}
        <Controller
          name={"email"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              {...field}
              {...renderFieldProps(error, undefined, true)}
              label="Email"
              type="email"
              name="email"
              onKeyPress={(e: any) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              inputProps={{
                onInput: (e: any) => {
                  // Remove spaces dynamically in the UI
                  e.target.value = e.target.value.replace(/\s+/g, "");
                },
              }}
            />
          )}
        />
        <Controller
          name={"password"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              {...field}
              {...renderFieldProps(error, undefined, true)}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              label="Password"
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 2 }}
            />
          )}
        />

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ my: 4 }}
        >
          <Grid item>
            {/* @ts-ignore */}
            <Typography
              variant="subtitle1"
              sx={{
                "& a": {
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  color: (theme) => theme.palette.text.primary,
                },
              }}
            >
              <Link href="/forgot_password">Forgot Password?</Link>
            </Typography>
          </Grid>
        </Grid>

        {/* {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )} */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Button
            //   color={(theme) => theme.palette.primary.main}
            sx={{
              background: theme.palette.primary.main,
              ":disabled": {
                background: theme.palette.primary.main,
              },
              height: "40px",
            }}
            disabled={loading}
            // onClick={handleSubmit}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {loading ? (
              <CircularProgress
                sx={{ color: (theme) => theme.palette.text.secondary }}
                size={30}
              />
            ) : (
              "Sign In"
            )}
          </Button>
          {/* <Typography>OR</Typography>
          <Button
            sx={{
              margin: "0 auto",
              border: "1px solid #ccccccab",
              height: "40px",
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              textTransform: "capitalize",
              padding: "0 20px",
            }}
            onClick={handleGoogleLogin}
            fullWidth
          >
            <Image src={GoogleIcon} alt="" width={20} height={20} />{" "}
            <span style={{ marginLeft: "10px" }}>Sign In With Google</span>
          </Button> */}
        </Box>
      </form>
    </>
  );
};

export default JWTLogin;
