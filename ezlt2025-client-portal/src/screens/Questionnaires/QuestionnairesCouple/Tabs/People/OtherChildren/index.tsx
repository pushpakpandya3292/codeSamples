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
import AddSeacondaryChildModal from "./AddSeacondaryChildModal";
import EditChild from "./EditChildModal";
import EditSecondaryChildModal from "./EditSecondaryChildModal";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import moment from "moment";
import {
  TrusteeChildBothRealtionEnum,
  TrusteeChildRealtionEnum,
} from "../../../constants";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";

const OtherChildren: React.FC = () => {
  const { control, watch, setValue, trigger, getValues } = useFormContext();
  const primary_trustee_childern_details = useFieldArray({
    control,
    name: "primary_trustee_childern_details",
  });
  const secondary_trustee_childern_details = useFieldArray({
    control,
    name: "secondary_trustee_childern_details",
  });
  const [livingChildren, setLivingChildren] = useState(
    watch("primary_trustee_childern") === "yes" ? true : false,
  );
  const [secondaryLivingChildren, setSecondaryLivingChildren] = useState(
    watch("secondary_trustee_childern") === "yes" ? true : false,
  );
  const [openAddChildSecondary, setOpenAddChildSecondary] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSecondaryEditModal, setOpenSecondaryEditModal] =
    React.useState(false);
  const [openAddChild, setOpenAddChild] = useState(false);
  const [editChildId, setEditChildId] = useState<undefined | number>(undefined);
  const emptyFieldValues = () => {
    setValue("primary_trustee_childern_modal_open", false);
    setValue("primary_trustee_childern_full_name", "");
    setValue("primary_trustee_childern_date_of_birth", "");
    setValue("primary_trustee_childern_age", 0);
    setValue("primary_trustee_childern_email", "");
    setValue("primary_trustee_childern_address", "");
    setValue("primary_trustee_childern_mobile_number", "");
    setValue("primary_trustee_childern_primary_relation", "");
    setValue("primary_trustee_childern_secondary_relation", "");
    setValue("primary_trustee_childern_both_trustee_relation", "");

    setValue("secondary_trustee_childern_modal_open", false);
    setValue("secondary_trustee_childern_full_name", "");
    setValue("secondary_trustee_childern_date_of_birth", "");
    setValue("secondary_trustee_childern_age", 0);
    setValue("secondary_trustee_childern_email", "");
    setValue("secondary_trustee_childern_address", "");
    setValue("secondary_trustee_childern_mobile_number", "");
    setValue("secondary_trustee_childern_primary_relation", "");
    setValue("secondary_trustee_childern_secondary_relation", "");
    setValue("secondary_trustee_childern_both_trustee_relation", "");
  };

  ////////////////////////////
  // for Primary Childrens //
  ///////////////////////////

  const handleOpenAddChild = () => {
    setValue("primary_trustee_childern_modal_open", true);
    setOpenAddChild(true);
  };

  const handleCloseAddChild = async () => {
    const isValid = await trigger();
    const {
      primary_trustee_childern_full_name,
      primary_trustee_childern_date_of_birth,
      primary_trustee_childern_age,
      primary_trustee_childern_email,
      primary_trustee_childern_mobile_number,
      primary_trustee_childern_primary_relation,
      primary_trustee_childern_secondary_relation,
      primary_trustee_childern_both_trustee_relation,
    } = getValues();
    if (isValid) {
      const childDetalis = {
        full_Name: primary_trustee_childern_full_name,
        date_of_birth: primary_trustee_childern_date_of_birth,
        age: primary_trustee_childern_age,
        email: primary_trustee_childern_email,
        mobile: primary_trustee_childern_mobile_number,
        primary_trustee_child_relation:
          primary_trustee_childern_primary_relation,
        secondary_trustee_child_relation:
          primary_trustee_childern_secondary_relation,
        secondary_primary_child_relation:
          primary_trustee_childern_both_trustee_relation,
      };
      primary_trustee_childern_details.append(childDetalis);
      setOpenAddChild(false);
      emptyFieldValues();
    }
  };

  const handleEditPrimaryChildClose = async () => {
    const isValid = await trigger();
    const {
      primary_trustee_childern_full_name,
      primary_trustee_childern_date_of_birth,
      primary_trustee_childern_age,
      primary_trustee_childern_email,
      primary_trustee_childern_address,
      primary_trustee_childern_mobile_number,
      primary_trustee_childern_primary_relation,
      primary_trustee_childern_secondary_relation,
      primary_trustee_childern_both_trustee_relation,
    } = getValues();
    if (isValid) {
      const childDetalis = {
        full_Name: primary_trustee_childern_full_name,
        date_of_birth: primary_trustee_childern_date_of_birth,
        age: primary_trustee_childern_age,
        email: primary_trustee_childern_email,
        address: primary_trustee_childern_address,
        mobile: primary_trustee_childern_mobile_number,
        primary_trustee_child_relation:
          primary_trustee_childern_primary_relation,
        secondary_trustee_child_relation:
          primary_trustee_childern_secondary_relation,
        secondary_primary_child_relation:
          primary_trustee_childern_both_trustee_relation,
      };
      if (editChildId !== undefined)
        primary_trustee_childern_details.update(editChildId, childDetalis);
      setEditChildId(undefined);
      emptyFieldValues();
      setOpen(false);
    }
  };

  const handleEditPrimaryChildOpen = (childId: number) => {
    const childDetails: any = primary_trustee_childern_details.fields[childId];
    setValue("primary_trustee_childern_modal_open", true);
    setValue("primary_trustee_childern_full_name", childDetails.full_Name);
    setValue(
      "primary_trustee_childern_date_of_birth",
      childDetails.date_of_birth,
    );
    setValue("primary_trustee_childern_age", childDetails.age);
    setValue("primary_trustee_childern_email", childDetails.email);
    setValue("primary_trustee_childern_address", childDetails.address);
    setValue("primary_trustee_childern_mobile_number", childDetails.mobile);
    setValue(
      "primary_trustee_childern_primary_relation",
      childDetails.primary_trustee_child_relation,
    );
    setValue(
      "primary_trustee_childern_secondary_relation",
      childDetails.secondary_trustee_child_relation,
    );
    setValue(
      "primary_trustee_childern_both_trustee_relation",
      childDetails.secondary_primary_child_relation,
    );
    setEditChildId(childId);
    setOpen(true);
  };

  const handleEditSecondaryChildClose = async () => {
    const isValid = await trigger();
    const {
      secondary_trustee_childern_full_name,
      secondary_trustee_childern_date_of_birth,
      secondary_trustee_childern_age,
      secondary_trustee_childern_email,
      secondary_trustee_childern_address,
      secondary_trustee_childern_mobile_number,
      secondary_trustee_childern_primary_relation,
      secondary_trustee_childern_secondary_relation,
      secondary_trustee_childern_both_trustee_relation,
    } = getValues();
    if (isValid) {
      const childDetalis = {
        full_Name: secondary_trustee_childern_full_name,
        date_of_birth: secondary_trustee_childern_date_of_birth,
        age: secondary_trustee_childern_age,
        email: secondary_trustee_childern_email,
        address: secondary_trustee_childern_address,
        mobile: secondary_trustee_childern_mobile_number,
        primary_trustee_child_relation:
          secondary_trustee_childern_primary_relation,
        secondary_trustee_child_relation:
          secondary_trustee_childern_secondary_relation,
        secondary_primary_child_relation:
          secondary_trustee_childern_both_trustee_relation,
      };
      if (editChildId !== undefined)
        secondary_trustee_childern_details.update(editChildId, childDetalis);
      setEditChildId(undefined);
      emptyFieldValues();
      setOpenSecondaryEditModal(false);
    }
  };

  const handleDeletePrimaryChild = () => {
    if (editChildId !== undefined)
      primary_trustee_childern_details.remove(editChildId);
    setEditChildId(undefined);
    setOpen(false);
    emptyFieldValues();
  };

  ////////////////////////////
  // for Primary Childrens //
  ///////////////////////////

  //////////////////////////////
  // for Secondary Childrens //
  /////////////////////////////
  const handleEditSecondaryChildOpen = (childId: number) => {
    const childDetails: any =
      secondary_trustee_childern_details.fields[childId];
    setValue("secondary_trustee_childern_modal_open", true);
    setValue("secondary_trustee_childern_full_name", childDetails.full_Name);
    setValue(
      "secondary_trustee_childern_date_of_birth",
      childDetails.date_of_birth,
    );
    setValue("secondary_trustee_childern_age", childDetails.age);
    setValue("secondary_trustee_childern_email", childDetails.email);
    setValue("secondary_trustee_childern_address", childDetails.address);
    setValue("secondary_trustee_childern_mobile_number", childDetails.mobile);
    setValue(
      "secondary_trustee_childern_primary_relation",
      childDetails.primary_trustee_child_relation,
    );
    setValue(
      "secondary_trustee_childern_secondary_relation",
      childDetails.secondary_trustee_child_relation,
    );
    setValue(
      "secondary_trustee_childern_both_trustee_relation",
      childDetails.secondary_primary_child_relation,
    );
    setEditChildId(childId);
    setOpenSecondaryEditModal(true);
  };

  const handleDeleteSecondaryChild = () => {
    if (editChildId !== undefined)
      secondary_trustee_childern_details.remove(editChildId);
    setEditChildId(undefined);
    setOpenSecondaryEditModal(false);
    emptyFieldValues();
  };

  const handleCloseAddCancel = async () => {
    setValue("primary_trustee_childern_modal_open", false);
    setOpenAddChild(false);
    setOpen(false);
    emptyFieldValues();
  };

  const handleCloseAddSecondaryChild = async () => {
    const isValid = await trigger();
    const {
      secondary_trustee_childern_full_name,
      secondary_trustee_childern_date_of_birth,
      secondary_trustee_childern_age,
      secondary_trustee_childern_email,
      secondary_trustee_childern_mobile_number,
      secondary_trustee_childern_primary_relation,
      secondary_trustee_childern_secondary_relation,
      secondary_trustee_childern_both_trustee_relation,
    } = getValues();
    if (isValid) {
      const childDetalis = {
        full_Name: secondary_trustee_childern_full_name,
        date_of_birth: secondary_trustee_childern_date_of_birth,
        age: secondary_trustee_childern_age,
        email: secondary_trustee_childern_email,
        mobile: secondary_trustee_childern_mobile_number,
        primary_trustee_child_relation:
          secondary_trustee_childern_primary_relation,
        secondary_trustee_child_relation:
          secondary_trustee_childern_secondary_relation,
        secondary_primary_child_relation:
          secondary_trustee_childern_both_trustee_relation,
      };
      secondary_trustee_childern_details.append(childDetalis);
      setOpenAddChildSecondary(false);
      emptyFieldValues();
    }
  };

  const handleCloseAddSecondaryCancel = async () => {
    setValue("secondary_trustee_childern_modal_open", false);
    setOpenAddChildSecondary(false);
    setOpenSecondaryEditModal(false);
    emptyFieldValues();
  };

  const handleOpenAddChildSecondary = () => {
    setValue("secondary_trustee_childern_modal_open", true);
    setOpenAddChildSecondary(true);
  };

  //////////////////////////////
  // for Secondary Childrens //
  /////////////////////////////

  useEffect(() => {
    var ageDifMs =
      Date.now() -
      new Date(watch("primary_trustee_childern_date_of_birth")).getTime();
    var ageDate = new Date(ageDifMs);
    if (Math.abs(ageDate.getUTCFullYear() - 1970)) {
      setValue(
        "primary_trustee_childern_age",
        `${Math.abs(ageDate.getUTCFullYear() - 1970)}`,
      );
    }
  }, [watch("primary_trustee_childern_date_of_birth")]);

  useEffect(() => {
    var ageDifMs =
      Date.now() -
      new Date(watch("secondary_trustee_childern_date_of_birth")).getTime();
    var ageDate = new Date(ageDifMs);
    if (Math.abs(ageDate.getUTCFullYear() - 1970)) {
      setValue(
        "secondary_trustee_childern_age",
        `${Math.abs(ageDate.getUTCFullYear() - 1970)}`,
      );
    }
  }, [watch("secondary_trustee_childern_date_of_birth")]);

  return (
    <>
      <Typography variant="h2">
        Number of children NOT of this immediate Family
      </Typography>
      <Typography variant="h5">
        Please include any other children from a previous relationship that were
        not adopted into your family?
      </Typography>
      <BoxWrapper
        sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "10px", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Controller
              name={"primary_trustee_childern"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <ToggleBox
                    sx={{
                      display: "flex",
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      gap: "10px",
                      flexDirection: { xs: "column", md: "row" }
                    }}
                  >
                    <Typography variant="h4">
                      Does {watch("primary_trustee_first_name")}{" "}
                      {watch("primary_trustee_last_name")} have other children?
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
            <Fade
              in={watch("primary_trustee_childern")}
              timeout={1000}
              unmountOnExit
            >
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
                  {primary_trustee_childern_details.fields.map(
                    (child: any, index: number) => {
                      return (
                        <Box
                          key={child.id}
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
                            {`${index + 1} - ${child.full_Name}, ${TrusteeChildRealtionEnum[
                              child.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                            ]
                              }, Age ${child.age}`}
                          </Typography>

                          <BorderColorTwoToneIcon
                            color="primary"
                            onClick={() => handleEditPrimaryChildOpen(index)}
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
                    Add Child
                  </Button>
                  {/* need to fix this */}
                  <EditChild
                    open={open}
                    handleClose={handleEditPrimaryChildClose}
                    handleCancel={handleCloseAddCancel}
                    handleDeleteChild={handleDeletePrimaryChild}
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
            {" "}
            <Controller
              name={"secondary_trustee_childern"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <ToggleBox
                    sx={{
                      display: "flex",
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      gap: "10px",
                      flexDirection: { xs: "column", md: "row" }
                    }}
                  >
                    <Typography variant="h4">
                      Does {watch("secondary_trustee_first_name")}{" "}
                      {watch("secondary_trustee_last_name")} have other
                      children?
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
            <Fade
              in={watch("secondary_trustee_childern")}
              timeout={1000}
              unmountOnExit
            >
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
                  {secondary_trustee_childern_details.fields.map(
                    (child: any, index: number) => {
                      return (
                        <Box
                          key={child.id}
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
                            {`${index + 1} - ${child.full_Name}, ${TrusteeChildRealtionEnum[
                              child.secondary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                            ]
                              }, Age ${child.age}`}
                          </Typography>

                          <BorderColorTwoToneIcon
                            color="primary"
                            onClick={() => handleEditSecondaryChildOpen(index)}
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
                    onClick={handleOpenAddChildSecondary}
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
                    Add Child
                  </Button>
                  {/* need to fix this */}
                  <EditSecondaryChildModal
                    open={openSecondaryEditModal}
                    handleClose={handleEditSecondaryChildClose}
                    handleCancel={handleCloseAddSecondaryCancel}
                    handleDeleteChild={handleDeleteSecondaryChild}
                  />
                  <AddSeacondaryChildModal
                    open={openAddChildSecondary}
                    handleClose={handleCloseAddSecondaryChild}
                    handleCancel={handleCloseAddSecondaryCancel}
                    handleOpen={handleOpenAddChildSecondary}
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

export default OtherChildren;
