import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { DeliveryOptionEnum, MailingAddressEnum } from "../../../constants";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import RecommendedChip from "@/components/RecommendedChip";
import dayjs from "dayjs";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";

function SigningDate() {
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [openModal, setOpenModal] = useState(false);

  const handleSubmitDate = async () => {
    const isValid = await trigger();
    if (isValid) setOpenModal(false);
  };

  const handleCloseModal = () => {
    if (!watch("signing_date_field")) {
      setValue("signing_date", "no");
      setValue("signing_date_field", "");
    }
    if (!errors?.signing_date_field || !watch("signing_date_field"))
      setOpenModal(false);
  };
  return (
    <Box>
      <Box>
        <Typography variant="h2">Exact Signature Date</Typography>
        {/* <List dense sx={{ h5: { lineHeight: "1" } }}>
            <ListItem> */}
        <Typography variant="h5">
          If you know the exact date you will notarize the documents in the near
          future, we can pre-print that date on all the documents. Otherwise, it
          will be left blank to manually enter the date.
        </Typography>
        {/* </ListItem>
          </List> */}
      </Box>
      <BoxWrapper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          width: { xs: "100%", md: "70%" },
          mt: 2,
        }}
      >
        <Box>
          <Controller
            name={"signing_date"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  setValue("signing_date", e.target.value);
                  if (e.target.value === "yes") {
                    setOpenModal(true);
                  } else if (e.target.value === "no") {
                    setOpenModal(false);
                    setValue("signing_date_field", "");
                  }
                }}
              >
                <CustomRadioButton
                  value={"no"}
                  label={
                    <>
                      <strong>Skip / Leave Blank </strong> <RecommendedChip />
                    </>
                  }
                />
                <CustomRadioButton
                  value={"yes"}
                  label={
                    <>
                      <strong>Pre-print</strong> (enter the date below if you
                      know the exact date documents will be notarized)
                    </>
                  }
                />
                {error?.message && (
                  <CustomErrorMessage error={error?.message ?? {}} />
                )}
              </RadioGroup>
            )}
          />
        </Box>
        {watch("signing_date_field") && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              borderRadius: "10px",
              background: "#F5F5F5",
              p: 2,
            }}
          >
            <Typography>
              Document Sign date :{" "}
              {dayjs(watch("signing_date_field")).format("MM/DD/YYYY")}
            </Typography>
            <BorderColorTwoToneIcon
              color="primary"
              onClick={() => {
                setOpenModal(true);
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
          </Box>
        )}
      </BoxWrapper>
      <CustomModal width={{ xs: "100%", sm: "350px" }} height="auto" open={openModal} handleClose={handleCloseModal}>
        <Box>
          <Box sx={{ textAlign: "end" }}>
            <CloseIcon
              onClick={handleCloseModal}
              sx={{ cursor: "pointer", mb: 1 }}
            />
          </Box>
          <Typography sx={{ mb: 2 }} variant="body1">
            Date the documents are to be signed
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Controller
              name={"signing_date_field"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomeDateTimePicker
                  {...field}
                  {...renderDateFieldProps(error)}
                  minDate={dayjs()}
                  label={"Signing Date"}
                />
              )}
            />
            <CustomButton type="ADD" onClick={handleSubmitDate}>
              Save
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default SigningDate;
