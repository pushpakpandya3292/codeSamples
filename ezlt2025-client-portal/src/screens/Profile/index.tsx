"use client";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tableCellClasses,
  tooltipClasses,
} from "@mui/material";
import Pageheader from "@/components/PageHeader";
import { useUserDetailListing, useUserUpdate } from "@/provider/profile";
import { MarriageStatusEnum } from "../Onboarding/constant";
import Link from "next/link";
import CartStatusChip from "@/components/CartStatusChip";
import moment from "moment";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { HeardByEnum, PaymentStatusEnum } from "@/constants/EnumData";
import SecurityIcon from "@mui/icons-material/Security";
import CustomModal from "@/components/CustomModal";
import SimCardDownloadRoundedIcon from "@mui/icons-material/SimCardDownloadRounded";
import { useClientCartInvoice } from "@/provider/getClientFile";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

interface IFormInput {
  oldPassword?: string | undefined;
  password?: string | undefined;
  confirm_password?: string;
  firstName?: string;
  lastName?: string;
  heardBy?: string;
  isSessionDelete?: boolean;
  editPassword?: boolean;
}
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]*$/, "Only alphabets are allowed")
    .min(2, "At least 2 characters")
    .required("this field is required"),
  lastName: Yup.string()
    .min(2, "At least 2 characters")
    .required("this field is required")
    .matches(/^[a-zA-Z]*$/, "Only alphabets are allowed")
    .required("this field is required"),
  editPassword: Yup.boolean().optional(),
  oldPassword: Yup.string().when("editPassword", {
    is: (field: boolean) => field === true,
    then: (schema) =>
      schema
        .optional()
        .min(6, "The password must be at least 6 characters long.")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
          "Please include at least one uppercase, lowercase, alphanumeric and special characters.",
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string().when("editPassword", {
    is: (field: boolean) => field === true,
    then: (schema) =>
      schema
        .optional()
        .min(6, "The password must be at least 6 characters long.")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
          "Please include at least one uppercase, lowercase, alphanumeric and special characters.",
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  confirm_password: Yup.string()
    .optional()
    .oneOf([Yup.ref("password")], "Passwords must match"),
  heardBy: Yup.string().required("Please select how you heard about us"),
  isSessionDelete: Yup.boolean().optional(),
});
const ProfileScreen = () => {
  const profileDetail = useUserDetailListing({});
  const cartInvoice = useClientCartInvoice({});
  const { mutate, isLoading: userDetailUpdateLoading } = useUserUpdate();
  const [editing, setEditing] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToolTip, setShowToolTip] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

  const {
    getValues,
    trigger,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    values: {
      firstName: profileDetail?.data?.firstName || "",
      lastName: profileDetail?.data?.lastName || "",
      oldPassword: "",
      password: "",
      confirm_password: "",
      heardBy: profileDetail?.data?.heardBy || "",
      isSessionDelete: false,
      editPassword: false,
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const isDisable =
    watch("oldPassword") == "" ||
    watch("password") === "" ||
    watch("confirm_password") === "";

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const handleCloseModel = () => {
    setShowModal(false);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };
  const downloadInvoice = async (_id: string, _trustName: string | null) => {
    try {
      const cartInvoiceResults: any = await cartInvoice.mutateAsync({
        cartId: _id,
      });
      const response = await fetch(cartInvoiceResults?.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${_trustName} Invoice`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      toast.error("Error downloading the Invoice");
    }
  };

  const cancelEdit = () => {
    reset({
      firstName: profileDetail?.data?.firstName,
      lastName: profileDetail?.data?.lastName,
      heardBy: profileDetail?.data?.heardBy,
      oldPassword: "",
      password: "",
      confirm_password: "",
      editPassword: false,
      isSessionDelete: false,
    });
    setValue("firstName", profileDetail?.data?.firstName || "");
    setValue("lastName", profileDetail?.data?.lastName || "");
    setValue("heardBy", profileDetail?.data?.heardBy || "");
    setEditing(false);
    setEditPassword(false);
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Create separate validation promises for profile and password fields
    const profileValidation = trigger(["heardBy", "firstName", "lastName"]);
    const passwordValidation = editPassword
      ? trigger(["oldPassword", "password", "confirm_password"])
      : Promise.resolve(true);

    // Check both validations
    Promise.all([profileValidation, passwordValidation]).then(
      ([isProfileValid, isPasswordValid]) => {
        if (isProfileValid && (!editPassword || isPasswordValid)) {
          // Create payload with all fields
          const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            heardBy: data.heardBy,
            oldPassword: editPassword ? data.oldPassword : undefined,
            password: editPassword ? data.password : undefined,
            isSessionDelete: data.isSessionDelete,
          };

          mutate(payload, {
            onSuccess: () => {
              // Keep the profile fields and only reset password-related fields
              reset({
                ...data, // Keep existing form data
                oldPassword: "",
                password: "",
                confirm_password: "",
                editPassword: false,
                isSessionDelete: false,
              });
              toast.success("Profile updateded");
              setEditPassword(false);
              setEditing(false);
            },
            onError: (error) => {
              toast.error(error?.message);
            },
          });
        }
      },
    );
  };

  const onSubmitNoSessionDelete = (data: any) => {
    trigger(["oldPassword", "password", "confirm_password"]).then((isValid) => {
      if (isValid) {
        setValue("isSessionDelete", false);
        const payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          heardBy: data.heardBy,
          oldPassword: data.oldPassword,
          password: data.password,
          isSessionDelete: false,
        };

        mutate(payload, {
          onSuccess: () => {
            toast.success("Profile updated successfully");
            reset({
              ...data, // Keep existing form data
              oldPassword: "",
              password: "",
              confirm_password: "",
              editPassword: false,
            });
            setShowModal(false);
          },
          onError: (error) => {
            toast.error(error?.message);
            setShowModal(false);
          },
        });
      }
    });
  };

  const onSubmitSessionDelete = (data: any) => {
    trigger(["oldPassword", "password", "confirm_password"]).then((isValid) => {
      if (isValid) {
        setValue("isSessionDelete", true);
        const payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          heardBy: data.heardBy,
          oldPassword: data.oldPassword,
          password: data.password,
          isSessionDelete: true,
        };

        mutate(payload, {
          onSuccess: () => {
            toast.success("Profile updated successfully");
            reset({
              ...data, // Keep existing form data
              oldPassword: "",
              password: "",
              confirm_password: "",
              editPassword: false,
            });
            setShowModal(false);
          },
          onError: (error) => {
            toast.error(error?.message);
            setShowModal(false);
          },
        });
      }
    });
  };

  const handleEdit = () => {
    setValue("firstName", profileDetail?.data?.firstName || "");
    setValue("lastName", profileDetail?.data?.lastName || "");
    setValue("heardBy", profileDetail?.data?.heardBy || "");
    setEditing(true);
  };
  return (
    <Box sx={{ px: { xs: 1.5, md: 5 } }}>
      <Pageheader title="Profile" />
      <form>
        <Box position={"relative"} textAlign={"right"} height={"40px"}>
          {editing || editPassword ? (
            <Box display={"flex"} gap={"15px"} justifyContent={"flex-end"}>
              <Button
                sx={{
                  background: (theme) =>
                    theme.additionalColors?.button.cancelbg,
                  border: (theme) =>
                    `1px solid ${theme.additionalColors?.button.cancelbg}`,
                  ":disabled": {
                    background: (theme) =>
                      theme.additionalColors?.button.cancelbg,
                  },
                  height: "40px",
                  textTransform: "capitalize",
                }}
                size="large"
                // variant="contained"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  ":disabled": {
                    background: (theme) => theme.palette.text.disabled,
                    color: (theme) => theme.palette.primary.contrastText,
                  },
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  color: (theme) => theme.palette.text.secondary,
                  height: "40px",
                  textTransform: "capitalize",
                }}
                disabled={!isDirty}
                size="large"
                // type="submit"
                onClick={() => onSubmit(getValues())}
                // variant="contained"
              >
                {userDetailUpdateLoading ? (
                  <CircularProgress
                    sx={{ color: (theme) => theme.palette.text.secondary }}
                    size={30}
                  />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Box>
          ) : (
            <Button
              onClick={handleEdit}
              sx={{
                background: (theme) => theme.palette.primary.main,
                ":disabled": {
                  background: (theme) => theme.palette.primary.main,
                },
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                "&:hover": {
                  color: (theme) => theme.palette.primary.main,
                },
                color: (theme) => theme.palette.text.secondary,
                height: "40px",
                textTransform: "capitalize",
                padding: "0 10px",
              }}
              size="small"
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            borderRadius: "12px",
            // px: 3,
            // py: 2,
            // boxShadow: (theme) =>
            //   `0px 4px 20px 0px ${theme.additionalColors?.lightGrey}`,
            my: 2,
            // alignItems: "center",
            position: "relative",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h2" mb={2}>
                  Personal Information
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Box>
                    <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={100} />
                      ) : (
                        "First Name"
                      )}
                    </Typography>
                    <Box sx={{ fontWeight: "600" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={200} />
                      ) : (
                        <>
                          <Controller
                            name={"firstName"}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <CustomTextField
                                {...field}
                                {...renderFieldProps(error)}
                                defaultValue={profileDetail?.data?.firstName}
                                type="text"
                                disabled={editing ? false : true}
                                // label="First Name"
                              />
                            )}
                          />
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={100} />
                      ) : (
                        "Last Name"
                      )}
                    </Typography>
                    <Box sx={{ fontWeight: "600" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={200} />
                      ) : (
                        <>
                          <Controller
                            name={"lastName"}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <CustomTextField
                                {...field}
                                {...renderFieldProps(error)}
                                defaultValue={profileDetail?.data?.lastName}
                                type="text"
                                disabled={editing ? false : true}
                                // label="First Name"
                              />
                            )}
                          />
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={100} />
                      ) : (
                        "Email"
                      )}
                    </Typography>
                    <Box sx={{ fontWeight: "600" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={200} />
                      ) : (
                        // profileDetail?.data?.email
                        <CustomTextField
                          {...renderFieldProps()}
                          defaultValue={profileDetail?.data?.email}
                          type="text"
                          disabled={true}
                          // label="Email"
                        />
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={100} />
                      ) : (
                        "How you found us?"
                      )}
                    </Typography>
                    <Box sx={{ fontWeight: "600" }}>
                      {profileDetail?.isFetching ? (
                        <Skeleton width={200} />
                      ) : (
                        <Controller
                          name={"heardBy"}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <CustomTextField
                              {...field}
                              {...renderFieldProps(error)}
                              defaultValue={profileDetail?.data?.heardBy}
                              disabled={editing ? false : true}
                              select
                            >
                              {(
                                Object.keys(HeardByEnum) as Array<
                                  keyof typeof HeardByEnum
                                >
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
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h2" mb={2}>
                  Account Information
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Box
                    display={"flex"}
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={"10px"}
                    justifyContent={"space-between"}
                  >
                    <Box width={"100%"}>
                      <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                        {profileDetail?.isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "Date Joined"
                        )}
                      </Typography>
                      <Box sx={{ fontWeight: "600" }}>
                        {profileDetail?.isFetching ? (
                          <Skeleton width={200} />
                        ) : (
                          <CustomTextField
                            {...renderFieldProps()}
                            defaultValue={moment(
                              profileDetail?.data?.createdAt,
                            ).format("MM-DD-YYYY")}
                            type="text"
                            disabled={true}
                            // label="Date Joined"
                          />
                        )}
                      </Box>
                    </Box>
                    <Box width={"100%"}>
                      <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                        {profileDetail?.isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          "No. of Documents"
                        )}
                      </Typography>
                      <Box sx={{ fontWeight: "600" }}>
                        {profileDetail?.isFetching ? (
                          <Skeleton width={200} />
                        ) : (
                          <CustomTextField
                            {...renderFieldProps()}
                            //@ts-ignore
                            defaultValue={
                              profileDetail?.data?.carts?.length || "-"
                            }
                            type="text"
                            disabled={true}
                            // label="Date Joined"
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {/* {profileDetail?.data?.reference_code && ( */}
                  <Box>
                    <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                      {profileDetail?.isLoading ? (
                        <Skeleton width={100} />
                      ) : (
                        "Referral Agent / Advisor Name"
                      )}
                    </Typography>
                    <Box sx={{ fontWeight: "600" }}>
                      {profileDetail?.isFetching ? (
                        <Skeleton width={200} />
                      ) : (
                        <CustomTextField
                          {...renderFieldProps()}
                          defaultValue={
                            profileDetail?.data?.reference_code || "-"
                          }
                          disabled={true}
                          type="text"
                        />
                      )}
                    </Box>
                  </Box>
                  {/* // )} */}
                  <Box>
                    <Button
                      sx={{
                        background: (theme) => theme.palette.primary.main,
                        ":disabled": {
                          background: (theme) => theme.palette.primary.main,
                        },
                        border: (theme) =>
                          `1px solid ${theme.palette.primary.main}`,
                        "&:hover": {
                          color: (theme) => theme.palette.primary.main,
                        },
                        color: (theme) => theme.palette.text.secondary,
                        height: "40px",
                        textTransform: "capitalize",
                        padding: "0 10px",
                      }}
                      size="small"
                      onClick={() =>
                        setValue("editPassword", !watch("editPassword"))
                      }
                    >
                      Edit Password
                    </Button>
                  </Box>
                  {watch("editPassword") && (
                    <>
                      <Box>
                        <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                          {profileDetail?.isLoading ? (
                            <Skeleton width={100} />
                          ) : (
                            "Old Password"
                          )}
                        </Typography>
                        <Box>
                          {profileDetail?.isLoading ? (
                            <Skeleton width={200} />
                          ) : (
                            <Controller
                              name="oldPassword"
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                  {...field}
                                  {...renderFieldProps(error)}
                                  type={showOldPassword ? "text" : "password"}
                                  autoComplete="new-password"
                                  // label="Confirm Password"
                                  // disabled={editing ? false : true}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowOldPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          edge="end"
                                          size="small"
                                        >
                                          {showOldPassword ? (
                                            <Visibility />
                                          ) : (
                                            <VisibilityOff />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              )}
                            />
                          )}
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={{ xs: "column", md: "row" }}
                        gap={"10px"}
                      >
                        <Box width={"100%"}>
                          <Box>
                            {profileDetail?.isLoading ? (
                              <Skeleton width={200} />
                            ) : (
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
                                  <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                                    {profileDetail?.isLoading ? (
                                      <Skeleton width={100} />
                                    ) : (
                                      "New Password"
                                    )}
                                  </Typography>
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
                                        autoComplete="new-password"
                                        // label="Password"
                                        // disabled={editing ? false : true}
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
                                      />
                                    )}
                                  />
                                </Box>
                              </HtmlTooltip>
                            )}
                          </Box>
                        </Box>
                        <Box width={"100%"}>
                          <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                            {profileDetail?.isLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              "Confirm Password"
                            )}
                          </Typography>
                          <Box>
                            {profileDetail?.isLoading ? (
                              <Skeleton width={200} />
                            ) : (
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
                                    autoComplete="new-password"
                                    // label="Confirm Password"
                                    // disabled={editing ? false : true}
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
                                  />
                                )}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Button
                          onClick={() => setShowModal(true)}
                          sx={{
                            background: (theme) => theme.palette.primary.main,
                            ":disabled": {
                              background: (theme) =>
                                theme.palette.text.disabled,
                              color: (theme) =>
                                theme.palette.primary.contrastText,
                            },
                            border: (theme) =>
                              `1px solid ${theme.palette.primary.main}`,
                            "&:hover": {
                              color: (theme) => theme.palette.primary.main,
                            },
                            color: (theme) => theme.palette.text.secondary,
                            height: "40px",
                            textTransform: "capitalize",
                          }}
                          size="large"
                          //@ts-ignore
                          disabled={
                            errors?.confirm_password ||
                            errors?.oldPassword ||
                            errors?.password ||
                            isDisable
                          }
                        >
                          Update Password
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <CustomModal
            open={showModal}
            width={{ xs: "100%", sm: "400px" }}
            handleClose={() => {}}
          >
            <CancelOutlinedIcon
              onClick={handleCloseModel}
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer",
              }}
            />
            <Box
              textAlign={"center"}
              display={"flex"}
              flexDirection={"column"}
              gap={"30px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SecurityIcon sx={{ fontSize: "50px" }} />
              <Typography variant="h2" maxWidth={"260px"} fontWeight={"500"}>
                Do You Want to logout from all devices
              </Typography>
              <Box display={"flex"} gap={"10px"} justifyContent={"center"}>
                <Box>
                  <Button
                    sx={{
                      background: (theme) =>
                        theme.additionalColors?.button.cancelbg,
                      border: (theme) =>
                        `1px solid ${theme.additionalColors?.button.cancelbg}`,
                      ":disabled": {
                        background: (theme) =>
                          theme.additionalColors?.button.cancelbg,
                      },
                      "&:hover": {
                        background: (theme) =>
                          theme.additionalColors?.button.cancelbg,
                      },
                      height: "40px",
                      width: "150px",
                    }}
                    size="large"
                    // variant="contained"
                    // type="submit"
                    onClick={handleSubmit(onSubmitNoSessionDelete)}
                  >
                    {userDetailUpdateLoading && !watch("isSessionDelete") ? (
                      <CircularProgress
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                        size={30}
                      />
                    ) : (
                      " No"
                    )}
                  </Button>
                </Box>
                <Box
                  onClick={() => {
                    setValue("isSessionDelete", true);
                  }}
                >
                  <Button
                    sx={{
                      background: (theme) => theme.palette.primary.main,
                      ":disabled": {
                        background: (theme) => theme.palette.primary.main,
                      },
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      "&:hover": {
                        background: (theme) => theme.palette.primary.main,
                      },
                      color: (theme) => theme.palette.text.secondary,
                      height: "40px",
                      width: "150px",
                    }}
                    size="large"
                    // type="submit"
                    onClick={handleSubmit(onSubmitSessionDelete)}
                    // variant="contained"
                  >
                    {userDetailUpdateLoading && watch("isSessionDelete") ? (
                      <CircularProgress
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                        size={30}
                      />
                    ) : (
                      "Yes"
                    )}
                    {/* Yes */}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CustomModal>
        </Box>
      </form>
      {profileDetail?.data?.carts && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "18px", md: "24px" },
                  fontWeight: "600",
                  marginBottom: "15px",
                  pt: 3,
                  pb: 1,
                }}
              >
                My Interview
              </Typography>
              <Box>
                {profileDetail.isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : !profileDetail?.data?.carts ? (
                  <Typography variant="h3">No Interviews Found</Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Action</StyledTableCell>
                          <StyledTableCell>Trust Name</StyledTableCell>
                          <StyledTableCell>Package Name</StyledTableCell>
                          <StyledTableCell>State</StyledTableCell>
                          <StyledTableCell>Completed Steps</StyledTableCell>
                          <StyledTableCell>Steps percentage</StyledTableCell>
                          <StyledTableCell>Created At</StyledTableCell>
                          <StyledTableCell>Interview status</StyledTableCell>
                          <StyledTableCell>Order Status</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {profileDetail?.data?.carts?.map((cart, i) => (
                          <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row">
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    a: {
                                      color: "#00008B",
                                      textDecoration: "none",
                                    },
                                  }}
                                >
                                  {(() => {
                                    switch (true) {
                                      case cart?.clientDetail
                                        ?.steps_completed_percentage === 100 &&
                                        cart?.payment_status ===
                                          PaymentStatusEnum.REFUND:
                                        return (
                                          <>
                                            <Button
                                              className="continueInterView"
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                background: (theme) =>
                                                  theme.additionalColors
                                                    ?.tablightBlue,
                                                color: (theme) =>
                                                  theme.palette.primary.light,
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                                fontFamily: "Roboto",
                                                textTransform: "capitalize",
                                                fontWeight: "400",
                                              }}
                                            >
                                              Refund
                                            </Button>
                                          </>
                                        );
                                      case cart?.clientDetail
                                        ?.steps_completed_percentage === 100 &&
                                        cart?.payment_status ===
                                          PaymentStatusEnum.PROCESSING:
                                        return (
                                          <>
                                            <Button
                                              className="continueInterView"
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                background: (theme) =>
                                                  theme.additionalColors
                                                    ?.tablightBlue,
                                                color: (theme) =>
                                                  theme.palette.primary.light,
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                                fontFamily: "Roboto",
                                                textTransform: "capitalize",
                                                fontWeight: "400",
                                              }}
                                            >
                                              Processing
                                            </Button>
                                          </>
                                        );
                                      case cart?.clientDetail
                                        ?.steps_completed_percentage === 100 &&
                                        cart?.payment_status ===
                                          PaymentStatusEnum.UNPAID:
                                        return (
                                          <>
                                            <Link
                                              href={`/dashboards/living-trust-interview/${cart.id}`}
                                            >
                                              <Button
                                                className="continueInterView"
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                  background: (theme) =>
                                                    theme.palette.info.main,
                                                  color: (theme) =>
                                                    theme.palette.primary.light,
                                                  borderRadius: "5px",
                                                  padding: "5px 20px",
                                                  fontFamily: "Roboto",
                                                  textTransform: "capitalize",
                                                  fontWeight: "400",
                                                }}
                                              >
                                                Checkout
                                              </Button>
                                            </Link>
                                          </>
                                        );
                                      case cart?.clientDetail
                                        ?.steps_completed_percentage === 100 &&
                                        cart?.payment_status ===
                                          PaymentStatusEnum.PAID:
                                        return (
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Link
                                              href={
                                                "/dashboards/completed-documents"
                                              }
                                            >
                                              <Button
                                                className="continueInterView"
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                  background: (theme) =>
                                                    theme.additionalColors
                                                      ?.background.tertiary,
                                                  color: (theme) =>
                                                    theme.palette.primary.main,
                                                  borderRadius: "5px",
                                                  padding: "5px 10px",
                                                  fontFamily: "Roboto",
                                                  textTransform: "capitalize",
                                                  fontWeight: "400",
                                                }}
                                              >
                                                View document
                                              </Button>
                                            </Link>
                                            <SimCardDownloadRoundedIcon
                                              color="info"
                                              sx={{
                                                cursor: "pointer",
                                                fontSize: "30px",
                                              }}
                                              onClick={() => {
                                                downloadInvoice(
                                                  cart.id,
                                                  cart.clientDetail.trust_name,
                                                );
                                              }}
                                            />
                                          </Box>
                                        );
                                      default:
                                        return (
                                          <>
                                            <Link
                                              href={`/dashboards/living-trust-interview/${cart.id}`}
                                            >
                                              <Button
                                                className="continueInterView"
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                  background: (theme) =>
                                                    theme.palette.success.main,
                                                  color: (theme) =>
                                                    theme.palette.primary.light,
                                                  borderRadius: "5px",
                                                  padding: "5px 10px",
                                                  fontFamily: "Roboto",
                                                  textTransform: "capitalize",
                                                  fontWeight: "400",
                                                }}
                                              >
                                                Continue interview
                                              </Button>
                                            </Link>
                                          </>
                                        );
                                    }
                                  })()}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#333",
                                  }}
                                >
                                  {profileDetail.isLoading ? (
                                    <Skeleton sx={{ width: "100%" }} />
                                  ) : (
                                    <>{cart?.clientDetail?.trust_name || "-"}</>
                                  )}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  color: "#333",
                                }}
                              >
                                LT-
                                {cart?.clientDetail?.marriage_status ===
                                MarriageStatusEnum.COUPLE
                                  ? "C"
                                  : "I"}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#333",
                                  }}
                                >
                                  {profileDetail.isLoading ? (
                                    <Skeleton sx={{ width: "100%" }} />
                                  ) : (
                                    <>
                                      {cart?.clientDetail?.state
                                        ? cart?.clientDetail?.state
                                        : "-"}
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#333",
                                  }}
                                >
                                  {profileDetail.isLoading ? (
                                    <Skeleton sx={{ width: "100%" }} />
                                  ) : (
                                    <>
                                      {cart?.clientDetail?.steps_completed
                                        ? cart?.clientDetail?.steps_completed
                                        : "0"}
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#333",
                                  }}
                                >
                                  {profileDetail.isLoading ? (
                                    <Skeleton sx={{ width: "100%" }} />
                                  ) : (
                                    <>
                                      {cart?.clientDetail
                                        ?.steps_completed_percentage
                                        ? `${cart?.clientDetail?.steps_completed_percentage?.toFixed(
                                            2,
                                          )}%`
                                        : "0.00%"}
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  color: "#333",
                                }}
                              >
                                {cart?.createdAt
                                  ? moment(cart?.createdAt).format("MM-DD-YYYY")
                                  : "-"}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              <Box>
                                {cart?.clientDetail
                                  ?.steps_completed_percentage <= 99 ? (
                                  <Typography
                                    sx={{
                                      color: "#f1c40f",
                                      borderColor: "#f1c40f",
                                      background: "#f1c40f12",
                                      border: "1px solid",
                                      padding: "0px 20px",
                                      height: "40px",
                                      lineHeight: "40px",
                                      borderRadius: "20px",
                                      width: "fit-content",
                                    }}
                                  >
                                    Inprocess
                                  </Typography>
                                ) : cart?.clientDetail
                                    ?.steps_completed_percentage === 100 ? (
                                  <Typography
                                    sx={{
                                      color: "#2ecc71",
                                      borderColor: "#2ecc71",
                                      background: "#2ecc711a",
                                      border: "1px solid",
                                      padding: "0px 20px",
                                      height: "40px",
                                      lineHeight: "40px",
                                      borderRadius: "20px",
                                      width: "fit-content",
                                    }}
                                  >
                                    Completed
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{
                                      color: "#e74c3c",
                                      borderColor: "#e74c3c",
                                      background: "#e74c3c17",
                                      border: "1px solid",
                                      padding: "0px 20px",
                                      height: "40px",
                                      lineHeight: "40px",
                                      borderRadius: "20px",
                                      width: "fit-content",
                                    }}
                                  >
                                    Pending
                                  </Typography>
                                )}
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {cart?.payment_status === 1 ? (
                                <CartStatusChip cartStatus={cart.status} />
                              ) : (
                                "-"
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProfileScreen;
