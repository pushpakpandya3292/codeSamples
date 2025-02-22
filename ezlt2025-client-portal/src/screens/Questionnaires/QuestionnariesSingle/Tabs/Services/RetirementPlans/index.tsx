import React from "react";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import dummy from "@/assets/img/financialpower.png";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  GeneralInvestingEnum,
  RetirementandInvestingPlansEnum,
  SetupIRAEnum,
} from "../../../constants";
import CustomCard from "@/components/CustomCard";
import RollOverImage from "@/assets/img/RollOver.png";
import Ira401Image from "@/assets/img/Ira401.png";
import StockindexImage from "@/assets/img/Stockindex.png";
// import { CardBox, CardInnerBox } from "../Styled";

interface RetirementPlansProps {
  // Define the props for the component here
}

const RetirementPlans: React.FC<RetirementPlansProps> = () => {
  const { control, watch, setValue } = useFormContext();
  return (
    <Box>
      <Typography variant="h2">Retirement and Investing Plans</Typography>
      <Typography variant="h5">
        Retirement plans do not need to be funded in a Living Trust as it is
        already probate protected if beneficiaries are selected.
      </Typography>
      <Typography variant="h3" sx={{ my: 2 }}>
        Would you like more information on the following services?
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={4}>
          <CustomCard
            content={`If you have an old 401(k) or 403(b) plan at your previous employer, that’s called an orphan plan.  It’s advisable to rollover your plan to an IRA that you control and can access.`}
            image={RollOverImage.src}
            title="Help rollover your old Orphan 401(k) plan"
          >
            <Controller
              name={"retirement_and_investing_plans"}
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
                    Object.keys(RetirementandInvestingPlansEnum) as Array<
                      keyof typeof RetirementandInvestingPlansEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {RetirementandInvestingPlansEnum[key]}
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
            content={`In some case, you may need to set-up a new IRA, Roth IRA, SEP IRA, 401(k) plan or Pension plan to match your needs, or change advisors.`}
            image={Ira401Image.src}
            title="Help you set up a new IRA, Roth or SEP IRA"
          >
            <Controller
              name={"setupIRA"}
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
                    Object.keys(SetupIRAEnum) as Array<
                      keyof typeof SetupIRAEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {SetupIRAEnum[key]}
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
            content={`Do you want to create or learn more about a a general brokerage account, a college 529 savings plan, UGMA or other account?  We can match you with an advisor.`}
            image={StockindexImage.src}
            title="Investing in Stocks, ETFs Index portfolios"
          >
            <Controller
              name={"general_investing"}
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
                    Object.keys(GeneralInvestingEnum) as Array<
                      keyof typeof GeneralInvestingEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {GeneralInvestingEnum[key]}
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

export default RetirementPlans;
