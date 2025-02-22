import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { signIn, signOut } from "next-auth/react";

// third party
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

// assets
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";

import { toast } from "react-toastify";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { triggerShowBlockedError } from "@/contexts/Provider/ErrorModalProvider";

// ===============================|| JWT LOGIN ||=============================== //

declare module "@mui/material/styles" {
  interface Theme {
    customInput: any;
  }
}

interface IFormInput {
  email: string;
  password: string;
  deviceId?: string;
  language?: number;
  fcmToken?: string;
}

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const router = useRouter();
  const theme = useTheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
    deviceId: Yup.string(),
    language: Yup.number(),
    fcmToken: Yup.string(),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      deviceId: "",
      language: 1,
      fcmToken: "",
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
    const fcmToken = sessionStorage.getItem("FCM_Token");
    const deviceId = fcmToken;
    const { email, password } = data;
    const SignIn = await signIn("credentials", {
      ...{
        email: email,
        password: password,
        deviceId: deviceId,
        language: 1,
        fcmToken: fcmToken,
        // subdomain: "app",
      },
      redirect: false,
    });

    if (SignIn?.error?.includes("422")) {
      triggerShowBlockedError(
        "Your account is currently suspended. Please contact us to re-open your account: <a href='mailto:staff@ezlivingtrust.com?bcc=help@strategicchoices.com&subject=Request%20to%20Unfreeze%20my%20EZ%20Living%20Trust%20email%20account&body=Hi%2C%0A%0ACan%20you%20please%20unfreeze%20my%20account%20and%20contact%20me%20when%20it%20is%20active%20again%3F%0A%0AThank%20you%2C%0A%0A%3Center%20your%20name%3E'>CLICK HERE</a>",
        "Your account is currently suspended",
      );
      setLoading(false);
      return;
    }

    if (SignIn?.status === 200) {
      router.push("/dashboard", { scroll: false });
      toast.success("Login Successfull", { position: "top-right" });
      setLoading(false);
    } else {
      toast.error("Login Failed", { position: "top-right" });
      setAutherror(true);
      setTimeout(() => {
        setAutherror(false);
      }, 5000);
      setLoading(false);
    }
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
              {...renderFieldProps(error)}
              label="Email"
              type="email"
              name="email"
            />
          )}
        />
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

        {/* {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )} */}
        <Box>
          {/* @ts-ignore */}
          <Button
            //   color={(theme) => theme.palette.primary.main}
            sx={{
              mt: 2,
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
        </Box>
      </form>
    </>
  );
};

export default JWTLogin;
