import { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import TipsModal, { ITip } from "./TipsModal";
import WizardForm from "./FormSteps";
import { useFormContext } from "react-hook-form";
import { AnswerCategoryEnum, WishesEnum } from "../../../constants";
import { sampleAnswersForCouple } from "@/constants/SampleAnswer";
import VideoModal from "@/components/VideoModal/VideoModal";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import { TutorialText } from "./Styled";
import { useSampleAnswerDetailsListing } from "@/provider/SampleAnswer";
import SampleAnswerPreview from "@/components/SampleAnswers";

const EstateWishes = () => {
  const {
    watch,
    setValue,
    trigger,
    getFieldState,
    formState: { errors },
  } = useFormContext();
  const [step, setStep] = useState<number>(1);
  const wishKey = WishesEnum[step - 1] as keyof typeof sampleAnswersForCouple;
  const [openTips, setOpenTips] = useState<HTMLButtonElement | null>(null);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const sampleAnsers = useSampleAnswerDetailsListing({
    marriageStatus: 1,
    category: AnswerCategoryEnum[wishKey as keyof typeof AnswerCategoryEnum],
  });
  const steps = [
    "Powers",
    "Major assets",
    "Gifts to others",
    "Insurance",
    "Pets",
    "Business",
    "Loans",
    "Compensation",
    "Other",
  ];

  useEffect(() => {
    setValue("is_next_disabled", true);
  }, []);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    setOpenTips(event.currentTarget);
  };
  const handleClose = () => {
    setOpenTips(null);
  };

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
  };
  const nextStep = async () => {
    trigger(`${WishesEnum[step - 1]}`).then(() => {
      if (!errors[`${WishesEnum[step - 1]}`]) {
        setStep((prevStep) => prevStep + 1);
        if (step + 1 === steps.length) {
          setValue("is_next_disabled", false);
          trigger();
        }
      }
    });
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    if (step === steps.length) {
      setValue("is_next_disabled", true);
      trigger();
    }
  };

  const insertTextToField = (text: string) => {
    const addToNewLine = watch(wishKey) ? `\n` : "";
    setValue(wishKey, watch(wishKey) + addToNewLine + text);
    setValue(wishKey + "_skip", false);
    setValue(wishKey + "_approve", false);
    trigger(wishKey);
  };

  const MAX_STEP = 9;

  return (
    <Box>
      <BoxWrapper mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={3} sx={{
             "@media (min-width:1520px)": {
              position: 'absolute'
            },
          }}>
            <Box
              sx={{
                background: "white",
                p: 2,
                px: { xs: 1, xl: 4 },
                borderRadius: 0,
                display: "flex",
                flexDirection: { xs: "row", xl: "column" },
                width: "100%",
                overflow: "hidden",
                overflowX: "scroll",
                "@media (min-width:1520px)": { 
                  position: 'absolute',
                  left: '9px',
                  width: '180px',
                  paddingRight: '0px !important',
                  overflowX: 'hidden',
                  padding: '0px',
                  marginTop: '1px',
                },
                "@media (min-width: 1536px)" : {
                  paddingLeft: '0px'
                }
              }}
            >
              {steps.map((tab, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                   "@media (min-width:1520px)": {
                        fontSize: "14px",
                        border: `${step - 1 === i ? '2px solid #073763' : 'none'}` ,
                        borderRight: `${step - 1 === i ? '6px solid #f9fbff' : 'none'}`,
                        left: `${step - 1 === i ? '1px' : '-1px'}` ,
                        zIndex: '99',
                        position: 'relative' ,
                        backgroundColor: `${step - 1 === i ? '#f9fbff' : 'transparent'}`
                      },
                    
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      fontWeight: "500",
                      px: { xs: 0, lg: 1 },
                      mr: { xs: 1, lg: "auto" },
                      py: 1,
                      alignItems: "center",
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      gap: { xs: 1, lg: 2 },
                    }}
                  >
                    {step - 1 === i ? (
                      <AdjustRoundedIcon
                        sx={{ color: (theme) => theme.palette.primary.main }}
                      />
                    ) : step - 1 < i ? (
                      <AdjustRoundedIcon sx={{ color: "grey" }} />
                    ) : (
                      <CheckCircleRoundedIcon
                        sx={{ color: (theme) => theme.palette.success.main }}
                      />
                    )}
                    <span>
                      {/* {i + 1} <br /> */}
                      {tab}
                    </span>
                  </Box>
                  {/* {steps.length - 1 !== i && (
                    <Divider
                      orientation="vertical"
                      sx={{ height: "20px", alignSelf: "start", ml: 2.5 }}
                    />
                  )} */}
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid  item xs={12} lg={12} md={9} xl={12} sx={{
             "@media (min-width:1520px)": {
             marginLeft: '11.6rem' ,
             marginTop: '1.6rem',
             border: '2px solid #073763' ,
             overflow: 'hidden',
             position: 'relative', 
             paddingRight: '10px',
             paddingBottom: '10px',
             backgroundColor: '#f9fbff'
            },
          }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Typography sx={{ pb: 1 }} variant="h2">
                  Wishes for your Estate
                </Typography>
                <TutorialText
                  onClick={() => {
                    setOpenVideoModal(true);
                  }}
                >
                  <PlayCircleFilledRoundedIcon /> Overview: Your Trust Wishes
                </TutorialText>
              </Box>
              <Typography variant="h5">
                {step === 1
                  ? "You can type a custom answer for each category, skip a category if it does not apply to copy and paste a sample answer to edit "
                  : " For each category, you can enter, edit or copy and paste sample answers."}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                pb: 3,
              }}
            >
              <Box>
                <WizardForm
                  //@ts-ignore
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  step={step}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  padding: "0 10px",
                  justifyContent: "space-between",
                  width: { sm: "100%", xl: "32%" },
                  alignSelf: { xs: "auto", sm: "flex-end" },
                  marginTop: { xs: "20px", xl: "-60px" },
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<KeyboardBackspaceIcon sx={{ width: "16px" }} />}
                  onClick={prevStep}
                  disabled={step === 1}
                  sx={{
                    opacity: step === 1 ? "0" : "1",
                    // display: step === 1 ? "none" : "flex",
                    fontSize: "12px",
                    // width: step === MAX_STEP ? "100%" : "auto",
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  endIcon={
                    <KeyboardBackspaceIcon
                      sx={{ transform: "rotate(180deg)", width: "16px" }}
                    />
                  }
                  onClick={nextStep}
                  disabled={step === MAX_STEP}
                  sx={{
                    opacity: step === MAX_STEP ? "0" : "1",
                    // display: step === MAX_STEP ? "none" : "flex",
                    fontSize: "12px",
                    // width: step === 1 ? "100%" : "auto",
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </BoxWrapper>
      {/* <TipsModal
        anchorEl={openTips}
        handleClose={handleClose}
        suggestion={suggestion}
      /> */}
      <SampleAnswerPreview
        anchorEl={openTips}
        handleClose={handleClose}
        SampleAnswerlisting={sampleAnsers?.data}
        isLoading={sampleAnsers.isLoading}
        insertText={insertTextToField}
      />
       <VideoModal
        openVideoModal={openVideoModal}
        videoUrl={"xxxxx"}
        handleCloseVideoModal={handleCloseVideoModal}
      />
    </Box>
  );
};

export default EstateWishes;
