import CustomErrorMessage from "@/components/CustomErrorMessage";
import CustomModal from "@/components/CustomModal";
import CustomRadioButton from "@/components/CustomRadioButton";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

interface QualificationProps {
  // Add any props you need for this component
}
const QualificationQuestions = [
  {
    key: "are_there_pending_lawsuits",
    value:
      "I/We understand that this is a self-prepared Revocable living trust and EZ Living Trust, nor Strategic Choice Financial is not providing legal, tax or financial advice.",
  },
  {
    key: "plan_to_entirely_disinherit",
    value: "I/We do NOT plan to disinherit any of our children.",
  },
  {
    key: "are_you_in_a_nursing_home",
    value: "I/We understand that this is not a Special Needs Trust.",
  },
  {
    key: "need_a_special_needs_trust",
    value:
      "My/Our combined assets are not over $5 million ($10 million for couples).",
  },
  {
    key: "do_you_have_multiple",
    value:
      "I am/ We are not in a nursing home, nor have been diagnosed by a medical professional as developing mental capacity issues.",
  },
  {
    key: "is_your_net_worth_greater",
    value:
      "There are no pending lawsuits or potential litigation issues involving my/our property, assets or estate.",
  },
];
const Qualification: React.FC<QualificationProps> = () => {
  // Add your component logic here
  const { control, watch } = useFormContext();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Box sx={{ pointerEvents: "none" }}>
        <Typography variant="h2">Qualification for EZ Living Trust</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#7A7A7A",
              lineHeight: "20px",
              fontWeight: 400,
            }}
          >
            The do-it-yourself, EZ Living Trust is designed for individuals and
            couples who want easy, simple estate plans to make sure their
            property and assets avoid Probate court. Complicated Estate plans
            should consult an attorney for assistance. Any YES answer may be an
            indication that you may need to hire an attorney.
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={10}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 4,
                  py: 2,
                  mt: 2,
                  border: "1px solid #E3E3E3",
                  borderRadius: 1,
                }}
              >
                <Controller
                  name={`is_qualified`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <RadioGroup {...field}>
                      <CustomRadioButton
                        value={"yes"}
                        label={
                          "I agree with the statements below for this Living trust and Estate Plan."
                        }
                      />
                      <CustomRadioButton
                        value="no"
                        label={
                          "I am unable to agree or attest to one or more of the statements below."
                        }
                      />
                      {error?.message && (
                        <CustomErrorMessage error={error?.message ?? {}} />
                      )}
                    </RadioGroup>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <List
                sx={{
                  border: "1px solid #D9ECFF",
                  borderRadius: 1,
                  mt: 2,
                  background: "#f6f9ff",
                }}
              >
                {QualificationQuestions.map((question) => {
                  return (
                    <ListItem sx={{ gap: 2, pt: 0 }} key={question.key}>
                      <CircleRoundedIcon sx={{ fontSize: "5px" }} />
                      <ListItemText
                        sx={{ span: { color: "black", fontWeight: 400 } }}
                        primary={`${question.value}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            {/* {QualificationQuestions.map((question) => {
              return (
                <Grid key={question.key} item xs={12} md={6}>
                  <Box
                    sx={{
                      mt: 2,
                      background: "#fff",
                      borderRadius: "12px",
                      p: 2,
                      boxShadow: "0 0 11px #eee",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        mb: "10px",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#000000",
                      }}
                    >
                      {question.value}
                    </Typography>

                    <>
                      <Controller
                        name={`${question.key}`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <RadioGroup {...field}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 2,
                                gap: "10px",
                                my: 2,
                              }}
                            >
                              <CustomRadioButton value="yes" label={"Yes"} />
                              <CustomRadioButton value="no" label={"No"} />
                            </Box>
                            {error?.message && (
                              <CustomErrorMessage
                                error={error?.message ?? {}}
                              />
                            )}
                          </RadioGroup>
                        )}
                      />
                     
                    </>
                  </Box>
                </Grid>
              );
            })} */}
          </Grid>
        </Box>
      </Box>
      <CustomModal width={{ xs: "100%", sm: "558px" }} open={showModal} handleClose={handleClose}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "600", color: "#000", mb: 4 }}
          >
            {`Sorry, you don't qualify for an EZ Living Trust estate plan`}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#000",
              textAlign: "center",
              mb: 3,
              lineHeight: "28px",
              px: 3,
            }}
          >
            Our do it yourself legal documents are designed primarily for basic
            estate planning and probate avoidance. By not agreeing to one or
            more items below, your document needs appear to be more complex. We
            recommend you find an Estate Planning attorney to help. You can
            checking our blog for local attorneys or visit www.avvo.com
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: 2,
            }}
          >
            <Button onClick={handleClose} variant="contained">
              Review my answers
            </Button>
            {/* <Button
              variant="contained"
              sx={{ background: "#fda440" }}
              onClick={handleOpenAccountModal}
            >
              Close my account
            </Button> */}

            {/* <Button sx={{ ml: 2, backgroundColor: "#F00" }} variant="contained">
              Delete Account
            </Button> */}
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default Qualification;
