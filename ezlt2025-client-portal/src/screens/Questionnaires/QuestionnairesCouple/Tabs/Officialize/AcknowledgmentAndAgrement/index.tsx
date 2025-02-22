import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomModal from "@/components/CustomModal";
import CustomButton from "@/components/CustomButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import Edit from "@/assets/icons/Edit.svg";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import useBreakPoints from "@/hooks/useBreakPoints";

const list = [
  "<strong>Voluntary Information Submission-</strong> we confirm that all information provided and entered on this website was submitted voluntarily and is accurate to the best of our knowledge.",
  "<strong>Non-Legal Service Acknowledgment -</strong> we acknowledge that EZ Living Trust and Strategic Choices Financial are not law firms. Their role is solely to assist in the preparation of legal documents. These documents have been prepared, updated, and reviewed by reputable third-party professionals. I/we understand that this assistance does not constitute legal advice or services.",
  "<strong>Document Effectiveness -</strong> we understand that the legal effectiveness of our documents is contingent upon obtaining all required signatures and notarizations. Specifically, for a revocable trust, I/we recognize that the trust must be properly funded for it to be legally enforceable. This acknowledgment emphasizes the importance of completing all necessary steps for document validity.",
  "<strong>Legal Challenges  -</strong> - we acknowledge that while our legal documents have been reviewed by reputable legal professionals, no guarantee is made that the documents will be immune from legal challenges. Every legal situation is unique, and we recognize that it is possible for any estate to be subject to litigation, which could result in a court ruling that affects the distribution of assets. By signing this agreemI affirm that we have reviewed a sample of the documents provided and understand the importance of seeking personalized legal advice for specific concerns.",
  "<strong>Accuracy of Provided Information -</strong> we acknowledge that any Quit Claim deeds or related documents are based on the information we have provided. We understand that EZ Living Trust does not verify the accuracy of the information we submit and other property records are obtained from reputable third parties that may not updated records on time. I/we will verify the accuracy of all documents prepared before execution.",
  "<strong>Document Retention Responsibility -</strong> we recognize that EZ Living Trust is not responsible for maintaining permanent records of our documents. I/we intend to secure copies of our documents for future reference and accessibility.",
];

function AcknowledgmentAndAgrement() {
  const { control, watch, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [trimmedDataURL, setTrimmedDataURL] = useState(watch("e_signature"));
  const { matchDownSM } = useBreakPoints()
  let sigPad: any = {};

  const clear = () => {
    sigPad.clear();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const trim = () => {
    if (!sigPad.isEmpty()) {
      setValue("e_signature", sigPad.getTrimmedCanvas().toDataURL("image/png"));
      handleClose();
    } else {
      toast.error("Please sign before saving");
    }
  };
  useEffect(() => {
    setTrimmedDataURL(watch("e_signature"));
  }, [watch("e_signature")]);

  return (
    <>
      <Typography variant="h2">Acknowledgment and Agreement</Typography>
      <Typography variant="h5">
        Please review the accept the terms below
      </Typography>
      <BoxWrapper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          background: "#f6f9ff",
        }}
      >
        <List
          sx={{
            listStyleType: "disc",
            padding: "0",
            // listStylePosition: 'inside'
          }}
        >
          {list.map((item, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                  display: "list-item",
                  m: 0,
                  p: 0,
                  paddingLeft: "0",
                  marginLeft: "15px",
                }}
              >
                <Typography
                  variant="h5"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </ListItem>
            );
          })}
        </List>
      </BoxWrapper>
      <BoxWrapper mt={2}>
        <Typography variant="body1" mb={1}>
          By provide your e-signature, you affirmatively agree and acknowledge
          and consent to abide by the terms outlined above and in this
          application.
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              onClick={handleOpen}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                width: "200px",
                height: "70px",
                borderRadius: "8px",
                background: (theme) =>
                  !trimmedDataURL ? theme.additionalColors?.tablightBlue : "",
                border: (theme) =>
                  `1px solid ${theme.additionalColors?.mainBorder}`,
              }}
            >
              <img
                style={{
                  height: "40px",
                  width: "40px",
                  filter: !trimmedDataURL
                    ? "invert(86%) sepia(5%) saturate(20%) hue-rotate(356deg) brightness(1000%) contrast(84%)"
                    : "",
                }}
                src={trimmedDataURL || "/images/Signature.svg"}
                alt="edit"
              />

              {!trimmedDataURL && (
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  Click to Sign Here
                </Typography>
              )}
            </Box>
            {trimmedDataURL && (
              <Box
                onClick={handleOpen}
                sx={{
                  height: "30px",
                  width: "30px",
                  background: (theme) => theme.additionalColors?.lightBlue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <Image src={Edit} alt="edit" height={15} width={15} />
              </Box>
            )}
          </Box>
          <Controller
            name={"e_signature"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                {error?.message && (
                  <CustomErrorMessage error={error?.message ?? {}} />
                )}
              </>
            )}
          />
          <CustomModal width={{ xs: "100%", sm: "auto" }} open={open} handleClose={handleClose}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h2">Your E-Signature canvas</Typography>
              <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ border: "1px solid #dedede", borderRadius: "5px" }}>
                <SignatureCanvas
                  ref={(ref) => {
                    sigPad = ref;
                  }}
                  penColor="green"
                  canvasProps={{
                    width: matchDownSM ? 320 : 500,
                    height: 200,
                    className: "sigCanvas",
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CustomButton
                  width="max-content"
                  mr={2}
                  type="CANCEL"
                  onClick={clear}
                >
                  clear
                </CustomButton>
                <CustomButton width="max-content" type="ADD" onClick={trim}>
                  Save
                </CustomButton>
              </Box>
            </Box>
          </CustomModal>
        </Box>
      </BoxWrapper>
    </>
  );
}

export default AcknowledgmentAndAgrement;
