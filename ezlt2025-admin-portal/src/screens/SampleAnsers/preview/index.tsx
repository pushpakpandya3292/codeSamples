import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
} from "@mui/material";
import { CopyAll, Done, ExpandLess, ExpandMore } from "@mui/icons-material";

type SectionType = {
  id: string;
  title: string;
  answer: string;
  category: string;
  marriageStatus: number;
  updatedAt: string;
  createdAt: string;
  order: number;
};
interface SectionProps {
  SampleAnswerlisting: SectionType[] | undefined;
}

const SampleAnswerPreview = ({ SampleAnswerlisting }: SectionProps) => {
  const [copy, setCopy] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);

  const handleCopy = (value: string, index: number) => {
    setCopy(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? false : index);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontFamily: "Roboto",
          fontStyle: "normal",
          lineHeight: "normal",
          color: (theme) => theme.palette.text.primary,
          display: "flex",
          fontSize: "24px",
        }}
      >
        Sample Answer Preview
      </Typography>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          pb: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontFamily: "Roboto",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            pt: 2,
          }}
        >
          Sample Answers
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "14px", pt: "4px" }}>
          {`1) To Copy, click the `}
          <CopyAll sx={{ mb: -0.5, fontSize: "18px" }} />
          {` icon, then Paste (control V) in the answer box.`}
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "14px" }}>
          {`2) Replace any text with CAP or __ with your custom answer.`}
        </Typography>
      </Box>
      {!SampleAnswerlisting?.length ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", py: 2, color: "grey" }}
        >
          No sample answers found
        </Typography>
      ) : (
        SampleAnswerlisting?.map((el: SectionType, index: number) => (
          <Paper
            key={index}
            elevation={3}
            sx={{ mb: 2, boxShadow: "0 0 11px #eee" }}
          >
            <Accordion
              expanded={expandedIndex === index}
              onChange={() => handleExpand(index)}
              sx={{
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Box
                    sx={{
                      background: (theme) => theme.palette.primary.main,
                      color: "#fff",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {expandedIndex === index - 1 ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </Box>
                }
                sx={{
                  background: (theme) => theme.additionalColors?.lightBlue,
                  border: (theme) =>
                    `1px solid ${theme.additionalColors?.lightGrey}`,
                  borderRadius: 1,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                    justifyContent: "space-between",
                    display: "flex",
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {el.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  border: (theme) =>
                    `1px solid ${theme.additionalColors?.lightGrey}`,
                  padding: 2,
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "grey" }}>
                    {el.answer}
                  </Typography>

                  {index === expandedIndex && copy ? (
                    <Done sx={{ fontSize: "24px" }} />
                  ) : (
                    <CopyAll
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(el.answer, index);
                      }}
                      sx={{ fontSize: "24px", cursor: "pointer" }}
                    />
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default SampleAnswerPreview;
