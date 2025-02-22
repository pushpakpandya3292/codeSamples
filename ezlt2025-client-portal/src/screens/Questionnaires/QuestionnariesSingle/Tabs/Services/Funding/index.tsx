import { Box, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomCheckBox from "@/components/CustomCheckBox";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "next/link";
import { BlueBoxWrapper } from "../../../Styled";
import { NEXT_PUBLIC_FUNDING_ARTICLE_URL } from "../../../../../../../config";

const Funding = () => {
  const { control, watch, setValue } = useFormContext();
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h2">Protect your Property</Typography>
      <Typography variant="h5">
        Help probate protect your major assets.
      </Typography>
      <BoxWrapper sx={{ width: { xs: "100%", md: "60%" }, mt: 2 }}>
        <Typography variant="h3">
          Fund Your Trust with at least one asset
        </Typography>
        <Typography sx={{ py: 1 }} variant="h5">
          {`Your Living Trust must be funded with at least one asset to be legally binding.  Your binder packet will included instructions on how to file your notarized Quit Claim, to put your home in your Trust name.  A second popular asset is setting up a bank checking account in the Trust name at your local bank.`}
        </Typography>
      </BoxWrapper>
      <BlueBoxWrapper sx={{ width: { xs: "100%", md: "60%" }, mt: 2 }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontWeight: 700,
          }}
          variant="h6"
        >
          Commitment to Fund your Trust
        </Typography>

        <Controller
          name="fund_your_trust"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomCheckBox
              {...field}
              setChecked={(value) => {
                setValue("fund_your_trust", value);
              }}
              checked={watch("fund_your_trust")}
              type="SQUARE"
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "black",
                }}
              >
                I commit to transfer or set-up at least one asset in my Living
                Trust within the next 6 months.
              </Typography>
              {error?.message && (
                <CustomErrorMessage error={error?.message ?? {}} />
              )}
            </CustomCheckBox>
          )}
        />
      </BlueBoxWrapper>
      <BoxWrapper sx={{ width: { xs: "100%", md: "60%" }, mt: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
          }}
          variant="h5"
        >
          To learn more about which assets you can add to your Trust, click here
          to read our Blog{" "}
          <Link
            href={NEXT_PUBLIC_FUNDING_ARTICLE_URL}
            target="_blank"
            style={{
              textDecoration: "none",
              color: theme.additionalColors?.tablightBlue,
            }}
          >
            Article{" "}
            <LaunchIcon
              sx={{
                color: "#4b8ad1",
                fontSize: "14px",
                verticalAlign: "middle",
              }}
            />
          </Link>
        </Typography>
      </BoxWrapper>
    </Box>
  );
};

export default Funding;
