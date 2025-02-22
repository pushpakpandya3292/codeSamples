"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
import PeopleAndTipsBar from "../PeopleAndTipsBar";
import {
  CitizenShipEnum,
  LIVING_TRUST_QUESTIONS,
  LIVING_TRUST_STRUCTURE,
  MarriageStatusEnum,
  SubMarriageStatusEnum,
  TrustEnum,
  TrusteesRealtionEnum,
} from "./constants";
import TrustName from "./Tabs/Personal/TrustName";
import InitialTrustees from "./Tabs/Personal/InitialTrustees";
import Terminology from "./Tabs/Personal/Terminology";
import OurFamily from "./Tabs/People/OurFamily";
import OtherChildren from "./Tabs/People/OtherChildren";
import SuccessorTrustees from "./Tabs/People/SuccessorTrustees";
import HealthAgents from "./Tabs/People/HealthAgents";
import FinancialAgents from "./Tabs/People/FinancialAgents";
import Guardians from "./Tabs/People/Guardians";
import {
  AcknowledgmentAndAgrementValidator,
  EstateWishesValidator,
  BurialDecisionsValidator,
  FinancialAgentValidator,
  GaurdiansValidator,
  HealthAgentValidator,
  HealthDecisionsValidator,
  NotaryValidator,
  OtherChildrenValidator,
  OtherPropertiesValidator,
  OurFamilyValidator,
  PowerOfAttorneyValidator,
  PrimaryHomeValidator,
  InitialTrusteeValidator,
  SigningDateValidator,
  SuccessorTrusteesValidator,
  TerminologyValidator,
  TrustNameValidator,
  WitnessValidator,
  FundingYourTrustValidator,
  EstateWishesSummaryValidator,
  DeliveryMethodValidator,
  InsaurancePlanningValidator,
  RetirementPlansValidator,
  PaymentMethodValidator,
} from "@/constants/Validations/ValidatorCouple";
import PowerOfAttorny from "./Tabs/Instructions/PowerOfAttorney";
import HealthDecisions from "./Tabs/Instructions/HealthDecisions";
import Witnesses from "./Tabs/Officialize/Witnesses";
import Notary from "./Tabs/Officialize/Notary";
import SigningDate from "./Tabs/Officialize/SigningDate";
import AcknowledgmentAndAgrement from "./Tabs/Officialize/AcknowledgmentAndAgrement";
import BurialDecisions from "./Tabs/Instructions/BurialDecisions";
import PrimaryHome from "./Tabs/Estate/PrimaryHome";
import OtherProperty from "./Tabs/Estate/OtherProperty";
import EstateWishes from "./Tabs/Estate/EstateWishes";
import {
  useCreateInterviewClientCache,
  useInterviewClientCache,
} from "@/provider/InterviewCache";
import { useClientDetail } from "@/provider/ClientDetail";
import Review from "./Tabs/Review/Summary";
import { useUserDetailListing } from "@/provider/profile";
import Funding from "./Tabs/Services/Funding";
import InterviewDocument from "./Tabs/Review/InterviewDocument";
import StripeCheckout from "./Tabs/Review/InterviewCheckout";
import Loader from "@/components/Loader";
import { formatDataCouple } from "../dataMiddleWare";
import { useQuestionnaire } from "@/provider/questionnaire";
import { toast } from "react-toastify";
import EstateWishesSummary from "./Tabs/Estate/WishesSummary";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import AccountSetup from "./Tabs/Personal/AccountSetup";
import Qualification from "./Tabs/Personal/Qualification";
import Pricing from "./Tabs/Personal/Pricing";
import DeliveryMethod from "./Tabs/Officialize/DeliveryMethod";
import { comparePeopleInEstate } from "@/constants/PeopleInEstate";
import InsurancePlanning from "./Tabs/Services/InsurancePlanning";
import RetirementPlans from "./Tabs/Services/RetirementPlans";
import OtherProfessionalServices from "./Tabs/Services/OtherProfessionalServices";
import LegalAdviceInsurance from "./Tabs/Services/LegalAdviceInsurance";
import PaymentMethodSelection from "./Tabs/Review/PaymentMethod";
import { green } from "@mui/material/colors";

import SideDrawer from "@/components/Drawer";
import { useTheme } from "@mui/material/styles";
import Tips from "@/assets/icons/Tips.svg";
import Group from "@/assets/icons/Group.svg";

interface Props {
  cartId?: string;
}

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
    undefined,
    undefined,
    undefined,
    InitialTrusteeValidator,
    TerminologyValidator,
    TrustNameValidator,
  ],
  [
    OurFamilyValidator,
    OtherChildrenValidator,
    SuccessorTrusteesValidator,
    HealthAgentValidator,
    FinancialAgentValidator,
    GaurdiansValidator,
  ],
  [
    PowerOfAttorneyValidator,
    HealthDecisionsValidator,
    BurialDecisionsValidator,
  ],
  [
    PrimaryHomeValidator,
    OtherPropertiesValidator,
    EstateWishesValidator,
    EstateWishesSummaryValidator,
  ],
  [
    DeliveryMethodValidator,
    WitnessValidator,
    NotaryValidator,
    SigningDateValidator,
    AcknowledgmentAndAgrementValidator,
  ],
  [
    FundingYourTrustValidator,
    InsaurancePlanningValidator,
    RetirementPlansValidator,
    undefined,
    undefined,
  ],
  [undefined, undefined, PaymentMethodValidator, undefined],
];

const QuestionnairesCouple: React.FC<Props> = ({ cartId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "lg"));
  const [drawerContentType, setDrawerContentType] = useState<
    "Tips" | "Group" | null
  >(null);
  // For Tips Drawer
  const [mobileTootips, setMobileTootips] = useState(false);
  const {
    isSuccess: profileSuccess,
    isLoading: profileLoading,
    data: profileData,
  } = useUserDetailListing({});
  const cacheData = useInterviewClientCache({
    key: "INTERVIEW" + `${cartId}`,
  });
  const [openVideoModal, setOpenVideoModal] = useState(true);
  const createClientCacheInterView = useCreateInterviewClientCache({});
  const createQuestionnaire = useQuestionnaire({});
  const {
    data: clientDetailData,
    isSuccess: clientDetailApiSuccess,
    isFetching: clientDetailApiFetching,
    refetch: clientDetailApiRefetch,
  } = useClientDetail({
    id: profileData?.carts?.find((cart: any) => {
      return cart.id === cartId;
    })?.clientDetail?.id,
  });
  const childRef = useRef<React.RefObject<unknown>>();
  const [Steps, setSteps] = React.useState(LIVING_TRUST_STRUCTURE.steps);
  const [interviewFormValues, setInterViewFormValues] = React.useState(
    LIVING_TRUST_QUESTIONS,
  );
  const activeStep = Steps.findIndex((step) => step.active);
  const activeTab = Steps[activeStep]?.tabs.findIndex((step) => step.active);
  const getKeyOfEnum = (enumObject: any, value: any) => {
    return enumObject
      ? (Object.keys(enumObject)?.find(
          (key) => enumObject[key] === value,
        ) as string)
      : ("" as string);
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

  // Handle for tips drawer in mobile
  const handleMobileToolTipDrawerClose = () => {
    setMobileTootips(false);
  };
  const handleMobileToolTipDrawerOpen = (type: "Tips" | "Group") => {
    setMobileTootips(true);
    setDrawerContentType(type);
  };

  useEffect(() => {
    if (cacheData.isSuccess && cacheData?.data?.data) {
      if (cacheData?.data?.data?.steps_completed) {
        setSteps(
          Steps.map((step, i) => ({
            ...step,
            active: i === cacheData?.data?.data?.steps_completed,
            tabs: step.tabs.map((tab: any, j: number) => ({
              ...tab,
              active: j === 0 ? true : false,
            })),
          })),
        );
      }
      setInterViewFormValues({
        ...interviewFormValues,
        //@ts-ignore
        ...cacheData.data?.data,
        complete_trust_name: cacheData.data?.data?.complete_trust_name,
        //@ts-ignore
        plan_id: profileData?.carts.find((cart: any) => {
          return cart.id === cartId;
        })?.planId,
        userId: profileData?.id,
        userEmail: profileData?.email,
        cartId: cartId,
        clientDetailId: profileData?.carts.find((cart: any) => {
          return cart.id === cartId;
        })?.clientDetail?.id,
      });
    }
    if (clientDetailApiSuccess && clientDetailData && !cacheData.isLoading) {
      if (!cacheData?.data?.data) {
        const data = {
          ...interviewFormValues,
          mailing_address_for_doc: clientDetailData?.mailing_address_for_doc,
          is_mailing_address_for_doc:
            clientDetailData?.is_mailing_address_for_doc,
          additional_info: getKeyOfEnum(
            SubMarriageStatusEnum,
            clientDetailData?.sub_marriage_status,
          ), //enum
          is_qualified: "yes",
          is_allowed_by_other: "yes",
          end_user: clientDetailData?.end_user,
          relation_with_end_user: clientDetailData?.relation_with_end_user,
          is_probate_primary_home: clientDetailData?.is_probate_primary_home,
          investment_properties_count:
            clientDetailData?.investment_properties_count,
          state: clientDetailData?.state,
          default_state: clientDetailData?.state == "CA" ? "CA" : "otherState",
          notary: clientDetailData?.notary,
          died_person: clientDetailData?.died_person,
          died_person_death_date: clientDetailData?.deceased_date,
          last_married_person: clientDetailData?.last_married_person,
          last_married_person_divorce_date: clientDetailData?.divorce_date,
          original_trust_name:
            getKeyOfEnum(TrustEnum, clientDetailData?.trust_type) == "new"
              ? ""
              : clientDetailData?.trust_name,
          trust_name_confirmed: true,
          trust_status: getKeyOfEnum(TrustEnum, clientDetailData?.trust_type), //enum
          is_original_and_restated:
            getKeyOfEnum(TrustEnum, clientDetailData?.trust_type) == "new"
              ? false
              : true,
          original_trust_date: clientDetailData?.trust_date || "",
          primary_trustee_first_name:
            clientDetailData?.PrimaryTrustee?.first_name,
          primary_trustee_middle_name:
            clientDetailData?.PrimaryTrustee?.middle_name,
          primary_trustee_last_name:
            clientDetailData?.PrimaryTrustee?.last_name,
          primary_trustee_email: clientDetailData?.PrimaryTrustee?.email,
          primary_trustee_mobile: clientDetailData?.PrimaryTrustee?.phone_no,
          primary_trustee_date_of_birth:
            clientDetailData?.PrimaryTrustee?.date_of_birth,
          primary_trustee_citizenship: getKeyOfEnum(
            CitizenShipEnum,
            clientDetailData?.PrimaryTrustee?.citizenship_status,
          ), //enum
          primary_trustee_address: clientDetailData?.PrimaryTrustee?.address,
          primary_home_address: clientDetailData?.PrimaryTrustee?.address,
          primary_trustee_county: clientDetailData?.PrimaryTrustee?.county,
          secondary_trustee_first_name:
            clientDetailData?.SecondaryTrustee?.first_name,
          secondary_trustee_middle_name:
            clientDetailData?.SecondaryTrustee?.middle_name,
          secondary_trustee_last_name:
            clientDetailData?.SecondaryTrustee?.last_name,
          secondary_trustee_email: clientDetailData?.SecondaryTrustee?.email,
          secondary_trustee_mobile:
            clientDetailData?.SecondaryTrustee?.phone_no,
          secondary_trustee_date_of_birth:
            clientDetailData?.SecondaryTrustee?.date_of_birth,
          secondary_trustee_citizenship: getKeyOfEnum(
            CitizenShipEnum,
            clientDetailData?.SecondaryTrustee?.citizenship_status,
          ),
          secondary_trustee_address:
            clientDetailData?.SecondaryTrustee?.address,
          secondary_trustee_county: clientDetailData?.SecondaryTrustee?.county,
          primary_trustee_secondary_relation: getKeyOfEnum(
            TrusteesRealtionEnum,
            clientDetailData?.PrimaryTrustee?.relation_with_other_trustee,
          ), //enum
          primary_trustee_gender: clientDetailData?.PrimaryTrustee?.gender,
          secondary_trustee_gender: clientDetailData?.SecondaryTrustee?.gender, //enum
          secondary_trustee_primary_relation: getKeyOfEnum(
            TrusteesRealtionEnum,
            clientDetailData?.SecondaryTrustee?.relation_with_other_trustee,
          ), //enum
          property_type_question: clientDetailData?.property_type,
          complete_trust_name: clientDetailData?.trust_name,
          marriage_status: getKeyOfEnum(
            MarriageStatusEnum,
            clientDetailData?.marriage_status,
          ),
          planId: profileData?.carts.find((cart: any) => {
            return cart.id === cartId;
          })?.planId as string,
          plan_id: profileData?.carts.find((cart: any) => {
            return cart.id === cartId;
          })?.planId,
          userId: profileData?.id,
          userEmail: profileData?.email,
          cartId: cartId,
          clientDetailId: profileData?.carts.find((cart: any) => {
            return cart.id === cartId;
          })?.clientDetail?.id,
          defaultPromoCode: profileData?.defaultPromoCode,
        };
        setInterViewFormValues(data);
        createClientCacheInterView.mutate({
          key: "INTERVIEW" + `${cartId}`,
          data: {
            ...data,
          },
          form_type: 2,
        });
      }
    }
  }, [cacheData?.data?.data, clientDetailData, cacheData.isLoading]);

  useEffect(() => {
    if (profileSuccess) {
      clientDetailApiRefetch();
    }
  }, [profileSuccess, profileLoading, cartId]);

  useEffect(() => {
    if (createQuestionnaire?.error) {
      toast.error("Failed to submit request", { position: "top-right" });
    }
  }, [createQuestionnaire?.error]);

  const handleStepChange = (index: number) => {
    if (index <= interviewFormValues?.steps_completed) {
      setSteps(
        Steps.map((step, i) => ({
          ...step,
          active: i === index,
          tabs: step.tabs.map((tab: any, j: number) => ({
            ...tab,
            active: activeStep === index ? j === activeTab : j === 0,
          })),
        })),
      );
    }
  };

  const handleChangeForPdf = () => {
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
    } else {
      setSteps(
        Steps.map((step, i) => ({
          ...step,
          active: i === activeStep + 1,
          tabs: step.tabs.map((tab: any, j: number) => ({
            ...tab,
            active: j === 0 ? true : false,
          })),
        })),
      );
    }
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
    [
      <OurFamily key={1} />,
      <OtherChildren key={2} />,
      <SuccessorTrustees key={3} />,
      <HealthAgents key={4} />,
      <FinancialAgents key={5} />,
      <Guardians key={6} />,
    ],
    [
      <PowerOfAttorny key={1} />,
      <HealthDecisions key={2} />,
      <BurialDecisions key={3} />,
    ],
    [
      <PrimaryHome key={1} />,
      <OtherProperty key={2} />,
      <EstateWishes key={3} />,
      <EstateWishesSummary key={4} />,
    ],
    [
      <DeliveryMethod key={1} />,
      <Witnesses key={2} />,
      <Notary key={3} />,
      <SigningDate key={4} />,
      <AcknowledgmentAndAgrement key={5} />,
    ],
    [
      <Funding key={1} />,
      <InsurancePlanning key={2} />,
      <RetirementPlans key={3} />,
      <OtherProfessionalServices key={4} />,
      <LegalAdviceInsurance key={5} />,
    ],
    [
      <Review key={1} handleChange={handleStepChange} />,
      <InterviewDocument
        key={2}
        handleStepChange={handleChangeForPdf}
        data={profileData}
      />,
      <PaymentMethodSelection key={3} />,
      <StripeCheckout key={4} />,
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
    const { trigger, getValues } = methods;
    const handleNext = async () => {
      const isValid = await trigger();
      if (isValid) {
        setInterViewFormValues({
          ...getValues(),
          living_childern:
            getValues("living_childern_details")?.length === 0
              ? false
              : getValues("living_childern"),
          deceased_childern:
            getValues("deceased_childern_details")?.length === 0
              ? false
              : getValues("deceased_childern"),
          primary_trustee_childern:
            getValues("primary_trustee_childern_details")?.length === 0
              ? false
              : getValues("primary_trustee_childern"),
          secondary_trustee_childern:
            getValues("secondary_trustee_childern_details")?.length === 0
              ? false
              : getValues("secondary_trustee_childern"),
          steps_completed:
            Steps.length - 2 === activeStep &&
            Steps[activeStep]?.tabs.length - 1 === activeTab
              ? Steps.length - 1
              : activeStep > getValues()?.steps_completed
              ? activeStep
              : getValues()?.steps_completed,
          steps_completed_percentage: parseInt(
            `${
              (Steps.length - 2 === activeStep &&
              Steps[activeStep]?.tabs.length - 1 === activeTab
                ? Steps.length - 1
                : activeStep > getValues()?.steps_completed
                ? activeStep
                : getValues()?.steps_completed) * 16.66666666666667
            }`,
          ),
        });
        createClientCacheInterView.mutate({
          key: "INTERVIEW" + `${cartId}`,
          data: {
            ...getValues(),
            living_childern:
              getValues("living_childern_details")?.length === 0
                ? false
                : getValues("living_childern"),
            deceased_childern:
              getValues("deceased_childern_details")?.length === 0
                ? false
                : getValues("deceased_childern"),
            primary_trustee_childern: !(
              getValues("primary_trustee_childern_details")?.length === 0
            ),
            secondary_trustee_childern: !(
              getValues("secondary_trustee_childern_details")?.length === 0
            ),
            steps_completed:
              Steps.length - 2 === activeStep &&
              Steps[activeStep]?.tabs.length - 1 === activeTab
                ? Steps.length - 1
                : activeStep > getValues()?.steps_completed
                ? activeStep
                : getValues()?.steps_completed,
            steps_completed_percentage: parseInt(
              `${
                (Steps.length - 2 === activeStep &&
                Steps[activeStep]?.tabs.length - 1 === activeTab
                  ? Steps.length - 1
                  : activeStep > getValues()?.steps_completed
                  ? activeStep
                  : getValues()?.steps_completed) * 16.66666666666667
              }`,
            ),
          },
          form_type: 2,
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
        } else {
          setSteps(
            Steps.map((step, i) => ({
              ...step,
              active: i === activeStep + 1,
              tabs: step.tabs.map((tab: any, j: number) => ({
                ...tab,
                active: j === 0 ? true : false,
              })),
            })),
          );
        }
        if (activeTab === 0 && Steps.length - 1 === activeStep) {
          const data = {
            ...formatDataCouple(getValues()),
            clientDetailId: profileData?.carts.find((cart: any) => {
              return cart.id === cartId;
            })?.clientDetail?.id,
          };
          createQuestionnaire.mutate(data as { [X: string]: any });
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
        setInterViewFormValues({ ...getValues() });
      } else {
        if (activeStep > 0)
          setSteps(
            Steps.map((step, i) => ({
              ...step,
              active: i === activeStep - 1,
              tabs: step.tabs.map((tab: any, j: number) => ({
                ...tab,
                active: j === step.tabs.length - 1 ? true : false,
              })),
            })),
          );
        setInterViewFormValues({ ...getValues() });
      }
    };

    return (
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
                  : { md: "50vh", lg: "50vh", xl: "62vh" },
              overflow: "auto",
              px: 3,
              py: 2,
            }}
          >
            {createClientCacheInterView.isLoading ||
            createQuestionnaire.isLoading ||
            cacheData.isLoading ? (
              <Loader height="60vh" width="100%" />
            ) : (
              <FormComponent />
            )}
          </Box>
          <Box
            sx={{
              mt: 3,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: "5px", md: "inherit" },
              background: (theme) => theme.additionalColors?.tablightGrey,
            }}
          >
            <Box>
              {!(activeStep === 0 && activeTab === 0) && (
                <Button
                  variant="contained"
                  sx={{
                    px: { xs: 0, md: 5 },
                    py: { xs: 1, md: 1 },
                    textTransform: "none",
                  }}
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              )}
            </Box>
            <Box sx={{ fontWeight: "600", display: "flex", gap: 2 }}>
              {!(
                Steps.length - 1 === activeStep &&
                Steps[activeStep].tabs.length - 1 === activeTab
              ) && (
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "600",
                    px: { xs: 0, md: 5 },
                    py: { xs: 1, md: 1 },
                    textTransform: "none",
                    minWidth: "175px",
                    background:
                      (Steps[activeStep]?.tabs[activeTab] as any)
                        ?.buttonContent === "Approve and Next"
                        ? (theme) => theme.palette.error.dark
                        : "",
                  }}
                  onClick={handleNext}
                  disabled={
                    createClientCacheInterView.isLoading ||
                    (Steps.length - 4 === activeStep &&
                    Steps[activeStep].tabs.length - 2 === activeTab
                      ? getValues("is_next_disabled")
                      : false)
                  }
                >
                  {Steps.length - 1 !== activeStep
                    ? "Save and Next"
                    : (Steps[activeStep]?.tabs[activeTab] as any)
                        ?.buttonContent}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </FormProvider>
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
            active
              ? theme.palette.primary.main
              : interviewFormValues.steps_completed >= icon - 1
              ? theme.additionalColors?.darkGreen
              : theme.palette.primary.light,
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
              : interviewFormValues.steps_completed >= icon - 1
              ? theme.palette.success.main
              : `1px solid ${theme.palette.text.disabled}`,
          // cursor: "pointer",
          cursor:
            icon <= interviewFormValues?.steps_completed + 1
              ? "pointer"
              : "not-allowed",
        }}
      >
        {interviewFormValues.steps_completed >= icon - 1 && !active ? (
          <CheckIcon
            fontSize="small"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
        ) : (
          icon
        )}
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
          <Pageheader title="Living Trust Questionnaire" />
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
                  <Step key={i} onClick={() => handleStepChange(i)}>
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
                          fontSize: { xs: "12px", md: "14px" },
                          display: "flex",
                          alignItems: "start",
                          color: (theme) =>
                            interviewFormValues.steps_completed > i - 1 &&
                            i !== activeStep
                              ? theme.additionalColors?.darkGreen
                              : i === activeStep
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
                // px: 3,
                // py: 2,
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
      {/* {clientDetailApiSuccess && clientDetailData?.stepsCompleted === 0 && (
        <VideoModal
          openVideoModal={openVideoModal}
          videoUrl="https://youtu.be/0KR2UqA3Hx8"
          handleCloseVideoModal={handleCloseVideoModal}
        />
      )} */}
    </>
  );
};

export default QuestionnairesCouple;
