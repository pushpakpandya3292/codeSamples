import React from "react";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import dummy from "@/assets/img/financialpower.png";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  HealthInsuranceEnum,
  MedicareInsuranceEnum,
  MortgageInsuranceEnum,
} from "../../../constants";
import LifeInsuranceImage from "@/assets/img/LifeInsurance.png";
import HealthInsuranceImage from "@/assets/img/HealthInsurance.png";
import MedicareHealthImage from "@/assets/img/MedicareHealth.png";
import CustomCard from "@/components/CustomCard";

interface InsurancePlanningProps {
  // Define the props for your component here
}

const InsurancePlanning: React.FC<InsurancePlanningProps> = () => {
  // Add your component logic here
  const { control, watch, setValue } = useFormContext();
  return (
    <Box>
      <Typography variant="h2">Insurance for Estate Planning</Typography>
      <Typography variant="h5">
        Insurance plans that can help with your plans for your future
      </Typography>
      <Typography variant="h3" sx={{ my: 2 }}>
        Would you like more information on the following services?
      </Typography>
      <Grid container spacing={2} columnSpacing={5}>
        <Grid item xs={12} lg={4}>
          <CustomCard
            content={`Financial planners recommend at least 10 times your salary for each Trustee to help pay the mortgage, estate taxes or simply maintain the financial stability of the home.`}
            image={LifeInsuranceImage.src}
            secondaryTitle="Term or permanent"
            title="Mortgage or Life Insurance"
          >
            <Controller
              name={"mortgage_or_life_Insurance"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={"Select one"}
                  sx={{ mt: 1 }}
                  select
                >
                  {(
                    Object.keys(MortgageInsuranceEnum) as Array<
                      keyof typeof MortgageInsuranceEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {MortgageInsuranceEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CustomCard
            content={`Most employees are able to get coverage from their employer, however many entrepreneurs and small business owners may need help shopping for the best prices.`}
            image={HealthInsuranceImage.src}
            secondaryTitle="Individual, family or small business"
            title="Health Insurance"
          >
            <Controller
              name={"health_insurance"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={"Select one"}
                  sx={{ mt: 1 }}
                  select
                >
                  {(
                    Object.keys(HealthInsuranceEnum) as Array<
                      keyof typeof HealthInsuranceEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {HealthInsuranceEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <CustomCard
            content={`Are your turning 65 soon? You have Medicare but interested in switching plans? Medicare can be confusing and it's best to find a certified Medicare agent near you.`}
            image={MedicareHealthImage.src}
            secondaryTitle="Supplement or Advantage plans"
            title="Medicare Insurance"
          >
            <Controller
              name={"medicare_insurance"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={"Select one"}
                  sx={{ mt: 1 }}
                  select
                >
                  {(
                    Object.keys(MedicareInsuranceEnum) as Array<
                      keyof typeof MedicareInsuranceEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {MedicareInsuranceEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </CustomCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsurancePlanning;
