"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Pageheader from "@/components/PageHeader";
import {
  CitizenShipEnum,
  ONBOARDING_QUESTIONS,
  ONBOARDING_STRUCTURE,
  SubMarriageStatusEnum,
  TrustEnum,
  TrusteesRealtionEnum,
} from "./constants";
import TrustName from "./Tabs/Personal/TrustName";
import InitialTrustees from "./Tabs/Personal/InitialTrustees";
import Terminology from "./Tabs/Personal/Terminology";
import {
  InitialTrusteeValidator,
  TerminologyValidator,
  TrustNameValidator,
  QualificationsValidator,
  PricingValidator,
  AccountSetupValidator,
} from "@/constants/Validations/ValidatorOnboarding";
import { useUserDetailListing } from "@/provider/profile";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import AccountSetup from "./Tabs/Personal/AccountSetup";
import Qualification from "./Tabs/Personal/Qualification";
import Pricing from "./Tabs/Personal/Pricing";
import { useClientCache, useCreateClientCache } from "@/provider/ClientCache";
import { useCreateCart } from "@/provider/Cart";
import { MarriageStatusEnum } from "../types";
import moment from "moment";
import IntroModalOnboarding from "@/components/OnboardingModals/IntroModal";
import PeopleAndTipsBar from "../PeopleAndTipsBar";
import { comparePeopleInEstate } from "@/constants/PeopleInEstate";
import ConfirmationModalOnboarding from "@/components/OnboardingModals/ConfirmationModal";
import { green } from "@mui/material/colors";

import SideDrawer from "@/components/Drawer";
import { useTheme } from "@mui/material/styles";
import Tips from "@/assets/icons/Tips.svg";
import Group from "@/assets/icons/Group.svg";
import Image from "next/image";

interface Props {
  cartId?: string;
}
const formateDateTimeZone = (date: string) => {
  return date ? moment(new Date(date)).format() : "";
};

const StepsConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: "-90%",
    width: "100%",
  },
  [`&.${stepConnectorClasses.horizontal}`]: {
    background: "#000",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const validationSchemas = [
  [
    AccountSetupValidator,
    QualificationsValidator,
    PricingValidator,
    InitialTrusteeValidator,
    TerminologyValidator,
    TrustNameValidator,
  ],
];

const QuestionnairesOnboarding: React.FC<Props> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  const [drawerContentType, setDrawerContentType] = useState<
    "Tips" | "Group" | null
  >(null);
  // For Tips Drawer
  const [mobileTootips, setMobileTootips] = useState(false);
  const router = useRouter();
  const {
    isSuccess: profileSuccess,
    isLoading: profileLoading,
    data: profileData,
  } = useUserDetailListing({});
  const cacheData = useClientCache(
    profileData && {
      key: `ONBOARDING${profileData?.id}${profileData.carts?.length || 0}`,
    },
  );
  const createCart = useCreateCart({});
  const [openIntroModal, setOpenIntroModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const createClientCacheOnboarding = useCreateClientCache({});
  const childRef = useRef<React.RefObject<unknown>>();
  const [Steps, setSteps] = React.useState(ONBOARDING_STRUCTURE.steps);
  const [loading, setLoading] = React.useState(false);
  const [interviewFormValues, setInterViewFormValues] =
    React.useState(ONBOARDING_QUESTIONS);
  const activeStep = Steps.findIndex((step) => step.active);
  const activeTab = Steps[activeStep]?.tabs.findIndex((step) => step.active);

  // Handle for tips drawer in mobile
  const handleMobileToolTipDrawerClose = () => {
    setMobileTootips(false);
  };
  const handleMobileToolTipDrawerOpen = (type: "Tips" | "Group") => {
    setMobileTootips(true);
    setDrawerContentType(type);
  };

  // Smoothly scroll the active tab into view whenever it's selected or changed
  const tabRefs = useRef<any[]>([]);
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      // Scroll the active tab into view
      tabRefs.current[activeTab]?.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        inline: "center", // Scroll the active tab to the center
        block: "nearest",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    //@ts-ignore
    if (cacheData.isSuccess && cacheData?.data?.data) {
      setInterViewFormValues({
        ...interviewFormValues,
        //@ts-ignore
        ...cacheData?.data?.data,
      });
      //@ts-ignore
      sessionStorage.setItem("interviewCacheId", cacheData?.data?.id);
    }
    //@ts-ignore
    else if (cacheData.isSuccess && !cacheData?.data?.data) {
      //@ts-ignore
      setOpenIntroModal(true);
    }
    //@ts-ignore
  }, [cacheData?.data?.data]);

  const handleCloseIntroModal = () => {
    setOpenIntroModal(false);
  };

  const forms = [
    [
      <AccountSetup key={1} />,
      <Qualification key={2} />,
      <Pricing key={3} />,
      <InitialTrustees key={4} />,
      <Terminology key={5} />,
      <TrustName key={6} />,
    ],
  ];

  const FormComponent = (props: any) => {
    return (
      <>
        {activeStep < Steps.length &&
        activeTab < Steps[activeStep]?.tabs.length &&
        forms[activeStep][activeTab] ? (
          forms[activeStep][activeTab]
        ) : (
          <>
            <Typography variant="h3" sx={{ mt: 2 }}>
              Selected tab is under development
            </Typography>
          </>
        )}
      </>
    );
  };

  const TabsContent = () => {
    const methods = useForm({
      shouldUnregister: false,
      defaultValues: useMemo(() => {
        return interviewFormValues;
      }, [interviewFormValues]),
      // @ts-ignore
      resolver: validationSchemas[activeStep]?.[activeTab]
        ? // @ts-ignore
          yupResolver(validationSchemas[activeStep]?.[activeTab])
        : undefined,
      mode: "all",
    });
    const { trigger, getValues, formState } = methods;
    const handleNext = async () => {
      const isValid = await trigger();
      if (isValid) {
        createClientCacheOnboarding
          .mutateAsync({
            key: `ONBOARDING${profileData?.id}${
              profileData?.carts?.length || 0
            }`,
            data: { ...getValues() },
            form_type: 1,
          })
          .then(() => {
            if (!sessionStorage.getItem("interviewCacheId")) {
              cacheData.refetch();
            }
            if (Steps[activeStep]?.tabs.length - 1 == activeTab) {
              setInterViewFormValues({ ...getValues() });
              setConfirmationModal(true);
            }
          });
        if (comparePeopleInEstate(interviewFormValues, getValues())) {
          (childRef.current as any)?.AnimatePeople();
        }
        if (Steps[activeStep]?.tabs.length - 1 !== activeTab) {
          setSteps(
            Steps.map((step: any) => ({
              ...step,
              tabs: step.tabs.map((tab: any, j: number) => ({
                ...tab,
                active: j === activeTab + 1 ? true : false,
              })),
            })),
          );
          //@ts-ignore
          setInterViewFormValues({ ...getValues() });
        }
      }
    };

    const handlePrevious = () => {
      if (activeTab > 0) {
        setSteps(
          Steps.map((step: any, i: number) => ({
            ...step,
            tabs: step.tabs.map((tab: any, j: number) => ({
              ...tab,
              active: j === activeTab - 1 ? true : false,
            })),
          })),
        );
        //@ts-ignore
        setInterViewFormValues({ ...getValues() });
      } else {
        if (activeStep > 0)
          setSteps(
            //@ts-ignore
            Steps.map((step, i) => ({
              ...step,
              active: i === activeStep - 1,
              tabs: step.tabs.map((tab: any, j: number) => ({
                ...tab,
                active: j === step.tabs.length - 1 ? true : false,
              })),
            })),
          );
        //@ts-ignore
        setInterViewFormValues({ ...getValues() });
      }
    };

    const confirmCart = async () => {
      setLoading(true);
      setConfirmationModal(false);
      const formData: any = {
        is_mailing_address_for_doc:
          interviewFormValues?.is_mailing_address_for_doc,
        mailing_address_for_doc: interviewFormValues?.mailing_address_for_doc,
        is_qualified: true,
        end_user: interviewFormValues?.end_user,
        relation_with_end_user: interviewFormValues?.relation_with_end_user,
        is_probate_primary_home: true,
        investment_properties_count: 0,
        marriage_status:
          MarriageStatusEnum[
            interviewFormValues?.marriage_status as keyof typeof MarriageStatusEnum
          ],
        sub_marriage_status:
          SubMarriageStatusEnum[
            interviewFormValues?.additional_info as keyof typeof SubMarriageStatusEnum
          ],
        died_person: interviewFormValues?.died_person,
        deceased_date: interviewFormValues?.died_person_death_date
          ? moment(
              new Date(interviewFormValues?.died_person_death_date),
            ).format("YYYY-MM-DD")
          : undefined,
        last_married_person: interviewFormValues?.last_married_person,
        divorce_date: interviewFormValues?.last_married_person_divorce_date
          ? moment(
              new Date(interviewFormValues?.last_married_person_divorce_date),
            ).format("YYYY-MM-DD")
          : undefined,
        state: interviewFormValues?.state,
        notary: parseInt("0", 10),
        primary_trustee: {
          first_name: interviewFormValues?.primary_trustee_first_name,
          middle_name: interviewFormValues?.primary_trustee_middle_name,
          last_name: interviewFormValues?.primary_trustee_last_name,
          email: interviewFormValues?.primary_trustee_email,
          phone_no: interviewFormValues?.primary_trustee_mobile,
          date_of_birth: moment(
            new Date(interviewFormValues?.primary_trustee_date_of_birth),
          ).format("YYYY-MM-DD"),
          address: interviewFormValues?.primary_trustee_address,
          county: interviewFormValues?.primary_trustee_county,
          citizenship_status:
            CitizenShipEnum[
              interviewFormValues?.primary_trustee_citizenship as keyof typeof CitizenShipEnum
            ],
          relation_with_other_trustee:
            TrusteesRealtionEnum[
              interviewFormValues?.primary_trustee_secondary_relation as keyof typeof TrusteesRealtionEnum
            ],
          gender: interviewFormValues?.primary_trustee_gender,
        },
        // Conditionally include secondary_trustee based on marital status
        ...(interviewFormValues.marriage_status !== "SINGLE" && {
          secondary_trustee: {
            first_name: interviewFormValues?.secondary_trustee_first_name,
            middle_name: interviewFormValues?.secondary_trustee_middle_name,
            last_name: interviewFormValues?.secondary_trustee_last_name,
            email: interviewFormValues?.secondary_trustee_email,
            phone_no: interviewFormValues?.secondary_trustee_mobile,
            date_of_birth: moment(
              new Date(interviewFormValues?.secondary_trustee_date_of_birth),
            ).format("YYYY-MM-DD"),
            address: interviewFormValues?.secondary_trustee_address,
            county: interviewFormValues?.secondary_trustee_county,
            citizenship_status:
              CitizenShipEnum[
                interviewFormValues?.secondary_trustee_citizenship as keyof typeof CitizenShipEnum
              ],
            relation_with_other_trustee:
              TrusteesRealtionEnum[
                interviewFormValues?.secondary_trustee_primary_relation as keyof typeof TrusteesRealtionEnum
              ],
            gender: interviewFormValues?.secondary_trustee_gender,
          },
        }),
        trust_name:
          TrustEnum[
            interviewFormValues?.trust_status as keyof typeof TrustEnum
          ] === 2
            ? interviewFormValues?.original_trust_name
            : `The ${interviewFormValues?.complete_trust_name}${
                MarriageStatusEnum[
                  interviewFormValues?.marriage_status as keyof typeof MarriageStatusEnum
                ] == MarriageStatusEnum.COUPLE
                  ? " Family"
                  : ""
              } Living Trust`,
        trust_type:
          TrustEnum[
            interviewFormValues?.trust_status as keyof typeof TrustEnum
          ],
        trust_date:
          interviewFormValues?.original_trust_date &&
          TrustEnum[
            interviewFormValues?.trust_status as keyof typeof TrustEnum
          ] === 2
            ? formateDateTimeZone(interviewFormValues?.original_trust_date)
            : null,
        planId: interviewFormValues?.planId,
        shipping: parseInt("0", 10),
        claim: parseInt("0", 10),
      };
      const cart = await createCart.mutateAsync(formData);
      if (cart) {
        // @ts-ignore
        router.push(`/dashboards/living-trust-interview/${cart?.id}`, {
          scroll: false,
        });
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } else {
        setLoading(false);
      }
    };

    return (
      <>
        {cacheData?.isFetching || profileLoading ? (
          <Loader height="100%" minHeight="60vh" width="100%" />
        ) : (
          <FormProvider {...methods}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // minHeight: "50vh",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  height:
                    Steps.length - 1 === activeStep
                      ? "auto"
                      : { md: "50vh", lg: "55vh", xl: "60vh" },
                  overflow: "auto",
                  px: { xs: 1.5, md: 3 },
                  py: 2,
                }}
              >
                {createClientCacheOnboarding.isLoading || loading ? (
                  <Loader height="60vh" width="100%" />
                ) : (
                  <FormComponent />
                )}
              </Box>
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: (theme) => theme.additionalColors?.tablightGrey,
                  gap: { xs: 1, lg: "auto" },
                }}
              >
                <Box>
                  {!(activeStep === 0 && activeTab === 0) && (
                    <Button
                      variant="contained"
                      sx={{ px: 5, py: 1, textTransform: "none" }}
                      onClick={handlePrevious}
                    >
                      Back
                    </Button>
                  )}
                </Box>
                <Box sx={{ fontWeight: "600", display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: "600",
                      px: { xs: 1, lg: 5 },
                      py: 1,
                      textTransform: "none",
                      minWidth: "175px",
                    }}
                    onClick={handleNext}
                    disabled={createClientCacheOnboarding.isLoading}
                  >
                    Save and Next
                  </Button>
                </Box>
              </Box>
            </Box>
          </FormProvider>
        )}
        <ConfirmationModalOnboarding
          openModal={confirmationModal}
          cancelAction={() => setConfirmationModal(false)}
          handleConfirmModal={confirmCart}
        />
      </>
    );
  };

  function StepComponent(props: any) {
    const { active, completed, icon } = props;
    return (
      <Box
        sx={{
          height: "28px",
          width: "28px",
          background: (theme) =>
            active ? theme.palette.primary.main : theme.palette.primary.light,
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: (theme) =>
            active || completed
              ? theme.palette.primary.light
              : theme.palette.text.disabled,
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Roboto",
          border: (theme) =>
            active
              ? `1px solid ${theme.palette.primary.main}`
              : `1px solid ${theme.palette.text.disabled}`,
          // cursor: "pointer",
          cursor: "not-allowed",
        }}
      >
        {icon}
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            px: { xs: 1.5, md: 5 },
            py: 1,
            width: { xs: "100%", sm: "100%", md: "100%", lg: "75%", xl: "80%" },
            height: "fit-content",
            position: "relative",
          }}
        >
          <Pageheader
            title="Living Trust Questionnaire"
            // active="Couples Living Trust"
          />
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              overflowX: { xs: "scroll", md: "auto" },
              whiteSpace: { xs: "nowrap", md: "normal" },
              "&::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            {isMobile ? (
              // Mobile Version
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box position="relative" display="inline-flex" mr={2}>
                    <Box sx={{ position: "relative" }}>
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          color: theme.additionalColors?.tablightGrey,
                          width: "60px !important",
                          height: "60px !important",
                          position: "absolute",
                        }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={activeStep * 14.3 + 14.2}
                        sx={{
                          color: green[500],
                          width: "60px !important",
                          height: "60px !important",
                        }}
                      />
                    </Box>
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="caption" component="div">
                        {`${activeStep + 1} of ${Steps.length}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "500", fontSize: "16px" }}
                    >
                      {Steps[activeStep]?.title}
                    </Typography>
                    {activeStep < Steps.length - 1 && (
                      <Typography variant="caption">
                        Next: {Steps[activeStep + 1]?.title}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Button
                    onClick={() => handleMobileToolTipDrawerOpen("Tips")}
                    sx={{ height: "50px" }}
                  >
                    <Image src={Tips} alt="Tips" style={{ height: "100%" }} />
                  </Button>
                  <Button
                    onClick={() => handleMobileToolTipDrawerOpen("Group")}
                    sx={{ height: "50px" }}
                  >
                    <Image src={Group} alt="Group" style={{ height: "100%" }} />
                  </Button>
                </Box>
              </Box>
            ) : (
              // Desktop Version
              <Stepper
                activeStep={activeStep}
                sx={{
                  my: 1,
                  display: { xs: "block", md: "flex" },
                  "& .MuiStep-horizontal": {
                    display: "inline-flex",
                    flexShrink: 0,
                    width: { xs: "33.333%", md: "100%" },
                  },
                  "& .MuiStepLabel-alternativeLabel": {
                    alignItems: "start",
                    position: "relative",
                    zIndex: "9",
                  },
                }}
                alternativeLabel
                connector={<StepsConnector />}
              >
                {Steps.map((step, i) => (
                  <Step key={i}>
                    <StepLabel StepIconComponent={StepComponent}>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: { xs: "14px", md: "16px" },
                          display: "flex",
                          alignItems: "start",
                          mt: -1,
                          color: (theme) =>
                            i <= activeStep
                              ? theme.palette.text.primary
                              : theme.palette.text.disabled,
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          // fontWeight: "500",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "start",
                          color: (theme) =>
                            i == activeStep
                              ? theme.palette.text.primary
                              : theme.palette.text.disabled,
                        }}
                      >
                        Chapter {i + 1}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                overflow: "auto",
                mt: 3,
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                scrollbarWidth: "none",
              }}
            >
              {Steps[activeStep]?.tabs.map((tab, i) => (
                <Box
                  key={i}
                  ref={(el) => (tabRefs.current[i] = el)} // Attach ref to each tab box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      fontWeight: "500",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      px: 2,
                      py: activeTab > i ? 1.314 : 1.5,
                      background: (theme) =>
                        activeTab === i
                          ? theme.additionalColors?.tablightBlue
                          : activeTab < i
                          ? theme.additionalColors?.tablightGrey
                          : theme.additionalColors?.tablightBlue,
                      // border: (theme) =>
                      //   `1px solid ${theme.additionalColors?.mainBorder}`,
                      color: (theme) =>
                        activeTab === i
                          ? theme.palette.text.secondary
                          : activeTab < i
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {activeTab > i && (
                      <CheckCircleIcon sx={{ fontSize: "16px" }} />
                    )}
                    {activeTab == i && (
                      <CircleRoundedIcon sx={{ fontSize: "10px" }} />
                    )}
                    {tab.title}
                  </Box>
                  {Steps[activeStep]?.tabs.length - 1 !== i && (
                    <Box sx={{ pr: 1 }}>
                      {/* <Image src={RightArrow} alt="" /> */}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                // minHeight: "50vh",
                width: "100%",
                borderTopLeftRadius: "0px !important",
                borderTopRightRadius: "0px !important",
                borderRadius: "12px",
                boxShadow: (theme) =>
                  `0px 4px 20px 0px ${theme.additionalColors?.lightGrey}`,
              }}
            >
              <TabsContent />
            </Card>
          </Box>
        </Box>
        {/* Tips section for mobile  */}
        {isMobile ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={mobileTootips}
          >
            <SideDrawer
              open={mobileTootips}
              onClose={handleMobileToolTipDrawerClose}
              // title={drawerContent.title}
              sx={{
                width: { xs: "100%", md: "800px" },
                ".MuiPaper-root.MuiPaper-elevation": {
                  width: { xs: "100%", md: "800px" },
                  maxWidth: { xs: "100%", md: "800px" },
                },
              }}
            >
              <PeopleAndTipsBar
                innerRef={childRef}
                tipsContent={Steps[activeStep]?.tabs[activeTab].tipsContent}
                InterviewValues={interviewFormValues}
                drawerContentType={drawerContentType}
              />
            </SideDrawer>
          </Backdrop>
        ) : (
          // Tips section for Desktop
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "25%",
                xl: "20%",
              },
              minHeight: "calc(100vh - 66px)",
              overflowY: "scroll",
              background: (theme) => theme.additionalColors?.background.primary,
            }}
          >
            <PeopleAndTipsBar
              innerRef={childRef}
              tipsContent={Steps[activeStep]?.tabs[activeTab]?.tipsContent}
              InterviewValues={interviewFormValues}
            />
          </Box>
        )}
      </Box>

      <IntroModalOnboarding
        openIntroModal={openIntroModal}
        handleCloseIntroModal={handleCloseIntroModal}
      />
      {/* <VideoModal
        openVideoModal={openVideoModal}
        videoUrl="xxxxx"
        handleCloseVideoModal={handleCloseVideoModal}
      /> */}
    </>
  );
};

export default QuestionnairesOnboarding;
