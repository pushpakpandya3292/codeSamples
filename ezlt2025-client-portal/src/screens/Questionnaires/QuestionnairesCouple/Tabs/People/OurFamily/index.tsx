"use client";
import React, { useEffect, useState } from "react";
import { Box, Fade, RadioGroup, Typography } from "@mui/material";
import CustomizedSwitches from "@/components/CustomSwitch";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddChild from "./AddChildModal";
import EditChild from "./EditChildModal";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import moment from "moment";
import EditDeceasedChildModal from "./EditDeceasedChildModal";
import AddDeceasedChildModal from "./AddDeceasedChildModal";
import { TrusteeChildBothRealtionEnum } from "../../../constants";

import { v4 as uuidv4 } from "uuid";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";

const OurFamily: React.FC = () => {
  const { control, watch, setValue, trigger, getValues } = useFormContext();
  const living_childern_details = useFieldArray({
    control,
    name: "living_childern_details",
  });
  const deceased_childern_details = useFieldArray({
    control,
    name: "deceased_childern_details",
  });
  const Agents_details = useFieldArray({
    control,
    name: "Agents_details",
  });

  const [open, setOpen] = React.useState(false);
  const [openDeceasedEditModal, setOpenDeceasedEditModal] =
    React.useState(false);
  const [openAddChild, setOpenAddChild] = useState(false);
  const [openAddChildDeceased, setOpenAddChildDeceased] = useState(false);
  const [editChildId, setEditChildId] = useState<undefined | number>(undefined);

  const emptyFieldValues = () => {
    setValue("living_childern_modal_open", false);
    setValue("living_childern_full_name", "");
    setValue("living_childern_date_of_birth", "");
    setValue("living_childern_age", "");
    setValue("living_childern_email", "");
    setValue("living_childern_address", null);
    setValue("living_childern_mobile_number", "");
    setValue("living_childern_primary_relation", "");
    setValue("living_childern_secondary_relation", "");
    setValue("living_childern_both_trustee_relation", "");
    setValue("living_childern_have_any_children", false);
    setValue("living_child_children_full_name", "");

    setValue("deceased_childern_modal_open", false);
    setValue("deceased_childern_full_name", "");
    setValue("deceased_childern_date_of_birth", "");
    setValue("deceased_childern_date_of_decease", "");
  };

  const addPeople = () => {
    const adult_living_childerns = watch("living_childern_details")?.filter(
      (child: any) => child.age >= 18,
    );
    if (adult_living_childerns[0]) {
      const child = adult_living_childerns[0];
      //////////////////
      // for Succesor //
      //////////////////
      setValue("primary_successor_id", child?.id);
      setValue("primary_successor_full_name", child.full_Name);
      setValue("primary_successor_email", child.email);
      setValue("primary_successor_age", child.age);
      setValue("primary_successor_phone_number", child.mobile);
      setValue(
        "primary_trustee_successor_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_successor_relation_primary",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_successor_relation_primary",
        child.secondary_primary_child_relation,
      );
      setValue("primary_successor_address", child.address);
      //////////////////
      // for Succesor //
      //////////////////
      //////////////////////
      // for Health Agent //
      //////////////////////
      setValue("primary_health_agent_id", child?.id);
      setValue("primary_health_agent_full_name", child.full_Name);
      setValue("primary_health_agent_email", child.email);
      setValue("primary_health_agent_age", child.age);
      setValue("primary_health_agent_phone_number", child.mobile);
      setValue(
        "primary_trustee_health_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_health_agent_relation_primary",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_health_agent_relation_primary",
        child.secondary_primary_child_relation,
      );
      setValue("primary_health_agent_address", child.address);
      setValue(
        "primary_health_agent_full_name_secondary_trustee",
        child.full_Name,
      );
      setValue("primary_health_agent_email_secondary_trustee", child.email);
      setValue("primary_health_agent_age_secondary_trustee", child.age);
      setValue(
        "primary_health_agent_phone_number_secondary_trustee",
        child.mobile,
      );
      setValue(
        "primary_trustee_health_agent_relation_secondary_trustee",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_health_agent_relation_primary_secondary_trustee",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_health_agent_relation_primary_secondary_trustee",
        child.secondary_primary_child_relation,
      );
      setValue("primary_health_agent_address_secondary_trustee", child.address);
      //////////////////////
      // for Health Agent //
      //////////////////////
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      setValue("primary_financial_agent_id", child?.id);
      setValue("primary_financial_agent_full_name", child.full_Name);
      setValue("primary_financial_agent_email", child.email);
      setValue("primary_financial_agent_age", child.age);
      setValue("primary_financial_agent_phone_number", child.mobile);
      setValue(
        "primary_trustee_financial_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_financial_agent_relation_primary",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_financial_agent_relation_primary",
        child.secondary_primary_child_relation,
      );
      setValue(
        "primary_financial_agent_address_secondary_trustee",
        child.address,
      );
      setValue(
        "primary_financial_agent_full_name_secondary_trustee",
        child.full_Name,
      );
      setValue("primary_financial_agent_email_secondary_trustee", child.email);
      setValue("primary_financial_agent_age_secondary_trustee", child.age);
      setValue(
        "primary_financial_agent_phone_number_secondary_trustee",
        child.mobile,
      );
      setValue(
        "primary_trustee_financial_agent_relation_secondary_trustee",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_financial_agent_relation_primary_secondary_trustee",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_financial_agent_relation_primary_secondary_trustee",
        child.secondary_primary_child_relation,
      );
      setValue(
        "primary_financial_agent_address_secondary_trustee",
        child.address,
      );
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
      setValue("primary_guardian_id", child?.id);
      setValue("primary_guardian_full_name", child.full_Name);
      setValue("primary_guardian_email", child.email);
      setValue("primary_guardian_age", child.age);
      setValue("primary_guardian_phone_number", child.mobile);
      setValue(
        "primary_trustee_guardian_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_guardian_relation_primary",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_guardian_relation_primary",
        child.secondary_primary_child_relation,
      );
      setValue("primary_guardian_address", child.address);
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
    }
    if (adult_living_childerns[1]) {
      const child = adult_living_childerns[1];
      //////////////////
      // for Succesor //
      //////////////////
      setValue("backup_successor_id", child?.id);
      setValue("backup_successor_full_name", child.full_Name);
      setValue("backup_successor_email", child.email);
      setValue("backup_successor_age", child.age);
      setValue("backup_successor_phone_number", child.mobile);
      setValue(
        "backup_trustee_successor_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_successor_relation_backup",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_successor_relation_backup",
        child.secondary_primary_child_relation,
      );
      setValue("backup_successor_address", child.address);
      //////////////////
      // for Succesor //
      //////////////////
      //////////////////////
      // for Health Agent //
      //////////////////////
      setValue("backup_health_agent_id", child?.id);
      setValue("backup_health_agent_full_name", child.full_Name);
      setValue("backup_health_agent_email", child.email);
      setValue("backup_health_agent_age", child.age);
      setValue("backup_health_agent_phone_number", child.mobile);
      setValue(
        "backup_trustee_health_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_health_agent_relation_backup",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_health_agent_relation_backup",
        child.secondary_primary_child_relation,
      );
      setValue("backup_health_agent_address", child.address);
      setValue(
        "backup_health_agent_full_name_secondary_trustee",
        child.full_Name,
      );
      setValue("backup_health_agent_email_secondary_trustee", child.email);
      setValue("backup_health_agent_age_secondary_trustee", child.age);
      setValue(
        "backup_health_agent_phone_number_secondary_trustee",
        child.mobile,
      );
      setValue(
        "backup_trustee_health_agent_relation_secondary_trustee",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_health_agent_relation_backup_secondary_trustee",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_health_agent_relation_backup_secondary_trustee",
        child.secondary_primary_child_relation,
      );
      setValue("backup_health_agent_address_secondary_trustee", child.address);
      //////////////////////
      // for Health Agent //
      //////////////////////
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      setValue("backup_financial_agent_id", child?.id);
      setValue("backup_financial_agent_full_name", child.full_Name);
      setValue("backup_financial_agent_email", child.email);
      setValue("backup_financial_agent_age", child.age);
      setValue("backup_financial_agent_phone_number", child.mobile);
      setValue(
        "backup_trustee_financial_agent_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_financial_agent_relation_backup",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_financial_agent_relation_backup",
        child.secondary_primary_child_relation,
      );
      setValue("backup_financial_agent_address", child.address);
      setValue(
        "backup_financial_agent_full_name_secondary_trustee",
        child.full_Name,
      );
      setValue("backup_financial_agent_email_secondary_trustee", child.email);
      setValue("backup_financial_agent_age_secondary_trustee", child.age);
      setValue(
        "backup_financial_agent_phone_number_secondary_trustee",
        child.mobile,
      );
      setValue(
        "backup_trustee_financial_agent_relation_secondary_trustee",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_financial_agent_relation_backup_secondary_trustee",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_financial_agent_relation_backup_secondary_trustee",
        child.secondary_primary_child_relation,
      );
      setValue(
        "backup_financial_agent_address_secondary_trustee",
        child.address,
      );
      /////////////////////////
      // for Financial Agent //
      /////////////////////////
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
      setValue("backup_guardian_id", child?.id);
      setValue("backup_guardian_full_name", child.full_Name);
      setValue("backup_guardian_email", child.email);
      setValue("backup_guardian_age", child.age);
      setValue("backup_guardian_phone_number", child.mobile);
      setValue(
        "backup_trustee_guardian_relation",
        child.primary_trustee_child_relation,
      );
      setValue(
        "secondary_trustee_guardian_relation_backup",
        child.secondary_trustee_child_relation,
      );
      setValue(
        "secondary_primary_guardian_relation_backup",
        child.secondary_primary_child_relation,
      );
      setValue("backup_guardian_address", child.address);
      /////////////////////////
      // for guardian Agent //
      /////////////////////////
    }
  };

  //////////////////////////
  // for Living Childrens //
  //////////////////////////

  const handleOpenAddChild = () => {
    emptyFieldValues();
    setValue("living_childern_modal_open", true);
    setOpenAddChild(true);
  };

  const handleCloseAddChild = async () => {
    const isValid = await trigger();
    const {
      living_childern_full_name,
      living_childern_date_of_birth,
      living_childern_age,
      living_childern_email,
      living_childern_address,
      living_childern_mobile_number,
      living_childern_primary_relation,
      living_childern_secondary_relation,
      living_childern_both_trustee_relation,
      living_childern_have_any_children,
      living_child_children_full_name,
    } = getValues();
    if (isValid) {
      const childDetails = {
        id: uuidv4(),
        full_Name: living_childern_full_name,
        date_of_birth: moment(new Date(living_childern_date_of_birth)).format(
          "YYYY-MM-DD",
        ),
        age: living_childern_age,
        email: living_childern_email,
        address: living_childern_address,
        mobile: living_childern_mobile_number,
        primary_trustee_child_relation: living_childern_primary_relation,
        secondary_trustee_child_relation: living_childern_secondary_relation,
        secondary_primary_child_relation: living_childern_both_trustee_relation,
        living_childern_have_any_children: living_childern_have_any_children,
        living_child_children_full_name: living_childern_have_any_children
          ? living_child_children_full_name
          : "",
      };
      living_childern_details.append(childDetails);
      if (living_childern_age >= 18) {
        Agents_details.append({
          ...childDetails,
          is_child: true,
        });
      }
      emptyFieldValues();
      setOpenAddChild(false);
      addPeople();
    }
  };

  const handleCloseAddCancel = async () => {
    setValue("living_childern_modal_open", false);
    setOpenAddChild(false);
    emptyFieldValues();
    setOpen(false);
  };

  const handleEditLivingChildOpen = (childId: number) => {
    const childDetails: any = living_childern_details.fields[childId];
    setValue("living_childern_modal_open", true);
    setValue("living_childern_full_name", childDetails.full_Name);
    setValue(
      "living_childern_date_of_birth",
      moment(new Date(childDetails.date_of_birth)).format("YYYY-MM-DD"),
    );
    setValue("living_childern_age", childDetails.age);
    setValue("living_childern_email", childDetails.email);
    setValue("living_childern_address", childDetails.address);
    setValue("living_childern_mobile_number", childDetails.mobile);
    setValue(
      "living_childern_primary_relation",
      childDetails.primary_trustee_child_relation,
    );
    setValue(
      "living_childern_secondary_relation",
      childDetails.secondary_trustee_child_relation,
    );
    setValue(
      "living_childern_both_trustee_relation",
      childDetails.secondary_primary_child_relation,
    );
    setValue(
      "living_childern_have_any_children",
      childDetails.living_childern_have_any_children,
    );
    setValue(
      "living_child_children_full_name",
      childDetails.living_child_children_full_name,
    );
    setEditChildId(childId);

    setOpen(true);
  };

  const handleEditLivigChildClose = async () => {
    const isValid = await trigger();
    const {
      living_childern_full_name,
      living_childern_date_of_birth,
      living_childern_age,
      living_childern_email,
      living_childern_address,
      living_childern_mobile_number,
      living_childern_primary_relation,
      living_childern_secondary_relation,
      living_childern_both_trustee_relation,
      living_childern_have_any_children,
      living_child_children_full_name,
    } = getValues();
    if (isValid) {
      const childDetails = {
        full_Name: living_childern_full_name,
        date_of_birth: moment(new Date(living_childern_date_of_birth)).format(
          "YYYY-MM-DD",
        ),
        age: living_childern_age,
        email: living_childern_email,
        address: living_childern_address,
        mobile: living_childern_mobile_number,
        primary_trustee_child_relation: living_childern_primary_relation,
        secondary_trustee_child_relation: living_childern_secondary_relation,
        secondary_primary_child_relation: living_childern_both_trustee_relation,
        living_childern_have_any_children: living_childern_have_any_children,
        living_child_children_full_name: living_childern_have_any_children
          ? living_child_children_full_name
          : "",
      };
      if (editChildId !== undefined) {
        const isAddNewAgent = Agents_details.fields.find(
          (agent: { [X: string]: string }, index: number) => {
            return (
              agent?.full_Name ===
                watch("living_childern_details")[editChildId]?.full_Name &&
              agent?.primary_trustee_child_relation ==
                watch("living_childern_details")[editChildId]
                  ?.primary_trustee_child_relation
            );
          },
        );
        if (!isAddNewAgent && childDetails.age >= 18) {
          Agents_details.append({
            ...childDetails,
            id: watch("living_childern_details")[editChildId]?.id,
            is_child: true,
          });
        } else {
          Agents_details.fields.forEach(
            (agent: { [X: string]: string }, index: number) => {
              if (
                agent?.full_Name ===
                  watch("living_childern_details")[editChildId]?.full_Name &&
                agent?.secondary_primary_child_relation ==
                  watch("living_childern_details")[editChildId]
                    ?.secondary_primary_child_relation
              ) {
                if (childDetails.age >= 18) {
                  Agents_details.update(index, {
                    ...childDetails,
                    id: watch("living_childern_details")[editChildId]?.id,
                    is_child: true,
                  });
                } else {
                  Agents_details.remove(index);
                }
              }
            },
          );
        }
        living_childern_details.update(editChildId, {
          ...childDetails,
          id: watch("living_childern_details")[editChildId]?.id,
          is_child: true,
        });
        addPeople();
      }
      setEditChildId(undefined);
      emptyFieldValues();
      setOpen(false);
    }
  };

  const handleDeleteLivingChild = () => {
    if (editChildId !== undefined) {
      Agents_details.fields.forEach(
        (agent: { [X: string]: string }, index: number) => {
          if (
            agent?.full_Name ===
              (
                living_childern_details.fields[editChildId] as {
                  [X: string]: string;
                }
              ).full_Name &&
            agent?.secondary_primary_child_relation ==
              (
                living_childern_details.fields[editChildId] as {
                  [X: string]: string;
                }
              ).secondary_primary_child_relation
          ) {
            Agents_details.remove(index);
          }
        },
      );
      living_childern_details.remove(editChildId);
    }
    setEditChildId(undefined);
    emptyFieldValues();
    setOpen(false);
  };

  //////////////////////////
  // for Living Childrens //
  //////////////////////////

  ////////////////////////////
  // for Deceased Childrens //
  ////////////////////////////

  const handleOpenAddChildDeceased = () => {
    setValue("deceased_childern_modal_open", true);
    setOpenAddChildDeceased(true);
  };

  const handleCloseAddDeceasedChild = async () => {
    const isValid = await trigger();
    const {
      deceased_childern_full_name,
      deceased_childern_date_of_birth,
      deceased_childern_date_of_decease,
    } = getValues();
    if (isValid) {
      const childDetails = {
        full_Name: deceased_childern_full_name,
        date_of_birth: deceased_childern_date_of_birth,
        date_of_decease: deceased_childern_date_of_decease,
      };
      deceased_childern_details.append(childDetails);
      setOpenAddChild(false);
      emptyFieldValues();
      setOpenAddChildDeceased(false);
    }
  };

  const handleCloseAddDeceasedCancel = async () => {
    setValue("deceased_childern_modal_open", false);
    emptyFieldValues();
    setOpenDeceasedEditModal(false);
    setOpenAddChildDeceased(false);
  };

  const handleDeceaseEditOpen = (childId: number) => {
    const childDetails: any = deceased_childern_details.fields[childId];
    setValue("deceased_childern_modal_open", true);
    setValue("deceased_childern_full_name", childDetails.full_Name);
    setValue("deceased_childern_date_of_birth", childDetails.date_of_birth);
    setValue("deceased_childern_date_of_decease", childDetails.date_of_decease);
    setEditChildId(childId);

    setOpenDeceasedEditModal(true);
  };

  const handleEditDeceasedChildClose = async () => {
    const isValid = await trigger();
    const {
      deceased_childern_full_name,
      deceased_childern_date_of_birth,
      deceased_childern_date_of_decease,
    } = getValues();
    if (isValid) {
      const childDetails = {
        full_Name: deceased_childern_full_name,
        date_of_birth: deceased_childern_date_of_birth,
        date_of_decease: deceased_childern_date_of_decease,
      };
      if (editChildId !== undefined)
        deceased_childern_details.update(editChildId, childDetails);
      setEditChildId(undefined);
      emptyFieldValues();
      setOpenDeceasedEditModal(false);
    }
  };

  const handleDeleteDeceasedChild = () => {
    if (editChildId !== undefined)
      deceased_childern_details.remove(editChildId);
    setEditChildId(undefined);
    emptyFieldValues();
    setOpenDeceasedEditModal(false);
  };

  ////////////////////////////
  // for Deceased Childrens //
  ////////////////////////////

  useEffect(() => {
    var ageDifMs =
      Date.now() - new Date(watch("living_childern_date_of_birth")).getTime();
    var ageDate = new Date(ageDifMs);
    if (Math.abs(ageDate.getUTCFullYear() - 1970)) {
      setValue(
        "living_childern_age",
        `${Math.abs(ageDate.getUTCFullYear() - 1970)}`,
      );
    } else {
      setValue("living_childern_age", 0);
    }
  }, [watch("living_childern_date_of_birth")]);

  return (
    <>
      <Typography variant="h2">Do you have any children ?</Typography>
      <Typography variant="h5">
        Please include the children that are part of this marriage and family
        (biological, adopted, or legal guardian). These children will be the
        default beneficiaries of your estate.{" "}
      </Typography>
      <BoxWrapper
        sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Controller
              name={"living_childern"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <ToggleBox
                    sx={{
                      display: "flex",
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      gap: "10px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Typography variant="h4">
                      Do you have any Living children?
                    </Typography>
                    <RadioGroup
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <CustomRadioButton
                          value={true}
                          label={<Typography>Yes</Typography>}
                        />
                        <CustomRadioButton
                          value={false}
                          label={<Typography>No</Typography>}
                        />
                      </Box>
                    </RadioGroup>
                  </ToggleBox>
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </>
              )}
            />
            <Fade in={watch("living_childern")} timeout={1000} unmountOnExit>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h2" sx={{ py: "12px" }}>
                  Living Children
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  {living_childern_details.fields.map(
                    (child: any, index: number) => {
                      return (
                        <Box
                          key={child?.id}
                          sx={{
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "40px",
                            px: 2,
                            background: (theme) =>
                              theme.additionalColors?.formInputBg,
                          }}
                        >
                          <Typography variant="body1">
                            {`${index + 1} - ${child.full_Name}, ${
                              TrusteeChildBothRealtionEnum[
                                child.secondary_primary_child_relation as keyof typeof TrusteeChildBothRealtionEnum
                              ]
                            }, Age ${child.age}`}
                          </Typography>

                          <BorderColorTwoToneIcon
                            color="primary"
                            onClick={() => handleEditLivingChildOpen(index)}
                            sx={{
                              background: (theme) =>
                                theme.additionalColors?.background.tertiary,
                              cursor: "pointer",
                              borderRadius: "4px",
                              fontSize: "26px",
                              p: "4px",
                            }}
                          />
                        </Box>
                      );
                    },
                  )}
                  <Button
                    startIcon={<AddIcon fontSize="medium" />}
                    onClick={handleOpenAddChild}
                    sx={{
                      height: "45px",
                      width: { xs: "100%", sm: "100%", md: "100%" },
                      background: (theme) =>
                        theme.additionalColors?.background.tertiary,
                      color: (theme) => theme.palette.primary.main,
                      borderRadius: "5px",
                      padding: { xs: "0", md: "12px 45px" },
                      fontSize: "18px",
                      fontFamily: "Roboto",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Add Living Child
                  </Button>
                  <EditChild
                    open={open}
                    handleClose={handleEditLivigChildClose}
                    handleCancel={handleCloseAddCancel}
                    handleDeleteChild={handleDeleteLivingChild}
                  />
                  <AddChild
                    open={openAddChild}
                    handleCancel={handleCloseAddCancel}
                    handleClose={handleCloseAddChild}
                    handleOpen={handleOpenAddChild}
                  />
                </Box>
              </Box>
            </Fade>
          </Box>
          <Box sx={{ width: { sm: "100%", md: "50%" } }}>
            <Controller
              name={"deceased_childern"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <ToggleBox
                    sx={{
                      display: "flex",
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      gap: "10px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Typography variant="h4">
                      Do you have any Deceased children?
                    </Typography>
                    <RadioGroup
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <CustomRadioButton
                          value={true}
                          label={<Typography>Yes</Typography>}
                        />
                        <CustomRadioButton
                          value={false}
                          label={<Typography>No</Typography>}
                        />
                      </Box>
                    </RadioGroup>
                  </ToggleBox>
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </>
              )}
            />
            <Fade in={watch("deceased_childern")} timeout={1000} unmountOnExit>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h2" sx={{ py: "12px" }}>
                  Deceased Children
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  {deceased_childern_details.fields.map(
                    (child: any, index: number) => {
                      return (
                        <Box
                          key={child?.id}
                          sx={{
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "40px",
                            px: 2,
                            background: (theme) =>
                              theme.additionalColors?.formInputBg,
                          }}
                        >
                          <Typography variant="body1">
                            {`${index + 1} - ${child.full_Name}`}
                          </Typography>

                          <BorderColorTwoToneIcon
                            color="primary"
                            onClick={() => handleDeceaseEditOpen(index)}
                            sx={{
                              background: (theme) =>
                                theme.additionalColors?.background.tertiary,
                              cursor: "pointer",
                              borderRadius: "4px",
                              fontSize: "26px",
                              p: "4px",
                            }}
                          />
                        </Box>
                      );
                    },
                  )}
                  <Button
                    startIcon={<AddIcon fontSize="medium" />}
                    onClick={handleOpenAddChildDeceased}
                    sx={{
                      height: "45px",
                      width: { xs: "100%", sm: "100%", md: "100%" },
                      background: (theme) =>
                        theme.additionalColors?.background.tertiary,
                      color: (theme) => theme.palette.primary.main,
                      borderRadius: "5px",
                      padding: { xs: "0", md: "12px 45px" },
                      fontSize: "18px",
                      fontFamily: "Roboto",
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    Add Deceased Child
                  </Button>

                  <EditDeceasedChildModal
                    open={openDeceasedEditModal}
                    handleClose={handleEditDeceasedChildClose}
                    handleCancel={handleCloseAddDeceasedCancel}
                    handleDeleteChild={handleDeleteDeceasedChild}
                  />
                  <AddDeceasedChildModal
                    open={openAddChildDeceased}
                    handleClose={handleCloseAddDeceasedChild}
                    handleCancel={handleCloseAddDeceasedCancel}
                    handleOpen={handleOpenAddChildDeceased}
                  />
                </Box>
              </Box>
            </Fade>
          </Box>
        </Box>
      </BoxWrapper>
    </>
  );
};

export default OurFamily;
