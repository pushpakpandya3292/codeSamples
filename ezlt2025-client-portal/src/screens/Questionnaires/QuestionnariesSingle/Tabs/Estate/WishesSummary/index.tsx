import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { WishesEnum } from "../../../constants";
import { Controller, useFormContext } from "react-hook-form";
import { BlueBoxWrapper, BoxWrapper } from "../../../Styled";

const SummaryAnswers = [
  {
    title: "Successor Trustee’s responsibilities",
    key_name: WishesEnum[0],
  },
  {
    title: "Division of properties and tangible assets",
    key_name: WishesEnum[1],
  },
  {
    title: "Gifts to other people or charities",
    key_name: WishesEnum[2],
  },
  {
    title: "Retirement, life insurance and other investments",
    key_name: WishesEnum[3],
  },
  {
    title: "Pets",
    key_name: WishesEnum[4],
  },
  {
    title: "Businesses and social media",
    key_name: WishesEnum[5],
  },
  {
    title: "Loans",
    key_name: WishesEnum[6],
  },
  {
    title: "Compensation",
    key_name: WishesEnum[7],
  },
  {
    title: "Additional wishes",
    key_name: WishesEnum[8],
  },
];
const EstateWishesSummary: React.FC = () => {
  const { watch, setValue, control } = useFormContext();
  let count = 0;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Typography sx={{ pb: 1 }} variant="h2">
          Final Review: Your Living Trust wishes summary
        </Typography>
        <Typography sx={{ width: 'max-content' ,  mb: 2, color: "black" , fontWeight: 'bold' , borderRadius: 1  , background: (theme) => theme.additionalColors?.background.tertiary ,}} p={1} variant="h5">
          These answers will appear in the last page of your Living Trust.
          Please read carefully for any issues.
        </Typography>
        <BoxWrapper
          sx={{
            width: { sm: "100%", md: "100%" },
            maxHeight: "350px",
            overflow: "scroll",
          }}
        >
          {SummaryAnswers.map((answer, i) => (
            <>
              {watch(answer.key_name) && (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography
                    sx={{ mb: 1, fontSize: "15px", color: "black" }}
                    variant="h5"
                  >
                    <strong>({String.fromCharCode(count++ + 97)})</strong>
                  </Typography>
                  <Typography
                    sx={{ mb: 1, fontSize: "15px", color: "black" }}
                    variant="h5"
                  >
                    <strong>{answer.title}</strong> : &nbsp;
                    {watch(answer.key_name)}
                  </Typography>
                </Box>
              )}
            </>
          ))}
        </BoxWrapper>
      </Box>

      <BlueBoxWrapper
        sx={{
          width: { sm: "100%", md: "100%" },
          mt: 2,
        }}
      >
        <Controller
          name={"is_summary_approved"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch("is_summary_approved")}
                    sx={{ color: (theme) => theme.palette.text.disabled }}
                    onChange={(e) => {
                      setValue("is_summary_approved", e.target.checked);
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        fontSize: {xs:'14px', sm:"18px"},
                        color: "black",
                      }}
                      variant="h5"
                    >
                      <strong>
                        I have read my wishes summary and approve the text
                      </strong>
                    </Typography>
                  </Box>
                }
              />
              {error?.message && (
                <Typography
                  sx={{
                    mt: 1,
                    color: "red",
                    fontSize: {xs:'12px', sm:"13px"},
                    fontWeight: "400",
                  }}
                >
                  {error?.message}
                </Typography>
              )}
            </>
          )}
        />
        <Typography variant="h5" sx={{ fontSize: {xs:'12px', sm:"14px"}, color: "black" }}>
          * Press BACK to edit your answers
        </Typography>
      </BlueBoxWrapper>
    </Box>
  );
};

export default EstateWishesSummary;
