import React from "react";
import CustomCheckBox from "@/components/CustomCheckBox";
import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { boxStyling, checkBoxSecStyling, NoteText } from "../index";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnariesSingle/Styled";

interface StepTypes {
  title: string;
  fieldName: string;
  placeholder: string;
}

function AnythingYouWouldLikeToAdd({
  title,
  fieldName,
  placeholder,
}: StepTypes) {
  const { control, watch, setValue, trigger } = useFormContext();
  return (
    <Grid container columnSpacing={2} mt={2}>
      <Grid item xs={12} md={8}>
        <BoxWrapper sx={{backgroundColor: 'white'}}>
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
          </Box>
        </BoxWrapper>
      </Grid>
    </Grid>
  );
}

export default AnythingYouWouldLikeToAdd;
