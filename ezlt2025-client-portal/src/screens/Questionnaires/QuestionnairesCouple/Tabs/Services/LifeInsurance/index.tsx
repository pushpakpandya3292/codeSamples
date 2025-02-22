import { Controller, useFormContext } from "react-hook-form";
import CustomizedSwitches from "@/components/CustomSwitch";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const LifeInsurance = () => {
  const { watch, control, setValue } = useFormContext();

  return (
    <Box>
      <BoxWrapper sx={{ width: "60%" }}>
        <Typography variant="h3">Life Insurance and Estate Planning</Typography>
        <Typography sx={{ py: 1 }} variant="h5">
          Life insurance can be vital to estate planning for your family.
          Tax-free life insurance plan can help pay off the mortgage, pay estate
          taxes, burial expenses or more.
        </Typography>
        <Typography sx={{ py: 1 }} variant="h5">
          The amount of insurance coverage financial advisors recommend is an
          income replacement of a minimum of 5x’s your annual salary to ideally,
          10x’s your annually salary.
        </Typography>
        <Box>
          {/* <table
            style={{
              width: "100%",
              border: "1px solid #9d9b9b",
              textAlign: "left",
              borderRadius: "2px",
            }}
          >
            <tr>
              <th
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#073763",
                }}
              >
                Trustee
              </th>
              <th
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#073763",
                }}
              >
                Annual Salary
              </th>
              <th
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#073763",
                }}
              >
                Minimum (5yrs)
              </th>
              <th
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#073763",
                }}
              >
                Ideal (10yrs)
              </th>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                {watch("primary_trustee_first_name")}
              </td>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                ${watch("primary_trustee_estimated_annual_income")}
              </td>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                $
                {(
                  Number(
                    watch(
                      "primary_trustee_estimated_annual_income",
                    )?.replaceAll(",", ""),
                  ) * 5
                )?.toLocaleString()}
              </td>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                $
                {(
                  Number(
                    watch(
                      "primary_trustee_estimated_annual_income",
                    )?.replaceAll(",", ""),
                  ) * 10
                )?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                {watch("secondary_trustee_first_name")}
              </td>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                ${watch("secondary_trustee_estimated_annual_income")}
              </td>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                $
                {(
                  Number(
                    watch(
                      "secondary_trustee_estimated_annual_income",
                    )?.replaceAll(",", ""),
                  ) * 5
                )?.toLocaleString()}
              </td>
              <td
                style={{
                  border: "1px solid #9d9b9b",
                  padding: "4px",
                  color: "#606162",
                }}
              >
                $
                {(
                  Number(
                    watch(
                      "secondary_trustee_estimated_annual_income",
                    )?.replaceAll(",", ""),
                  ) * 10
                )?.toLocaleString()}
              </td>
            </tr>
          </table>
          <Typography
            sx={{
              fontSize: "12px",
              mt: 1,
              fontWeight: "400",
              color: "#606162",
            }}
          >
            Unknown or no salary persons still have a value to the trust estate
          </Typography> */}
          <ToggleBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography variant="h4">
              Would you like to get a free quote for life insurance?
            </Typography>
            <Controller
              name={"quote_for_life_insurance"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomizedSwitches
                  {...field}
                  setChecked={(value: boolean) => {
                    setValue("quote_for_life_insurance", value);
                  }}
                  checked={watch("quote_for_life_insurance")}
                />
              )}
            />
          </ToggleBox>
        </Box>
      </BoxWrapper>
    </Box>
  );
};

export default LifeInsurance;
