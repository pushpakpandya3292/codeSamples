import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import CustomModal from "@/components/CustomModal";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import {
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
} from "../../../constants";
import CustomCheckBox from "@/components/CustomCheckBox";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EditAgent from "../EditAgents";
import { v4 as uuidv4 } from "uuid";
import RecommendedChip from "@/components/RecommendedChip";

interface IAddTrustProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  secondryTitle?: string;
  isPrimary: boolean;
}
interface IPersonalAgentProps {
  id: string;
  full_Name: string;
  email: string;
  address: string;
  mobile: string;
  primary_trustee_child_relation: string;
}

const AddTrustee = ({
  open,
  handleClose,
  title,
  secondryTitle,
  isPrimary,
}: IAddTrustProps) => {
  const { watch, setValue, control, trigger } = useFormContext();
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [openAddTrustee, setOpenAddTrustee] = useState(false);
  const [openEditTrustee, setOpenEditTrustee] = useState(false);
  const [EditTrustee, setEditTrusteeId] = useState<number | undefined>(
    undefined,
  );
  const Agents_details = useFieldArray({
    control,
    name: "Agents_details",
  });
  const emptyFieldValues = () => {
    setValue("temp_primary_successor_modal_open", false);
    setValue("temp_primary_successor_full_name", "");
    setValue("temp_primary_successor_email", "");
    setValue("temp_primary_successor_address", null);
    setValue("temp_primary_successor_phone_number", "");
    setValue("temp_primary_trustee_successor_relation", "");

    setValue("temp_backup_successor_modal_open", false);
    setValue("temp_backup_successor_full_name", "");
    setValue("temp_backup_successor_email", "");
    setValue("temp_backup_successor_address", null);
    setValue("temp_backup_successor_phone_number", "");
    setValue("temp_backup_trustee_successor_relation", "");
  };

  const addPeople = (data: IPersonalAgentProps, type: string) => {
    const child = data as IPersonalAgentProps;
    if (type === "PRIMARY") {
      //////////////////////
      // for Health Agent //
      //////////////////////
      setValue("primary_health_agent_id", child?.id);
      setValue("primary_health_agent_full_name", child.full_Name);
      setValue("primary_health_agent_email", child.email);
      setValue("primary_health_agent_phone_number", child.mobile);
      setValue(
        "primary_trustee_health_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue("primary_health_agent_address", child.address);
      //////////////////////
      // for Health Agent //
      //////////////////////
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      setValue("primary_financial_agent_id", child?.id);
      setValue("primary_financial_agent_full_name", child.full_Name);
      setValue("primary_financial_agent_email", child.email);
      setValue("primary_financial_agent_phone_number", child.mobile);
      setValue(
        "primary_trustee_financial_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue("primary_financial_agent_address", child.address);
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
      setValue("primary_guardian_id", child?.id);
      setValue("primary_guardian_full_name", child.full_Name);
      setValue("primary_guardian_email", child.email);
      setValue("primary_guardian_phone_number", child.mobile);
      setValue(
        "primary_trustee_guardian_relation",
        child.primary_trustee_child_relation,
      );
      setValue("primary_guardian_address", child.address);
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
    }
    if (type === "SECONDARY") {
      //////////////////////
      // for Health Agent //
      //////////////////////
      setValue("backup_health_agent_id", child?.id);
      setValue("backup_health_agent_full_name", child.full_Name);
      setValue("backup_health_agent_email", child.email);
      setValue("backup_health_agent_phone_number", child.mobile);
      setValue(
        "backup_trustee_health_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue("backup_health_agent_address", child.address);
      //////////////////////
      // for Health Agent //
      //////////////////////
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      setValue("backup_financial_agent_id", child?.id);
      setValue("backup_financial_agent_full_name", child.full_Name);
      setValue("backup_financial_agent_email", child.email);
      setValue("backup_financial_agent_phone_number", child.mobile);
      setValue(
        "backup_trustee_financial_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue("backup_financial_agent_address", child.address);
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
      setValue("backup_guardian_id", child?.id);
      setValue("backup_guardian_full_name", child.full_Name);
      setValue("backup_guardian_email", child.email);
      setValue("backup_guardian_phone_number", child.mobile);
      setValue(
        "backup_trustee_guardian_relation",
        child.primary_trustee_child_relation,
      );
      setValue("backup_guardian_address", child.address);
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
    }
  };

  const handleAddTrusteeOpen = () => {
    if (isPrimary) {
      setValue("temp_primary_successor_modal_open", true);
    } else {
      setValue("temp_backup_successor_modal_open", true);
    }
    setOpenAddTrustee(true);
  };
  const handleEditTrusteeClose = () => {
    setOpenEditTrustee(false);
  };
  const handleAddTrusteeClose = () => {
    setOpenAddTrustee(false);
  };

  const handleAddSuccessor = async () => {
    const isValid = await trigger();
    if (isValid) {
      const id = uuidv4();
      if (isPrimary) {
        setValue("primary_successor_id", id);
        setValue(
          "primary_successor_full_name",
          watch("temp_primary_successor_full_name"),
        );
        setValue(
          "primary_successor_email",
          watch("temp_primary_successor_email"),
        );
        setValue(
          "primary_successor_address",
          watch("temp_primary_successor_address"),
        );
        setValue(
          "primary_successor_phone_number",
          watch("temp_primary_successor_phone_number"),
        );
        setValue(
          "primary_trustee_successor_relation",
          watch("temp_primary_trustee_successor_relation"),
        );
        const personDetalis = {
          id: id,
          full_Name: watch("temp_primary_successor_full_name"),
          email: watch("temp_primary_successor_email"),
          address: watch("temp_primary_successor_address"),
          mobile: watch("temp_primary_successor_phone_number"),
          primary_trustee_child_relation: watch(
            "temp_primary_trustee_successor_relation",
          ),
        };
        addPeople(personDetalis, "PRIMARY");
        Agents_details.append(personDetalis);
      } else {
        setValue("backup_successor_id", id);
        setValue(
          "backup_successor_full_name",
          watch("temp_backup_successor_full_name"),
        );
        setValue(
          "backup_successor_email",
          watch("temp_backup_successor_email"),
        );
        setValue(
          "backup_successor_address",
          watch("temp_backup_successor_address"),
        );
        setValue(
          "backup_successor_phone_number",
          watch("temp_backup_successor_phone_number"),
        );
        setValue(
          "backup_trustee_successor_relation",
          watch("temp_backup_trustee_successor_relation"),
        );
        const personDetalis = {
          id: id,
          full_Name: watch("temp_backup_successor_full_name"),
          email: watch("temp_backup_successor_email"),
          address: watch("temp_backup_successor_address"),
          mobile: watch("temp_backup_successor_phone_number"),
          primary_trustee_child_relation: watch(
            "temp_backup_trustee_successor_relation",
          ),
        };
        addPeople(personDetalis, "SECONDARY");
        Agents_details.append(personDetalis);
      }
      emptyFieldValues();
      setOpenAddTrustee(false);
      handleClose();
    }
  };

  const handleCancelSuccessor = () => {
    if (isPrimary) {
      setValue("temp_primary_successor_modal_open", false);
    } else {
      setValue("temp_backup_successor_modal_open", false);
    }
    emptyFieldValues();
    setOpenAddTrustee(false);
  };

  const changeAgent = (index: number) => {
    const Agent: any = watch("Agents_details")[index];
    if (!isPrimary) {
      setValue("backup_successor_id", Agent?.id);
      setValue("backup_successor_full_name", Agent.full_Name);
      setValue("backup_successor_email", Agent.email);
      setValue("backup_successor_age", Agent.age);
      setValue("backup_successor_phone_number", Agent.mobile);
      setValue(
        "backup_trustee_successor_relation",
        Agent.primary_trustee_child_relation,
      );

      setValue("backup_successor_address", Agent.address);
      addPeople(Agent, "SECONDARY");
      setSelected(index);
      // if (Agent.full_Name !== watch("primary_successor_full_name")) {
      // } else {
      //   toast.error("Please select different person");
      // }
    } else {
      setValue("primary_successor_id", Agent?.id);
      setValue("primary_successor_full_name", Agent.full_Name);
      setValue("primary_successor_email", Agent.email);
      setValue("primary_successor_age", Agent.age);
      setValue("primary_successor_phone_number", Agent.mobile);
      setValue(
        "primary_trustee_successor_relation",
        Agent.primary_trustee_child_relation,
      );
      setValue("primary_successor_address", Agent.address);
      addPeople(Agent, "PRIMARY");
      setSelected(index);
      // if (Agent.full_Name !== watch("backup_successor_full_name")) {
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
      watch("Agents_details").forEach((child: any, index: number) => {
        if (
          child.full_Name === watch("primary_successor_full_name") &&
          child.primary_trustee_child_relation ===
            watch("primary_trustee_successor_relation")
        ) {
          setSelected(index);
        }
      });
    } else {
      watch("Agents_details").forEach((child: any, index: number) => {
        if (
          child.full_Name === watch("backup_successor_full_name") &&
          child.primary_trustee_child_relation ===
            watch("backup_trustee_successor_relation")
        ) {
          setSelected(index);
        }
      });
    }
  };
  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "600px" }}
        height="auto" //minHeight={{ xs: "80%", md: "100px" }}
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
                  index === selected
                    ? theme.palette.primary.main
                    : theme.additionalColors?.formInputBg,
                height: "45px",
                px: 2,
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "5px",
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
                {`${index + 1} - ${agent.full_Name}, ${
                  TrusteeChildRealtionEnum[
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
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
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
              fontSize: "16px",
              textTransform: "capitalize",
              ":hover": {
                background: (theme) => theme.additionalColors?.lightBlue,
              },
            }}
          >
            <Add sx={{ mr: 1 }} />
            Add Successor
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
              handleCancelSuccessor();
            }}
          >
            Cancel
          </Button>
        </Box>
      </CustomModal>
      <CustomModal
        width={{ xs: "100%", sm: "700px" }}
        height="auto"
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
                  ? "temp_primary_successor_full_name"
                  : "temp_backup_successor_full_name"
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
                  ? "temp_primary_successor_email"
                  : "temp_backup_successor_email"
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
                  ? "temp_primary_successor_phone_number"
                  : "temp_backup_successor_phone_number"
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
                  ? "temp_primary_trustee_successor_relation"
                  : "temp_backup_trustee_successor_relation"
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
                  tooltipText={`For ${watch(
                    "primary_trustee_first_name",
                  )} ${watch("primary_trustee_last_name")} this person is`}
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
                  <Typography
                    sx={{
                      fontSize: "10px",
                      p: 1,
                      background: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    Go to previous step if you want to add child
                  </Typography>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_successor_address"
                  : "temp_backup_successor_address"
              }
              control={control}
              render={({ field, fieldState: { error } }) => {
                const { name, ...rest } = field;
                return (
                  <GoogleMaps>
                    <GoogleMaps.AutoComplete
                      name={
                        isPrimary
                          ? "temp_primary_successor_address"
                          : "temp_backup_successor_address"
                      }
                      onAddressChange={(autoAddress: any) => {
                        isPrimary
                          ? setValue(
                              "temp_primary_successor_address",
                              autoAddress,
                            )
                          : setValue(
                              "temp_backup_successor_address",
                              autoAddress,
                            );
                      }}
                      label="Full address (street, City, State, Zipcode)"
                      {...rest}
                    />
                    {error?.message && (
                      <CustomErrorMessage error={error?.message ?? {}} />
                    )}
                  </GoogleMaps>
                );
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "-18px" }}>
            <Controller
              name={
                isPrimary
                  ? "temp_primary_successor_age"
                  : "temp_backup_successor_age"
              }
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomCheckBox
                    {...field}
                    setChecked={(value) => {
                      isPrimary
                        ? setValue("temp_primary_successor_age", value)
                        : setValue("temp_backup_successor_age", value);
                    }}
                    checked={
                      isPrimary
                        ? watch("temp_primary_successor_age")
                        : watch("temp_backup_successor_age")
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
            onClick={handleCancelSuccessor}
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
            onClick={handleAddSuccessor}
          >
            Add Successor
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
