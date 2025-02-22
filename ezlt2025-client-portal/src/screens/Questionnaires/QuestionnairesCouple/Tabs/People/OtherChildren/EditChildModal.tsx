import { Box, Button, Grid, MenuItem, Typography, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import CustomModal, { DeleteModal } from "@/components/CustomModal";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import {
  TrusteeChildBothRealtionEnum,
  TrusteeChildRealtionEnum,
} from "../../../constants";


const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
}));

interface IModalProps {
  open: boolean;
  handleClose: () => void;
  handleDeleteChild?: () => void;
  handleCancel?: () => void;
}

const EditChild = ({
  open,
  handleClose,
  handleCancel,
  handleDeleteChild,
}: IModalProps) => {
  const { control, watch } = useFormContext();

  return (
    <CustomModal open={open} width={{ xs: "100%", sm: "auto" }} height="auto" handleClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        <Typography variant="h2">Edit Living Child</Typography>
        <DeleteModal handleDeleteChild={handleDeleteChild} />
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_full_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Full Name"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_date_of_birth"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomeDateTimePicker
                    {...field}
                    {...renderDateFieldProps(error)}
                    label={"Date of birth"}
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_age"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    disabled
                    label="Age"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_email"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Email (Optional)"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name="primary_trustee_childern_mobile_number"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <PhoneNumberField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Mobile (Optional)"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_primary_relation"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label={`For ${watch("primary_trustee_first_name")} ${watch(
                      "primary_trustee_last_name",
                    )} this child is`}
                    tooltipText={`For ${watch("primary_trustee_first_name")} ${watch(
                      "primary_trustee_last_name",
                    )} this child is`}
                    select
                    sx={{ flexBasis: "30%" }}
                  >
                    {(
                      Object.keys(TrusteeChildRealtionEnum) as Array<
                        keyof typeof TrusteeChildRealtionEnum
                      >
                    ).map((key) => {
                      return (
                        <MenuItem key={key} value={key}>
                          {TrusteeChildRealtionEnum[key]}
                        </MenuItem>
                      );
                    })}
                  </CustomTextField>
                )}
              />
            </Item>
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_secondary_relation"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label={`For ${watch(
                      "secondary_trustee_first_name",
                    )} ${watch("secondary_trustee_last_name")} this child is`}
                    tooltipText={`For ${watch(
                      "secondary_trustee_first_name",
                    )} ${watch("secondary_trustee_last_name")} this child is`}
                    select
                  >
                    {(
                      Object.keys(TrusteeChildRealtionEnum) as Array<
                        keyof typeof TrusteeChildRealtionEnum
                      >
                    ).map((key) => {
                      return (
                        <MenuItem key={key} value={key}>
                          {TrusteeChildRealtionEnum[key]}
                        </MenuItem>
                      );
                    })}
                  </CustomTextField>
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"primary_trustee_childern_both_trustee_relation"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label={"For both of us this child is"}
                    select
                  >
                    {(
                      Object.keys(TrusteeChildBothRealtionEnum) as Array<
                        keyof typeof TrusteeChildBothRealtionEnum
                      >
                    ).map((key) => {
                      return (
                        <MenuItem key={key} value={key}>
                          {TrusteeChildBothRealtionEnum[key]}
                        </MenuItem>
                      );
                    })}
                  </CustomTextField>
                )}
              />
            </Item>
          </Grid> */}
        </Grid>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex" },
          justifyContent: "flex-end",
          gap: "10px",
          flexDirection: { xs: "column-reverse", md: "row" }
        }}
      >
        <Button
          sx={{
            height: "44px",
            width: { sm: "100%", md: "150px" },
            background: (theme) => theme.additionalColors?.button.cancelbg,
            color: (theme) => theme.additionalColors?.button.canceltext,
            borderRadius: "5px",
            padding: "12px 45px",
            fontSize: "18px",
            fontFamily: "Roboto",
            textTransform: "capitalize",
            fontWeight: "600",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{
            height: "44px",
            width: { sm: "100%", md: "180px" },
            background: (theme) => theme.additionalColors?.background.tertiary,
            color: (theme) => theme.palette.primary.main,
            borderRadius: "5px",
            padding: "12px 45px",
            fontSize: "18px",
            fontFamily: "Roboto",
            textTransform: "capitalize",
            fontWeight: "600",
          }}
          onClick={handleClose}
        >
          Save Edits
        </Button>
      </Box>
    </CustomModal>
  );
};
export default EditChild;
