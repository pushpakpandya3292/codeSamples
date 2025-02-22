import React, { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
  styled,
  MenuItem,
} from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { useRegister } from "@/provider/register";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import { HeardByEnum } from "@/constants/EnumData";
import { usePartnerDetails } from "@/provider/PartnerDetails";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
declare module "@mui/material/styles" {
  interface Theme {
    customInput: any;
  }
}

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

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]*$/, "Only alphabets are allowed")
    .min(2, "At least 2 characters")
    .required("This field is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z'-]*$/, "Only alphabets are allowed")
    .min(2, "At least 2 characters")
    .required("This field is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .test("email-domain", "Invalid email", (value) => {
      if (!value) return false;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  password: Yup.string()
    .min(6, "The password must be at least 6 characters long.")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
      "Please include at least one uppercase, lowercase, alphanumeric and special characters.",
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
  promoCode: Yup.string().optional(),
  reference_code: Yup.string().optional(),
  heardBy: Yup.string().required("This field is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Conditions",
  ),
});

interface IFormInput {
  email: string;
  password: string;
  confirm_password: string;
  firstName: string;
  lastName?: string;
  promoCode?: string;
  reference_code?: string;
  licensed_partner?: string;
  heardBy: string;
  terms?: boolean;
}

const checkPasswordRequirements = (
  password: string,
  confirmPassword?: string,
) => {
  return {
    length: password.length >= 6 && password.length <= 20,
    capital: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    sameAsPassword: confirmPassword ? password === confirmPassword : true,
  };
};

const PasswordRequirements = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword?: string;
}) => {
  const requirements = checkPasswordRequirements(password, confirmPassword);

  return (
    <Box
      sx={{
        position: "absolute",
        bgcolor: "background.paper",
        p: 1,
        zIndex: 1000,
        borderRadius: 1,
        border: "1px solid #eee",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "100%",
      }}
    >
      <Typography variant="body2" fontSize={16} gutterBottom>
        Password must include:
      </Typography>
      {[
        { label: "6-20 Characters", met: requirements.length },
        { label: "At least one capital letter", met: requirements.capital },
        { label: "At least one lower letter", met: requirements.lower },
        {
          label: "At least one special character",
          met: requirements.specialChar,
        },
        { label: "At least one number", met: requirements.number },
        ...(confirmPassword
          ? [{ label: "Passwords match", met: requirements.sameAsPassword }]
          : []),
      ].map((req, idx) => (
        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {req.met ? (
            <CheckIcon sx={{ color: "success.main" }} />
          ) : (
            <CloseIcon sx={{ color: "error.main" }} />
          )}
          <Typography
            variant="body2"
            fontSize={14}
            sx={{
              color: req.met ? "success.main" : "error.main",
            }}
          >
            {req.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const RegisterForm = ({ loginProp, ...others }: { loginProp?: number }) => {
  const searchParams = useSearchParams();
  const reference_code: string | undefined =
    searchParams.get("reference_code") || undefined;
  const { isLoading, isSuccess, mutate, isError, error } = useRegister();
  const theme = useTheme();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      firstName: "",
      lastName: "",
      reference_code: reference_code || "",
      promoCode: "",
      heardBy: "",
      terms: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const PartnerDetailsData = usePartnerDetails({});

  const [showPassword, setShowPassword] = React.useState(false);
  const [activePasswordField, setActivePasswordField] = useState<
    "password" | "confirm_password" | null
  >(null);
  const [autherror, setAutherror] = React.useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

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

  const getRefrenceCode = (code?: string) => {
    PartnerDetailsData.mutate({ code: code });
  };

  useEffect(() => {
    if (
      reference_code !== undefined &&
      reference_code?.trim() !== "" &&
      !PartnerDetailsData?.isError
    ) {
      getRefrenceCode(reference_code);
    }
    if (PartnerDetailsData?.isError) {
      toast.error(PartnerDetailsData?.error.message);
      setValue("reference_code", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference_code, PartnerDetailsData?.isError]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      firstName: data.firstName,
      lastName: data.lastName,
      licensed_partner: data.licensed_partner,
      defaultPromoCode: data?.promoCode,
      heardBy: data?.heardBy,
      reference_code: data.reference_code,
    });
  };

  const handleGoogleLogin = async () => {
    const SignIn = await signIn("google");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Please verify your email address by clicking on the link that has been sent to your email inbox.",
        { position: "top-right" },
      );
      redirect("/email-confirmation");
    } else if (isError) {
      error?.message
        ? toast.error(error?.message, { position: "top-right" })
        : toast.error("Failed to register", { position: "top-right" });
    }
  }, [isSuccess, isError, error?.message]);

  const areAllRequirementsMet = (
    password: string,
    confirmPassword?: string,
  ) => {
    const requirements = checkPasswordRequirements(password, confirmPassword);
    return Object.values(requirements).every(
      (requirement) => requirement === true,
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name={"firstName"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error, undefined, true)}
                  type="text"
                  label="First Name"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name={"lastName"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error, undefined, true)}
                  type="text"
                  label="Last Name"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={"email"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error, undefined, true)}
                    label="Email"
                    type="email"
                    name="email"
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <HtmlTooltip
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
            > */}
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error, undefined, true)}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="new-password"
                      label="Password"
                      onFocus={() => setActivePasswordField("password")}
                      onBlur={() => {
                        console.log(
                          "areAllRequirementsMet(field.value)",
                          areAllRequirementsMet(field.value),
                        );
                        if (areAllRequirementsMet(field.value)) {
                          setActivePasswordField(null);
                        } else {
                          setActivePasswordField("password");
                        }
                      }}
                      onChange={(e: { target: { value: string } }) => {
                        field.onChange(e);
                        console.log(
                          "areAllRequirementsMet(e.target.value)",
                          areAllRequirementsMet(e.target.value),
                        );
                        if (areAllRequirementsMet(e.target.value)) {
                          setActivePasswordField(null);
                        } else {
                          setActivePasswordField("password");
                        }
                      }}
                      sx={{ position: "relative" }}
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
                    />
                    {activePasswordField === "password" && (
                      <PasswordRequirements password={field.value} />
                    )}
                  </>
                )}
              />
            </Box>
            {/* </HtmlTooltip> */}
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Controller
                name="confirm_password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error, undefined, true)}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      autoComplete="new-password"
                      label="Confirm Password"
                      onFocus={() => setActivePasswordField("confirm_password")}
                      onBlur={() => {
                        if (
                          areAllRequirementsMet(field.value, watch("password"))
                        ) {
                          setActivePasswordField(null);
                        } else {
                          setActivePasswordField("confirm_password");
                        }
                      }}
                      onChange={(e: { target: { value: string } }) => {
                        field.onChange(e);
                        if (
                          areAllRequirementsMet(
                            e.target.value,
                            watch("password"),
                          )
                        ) {
                          setActivePasswordField(null);
                        } else {
                          setActivePasswordField("confirm_password");
                        }
                      }}
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
                    />
                    {activePasswordField === "confirm_password" && (
                      <PasswordRequirements
                        password={field.value}
                        confirmPassword={watch("password")}
                      />
                    )}
                  </>
                )}
              />
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Controller
              name={"promoCode"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Promo Code"
                    placeholder="Promo Code"
                    type="text"
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name={"reference_code"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Referral Partners Code"
                    placeholder="Referral Code"
                    type="text"
                    onBlur={() => {
                      if (
                        field.value !== undefined &&
                        field?.value?.trim() != ""
                      ) {
                        getRefrenceCode(field.value);
                      }
                    }}
                    name="reference_code"
                    disabled={!!reference_code}
                  />
                </>
              )}
            />
          </Grid> */}

          {PartnerDetailsData?.data?.fullName && (
            <>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  value={PartnerDetailsData?.data?.fullName}
                  {...renderFieldProps()}
                  label="Referral Partner Name"
                  placeholder="Partner Name"
                  type="text"
                  name="partner_name"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  value={PartnerDetailsData?.data?.fullNameOnLicense}
                  {...renderFieldProps()}
                  label="Referral Partner License"
                  placeholder="Partner License"
                  type="text"
                  name="partner_license"
                  disabled={true}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={12}>
            <Controller
              name={"heardBy"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error, undefined, true)}
                  placeHolder="How did you find us?"
                  label="How did you find us?"
                  select
                >
                  {(
                    Object.keys(HeardByEnum) as Array<keyof typeof HeardByEnum>
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={HeardByEnum[key]}>
                        {HeardByEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name={"terms"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormGroup>
                  <FormControlLabel
                    {...field}
                    control={<Checkbox sx={{ color: "grey" }} />}
                    label={
                      <Box
                        sx={{
                          "& span": {
                            color: (theme) => theme.palette.text.primary,
                            fontWeight: "500",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        I accept the{" "}
                        <span
                          onClick={() => {
                            window.open("https://ezlivingtrust.com/terms");
                          }}
                          rel="noopener noreferrer"
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          Terms and Conditions
                        </span>
                        {/* <a
                          href="https://ezlivingtrust.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          Terms and Conditions
                        </a> */}
                      </Box>
                    }
                  />
                  <FormHelperText error={error?.message ? true : false}>
                    {error?.message}
                  </FormHelperText>
                </FormGroup>
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
                sx={{ color: (theme) => theme.palette.text.secondary }}
                size={30}
              />
            ) : (
              "Create Account"
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

export default RegisterForm;
