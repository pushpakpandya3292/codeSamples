import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import CustomModal from "@/components/CustomModal";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import {
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
} from "../../../constants";
import EditAgent from "../EditAgents";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import CustomCheckBox from "@/components/CustomCheckBox";

import { v4 as uuidv4 } from "uuid";
import RecommendedChip from "@/components/RecommendedChip";

interface IAddTrustProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  secondryTitle?: string;
  isPrimary?: boolean;
}

const AddTrustee = ({
  open,
  handleClose,
  title,
  secondryTitle,
  isPrimary,
}: IAddTrustProps) => {
  const { watch, setValue, control, trigger } = useFormContext();
  const Agents_details = useFieldArray({
    control,
    name: "Agents_details",
  });
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [openAddTrustee, setOpenAddTrustee] = useState(false);
  const [openEditTrustee, setOpenEditTrustee] = useState(false);
  const [EditTrustee, setEditTrusteeId] = useState<number | undefined>(
    undefined,
  );

  const emptyFieldValues = () => {
    setValue("temp_primary_guardian_modal_open", false);
    setValue("temp_primary_guardian_full_name", "");
    setValue("temp_primary_guardian_email", "");
    setValue("temp_primary_guardian_address", null);
    setValue("temp_primary_guardian_phone_number", "");
    setValue("temp_primary_trustee_guardian_relation", "");

    setValue("temp_backup_guardian_modal_open", false);
    setValue("temp_backup_guardian_full_name", "");
    setValue("temp_backup_guardian_email", "");
    setValue("temp_backup_guardian_address", null);
    setValue("temp_backup_guardian_phone_number", "");
    setValue("temp_backup_trustee_guardian_relation", "");
  };
  const handleEditTrusteeClose = () => {
    setOpenEditTrustee(false);
  };
  const handleAddTrusteeOpen = () => {
    if (isPrimary) {
      setValue("temp_primary_guardian_modal_open", true);
    } else {
      setValue("temp_backup_guardian_modal_open", true);
    }
    setOpenAddTrustee(true);
  };

  const handleAddTrusteeClose = () => {
    setOpenAddTrustee(false);
  };

  const handleAddGuardian = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (isPrimary) {
        setValue(
          "primary_guardian_full_name",
          watch("temp_primary_guardian_full_name"),
        );
        setValue(
          "primary_guardian_email",
          watch("temp_primary_guardian_email"),
        );
        setValue(
          "primary_guardian_address",
          watch("temp_primary_guardian_address"),
        );
        setValue(
          "primary_guardian_phone_number",
          watch("temp_primary_guardian_phone_number"),
        );
        setValue(
          "primary_trustee_guardian_relation",
          watch("temp_primary_trustee_guardian_relation"),
        );
        const personDetalis = {
          id: uuidv4(),
          full_Name: watch("temp_primary_guardian_full_name"),
          email: watch("temp_primary_guardian_email"),
          address: watch("temp_primary_guardian_address"),
          mobile: watch("temp_primary_guardian_phone_number"),
          primary_trustee_child_relation: watch(
            "temp_primary_trustee_guardian_relation",
          ),
        };
        Agents_details.append(personDetalis);
      } else {
        setValue(
          "backup_guardian_full_name",
          watch("temp_backup_guardian_full_name"),
        );
        setValue("backup_guardian_email", watch("temp_backup_guardian_email"));
        setValue(
          "backup_guardian_address",
          watch("temp_backup_guardian_address"),
        );
        setValue(
          "backup_guardian_phone_number",
          watch("temp_backup_guardian_phone_number"),
        );
        setValue(
          "backup_trustee_guardian_relation",
          watch("temp_backup_trustee_guardian_relation"),
        );
        const personDetalis = {
          id: uuidv4(),
          full_Name: watch("temp_backup_guardian_full_name"),
          email: watch("temp_backup_guardian_email"),
          address: watch("temp_backup_guardian_address"),
          mobile: watch("temp_backup_guardian_phone_number"),
          primary_trustee_child_relation: watch(
            "temp_backup_trustee_guardian_relation",
          ),
        };
        Agents_details.append(personDetalis);
      }
      emptyFieldValues();
      setOpenAddTrustee(false);
      handleClose();
    }
  };

  const handleCancelGuardian = () => {
    if (isPrimary) {
      setValue("temp_primary_guardian_modal_open", false);
    } else {
      setValue("temp_backup_guardian_modal_open", false);
    }
    emptyFieldValues();
    setOpenAddTrustee(false);
  };

  const changeAgent = (index: number) => {
    const Agent: any = watch("Agents_details")[index];
    if (!isPrimary) {
      setValue("backup_guardian_id", Agent?.id);
      setValue("backup_guardian_full_name", Agent.full_Name);
      setValue("backup_guardian_email", Agent.email);
      setValue("backup_guardian_age", Agent.age);
      setValue("backup_guardian_phone_number", Agent.mobile);
      setValue(
        "backup_trustee_guardian_relation",
        Agent.primary_trustee_child_relation,
      );
      setValue("backup_guardian_address", Agent.address);
      setSelected(index);
      // if (Agent.full_Name !== watch("primary_guardian_full_name")) {
      // } else {
      //   toast.error("Please select different person");
      // }
    } else {
      setValue("primary_guardian_id", Agent?.id);
      setValue("primary_guardian_full_name", Agent.full_Name);
      setValue("primary_guardian_email", Agent.email);
      setValue("primary_guardian_age", Agent.age);
      setValue("primary_guardian_phone_number", Agent.mobile);
      setValue(
        "primary_trustee_guardian_relation",
        Agent.primary_trustee_child_relation,
      );
      setValue("primary_guardian_address", Agent.address);
      setSelected(index);
      // if (Agent.full_Name !== watch("backup_guardian_full_name")) {
      // } else {
      //   toast.error("Please select different person");
      // }
    }
    handleClose();
  };

  useEffect(() => {
    handleSelectedChildIndex();
  }, [open]);

  const handleSelectedChildIndex = () => {
    setSelected(undefined);
    if (isPrimary) {
      watch("Agents_details").forEach((agent: any, index: number) => {
        if (
          agent.full_Name === watch("primary_guardian_full_name") &&
          agent.primary_trustee_child_relation ===
          watch("primary_trustee_guardian_relation")
        ) {
          setSelected(index);
        }
      });
    } else {
      watch("Agents_details").forEach((agent: any, index: number) => {
        if (
          agent.full_Name === watch("backup_guardian_full_name") &&
          agent.primary_trustee_child_relation ===
          watch("backup_trustee_guardian_relation")
        ) {
          setSelected(index);
        }
      });
    }
  };

  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "700px" }} height="auto" //minHeight={{ xs: "80%", md: "100px" }}
        open={open}
        handleClose={handleClose}
      >
        <Box>
          <Typography sx={{ mb: 2 }} variant="h2">
            {title || "Add"}
            <RecommendedChip />
          </Typography>
          {watch("Agents_details")?.map((agent: any, index: number) => (
            <Box
              key={index}
              onClick={() => changeAgent(index)}
              sx={{
                background: (theme) =>
                  index === selected
                    ? theme.palette.primary.main
                    : theme.additionalColors?.formInputBg,
                height: "45px",
                px: 2,
                mt: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  color: (theme) =>
                    index === selected
                      ? theme.palette.text.secondary
                      : theme.palette.text.disabled,
                }}
                variant="h3"
              >
                {`${index + 1} - ${agent.full_Name}, ${TrusteeChildRealtionEnum[
                  agent.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                ]
                  ? TrusteeChildRealtionEnum[
                  agent.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                  ]
                  : TrusteeRealtionWithPersonEnum[
                  agent.primary_trustee_child_relation as keyof typeof TrusteeRealtionWithPersonEnum
                  ]
                  } `}
              </Typography>

              {!agent?.is_child && (
                <BorderColorTwoToneIcon
                  color="primary"
                  onClick={() => {
                    setEditTrusteeId(index);
                    setOpenEditTrustee(true);
                  }}
                  sx={{
                    background: (theme) =>
                      theme.additionalColors?.background.tertiary,
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "26px",
                    p: "4px",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: "15px", flexDirection: { xs: "column", md: "row" } }}>
          <Button
            onClick={handleAddTrusteeOpen}
            variant="contained"
            sx={{
              background: (theme) => theme.additionalColors?.lightBlue,
              boxShadow: "none",
              color: (theme) => theme.palette.text.primary,
              width: { xs: "100%", md: "200px" },
              height: "45px",
              fontWeight: "600",
              fontSize: "14px",
              textTransform: "capitalize",
              ":hover": {
                background: (theme) => theme.additionalColors?.lightBlue,
              },
            }}
          >
            <Add sx={{ mr: 1 }} />
            Add Guardian
          </Button>
          <Button
            sx={{
              height: "44px",
              width: { xs: "100%", md: "150px" },
              background: (theme) => theme.additionalColors?.button.cancelbg,
              color: (theme) => theme.additionalColors?.button.canceltext,
              borderRadius: "5px",
              padding: "12px 45px",
              fontSize: "18px",
              fontFamily: "Roboto",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            onClick={() => {
              handleClose();
              handleCancelGuardian();
            }}
          >
            Cancel
          </Button>
        </Box>
      </CustomModal>
      <CustomModal
        width={{ xs: "100%", sm: "700px" }} height="auto"
        open={openAddTrustee}
        handleClose={handleAddTrusteeClose}
      >
        <Box>
          <Typography sx={{}} variant="h2">
            {secondryTitle}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_guardian_full_name"
                  : "temp_backup_guardian_full_name"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label="Full Name"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_guardian_email"
                  : "temp_backup_guardian_email"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label="Email (Optional)"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_guardian_phone_number"
                  : "temp_backup_guardian_phone_number"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PhoneNumberField
                  {...field}
                  {...renderFieldProps(error)}
                  label="Mobile (Optional)"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_trustee_guardian_relation"
                  : "temp_backup_trustee_guardian_relation"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={`For ${watch("primary_trustee_first_name")} ${watch(
                    "primary_trustee_last_name",
                  )} this person is`}
                  select
                  sx={{ flexBasis: "30%" }}
                >
                  {(
                    Object.keys(TrusteeRealtionWithPersonEnum) as Array<
                      keyof typeof TrusteeRealtionWithPersonEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {TrusteeRealtionWithPersonEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_guardian_address"
                  : "temp_backup_guardian_address"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                // />
                <GoogleMaps>
                  <GoogleMaps.AutoComplete
                    name={
                      isPrimary
                        ? "temp_primary_guardian_address"
                        : "temp_backup_guardian_address"
                    }
                    onAddressChange={(autoAddress: any) => {
                      isPrimary
                        ? setValue("temp_primary_guardian_address", autoAddress)
                        : setValue("temp_backup_guardian_address", autoAddress);
                    }}
                    label="Full address (street, City, State, Zipcode)"
                  />
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </GoogleMaps>
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "-18px" }}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_guardians_agent_age"
                  : "temp_backup_guardians_agent_age"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomCheckBox
                    {...field}
                    setChecked={(value) => {
                      isPrimary
                        ? setValue("temp_primary_guardians_agent_age", value)
                        : setValue("temp_backup_guardians_agent_age", value);
                    }}
                    checked={
                      isPrimary
                        ? watch("temp_primary_guardians_agent_age")
                        : watch("temp_backup_guardians_agent_age")
                    }
                    type="SQUARE"
                  >
                    <Typography>This person is over the age of 18 </Typography>
                  </CustomCheckBox>
                  {error?.message && (
                    <Box sx={{ p: { marginTop: "-13px" } }}>
                      <CustomErrorMessage error={error?.message ?? {}} />
                    </Box>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* use color from theme and make comp */}
          <Button
            variant="contained"
            sx={{
              mr: 1,
              height: "45px",
              background: "#FFC9C8",
              color: "#EF5E5A",
              boxShadow: "none",
              ":hover": {
                background: "#FFC9C8",
              },
            }}
            onClick={handleCancelGuardian}
          >
            Cancel
          </Button>
          <Button
            sx={{
              background: (theme) => theme.additionalColors?.lightBlue,
              color: (theme) => theme.palette.text.primary,
              boxShadow: "none",
              height: "45px",
              fontSize: "16px",
              textTransform: "capitalize",
              ":hover": {
                background: (theme) => theme.additionalColors?.lightBlue,
              },
            }}
            variant="contained"
            onClick={handleAddGuardian}
          >
            Add Guardian
          </Button>
        </Box>
      </CustomModal>
      {openEditTrustee && (
        <EditAgent
          open={openEditTrustee}
          handleClose={handleEditTrusteeClose}
          AgentId={EditTrustee}
        />
      )}
    </>
  );
};

export default AddTrustee;
