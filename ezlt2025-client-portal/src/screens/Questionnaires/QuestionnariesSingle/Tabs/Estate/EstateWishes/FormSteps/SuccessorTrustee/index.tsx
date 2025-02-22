import React, { useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import CustomCheckBox from "@/components/CustomCheckBox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { boxStyling, checkBoxSecStyling, NoteText } from "../index";
import { TrusteeRespMinAgeEnum } from "@/screens/Questionnaires/QuestionnairesCouple/constants";
import VideoModal from "@/components/VideoModal/VideoModal";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnariesSingle/Styled";
import { TutorialText } from "../../Styled";
import RecommendedChip from "@/components/RecommendedChip";

interface StepTypes {
  title: string;
  videoUrl: string;
  fieldName: string;
  placeholder: string;
}

const minimumAgeOptions = [
  {
    value: TrusteeRespMinAgeEnum.EIGHTEEN,
    label: "18",
  },
  {
    value: TrusteeRespMinAgeEnum.TWENTYONE,
    label: "21",
  },
  {
    value: TrusteeRespMinAgeEnum.TWENTYFIVE,
    label: "25",
  },
];

function SuccessorTrustee({
  title,
  videoUrl,
  fieldName,
  placeholder,
}: StepTypes) {
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const [openVideoModal, setOpenVideoModal] = useState(false);

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
  };
  return (
    <Grid container columnSpacing={2} mt={2}>
      <Grid item xs={12} md={8}>
        <BoxWrapper sx={{backgroundColor: 'white'}}>
          <Typography
            sx={{ mb: 2, display: "flex", gap: 0.5, alignItems: "center" }}
            variant="h3"
          >
            {title} <Typography variant="h5">(Standard language)</Typography>
          </Typography>
          {/* <NoteText /> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mb: "5px",
            }}
          >
            <Typography color={"#000"}>
              Set minimum age to issue benefits?
            </Typography>
            <Controller
              name={fieldName + "_minimum_age"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Tooltip title={"Minimum Age"} placement="top">
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label={"Minimum Age"}
                    select
                    sx={{ mt: 1, width: "110px" }}
                  >
                    {minimumAgeOptions?.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option.value}>
                          {option?.label}
                        </MenuItem>
                      );
                    })}
                  </CustomTextField>
                </Tooltip>
              )}
            />
          </Box>
          {fieldName && (
            <Controller
              name={fieldName}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    disabled={watch(fieldName + "_skip")}
                    multiline
                    rows={10}
                    placeholder={placeholder}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            position: "absolute",
                            right: "10px",
                            bottom: "20px",
                          }}
                        >
                          {watch(fieldName + "_approve") ? (
                            <LockOutlinedIcon />
                          ) : (
                            <LockOpenOutlinedIcon />
                          )}
                        </InputAdornment>
                      ),
                      readOnly: watch(fieldName + "_approve"),
                    }}
                  />
                </>
              )}
            />
          )}
        </BoxWrapper>
      </Grid>
      <Grid item xs={12} md={4}>
        <BoxWrapper sx={{ height: "100%" , backgroundColor: 'white'}}>
          <Box sx={boxStyling}>
            <Box sx={checkBoxSecStyling}>
              <Controller
                name={fieldName + "_approve"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomCheckBox
                    {...field}
                    setChecked={(value) => {
                      setValue(fieldName + "_approve", value);
                      if (value) {
                        setValue(fieldName + "_skip", !value);
                      }
                      trigger(fieldName);
                    }}
                    disabled={watch(`${fieldName}_skip`)}
                    checked={watch(fieldName + "_approve")}
                    type="SQUARE"
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        color: watch(`${fieldName}_skip`)
                          ? "#ccc"
                          : (theme) => theme.palette.primary.main,
                      }}
                    >
                      I approve the standard text
                      <RecommendedChip />
                    </Typography>
                  </CustomCheckBox>
                )}
              />
            </Box>
            <Box>
              <TutorialText
                onClick={() => {
                  setOpenVideoModal(true);
                }}
              >
                <PlayCircleFilledRoundedIcon /> More about this section
              </TutorialText>
            </Box>
          </Box>
        </BoxWrapper>
      </Grid>
      <VideoModal
        openVideoModal={openVideoModal}
        videoUrl={videoUrl}
        handleCloseVideoModal={handleCloseVideoModal}
      />
    </Grid>
  );
}

export default SuccessorTrustee;
