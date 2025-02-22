import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomModal from "@/components/CustomModal";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import {
  TrusteeBothRealtionWithPersonEnum,
  TrusteeChildBothRealtionEnum,
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
  forSecondaryTrustee?: boolean;
  isPrimary: boolean;
}

const AddTrustee = ({
  open,
  handleClose,
  title,
  secondryTitle,
  forSecondaryTrustee,
  isPrimary,
}: IAddTrustProps) => {
  const { watch, setValue, control, trigger } = useFormContext();
  const [openAddTrustee, setOpenAddTrustee] = useState(false);
  const [openEditTrustee, setOpenEditTrustee] = useState(false);
  const [EditTrustee, setEditTrusteeId] = useState<number | undefined>(
    undefined,
  );
  const [selectedAgent, setSelectedAgent] = useState<number | undefined>(
    undefined,
  );

  const Agents_details = useFieldArray({
    control,
    name: "Agents_details",
  });

  const emptyFieldValues = () => {
    setValue("temp_primary_health_agent_modal_open", false);
    setValue("temp_primary_health_agent_full_name", "");
    setValue("temp_primary_health_agent_email", "");
    setValue("temp_primary_health_agent_address", null);
    setValue("temp_primary_health_agent_phone_number", "");
    setValue("temp_primary_trustee_health_agent_relation", "");
    setValue("temp_secondary_trustee_health_agent_relation_primary", "");
    setValue("temp_secondary_primary_health_agent_relation_primary", "");

    setValue("temp_backup_health_agent_modal_open", false);
    setValue("temp_backup_health_agent_full_name", "");
    setValue("temp_backup_health_agent_email", "");
    setValue("temp_backup_health_agent_address", null);
    setValue("temp_backup_health_agent_phone_number", "");
    setValue("temp_backup_trustee_health_agent_relation", "");
    setValue("temp_secondary_trustee_health_agent_relation_backup", "");
    setValue("temp_secondary_primary_health_agent_relation_backup", "");
  };

  const handleAddTrusteeOpen = () => {
    if (isPrimary) {
      setValue("temp_primary_health_agent_modal_open", true);
    } else {
      setValue("temp_backup_health_agent_modal_open", true);
    }
    setOpenAddTrustee(true);
  };

  const handleAddTrusteeClose = () => {
    setOpenAddTrustee(false);
  };
  const handleEditTrusteeClose = () => {
    setOpenEditTrustee(false);
  };
  const handleAddHealthAgent = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (forSecondaryTrustee) {
        if (isPrimary) {
          setValue(
            "primary_health_agent_full_name_secondary_trustee",
            watch("temp_primary_health_agent_full_name"),
          );
          setValue(
            "primary_health_agent_email_secondary_trustee",
            watch("temp_primary_health_agent_email"),
          );
          setValue(
            "primary_health_agent_address_secondary_trustee",
            watch("temp_primary_health_agent_address"),
          );
          setValue(
            "primary_health_agent_phone_number_secondary_trustee",
            watch("temp_primary_health_agent_phone_number"),
          );
          setValue(
            "primary_trustee_health_agent_relation_secondary_trustee",
            watch("temp_primary_trustee_health_agent_relation"),
          );
          setValue(
            "secondary_trustee_health_agent_relation_primary_secondary_trustee",
            watch("temp_secondary_trustee_health_agent_relation_primary"),
          );
          setValue(
            "secondary_primary_health_agent_relation_primary_secondary_trustee",
            watch("temp_secondary_primary_health_agent_relation_primary"),
          );
          const personDetalis = {
            id: uuidv4(),
            full_Name: watch("temp_primary_health_agent_full_name"),
            email: watch("temp_primary_health_agent_email"),
            address: watch("temp_primary_health_agent_address"),
            mobile: watch("temp_primary_health_agent_phone_number"),
            primary_trustee_child_relation: watch(
              "temp_primary_trustee_health_agent_relation",
            ),
            secondary_trustee_child_relation: watch(
              "temp_secondary_trustee_health_agent_relation_primary",
            ),
            secondary_primary_child_relation: watch(
              "temp_secondary_primary_health_agent_relation_primary",
            ),
          };
          Agents_details.append(personDetalis);
        } else {
          setValue(
            "backup_health_agent_full_name_secondary_trustee",
            watch("temp_backup_health_agent_full_name"),
          );
          setValue(
            "backup_health_agent_email_secondary_trustee",
            watch("temp_backup_health_agent_email"),
          );
          setValue(
            "backup_health_agent_address_secondary_trustee",
            watch("temp_backup_health_agent_address"),
          );
          setValue(
            "backup_health_agent_phone_number_secondary_trustee",
            watch("temp_backup_health_agent_phone_number"),
          );
          setValue(
            "backup_trustee_health_agent_relation_secondary_trustee",
            watch("temp_backup_trustee_health_agent_relation"),
          );
          setValue(
            "secondary_trustee_health_agent_relation_backup_secondary_trustee",
            watch("temp_secondary_trustee_health_agent_relation_backup"),
          );
          setValue(
            "secondary_primary_health_agent_relation_backup_secondary_trustee",
            watch("temp_secondary_primary_health_agent_relation_backup"),
          );
          const personDetalis = {
            id: uuidv4(),
            full_Name: watch("temp_backup_health_agent_full_name"),
            email: watch("temp_backup_health_agent_email"),
            address: watch("temp_backup_health_agent_address"),
            mobile: watch("temp_backup_health_agent_phone_number"),
            primary_trustee_child_relation: watch(
              "temp_backup_trustee_health_agent_relation",
            ),
            secondary_trustee_child_relation: watch(
              "temp_secondary_trustee_health_agent_relation_backup",
            ),
            secondary_primary_child_relation: watch(
              "temp_secondary_primary_health_agent_relation_backup",
            ),
          };
          Agents_details.append(personDetalis);
        }
      } else {
        if (isPrimary) {
          setValue(
            "primary_health_agent_full_name",
            watch("temp_primary_health_agent_full_name"),
          );
          setValue(
            "primary_health_agent_email",
            watch("temp_primary_health_agent_email"),
          );
          setValue(
            "primary_health_agent_address",
            watch("temp_primary_health_agent_address"),
          );
          setValue(
            "primary_health_agent_phone_number",
            watch("temp_primary_health_agent_phone_number"),
          );
          setValue(
            "primary_trustee_health_agent_relation",
            watch("temp_primary_trustee_health_agent_relation"),
          );
          setValue(
            "secondary_trustee_health_agent_relation_primary",
            watch("temp_secondary_trustee_health_agent_relation_primary"),
          );
          setValue(
            "secondary_primary_health_agent_relation_primary",
            watch("temp_secondary_primary_health_agent_relation_primary"),
          );
          const personDetalis = {
            id: uuidv4(),
            full_Name: watch("temp_primary_health_agent_full_name"),
            email: watch("temp_primary_health_agent_email"),
            address: watch("temp_primary_health_agent_address"),
            mobile: watch("temp_primary_health_agent_phone_number"),
            primary_trustee_child_relation: watch(
              "temp_primary_trustee_health_agent_relation",
            ),
            secondary_trustee_child_relation: watch(
              "temp_secondary_trustee_health_agent_relation_primary",
            ),
            secondary_primary_child_relation: watch(
              "temp_secondary_primary_health_agent_relation_primary",
            ),
          };
          Agents_details.append(personDetalis);
        } else {
          setValue(
            "backup_health_agent_full_name",
            watch("temp_backup_health_agent_full_name"),
          );
          setValue(
            "backup_health_agent_email",
            watch("temp_backup_health_agent_email"),
          );
          setValue(
            "backup_health_agent_address",
            watch("temp_backup_health_agent_address"),
          );
          setValue(
            "backup_health_agent_phone_number",
            watch("temp_backup_health_agent_phone_number"),
          );
          setValue(
            "backup_trustee_health_agent_relation",
            watch("temp_backup_trustee_health_agent_relation"),
          );
          setValue(
            "secondary_trustee_health_agent_relation_backup",
            watch("temp_secondary_trustee_health_agent_relation_backup"),
          );
          setValue(
            "secondary_primary_health_agent_relation_backup",
            watch("temp_secondary_primary_health_agent_relation_backup"),
          );
          const personDetalis = {
            id: uuidv4(),
            full_Name: watch("temp_backup_health_agent_full_name"),
            email: watch("temp_backup_health_agent_email"),
            address: watch("temp_backup_health_agent_address"),
            mobile: watch("temp_backup_health_agent_phone_number"),
            primary_trustee_child_relation: watch(
              "temp_backup_trustee_health_agent_relation",
            ),
            secondary_trustee_child_relation: watch(
              "temp_secondary_trustee_health_agent_relation_backup",
            ),
            secondary_primary_child_relation: watch(
              "temp_secondary_primary_health_agent_relation_backup",
            ),
          };
          Agents_details.append(personDetalis);
        }
      }
      emptyFieldValues();
      setOpenAddTrustee(false);
      handleClose();
    }
  };

  const handleCancelHealthAgent = () => {
    if (isPrimary) {
      setValue("temp_primary_health_agent_modal_open", false);
    } else {
      setValue("temp_backup_health_agent_modal_open", false);
    }
    emptyFieldValues();
    setOpenAddTrustee(false);
  };

  const changeAgent = (index: number) => {
    const Agent: any = watch("Agents_details")[index];
    setSelectedAgent(undefined);
    if (!forSecondaryTrustee) {
      if (!isPrimary) {
        setValue("backup_health_agent_id", Agent?.id);
        setValue("backup_health_agent_full_name", Agent.full_Name);
        setValue("backup_health_agent_email", Agent.email);
        setValue("backup_health_agent_phone_number", Agent.mobile);
        setValue(
          "backup_trustee_health_agent_relation",
          Agent.primary_trustee_child_relation,
        );
        setValue(
          "secondary_trustee_health_agent_relation_backup",
          Agent.secondary_trustee_child_relation,
        );
        setValue(
          "secondary_primary_health_agent_relation_backup",
          Agent.secondary_primary_child_relation,
        );
        setValue("backup_health_agent_address", Agent.address);
        setSelectedAgent(index);
        // if (Agent.full_Name !== watch("primary_health_agent_full_name")) {
        // } else {
        //   toast.error("Please select different person");
        // }
      } else {
        setValue("primary_health_agent_id", Agent?.id);
        setValue("primary_health_agent_full_name", Agent.full_Name);
        setValue("primary_health_agent_email", Agent.email);
        setValue("primary_health_agent_phone_number", Agent.mobile);
        setValue(
          "primary_trustee_health_agent_relation",
          Agent.primary_trustee_child_relation,
        );
        setValue(
          "secondary_trustee_health_agent_relation_primary",
          Agent.secondary_trustee_child_relation,
        );
        setValue(
          "secondary_primary_health_agent_relation_primary",
          Agent.secondary_primary_child_relation,
        );
        setValue("primary_health_agent_address", Agent.address);
        setSelectedAgent(index);
        // if (Agent.full_Name !== watch("backup_health_agent_full_name")) {
        // } else {
        //   toast.error("Please select different person");
        // }
      }
    } else {
      if (!isPrimary) {
        setValue(
          "backup_health_agent_full_name_secondary_trustee",
          Agent.full_Name,
        );
        setValue("backup_health_agent_email_secondary_trustee", Agent.email);
        setValue(
          "backup_health_agent_phone_number_secondary_trustee",
          Agent.mobile,
        );
        setValue(
          "backup_trustee_health_agent_relation_secondary_trustee",
          Agent.primary_trustee_child_relation,
        );
        setValue(
          "secondary_trustee_health_agent_relation_backup_secondary_trustee",
          Agent.secondary_trustee_child_relation,
        );
        setValue(
          "secondary_primary_health_agent_relation_backup_secondary_trustee",
          Agent.secondary_primary_child_relation,
        );
        setValue(
          "backup_health_agent_address_secondary_trustee",
          Agent.address,
        );
        setSelectedAgent(index);
        // if (
        //   Agent.full_Name !==
        //   watch("primary_health_agent_full_name_secondary_trustee")
        // ) {
        // } else {
        //   toast.error("Please select different person");
        // }
      } else {
        setValue(
          "primary_health_agent_full_name_secondary_trustee",
          Agent.full_Name,
        );
        setValue("primary_health_agent_email_secondary_trustee", Agent.email);
        setValue(
          "primary_health_agent_phone_number_secondary_trustee",
          Agent.mobile,
        );
        setValue(
          "primary_trustee_health_agent_relation_secondary_trustee",
          Agent.primary_trustee_child_relation,
        );
        setValue(
          "secondary_trustee_health_agent_relation_primary_secondary_trustee",
          Agent.secondary_trustee_child_relation,
        );
        setValue(
          "secondary_primary_health_agent_relation_primary_secondary_trustee",
          Agent.secondary_primary_child_relation,
        );
        setValue(
          "primary_health_agent_address_secondary_trustee",
          Agent.address,
        );
        setSelectedAgent(index);
        // if (
        //   Agent.full_Name !==
        //   watch("backup_health_agent_full_name_secondary_trustee")
        // ) {
        // } else {
        //   toast.error("Please select different person");
        // }
      }
    }

    handleClose();
  };

  useEffect(() => {
    handleSelectedChildIndex();
  }, [open]);

  const handleSelectedChildIndex = () => {
    setSelectedAgent(undefined);
    if (forSecondaryTrustee) {
      if (isPrimary) {
        watch("Agents_details").forEach((agent: any, index: number) => {
          if (
            agent.full_Name ===
            watch("primary_health_agent_full_name_secondary_trustee") &&
            agent.secondary_primary_child_relation ===
            watch(
              "secondary_primary_health_agent_relation_primary_secondary_trustee",
            )
          ) {
            setSelectedAgent(index);
          }
        });
      } else {
        watch("Agents_details").forEach((agent: any, index: number) => {
          if (
            agent.full_Name ===
            watch("backup_health_agent_full_name_secondary_trustee") &&
            agent.secondary_primary_child_relation ===
            watch(
              "secondary_primary_health_agent_relation_backup_secondary_trustee",
            )
          ) {
            setSelectedAgent(index);
          }
        });
      }
    } else {
      if (isPrimary) {
        watch("Agents_details").forEach((agent: any, index: number) => {
          if (
            agent.full_Name === watch("primary_health_agent_full_name") &&
            agent.secondary_primary_child_relation ===
            watch("secondary_primary_health_agent_relation_primary")
          ) {
            setSelectedAgent(index);
          }
        });
      } else {
        watch("Agents_details").forEach((agent: any, index: number) => {
          if (
            agent.full_Name === watch("backup_health_agent_full_name") &&
            agent.secondary_primary_child_relation ===
            watch("secondary_primary_health_agent_relation_backup")
          ) {
            setSelectedAgent(index);
          }
        });
      }
    }
  };

  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "600px" }} height="auto" // minHeight={{ xs: "80%", md: "100px" }}
        open={open}
        handleClose={handleClose}
      >
        <Box>
          <Typography sx={{ mb: 2 }} variant="h2">
            {title || "Add"} <RecommendedChip />
          </Typography>
          {watch("Agents_details")?.map((agent: any, index: number) => (
            <Box
              key={index}
              onClick={() => changeAgent(index)}
              sx={{
                background: (theme) =>
                  index === selectedAgent
                    ? theme.palette.primary.main
                    : theme.additionalColors?.formInputBg,
                height: "45px",
                px: 2,
                mt: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                cursor: "pointer",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: (theme) =>
                    index === selectedAgent
                      ? theme.palette.text.secondary
                      : theme.palette.text.disabled,
                }}
                variant="h3"
              >
                {`${index + 1} - ${agent.full_Name}, ${TrusteeChildBothRealtionEnum[
                  agent.secondary_primary_child_relation as keyof typeof TrusteeChildBothRealtionEnum
                ]
                  ? TrusteeChildBothRealtionEnum[
                  agent.secondary_primary_child_relation as keyof typeof TrusteeChildBothRealtionEnum
                  ]
                  : TrusteeBothRealtionWithPersonEnum[
                  agent.secondary_primary_child_relation as keyof typeof TrusteeBothRealtionWithPersonEnum
                  ]
                  }`}
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
              width: { xs: "100%", md: "190px" },
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
            Add Health agent
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
              handleCancelHealthAgent();
            }}
          >
            Cancel
          </Button>
        </Box>
      </CustomModal>
      <CustomModal
        width={{ xs: "100%", sm: "700px" }}
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
                  ? "temp_primary_health_agent_full_name"
                  : "temp_backup_health_agent_full_name"
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
                  ? "temp_primary_health_agent_email"
                  : "temp_backup_health_agent_email"
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
                  ? "temp_primary_health_agent_phone_number"
                  : "temp_backup_health_agent_phone_number"
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
                  ? "temp_primary_trustee_health_agent_relation"
                  : "temp_backup_trustee_health_agent_relation"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={`For ${watch("primary_trustee_first_name")} ${watch(
                    "primary_trustee_last_name",
                  )} this person is`}
                  tooltipText={`For ${watch(
                    "primary_trustee_first_name",
                  )} ${watch("primary_trustee_last_name")} this person is`}
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
          <Grid item xs={12} md={4}>
            <Controller
              name={
                isPrimary
                  ? "temp_secondary_trustee_health_agent_relation_primary"
                  : "temp_secondary_trustee_health_agent_relation_backup"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={`For ${watch("secondary_trustee_first_name")} ${watch(
                    "secondary_trustee_last_name",
                  )} this person is`}
                  tooltipText={`For ${watch(
                    "secondary_trustee_first_name",
                  )} ${watch("secondary_trustee_last_name")} this person is`}
                  select
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
          <Grid item xs={12} md={4}>
            <Controller
              name={
                isPrimary
                  ? "temp_secondary_primary_health_agent_relation_primary"
                  : "temp_secondary_primary_health_agent_relation_backup"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={"For both of us this person is"}
                  select
                >
                  {(
                    Object.keys(TrusteeBothRealtionWithPersonEnum) as Array<
                      keyof typeof TrusteeBothRealtionWithPersonEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {TrusteeBothRealtionWithPersonEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_health_agent_address"
                  : "temp_backup_health_agent_address"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <GoogleMaps>
                  <GoogleMaps.AutoComplete
                    name={
                      isPrimary
                        ? "temp_primary_health_agent_address"
                        : "temp_backup_health_agent_address"
                    }
                    onAddressChange={(autoAddress: any) => {
                      isPrimary
                        ? setValue(
                          "temp_primary_health_agent_address",
                          autoAddress,
                        )
                        : setValue(
                          "temp_backup_health_agent_address",
                          autoAddress,
                        );
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
                  ? "temp_primary_health_agent_age"
                  : "temp_backup_health_agent_age"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomCheckBox
                    {...field}
                    setChecked={(value) => {
                      isPrimary
                        ? setValue("temp_primary_health_agent_age", value)
                        : setValue("temp_backup_health_agent_age", value);
                    }}
                    checked={
                      isPrimary
                        ? watch("temp_primary_health_agent_age")
                        : watch("temp_backup_health_agent_age")
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: { xs: "column-reverse", md: "row", gap: "5px" } }}>
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
            onClick={handleCancelHealthAgent}
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
            onClick={handleAddHealthAgent}
          >
            Add Health agent
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
