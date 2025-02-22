import { Box, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { BoxWrapper } from "../../../Styled";
import CustomCheckBox from "@/components/CustomCheckBox";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";

interface OtherProfessionalServicesProps {
  // Add any props you need for this component
}
const OtherProfessionalServicesOptions = [
  {
    option: "Mobile Notary Public in greater Los Angeles",
    checked: false,
  },
  {
    option: "Fiduciary Investment Advisor",
    checked: false,
  },
  {
    option: "Financial Planner",
    checked: false,
  },
  {
    option: "Tax professional (Tax Preparer or CPA)",
    checked: false,
  },
  {
    option: "Bookkeeping services",
    checked: false,
  },
  {
    option: "Real Estate agent (sell or buy)",
    checked: false,
  },
  {
    option: "Real Estate lending (traditional or reverse mortgage) ",
    checked: false,
  },
  {
    option: "Paralegal Services",
    checked: false,
  },
  {
    option: "Employment law",
    checked: false,
  },
  {
    option: "Probate attorney",
    checked: false,
  },
  {
    option: "Fiduciary Trust Executors",
    checked: false,
  },
];

const OtherProfessionalServices: React.FC<
  OtherProfessionalServicesProps
> = () => {
  const { watch, setValue, control } = useFormContext();
  const [options, setOptions] = React.useState(
    OtherProfessionalServicesOptions.map((option) => {
      return {
        ...option,
        checked: watch("ProfessionalServices")?.includes(option.option)
          ? watch("ProfessionalServices")?.includes(option.option)
          : false,
      };
    }),
  );
  return (
    <Box>
      <Typography variant="h2">Other Popular Professional Services</Typography>
      <Typography variant="h5">
        {`Clients in the greater Los Angeles area often ask us for referrals in certain professions.  We have developed relationships with several and can send a list of partners to you.`}
      </Typography>{" "}
      <BoxWrapper sx={{ width: { xs: "100%", md: "60%" }, mt: 2 }}>
        <Typography variant="h3">
          Please check all that you may be of interest to you
        </Typography>
        <Typography variant="h5">
          {`We will do our best to match you if your current referring agent or advisor does not provide this service. `}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {options.map((option, index) => (
            <CustomCheckBox
              sx={{ py: 0.2 }}
              key={index}
              setChecked={(value) => {
                const newOptions = options;
                newOptions[index].checked = value;
                setOptions(newOptions);
                setValue(`ProfessionalServices`, [
                  ...newOptions
                    .filter((opt) => opt.checked)
                    .map((opt) => opt.option),
                ]);
              }}
              checked={option.checked}
              type="CIRCLE"
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "black",
                }}
              >
                {option.option}
              </Typography>
            </CustomCheckBox>
          ))}
          <Controller
            name={"ProfessionalServicesOthers"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                {...field}
                {...renderFieldProps(error)}
                label="Other"
                sx={{ maxWidth: "350px", mt: 1 }}
              />
            )}
          />
        </Box>
      </BoxWrapper>
    </Box>
  );
};

export default OtherProfessionalServices;
