import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  Grid,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomCheckBox from "@/components/CustomCheckBox";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import CustomModal, { DeleteModal } from "@/components/CustomModal";
import CustomizedSwitches from "@/components/CustomSwitch";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import { ToggleBox } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import {
  TrusteeChildBothRealtionEnum,
  TrusteeChildRealtionEnum,
} from "../../../constants";
import dayjs from "dayjs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "765px",
  height: "524",
  padding: "30px 20px",
};
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
  const { control, watch, setValue } = useFormContext();
  const [childHaveAnyChildren, setChildHaveAnyChildren] = useState(false);

  const [selectedAddressType, setSelectedAddressType] = useState(
    watch("living_childern_address") === watch("primary_trustee_address")
      ? "primary"
      : "",
  );

  // useEffect(() => {
  //   if (selectedAddressType === "primary") {
  //     setValue("living_childern_address", null);
  //     setValue("living_childern_address", watch("primary_trustee_address"));
  //   } else if (selectedAddressType === "undocumented") {
  //     setValue("living_childern_address", "undocumented");
  //   } else {
  //     setValue("living_childern_address", null);
  //   }
  // }, [selectedAddressType]);

  useEffect(() => {
    if (selectedAddressType === "primary") {
      setValue("living_childern_address", watch("primary_trustee_address"));
    } else if (selectedAddressType === "undocumented") {
      setValue("living_childern_address", "undocumented");
      setValue("primary_home_address", "undocumented");
    } else {
      setValue("living_childern_address", null);
    }
  }, [selectedAddressType]);

  useEffect(() => {
    setChildHaveAnyChildren(watch("living_childern_have_any_children"));
  }, [watch("living_childern_modal_open")]);
  const handleChildhaveChild = (value: boolean) => {
    setValue("living_childern_have_any_children", value);
    setChildHaveAnyChildren(value);
  };

  return (
    <CustomModal
      open={open}
      width={{ xs: "100%", sm: "auto" }}
      height="auto"
      handleClose={handleClose}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
          alignItems: "center",
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
                name={"living_childern_full_name"}
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
                name={"living_childern_date_of_birth"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomeDateTimePicker
                    {...field}
                    {...renderDateFieldProps(error)}
                    minDate={dayjs(watch("primary_trustee_date_of_birth"))}
                    maxDate={dayjs()}
                    label={"Date of birth"}
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"living_childern_age"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Age"
                    disabled
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"living_childern_email"}
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
                name="living_childern_mobile_number"
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
                name={"living_childern_primary_relation"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label={`For ${watch("primary_trustee_first_name")} ${watch(
                      "primary_trustee_last_name",
                    )} this child is`}
                    tooltipText={`For ${watch(
                      "primary_trustee_first_name",
                    )} ${watch("primary_trustee_last_name")} this child is`}
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
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"living_childern_secondary_relation"}
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
                name={"living_childern_both_trustee_relation"}
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
          </Grid>
          <Grid item xs={12} md={12}>
            <Item>
              <Controller
                name="living_childern_address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <GoogleMaps>
                    <GoogleMaps.AutoComplete
                      {...field}
                      name={"living_childern_address"}
                      defaultValue={watch("living_childern_address")}
                      onAddressChange={(autoAddress: any) => {
                        setValue("living_childern_address", autoAddress);
                      }}
                      placeholder="Enter Child’s Residence Address"
                    />
                    {error?.message && (
                      <CustomErrorMessage error={error?.message ?? {}} />
                    )}
                  </GoogleMaps>
                )}
              />
            </Item>
          </Grid>
        </Grid>
        <Box>
          <CustomCheckBox
            checked={selectedAddressType === "primary"}
            performOnChange={true}
            onChange={() =>
              setSelectedAddressType(
                selectedAddressType === "primary" ? "" : "primary",
              )
            }
            type={"CIRCLE"}
          >
            <Typography>Add Same Primary address</Typography>
          </CustomCheckBox>
        </Box>
        <Box>
          <CustomCheckBox
            checked={selectedAddressType === "undocumented"}
            performOnChange={true}
            onChange={() =>
              setSelectedAddressType(
                selectedAddressType === "undocumented" ? "" : "undocumented",
              )
            }
            type={"CIRCLE"}
          >
            <Typography>Address Undocumented</Typography>
          </CustomCheckBox>
        </Box>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <ToggleBox
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Typography variant="h4">
            Does this child have any children?
          </Typography>
          <CustomizedSwitches
            checked={childHaveAnyChildren}
            setChecked={handleChildhaveChild}
          />
        </ToggleBox>
        <Fade in={childHaveAnyChildren} timeout={1000} unmountOnExit>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Item sx={{ my: 1 }}>
                <Controller
                  name={"living_child_children_full_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Full Name"}
                    />
                  )}
                />
              </Item>
              <Button
                startIcon={<Add fontSize="medium" />}
                sx={{
                  height: "45px",
                  mt: "10px",
                  width: { sm: "100%", md: "90%" },
                  background: (theme) =>
                    theme.additionalColors?.background.tertiary,
                  color: (theme) => theme.palette.primary.main,
                  borderRadius: "5px",
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Add Child
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Box> */}
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex" },
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "flex-end",
          gap: "10px",
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
