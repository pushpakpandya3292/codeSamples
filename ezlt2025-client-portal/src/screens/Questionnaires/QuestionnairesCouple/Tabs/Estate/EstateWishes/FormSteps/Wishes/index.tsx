import React, { useState } from "react";
import CustomCheckBox from "@/components/CustomCheckBox";
import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { boxStyling, checkBoxSecStyling, NoteText } from "../index";
import VideoModal from "@/components/VideoModal/VideoModal";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import { SampleButton, TutorialText } from "../../Styled";
interface StepTypes {
  title: string;
  videoUrl: string;
  fieldName: string;
  placeholder: string;
  handleOpen: () => void;
  handleClose: () => void;
}

function Wishes({
  title,
  videoUrl,
  fieldName,
  placeholder,
  handleOpen,
}: StepTypes) {
  const { control, watch, setValue, trigger } = useFormContext();

  const [openVideoModal, setOpenVideoModal] = useState(false);

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
  };
  return (
    <Grid container columnSpacing={2} mt={2}>
      <Grid item xs={12} md={8}>
        <BoxWrapper sx={{backgroundColor: 'white'}} >
          <Typography sx={{ mb: 2 }} variant="h3">
            {title}
          </Typography>
          <NoteText />
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
        <BoxWrapper sx={{ height: "100%" , backgroundColor: 'white' }}>
          <Box sx={boxStyling}>
            <Box>
              <SampleButton onClick={handleOpen}>
                Check Sample Answers{" "}
              </SampleButton>
            </Box>
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
                        color: watch(`${fieldName}_skip`)
                          ? "#ccc"
                          : (theme) => theme.palette.primary.main,
                      }}
                    >
                      Lock my answers
                    </Typography>
                  </CustomCheckBox>
                )}
              />
              <Controller
                name={fieldName + "_skip"}
                control={control}
                render={({ field }) => (
                  <CustomCheckBox
                    {...field}
                    setChecked={(value) => {
                      setValue(fieldName + "_skip", value);
                      if (value) {
                        setValue(fieldName + "_approve", !value);
                        setValue(fieldName, "");
                      }
                      trigger(fieldName);
                    }}
                    checked={watch(fieldName + "_skip")}
                    type="SQUARE"
                  >
                    <Typography>Skip this section</Typography>
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

export default Wishes;
