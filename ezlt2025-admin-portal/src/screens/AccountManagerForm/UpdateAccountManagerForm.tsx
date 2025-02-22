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
import {
  useAccountManager,
  useAccountManagerUpdate,
} from "@/provider/accountManager";
import { ClearIcon } from "@mui/x-date-pickers";
import { MENUITEMS } from "@/components/Sidebar/SideBarMenu";
import MultiSelect from "@/components/MultiSelectInput";

declare module "@mui/material/styles" {
  interface Theme {
    customInput: any;
  }
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  access_config: string[];
}

interface UpdateAccountManagerFormProps {
  managerDetails: {
    managerFirstName: string;
    managerLastName: string;
    managerId: string;
    managerEmail: string;
    managerAccessConfig: string[];
  };
  handleClose: () => void;
}

const UpdateAccountManagerForm = ({
  managerDetails,
  handleClose,
}: UpdateAccountManagerFormProps) => {
  const theme = useTheme();
  const [menuitems, setMenuitems] = useState(
    MENUITEMS.filter((item) => item.title !== "Settings"),
  );
  const updateAccountManager = useAccountManagerUpdate({});
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
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      firstName: managerDetails.managerFirstName,
      lastName: managerDetails.managerLastName,
      email: managerDetails.managerEmail,
      access_config: managerDetails.managerAccessConfig,
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateAccountManager.mutateAsync({
        accountManagerId: managerDetails.managerId,
        data: {
          user: {
            email: data.email,
            firstName: data.firstName,
            // lastName: data.lastName,
          },
          accountManager: {
            access_config: {
              roles: data.access_config,
            },
          },
        },
      });
      toast.success("Account administrator Updated.", {
        position: "top-right",
      });
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
        toast.error("Failed to update", { position: "top-right" });
      }
    }
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
          Update Account Administrator
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
          {" "}
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
                  disabled={true}
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
                  disabled={updateAccountManager.isLoading}
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
              disabled={updateAccountManager.isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {updateAccountManager.isLoading ? (
                <CircularProgress
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                  size={30}
                />
              ) : (
                "Update"
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

export default UpdateAccountManagerForm;
