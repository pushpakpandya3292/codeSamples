"use-client";
import React, { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// assets
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { useAccountManager } from "@/provider/accountManager";
import CustomButton from "@/components/CustomButton";
import { ClearIcon } from "@mui/x-date-pickers";
import { MENUITEMS } from "@/components/Sidebar/SideBarMenu";
import MultiSelect from "@/components/MultiSelectInput";
import CustomErrorMessage from "@/components/CustomErrorMessage";
// ===============================|| JWT LOGIN ||=============================== //

declare module "@mui/material/styles" {
  interface Theme {
    customInput: any;
  }
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  access_config?: string[] | undefined;
}

const acountManagerType = [
  {
    label: "Dashboard",
    value: "dashboard",
  },
  {
    label: "Orders",
    value: "order",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Support",
    value: "support",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Questionnaires",
    value: "questionnaires",
  },
  {
    label: "Property",
    value: "property",
  },
  {
    label: "Partners",
    value: "partners",
  },
  {
    label: "Promo Code",
    value: "promo-code",
  },
  {
    label: "Payments",
    value: "payments",
  },
];

const InvationForm = ({ handleClose }: { handleClose: () => void }) => {
  const theme = useTheme();
  const [menuitems, setMenuitems] = useState(
    MENUITEMS.filter((item) => item.title !== "Settings"),
  );
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z\s]*$/, "Only letters are allowed")
      .required("This field is required"),
    lastName: Yup.string().optional(),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    access_config: Yup.array()
      .of(Yup.string())
      .min(1, "This Field is required")
      .required("This Field is required"),
  });
  const {
    mutateAsync: accountManagerMutate,
    isLoading: accountManagerLoading,
    isError,
    isSuccess,
  } = useAccountManager();
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      access_config: ["Dashboard"],
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const payload = {
      ...data,
      firstName: data.firstName,
      // lastName: data.lastName,
      access_config: {
        roles: data.access_config,
      },
    };
    try {
      await accountManagerMutate(payload);
      toast.success(
        "Invitation for the account administrator has been successfully sent to the email.",
        {
          position: "top-right",
        },
      );
      handleClose();
      reset({
        firstName: "",
        lastName: "",
        email: "",
        access_config: [],
      });
    } catch (error: any) {
      if (error?.message) {
        toast.error(error?.message, { position: "top-right" });
      } else {
        toast.error("Failed to register", { position: "top-right" });
      }
    }
  };
  const handleClear = () => {
    setValue("access_config", []);
  };
  return (
    <>
      <form
        //@ts-ignore
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          sx={{
            mb: 2,
            fontWeight: "600",
            fontSize: "22px",
            textTransform: "capitalize",
          }}
        >
          Invite people to your team
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            flexDirection: "column",
            // justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Controller
              name={"firstName"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label="User Name"
                  // sx={{ minWidth: "50%" }}
                />
              )}
            />
            {/* <Controller
              name={"lastName"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label="Last Name"
                  // sx={{ minWidth: "50%" }}
                />
              )}
            /> */}
            <Controller
              name={"email"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label="Email"
                  type="email"
                  // sx={{ minWidth: "250px" }}
                />
              )}
            />
          </Box>

          <Controller
            name={"access_config"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <MultiSelect
                  label="Select Allowed Access"
                  placeholder="Select Allowed Access"
                  onChange={(event, value) => {
                    if (value.includes("Dashboard")) {
                      setValue("access_config", value);
                    }
                  }}
                  value={watch("access_config") as string[]}
                  error={error?.message ? error?.message : ""}
                  options={menuitems?.map((item: any) => item.title)}
                />
              </>
            )}
          />
          <Box>
            <Button
              sx={{
                background: theme.palette.primary.main,
                ":disabled": {
                  background: theme.palette.primary.main,
                },
                height: "40px",
              }}
              disabled={accountManagerLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {accountManagerLoading ? (
                <CircularProgress
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                  size={30}
                />
              ) : (
                "Invite"
              )}
            </Button>
          </Box>
        </Box>
        <IconButton sx={{ position: "absolute", top: "15px", right: "20px" }}>
          <ClearIcon onClick={handleClose} />
        </IconButton>
      </form>
    </>
  );
};

export default InvationForm;
