import { useState } from "react";
import { Box, Grid, RadioGroup, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";
import CustomRadioButton from "@/components/CustomRadioButton";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";

import {
  ArrangementModal,
  AshesModal,
  FuneralModal,
  LaidModal,
} from "./Modals";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { BurialEnum } from "../../../constants";
const BurialDecisions = () => {
  const { control, watch } = useFormContext();
  // primary modal states
  const [openAshes, setOpenAshes] = useState(false);
  const [openLaid, setOpenLaid] = useState(false);
  const [openFuneral, setOpenFuneral] = useState(false);
  const [openArrangement, setOpenArrangement] = useState(false);
  // Primary Modal Open and Close Functions
  const handleAshesOpen = () => {
    setOpenAshes(true);
  };
  const handleAshesClose = () => {
    setOpenAshes(false);
  };
  const handleFuneralOpen = () => {
    setOpenFuneral(true);
  };
  const handleFuneralClose = () => {
    setOpenFuneral(false);
  };
  const handleArrangementOpen = () => {
    setOpenArrangement(true);
  };
  const handleArrangementClose = () => {
    setOpenArrangement(false);
  };

  const handleLaidOpen = () => {
    setOpenLaid(true);
  };
  const handleLaidClose = () => {
    setOpenLaid(false);
  };

  return (
    <Box>
      <Typography sx={{ pb: 2 }} variant="h2">
        Burial and final decisions
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <BoxWrapper sx={{ p: 2, mb: 2 }}>
            <Typography sx={{ pb: 1, mb: 2, display: "flex" }} variant="h3">
              Final Decision for&nbsp;
              <Typography
                variant="h3"
                sx={{ color: (theme) => theme.additionalColors?.tablightBlue }}
              >
                {watch("primary_trustee_first_name")}{" "}
                {watch("primary_trustee_last_name")}
              </Typography>
            </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {watch("primary_trustee_first_name")}{" "}
              {watch("primary_trustee_last_name")}, what are your desired plans
              for your remains after your death?
            </Typography>
            <Controller
              name={"burial_decisions_for_primary"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <RadioGroup sx={{ mt: 1 }} {...field}>
                  <CustomRadioButton
                    value={BurialEnum[1]}
                    label={`I wish to buried`}
                  />
                  <CustomRadioButton
                    value={BurialEnum[2]}
                    label="I wish to be cremated"
                  />
                  <CustomRadioButton
                    value={BurialEnum[0]}
                    label="Unsure. Leave blank to add later or let your agents decide"
                  />
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </RadioGroup>
              )}
            />
          </BoxWrapper>
          {watch("burial_decisions_for_primary") === BurialEnum[2] ||
          watch("burial_decisions_for_primary") === BurialEnum[1] ? (
            <Box>
              <Controller
                name="body_buried_cremated_primary"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    {watch("burial_decisions_for_primary") ===
                      BurialEnum[2] && (
                      <BoxWrapper sx={{ mb: 2 }}>
                        <Typography>
                          {watch("primary_trustee_first_name")}{" "}
                          {watch("primary_trustee_last_name")}, how or where
                          would you like your ashes to be dispersed?
                        </Typography>
                        <Box
                          onClick={handleAshesOpen}
                          sx={{
                            background: (theme) =>
                              theme.additionalColors?.formInputBg,
                            p: 1,
                            borderRadius: "5px",
                            mt: 1,
                            minHeight: "70px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "400",
                              color: (theme) => theme.palette.text.primary,
                            }}
                          >
                            My wishes are that my ashes be: <br />
                            <pre>{watch("body_buried_cremated_primary")}</pre>
                          </Typography>
                          {watch("body_buried_cremated_primary") && (
                            <Edit
                              sx={{
                                fontSize: "16px",
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                background: "#fff",
                                padding: "1px",
                                borderRadius: "5px",
                              }}
                            />
                          )}
                          {error?.message && (
                            <CustomErrorMessage error={error?.message ?? {}} />
                          )}
                        </Box>
                      </BoxWrapper>
                    )}
                    {watch("burial_decisions_for_primary") ===
                      BurialEnum[1] && (
                      <BoxWrapper sx={{ mb: 2 }}>
                        <Typography>
                          {watch("primary_trustee_first_name")}{" "}
                          {watch("primary_trustee_last_name")}, how would you
                          like your body to be laid to rest?
                        </Typography>
                        <Box
                          onClick={handleLaidOpen}
                          sx={{
                            background: (theme) =>
                              theme.additionalColors?.formInputBg,
                            p: 1,
                            borderRadius: "5px",
                            mt: 1,
                            minHeight: "70px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "400",
                              color: (theme) => theme.palette.text.primary,
                            }}
                          >
                            My wishes are that my body be laid to rest: <br />
                            <pre>{watch("body_buried_cremated_primary")}</pre>
                          </Typography>
                          {watch("body_buried_cremated_primary") && (
                            <Edit
                              sx={{
                                fontSize: "16px",
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                background: "#fff",
                                padding: "1px",
                                borderRadius: "5px",
                              }}
                            />
                          )}
                          {error?.message && (
                            <CustomErrorMessage error={error?.message ?? {}} />
                          )}
                        </Box>
                      </BoxWrapper>
                    )}
                  </>
                )}
              />
              <BoxWrapper sx={{ mb: 2 }}>
                <Typography>
                  {watch("primary_trustee_first_name")}{" "}
                  {watch("primary_trustee_last_name")}, do you have a preference
                  for a funeral or memorial service?
                </Typography>
                <Controller
                  name="funeral_service_primary"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Box
                        {...field}
                        onClick={handleFuneralOpen}
                        sx={{
                          background: (theme) =>
                            theme.additionalColors?.formInputBg,
                          p: 1,
                          borderRadius: "5px",
                          mt: 1,
                          minHeight: "70px",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "400",
                            color: (theme) => theme.palette.text.primary,
                          }}
                        >
                          My funeral/memorial services are the following: <br />
                          <pre>{watch("funeral_service_primary")}</pre>
                        </Typography>
                        {watch("funeral_service_primary") && (
                          <Edit
                            sx={{
                              fontSize: "16px",
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "#fff",
                              padding: "1px",
                              borderRadius: "5px",
                            }}
                          />
                        )}
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </Box>
                    </>
                  )}
                />
              </BoxWrapper>
              <BoxWrapper sx={{ mb: 2 }}>
                <Typography>
                  {watch("primary_trustee_first_name")}{" "}
                  {watch("primary_trustee_last_name")}, have you already made
                  any arrangements to let your family know?
                </Typography>
                <Controller
                  name="post_death_arrangement_primary"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Box
                        {...field}
                        onClick={handleArrangementOpen}
                        sx={{
                          background: (theme) =>
                            theme.additionalColors?.formInputBg,
                          p: 1,
                          borderRadius: "5px",
                          mt: 1,
                          minHeight: "70px",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "400",
                            color: (theme) => theme.palette.text.primary,
                          }}
                        >
                          The following are my post-death arrangements: <br />
                          <pre>{watch("post_death_arrangement_primary")}</pre>
                        </Typography>
                        {watch("post_death_arrangement_primary") && (
                          <Edit
                            sx={{
                              fontSize: "16px",
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "#fff",
                              padding: "1px",
                              borderRadius: "5px",
                            }}
                          />
                        )}
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </Box>
                    </>
                  )}
                />
              </BoxWrapper>
            </Box>
          ) : null}
        </Grid>
      </Grid>
      {/* Primary modal */}
      <AshesModal open={openAshes} handleClose={handleAshesClose} />
      <FuneralModal open={openFuneral} handleClose={handleFuneralClose} />
      <ArrangementModal
        open={openArrangement}
        handleClose={handleArrangementClose}
      />
      <LaidModal open={openLaid} handleClose={handleLaidClose} />
    </Box>
  );
};

export default BurialDecisions;
