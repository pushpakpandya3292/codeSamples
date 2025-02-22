import CustomCheckBox from "@/components/CustomCheckBox";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import CustomModal from "@/components/CustomModal";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  TrusteeRealtionWithPersonEnum,
  TrusteeBothRealtionWithPersonEnum,
} from "../../../constants";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface IAddTrustProps {
  open: boolean;
  AgentId: number | undefined;
  handleClose: () => void;
  title?: string;
}
const phoneNumberPattern = /^\+\d{11}$/;
const validationSchema = Yup.object().shape({
  temp_agent_id: Yup.string().notRequired(),
  temp_agent_full_name: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  temp_agent_email: Yup.string().email("Invalid email format"),
  temp_agent_mobile: Yup.string()
    .test(
      "phone-number",
      "Invalid Phone Number",
      (value) => !value || phoneNumberPattern.test(value),
    )
    .notRequired(),
  temp_agent_primary_trustee_child_relation: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  temp_agent_secondary_trustee_child_relation: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  temp_agent_secondary_primary_child_relation: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  temp_agent_address: Yup.object()
    .required("This field is required")
    .typeError("This field is required"),
  edit_agent_trustee: Yup.boolean()
    .oneOf([true], "Age must be 18 or older")
    .required("Age must be 18 or older")
    .default(true),
});

function EditAgent({ open, handleClose, AgentId, title }: IAddTrustProps) {
  const {
    watch: parentWatch,
    setValue: parentSetValue,
    control: parentControl,
  } = useFormContext();
  const {
    formState: { errors: errors2 },
    handleSubmit,
    watch: editAgentWatch,
    setValue: agentEditSetValue,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const Agents_details = useFieldArray({
    control: parentControl,
    name: "Agents_details",
  });
  const [Agent, setAgent] = useState(
    AgentId !== undefined ? parentWatch("Agents_details")[AgentId] : null,
  );

  const editPeople = (personDetalis: any) => {
    //////////////////
    // for Succesor //
    //////////////////
    if (personDetalis.id === parentWatch("primary_successor_id")) {
      parentSetValue("primary_successor_id", personDetalis?.id);
      parentSetValue("primary_successor_full_name", personDetalis?.full_Name);
      parentSetValue("primary_successor_email", personDetalis?.email);
      parentSetValue("primary_successor_age", personDetalis?.age);
      parentSetValue("primary_successor_phone_number", personDetalis?.mobile);
      parentSetValue(
        "primary_trustee_successor_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_successor_relation_primary",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_successor_relation_primary",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue("primary_successor_address", personDetalis?.address);
    }
    //////////////////
    // for Succesor //
    //////////////////
    //////////////////////
    // for Health Agent //
    //////////////////////
    if (personDetalis.id === parentWatch("primary_health_agent_id")) {
      parentSetValue("primary_health_agent_id", personDetalis?.id);
      parentSetValue(
        "primary_health_agent_full_name",
        personDetalis?.full_Name,
      );
      parentSetValue("primary_health_agent_email", personDetalis?.email);
      parentSetValue("primary_health_agent_age", personDetalis?.age);
      parentSetValue(
        "primary_health_agent_phone_number",
        personDetalis?.mobile,
      );
      parentSetValue(
        "primary_trustee_health_agent_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_health_agent_relation_primary",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_health_agent_relation_primary",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue("primary_health_agent_address", personDetalis?.address);
      parentSetValue(
        "primary_health_agent_full_name_secondary_trustee",
        personDetalis?.full_Name,
      );
      parentSetValue(
        "primary_health_agent_email_secondary_trustee",
        personDetalis?.email,
      );
      parentSetValue(
        "primary_health_agent_age_secondary_trustee",
        personDetalis?.age,
      );
      parentSetValue(
        "primary_health_agent_phone_number_secondary_trustee",
        personDetalis?.mobile,
      );
      parentSetValue(
        "primary_trustee_health_agent_relation_secondary_trustee",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_health_agent_relation_primary_secondary_trustee",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_health_agent_relation_primary_secondary_trustee",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue(
        "primary_health_agent_address_secondary_trustee",
        personDetalis?.address,
      );
    }
    //////////////////////
    // for Health Agent //
    //////////////////////
    /////////////////////////
    // for Financial Agent //
    /////////////////////////

    if (personDetalis.id === parentWatch("primary_financial_agent_id")) {
      parentSetValue("primary_financial_agent_id", personDetalis?.id);
      parentSetValue(
        "primary_financial_agent_full_name",
        personDetalis?.full_Name,
      );
      parentSetValue("primary_financial_agent_email", personDetalis?.email);
      parentSetValue("primary_financial_agent_age", personDetalis?.age);
      parentSetValue(
        "primary_financial_agent_phone_number",
        personDetalis?.mobile,
      );
      parentSetValue(
        "primary_trustee_financial_agent_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_financial_agent_relation_primary",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_financial_agent_relation_primary",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue(
        "primary_financial_agent_address_secondary_trustee",
        personDetalis?.address,
      );
      parentSetValue(
        "primary_financial_agent_full_name_secondary_trustee",
        personDetalis?.full_Name,
      );
      parentSetValue(
        "primary_financial_agent_email_secondary_trustee",
        personDetalis?.email,
      );
      parentSetValue(
        "primary_financial_agent_age_secondary_trustee",
        personDetalis?.age,
      );
      parentSetValue(
        "primary_financial_agent_phone_number_secondary_trustee",
        personDetalis?.mobile,
      );
      parentSetValue(
        "primary_trustee_financial_agent_relation_secondary_trustee",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_financial_agent_relation_primary_secondary_trustee",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_financial_agent_relation_primary_secondary_trustee",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue(
        "primary_financial_agent_address_secondary_trustee",
        personDetalis?.address,
      );
    }
    /////////////////////////
    // for Financial Agent //
    /////////////////////////
    /////////////////////////
    // for guardian Agent //
    /////////////////////////
    if (personDetalis.id === parentWatch("primary_guardian_id")) {
      parentSetValue("primary_guardian_id", personDetalis?.id);
      parentSetValue("primary_guardian_full_name", personDetalis?.full_Name);
      parentSetValue("primary_guardian_email", personDetalis?.email);
      parentSetValue("primary_guardian_age", personDetalis?.age);
      parentSetValue("primary_guardian_phone_number", personDetalis?.mobile);
      parentSetValue(
        "primary_trustee_guardian_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_guardian_relation_primary",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_guardian_relation_primary",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue("primary_guardian_address", personDetalis?.address);
    }
    /////////////////////////
    // for guardian Agent //
    /////////////////////////

    //SECONDARY

    //////////////////
    // for Succesor //
    //////////////////
    if (personDetalis.id === parentWatch("backup_successor_id")) {
      parentSetValue("backup_successor_id", personDetalis?.id);
      parentSetValue("backup_successor_full_name", personDetalis?.full_Name);
      parentSetValue("backup_successor_email", personDetalis?.email);
      parentSetValue("backup_successor_age", personDetalis?.age);
      parentSetValue("backup_successor_phone_number", personDetalis?.mobile);
      parentSetValue(
        "backup_trustee_successor_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_successor_relation_backup",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_successor_relation_backup",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue("backup_successor_address", personDetalis?.address);
    }
    //////////////////
    // for Succesor //
    //////////////////
    //////////////////////
    // for Health Agent //
    //////////////////////
    if (personDetalis.id === parentWatch("backup_health_agent_id")) {
      parentSetValue("backup_health_agent_id", personDetalis?.id);
      parentSetValue("backup_health_agent_full_name", personDetalis?.full_Name);
      parentSetValue("backup_health_agent_email", personDetalis?.email);
      parentSetValue("backup_health_agent_age", personDetalis?.age);
      parentSetValue("backup_health_agent_phone_number", personDetalis?.mobile);
      parentSetValue(
        "backup_trustee_health_agent_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_health_agent_relation_backup",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_health_agent_relation_backup",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue("backup_health_agent_address", personDetalis?.address);
      parentSetValue(
        "backup_health_agent_full_name_secondary_trustee",
        personDetalis?.full_Name,
      );
      parentSetValue(
        "backup_health_agent_email_secondary_trustee",
        personDetalis?.email,
      );
      parentSetValue(
        "backup_health_agent_age_secondary_trustee",
        personDetalis?.age,
      );
      parentSetValue(
        "backup_health_agent_phone_number_secondary_trustee",
        personDetalis?.mobile,
      );
      parentSetValue(
        "backup_trustee_health_agent_relation_secondary_trustee",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_health_agent_relation_backup_secondary_trustee",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_health_agent_relation_backup_secondary_trustee",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue(
        "backup_health_agent_address_secondary_trustee",
        personDetalis?.address,
      );
    }
    //////////////////////
    // for Health Agent //
    //////////////////////
    /////////////////////////
    // for Financial Agent //
    /////////////////////////
    if (personDetalis.id === parentWatch("backup_financial_agent_id")) {
      parentSetValue("backup_financial_agent_id", personDetalis?.id);
      parentSetValue(
        "backup_financial_agent_full_name",
        personDetalis?.full_Name,
      );
      parentSetValue("backup_financial_agent_email", personDetalis?.email);
      parentSetValue("backup_financial_agent_age", personDetalis?.age);
      parentSetValue(
        "backup_financial_agent_phone_number",
        personDetalis?.mobile,
      );
      parentSetValue(
        "backup_trustee_financial_agent_relation",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_financial_agent_relation_backup",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_financial_agent_relation_backup",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue("backup_financial_agent_address", personDetalis?.address);
      parentSetValue(
        "backup_financial_agent_full_name_secondary_trustee",
        personDetalis?.full_Name,
      );
      parentSetValue(
        "backup_financial_agent_email_secondary_trustee",
        personDetalis?.email,
      );
      parentSetValue(
        "backup_financial_agent_age_secondary_trustee",
        personDetalis?.age,
      );
      parentSetValue(
        "backup_financial_agent_phone_number_secondary_trustee",
        personDetalis?.mobile,
      );
      parentSetValue(
        "backup_trustee_financial_agent_relation_secondary_trustee",
        personDetalis?.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_financial_agent_relation_backup_secondary_trustee",
        personDetalis?.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_financial_agent_relation_backup_secondary_trustee",
        personDetalis?.secondary_primary_child_relation,
      );
      parentSetValue(
        "backup_financial_agent_address_secondary_trustee",
        personDetalis?.address,
      );
    }
    /////////////////////////
    // for Financial Agent //
    /////////////////////////
    /////////////////////////
    // for guardian Agent //
    /////////////////////////
    if (personDetalis.id === parentWatch("backup_guardian_id")) {
      parentSetValue("backup_guardian_id", personDetalis?.id);
      parentSetValue("backup_guardian_full_name", personDetalis.full_Name);
      parentSetValue("backup_guardian_email", personDetalis.email);
      parentSetValue("backup_guardian_age", personDetalis.age);
      parentSetValue("backup_guardian_phone_number", personDetalis.mobile);
      parentSetValue(
        "backup_trustee_guardian_relation",
        personDetalis.primary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_trustee_guardian_relation_backup",
        personDetalis.secondary_trustee_child_relation,
      );
      parentSetValue(
        "secondary_primary_guardian_relation_backup",
        personDetalis.secondary_primary_child_relation,
      );
      parentSetValue("backup_guardian_address", personDetalis.address);
    }
    /////////////////////////
    // for guardian Agent //
    /////////////////////////
  };

  useEffect(() => {
    if (Agent) {
      agentEditSetValue("temp_agent_id", Agent.id);
      agentEditSetValue("temp_agent_full_name", Agent.full_Name);
      agentEditSetValue("temp_agent_email", Agent.email);
      agentEditSetValue("temp_agent_mobile", Agent.mobile);
      agentEditSetValue(
        "temp_agent_primary_trustee_child_relation",
        Agent.primary_trustee_child_relation,
      );
      agentEditSetValue(
        "temp_agent_secondary_trustee_child_relation",
        Agent.secondary_trustee_child_relation,
      );
      agentEditSetValue(
        "temp_agent_secondary_primary_child_relation",
        Agent.secondary_primary_child_relation,
      );
      agentEditSetValue("temp_agent_address", Agent.address);
    }
  }, [open]);
  const updateAgent = () => {
    if (AgentId !== undefined) {
      const personDetalis = {
        id: editAgentWatch("temp_agent_id"),
        full_Name: editAgentWatch("temp_agent_full_name"),
        email: editAgentWatch("temp_agent_email"),
        address: editAgentWatch("temp_agent_address"),
        mobile: editAgentWatch("temp_agent_mobile"),
        primary_trustee_child_relation: editAgentWatch(
          "temp_agent_primary_trustee_child_relation",
        ),
        secondary_trustee_child_relation: editAgentWatch(
          "temp_agent_secondary_trustee_child_relation",
        ),
        secondary_primary_child_relation: editAgentWatch(
          "temp_agent_secondary_primary_child_relation",
        ),
      };
      Agents_details.update(AgentId, personDetalis);
      agentEditSetValue("temp_agent_id", "");
      agentEditSetValue("temp_agent_full_name", "");
      agentEditSetValue("temp_agent_email", "");
      agentEditSetValue("temp_agent_mobile", "");
      agentEditSetValue("temp_agent_primary_trustee_child_relation", "");
      agentEditSetValue("temp_agent_secondary_trustee_child_relation", "");
      agentEditSetValue("temp_agent_secondary_primary_child_relation", "");
      agentEditSetValue("temp_agent_address", "");
      handleClose();
      editPeople(personDetalis);
    }
  };
  return (
    <CustomModal
      width={{ xs: "100%", sm: "700px" }} height="auto"
      open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit(updateAgent)}>
        <Box mb={3}>
          <Typography sx={{}} variant="h2">
            Edit Agent
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Controller
              name={"temp_agent_full_name"}
              control={control}
              defaultValue={Agent?.full_Name}
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
              name={"temp_agent_email"}
              control={control}
              defaultValue={Agent?.email}
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
              name={"temp_agent_mobile"}
              control={control}
              defaultValue={Agent?.mobile}
              render={({ field, fieldState: { error } }) => (
                //@ts-ignore
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
              name={"temp_agent_primary_trustee_child_relation"}
              control={control}
              defaultValue={Agent?.primary_trustee_child_relation}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={`For ${parentWatch(
                    "primary_trustee_first_name",
                  )} ${parentWatch(
                    "primary_trustee_last_name",
                  )} this person is`}
                  select
                  tooltipText={`For ${parentWatch(
                    "primary_trustee_first_name",
                  )} ${parentWatch(
                    "primary_trustee_last_name",
                  )} this person is`}
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
              name={"temp_agent_secondary_trustee_child_relation"}
              control={control}
              defaultValue={Agent?.secondary_trustee_child_relation}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={`For ${parentWatch(
                    "secondary_trustee_first_name",
                  )} ${parentWatch(
                    "secondary_trustee_last_name",
                  )} this person is`}
                  tooltipText={`For ${parentWatch(
                    "secondary_trustee_first_name",
                  )} ${parentWatch(
                    "secondary_trustee_last_name",
                  )} this person is`}
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
            {" "}
            <Controller
              name={"temp_agent_secondary_primary_child_relation"}
              control={control}
              defaultValue={Agent?.secondary_primary_child_relation}
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
              name={"temp_agent_address"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <GoogleMaps>
                  <GoogleMaps.AutoComplete
                    {...field}
                    name={"temp_agent_address"}
                    defaultValue={Agent?.address}
                    onAddressChange={(autoAddress: any) => {
                      agentEditSetValue("temp_agent_address", autoAddress);
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
              name="edit_agent_trustee"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Controller
                    name={"edit_agent_trustee"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              checked={editAgentWatch("edit_agent_trustee")}
                              sx={{
                                color: (theme) =>
                                  theme.additionalColors?.orange,
                              }}
                              onChange={(e) => {
                                agentEditSetValue(
                                  "edit_agent_trustee",
                                  e.target.checked,
                                );
                              }}
                              checkedIcon={
                                <CheckBoxOutlinedIcon
                                  sx={{
                                    color: (theme) =>
                                      theme.additionalColors?.orange,
                                  }}
                                />
                              }
                            />
                          }
                          label={
                            <Typography>
                              This person is over the age of 18{" "}
                            </Typography>
                          }
                        />
                        {error?.message && (
                          <Box sx={{ p: { marginTop: "-13px" } }}>
                            <CustomErrorMessage error={error?.message ?? {}} />
                          </Box>
                        )}
                      </>
                    )}
                  />
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
            onClick={handleClose}
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
            // onClick={updateAgent}
            type="submit"
          >
            Edit
          </Button>
        </Box>
      </form>
    </CustomModal>
  );
}

export default EditAgent;
