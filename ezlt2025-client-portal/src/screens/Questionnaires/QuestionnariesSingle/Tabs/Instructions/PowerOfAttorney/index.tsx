import { useEffect, useState } from "react";
import { Box, Button, Grid, RadioGroup, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomCheckBox from "@/components/CustomCheckBox";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomModal from "@/components/CustomModal";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import { SpringingAuthorizationEnum } from "../../../constants";
import RecommendedChip from "@/components/RecommendedChip";

const TransactionItem = [
  {
    title: "Real Estate Transactions",
    value: "Real Estate Transactions",
    checked: false,
    key: "is_real_estate_transaction",
  },
  {
    title: "Tangible Personal Property Transactions",
    value: "Tangible Personal Property Transactions",
    checked: false,
    key: "is_personal_property",
  },
  {
    title: "Stocks and Bonds",
    value: "Stocks and Bonds",
    checked: false,
    key: "is_stocks_bonds",
  },
  {
    title: "Commodities & Options",
    value: "Commodities & Options",
    checked: false,
    key: "is_commodities",
  },
  {
    title: "Banking and Other Financial Institution Transactions ",
    value: "Banking and Other Financial Institution Transactions",
    checked: false,
    key: "is_banking_financial",
  },
  {
    title: "Business Operating Transactions",
    value: "Business Operating Transactions",
    checked: false,
    key: "is_business_operation",
  },
  {
    title: "Insurance & Annuity Transactions",
    value: "Insurance & Annuity Transactions",
    checked: false,
    key: "is_insurance_annuities",
  },
  {
    title: "Estate, Trust and Other Beneficiary Transactions ",
    value: "Estate, Trust and Other Beneficiary  Transactions",
    checked: false,
    key: "is_estate_trust_benifits",
  },
  {
    title: "Claims and Litigation",
    value: "Claims and Litigation",
    checked: false,
    key: "is_claims_litigation",
  },
  {
    title: "Personal & Family Maintenance",
    value: "Personal & Family Maintenance",
    checked: false,
    key: "is_maintenance",
  },
  {
    title: "Retirement Plan Transactions.",
    value: "Retirement Plan Transactions.",
    checked: false,
    key: "is_retirement_plan",
  },
  {
    title: "Tax matters",
    value: "Tax matters",
    checked: false,
    key: "is_tax_matters",
  },
  {
    title:
      "Benefits from Social Security, Medicare, Medicaid, or Other Governmental Programs, or Civil or Military Service.",
    value:
      "Benefits from Social Security, Medicare, Medicaid, or Other Governmental Programs, or Civil or Military Service.",
    checked: false,
    key: "is_social_benifit",
  },
];

const PowerOfAttorny = () => {
  const { control, watch, setValue } = useFormContext();
  const [openprimarytransaction, setOpenPrimaryTransaction] = useState(false);
  const [checkboxPrimary, setCheckboxPrimary] = useState(
    TransactionItem.map((element, i) => {
      return {
        key: i,
        key_name: element.key,
        title: element.title,
        checked:
          watch("select_all_for_primary_power_of_attorney")?.filter(
            (fields: any) => element.key === fields.key_name,
          )?.length === 0
            ? false
            : true,
        setChecked: (e: any, index: number) => {
          const value = [...checkboxPrimary];
          value[index].checked = e;
          setCheckboxPrimary(value);
        },
      };
    }),
  );

  const handleOpenprimarytransaction = () => {
    setOpenPrimaryTransaction(true);
  };
  const handleClosepenprimarytransaction = () => {
    setOpenPrimaryTransaction(false);
  };

  useEffect(() => {
    const selected_checbox_primary = checkboxPrimary.filter((e) => e.checked);
    setValue(
      "select_all_for_primary_power_of_attorney",
      selected_checbox_primary,
    );
    if (TransactionItem.length === selected_checbox_primary.length) {
      setValue("transactions_categories_for_primary", true);
    }
  }, [checkboxPrimary]);

  useEffect(() => {
    if (watch("select_all_for_primary_power_of_attorney") === undefined) {
      const checkBoxValues = [...checkboxPrimary];
      setValue("transactions_categories_for_primary", true);
      checkBoxValues.forEach((element, index) => {
        checkBoxValues[index].checked = true;
      });
      setCheckboxPrimary(checkBoxValues);
      setValue("select_all_for_primary_power_of_attorney", checkBoxValues);
    } else if (
      TransactionItem.length !==
      watch("select_all_for_primary_power_of_attorney")?.filter(
        (e: any) => e.checked,
      )?.length
    ) {
      setValue("transactions_categories_for_primary", false);
    }
  }, []);

  const changeAllCheckBoxes = (value: any) => {
    const checkBoxValues = [...checkboxPrimary];
    setValue("transactions_categories_for_primary", value);
    checkBoxValues.forEach((element, index) => {
      checkBoxValues[index].checked = value;
    });
    setCheckboxPrimary(checkBoxValues);
    setValue("select_all_for_primary_power_of_attorney", checkBoxValues);
  };
  return (
    <Box>
      <Typography sx={{ pb: 2 }} variant="h2">
        Power of Attorney (Financial POA)
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <BoxWrapper sx={{ p: 2 }}>
            <Typography sx={{ pb: 1, mb: "2px", display: "flex" }} variant="h3">
              Financial agents powers for&nbsp;
              <Typography
                variant="h3"
                sx={{ color: (theme) => theme.additionalColors?.tablightBlue }}
              >
                {watch("primary_trustee_first_name")}{" "}
                {watch("primary_trustee_last_name")}
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#535F6B",
                fontWeight: "400",
                pb: 2,
                lineHeight: "18px",
              }}
            >
              When do you want the POA to become effective?  Most people choose
              Effective Immediately.
            </Typography>
            <Box>
              <RadioGroup sx={{ gap: "5px" }} row>
                <Controller
                  name={"power_of_attorny_primary"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <RadioGroup {...field}>
                      <Box>
                        <CustomRadioButton
                          value={SpringingAuthorizationEnum[1]}
                          label={
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  "<strong>Effective Immediately</strong>",
                              }}
                            />
                          }
                        />
                        <RecommendedChip />
                      </Box>
                      <CustomRadioButton
                        value={SpringingAuthorizationEnum[2]}
                        label={
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                "<strong>Springing Power only -</strong> (The POA is only effective after you are declared INCAPACITATED by a medical professional.)",
                            }}
                          />
                        }
                      />
                      {error?.message && (
                        <CustomErrorMessage error={error?.message ?? {}} />
                      )}
                    </RadioGroup>
                  )}
                />
              </RadioGroup>
            </Box>
          </BoxWrapper>
          <BoxWrapper sx={{ p: 2, mt: 2 }}>
            <Box>
              <Typography
                sx={{ pb: 1, mb: "2px", display: "flex" }}
                variant="h3"
              >
                Financial agents powers by categories for&nbsp;
                <Typography
                  variant="h3"
                  sx={{
                    color: (theme) => theme.additionalColors?.tablightBlue,
                  }}
                >
                  {" "}
                  {watch("primary_trustee_first_name")}{" "}
                  {watch("primary_trustee_last_name")}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#535F6B",
                  fontWeight: "400",
                  pb: 2,
                  lineHeight: "18px",
                }}
              >
                Select the categories you will allow your agents to take
                action.  Most people choose, Select All.
              </Typography>
              {!watch("transactions_categories_for_primary") ? (
                <>
                  {checkboxPrimary
                    .filter((e) => e.checked)
                    .map((element, index) => (
                      <CustomCheckBox
                        key={index}
                        disabled={true}
                        checked={element.checked}
                        setChecked={() => { }}
                        type={"SQUARE"}
                      >
                        <Typography>{element.title}</Typography>
                      </CustomCheckBox>
                    ))}
                </>
              ) : (
                <Controller
                  name={"transactions_categories_for_primary"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomCheckBox
                      disabled={true}
                      checked={watch("transactions_categories_for_primary")}
                      setChecked={(value) => {
                        setValue("transactions_categories_for_primary", value);
                      }}
                      type={"SQUARE"}
                    >
                      <Typography>
                        All Financial Transactions <RecommendedChip />
                      </Typography>
                    </CustomCheckBox>
                  )}
                />
              )}
              <Typography
                onClick={handleOpenprimarytransaction}
                sx={{
                  borderBottom: "1px solid #FDA440",
                  width: "max-content",
                  fontSize: "13px",
                  color: "#FDA440",
                  cursor: "pointer",
                }}
              >
                View or Edit Categories
              </Typography>
            </Box>
          </BoxWrapper>
        </Grid>
      </Grid>
      {/* Primary Modal */}
      <CustomModal
        open={openprimarytransaction}
        handleClose={handleClosepenprimarytransaction}
        width={{ xs: "100%", sm: "700px" }} height="auto"
      >
        <Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            View or edit categories
          </Typography>
          <Controller
            name={"transactions_categories_for_primary"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomCheckBox
                checked={watch("transactions_categories_for_primary")}
                setChecked={changeAllCheckBoxes}
                type={"SQUARE"}
              >
                <Typography>
                  All Financial Transactions <RecommendedChip />
                </Typography>
              </CustomCheckBox>
            )}
          />
          <Typography
            sx={{
              py: 1,
              my: "4px",
              fontSize: "13px",
              fontWeight: "400",
              color: "#535F6B",
            }}
          >
            Or deselect any categories below
          </Typography>

          <Grid container spacing={2}>
            {TransactionItem?.map((el, i) => (
              <Grid xs={12} md={4} key={i} item>
                <Controller
                  name={"select_all_for_primary_power_of_attorney"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomCheckBox
                      disabled={watch("transactions_categories_for_primary")}
                      checked={checkboxPrimary[i].checked}
                      setChecked={(e) => checkboxPrimary[i].setChecked(e, i)}
                      type={"SQUARE"}
                    >
                      <Typography>{el?.value}</Typography>
                    </CustomCheckBox>
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            sx={{ mt: 3, width: "150px", height: "45px" }}
            variant="contained"
            onClick={handleClosepenprimarytransaction}
          >
            Save
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default PowerOfAttorny;
