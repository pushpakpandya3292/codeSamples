import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import dayjs from "dayjs";
import CustomToolTip from "@/components/CutomToolTip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoBox from "@/components/InfoBox";

const TrustName: React.FC = () => {
  const { control, watch, setValue } = useFormContext();

  return (
    <>
      <Typography variant="h2">Trust Info</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          flexDirection: "column",
          width: { xs: "100%", md: "60%" },
          pointerEvents: "none",
          mt: 2,
        }}
      >
        <BoxWrapper
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography variant="h3">Your Living Trust type</Typography>
          <Box>
            <RadioGroup sx={{ gap: "5px" }} row>
              <Controller
                name={"trust_status"}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      setValue("trust_status", e.target.value);
                      setValue("original_trust_name", "");
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        gap: { xs: "10px", md: "100px" },
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Box>
                        <CustomRadioButton
                          value="new"
                          label="New Revocable Living Trust"
                        />
                        <CustomToolTip title="This is our first Revocable Living Trust and Estate Plan" />
                      </Box>
                      <Box>
                        <CustomRadioButton
                          value="restated"
                          label="Restated Living Trust"
                        />
                        <CustomToolTip title="I am amending an existing outdated Living Trust" />
                      </Box>
                    </Box>
                  </RadioGroup>
                )}
              />
            </RadioGroup>
          </Box>
        </BoxWrapper>
        {watch("trust_status") === "new" ? (
          <>
            <BoxWrapper
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Typography variant="h3">Your New Living Trust Name</Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#7A7A7A",
                  lineHeight: "20px",
                  fontWeight: 400,
                }}
              >
                Please see and approve a recommended Living Trust name below.
                Living Trust names should generally be recognizable. Using
                fictitious or business names could create unexpected tax or
                legal issues.
              </Typography>
              <Controller
                name={"trust_name_confirmed"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControlLabel
                      sx={{}}
                      control={
                        <Checkbox
                          checked={watch("trust_name_confirmed")}
                          sx={{ color: (theme) => theme.palette.text.disabled }}
                          onChange={(e) => {
                            setValue("trust_name_confirmed", e.target.checked);
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ color: "#000000" }} variant="h5">
                            I accept and confirm this following Trust name
                          </Typography>
                          <Typography
                            sx={{
                              color: (theme) =>
                                theme.additionalColors?.tablightBlue,
                              fontFamily: "Roboto",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: "500",
                              lineHeight: "24px",
                              textDecoration: "underline",
                              ml: 1,
                              // marginTop: "15px",
                            }}
                          >
                            {watch("complete_trust_name")}
                          </Typography>
                        </Box>
                      }
                    />
                    {error?.message && (
                      <Typography
                        sx={{
                          mt: 1,
                          color: "red",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {error?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              {!watch("trust_name_confirmed") && (
                <BoxWrapper>
                  <Typography variant="h3" mb={3}>
                    Edit the Trust name and click the accept box above
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "14px" }}
                  >
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                      }}
                    >
                      The
                    </Typography>
                    <Controller
                      name={"complete_trust_name"}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <CustomTextField
                          {...field}
                          {...renderFieldProps(error)}
                          label={"Complete Trust Name"}
                          InputProps={{
                            readOnly: watch("trust_name_confirmed")
                              ? true
                              : false,
                          }}
                          sx={{ maxWidth: "400px" }}
                        />
                      )}
                    />
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                      }}
                    >
                      Family Living Trust
                    </Typography>
                  </Box>
                </BoxWrapper>
              )}
            </BoxWrapper>
          </>
        ) : (
          <>
            <InfoBox
              title="Looking to amend your trust created by someone else?"
              description="We only offer amendments to Trusts created here at EZ Living
                  Trust. A Restated Trust is for a major update with major
                  changes. A Restated Trust will override the current Trust.
                  Contact us if you have questions."
            />
            <Box sx={{ display: "flex", gap: "15px" }}>
              <BoxWrapper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flexBasis: { md: "50%", xs: "100%" },
                }}
              >
                <Typography variant="h3">
                  Original Living Trust name{" "}
                  <CustomToolTip
                    title="The new Restated Living Trust must contain the same name as
                  the original Living Trust. Although the Restatement overrides
                  the original Trust, both must be kept together in your files."
                  />
                </Typography>
                {/* <Typography variant="h5" minHeight={140}>
                  The new Restated Living Trust must contain the same name as
                  the original Living Trust. Although the Restatement overrides
                  the original Trust, both must be kept together in your files.
                </Typography> */}
                <Controller
                  name={"original_trust_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Enter Original Trust Name"}
                      disabled={watch("trust_name_confirmed")}
                      sx={{ maxWidth: "400px" }}
                    />
                  )}
                />
              </BoxWrapper>
              <BoxWrapper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "space-between",
                  flexBasis: { md: "50%", xs: "100%" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h3">
                    Original Living Trust date{" "}
                    <CustomToolTip title="Enter the date your original trust was signed and notarized." />
                  </Typography>
                  {/* <Typography variant="h5" minHeight={100}>
                    Enter the date your original trust was signed and notarized.
                  </Typography> */}
                </Box>
                <Box height={40}>
                  <Controller
                    name={"original_trust_date"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomeDateTimePicker
                        {...field}
                        maxDate={dayjs()}
                        {...renderDateFieldProps(error)}
                        label={"Date of Original Trust"}
                      />
                    )}
                  />
                  <Typography variant="h5" sx={{ color: "transparent" }}>
                    Enter the date your original trust was signed and notarized.
                  </Typography>
                </Box>
              </BoxWrapper>
            </Box>
            <BoxWrapper sx={{ background: "#FAF8F8" }}>
              <Controller
                name={"trust_name_confirmed"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={watch("trust_name_confirmed")}
                          sx={{ color: (theme) => theme.palette.text.disabled }}
                          onChange={(e) => {
                            setValue("trust_name_confirmed", e.target.checked);
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ color: "#000000" }} variant="h5">
                            I confirm that my new Restated Trust name will
                            be:&nbsp;
                          </Typography>
                          {watch("original_trust_name") && (
                            <Typography
                              sx={{
                                color: (theme) =>
                                  theme.additionalColors?.tablightBlue,
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "24px",
                                textDecoration: "underline",
                              }}
                            >
                              “{watch("original_trust_name")}”
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    {error?.message && (
                      <Typography
                        sx={{
                          mt: 1,
                          color: "red",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {error?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
              <Controller
                name={"is_original_and_restated"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={watch("is_original_and_restated")}
                          sx={{ color: (theme) => theme.palette.text.disabled }}
                          onChange={(e) => {
                            setValue(
                              "is_original_and_restated",
                              e.target.checked,
                            );
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: "#000000" }} variant="h5">
                          I have a copy of the original Trust and will keep both
                          Original and Restarted Trust together in a safe place.
                        </Typography>
                      }
                    />
                    {error?.message && (
                      <Typography
                        sx={{
                          mt: 1,
                          color: "red",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {error?.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </BoxWrapper>
          </>
        )}
      </Box>
    </>
  );
};

export default TrustName;
