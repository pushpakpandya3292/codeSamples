import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import { CopyAll, Done } from "@mui/icons-material";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

interface IModalProps {
  open: boolean;
  handleClose: () => void;
}

const AshesSuggestion = [
  {
    title: "Let my family decide",
  },
  {
    title: "Placed in a mausoleum",
  },
  {
    title: "Released to the air, water, or a specific location at ",
  },
  {
    title: "To be decided later ",
  },
];

const FuneralSuggestion = [
  {
    title: "Let my family decide",
  },
  {
    title: "I have purchased a funeral or memorial service already",
  },
  {
    title: "I want a small intimate funeral, no memorial service",
  },
  {
    title: "I don’t want any memorial service ",
  },
  {
    title: " I am undecided at the moment ",
  },
];

const PostDeathSuggestion = [
  {
    title: "I have purchased funeral insurance with the following  company",
  },
  {
    title: " I have purchased an urn for my ashes.",
  },
  {
    title: "I want a small intimate funeral, no memorial service",
  },
  {
    title: "I want my ashes buried with my spouse",
  },
  {
    title: "None have been made as of today ",
  },
];

const laidSuggestion = [
  {
    title: "I will let my family decide ",
  },
  {
    title: "Place my body in a tomb or bury me in a plot ",
  },
  {
    title: "Bury me in my home country",
  },
  {
    title: "To be decided later",
  },
];

export const AshesModalSecondary = ({ open, handleClose }: IModalProps) => {
  const { setValue, trigger } = useFormContext();
  const [copy, setCopy] = useState(false);
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleInsert = (value: string, index: number) => {
    setCopyIndex(index);
    setCopy(true);
    const addToNewLine = textFieldValue ? `\n` : "";
    setTextFieldValue(textFieldValue + addToNewLine + value);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
      setCopyIndex(null);
    }, 1000);
  };
  const handleSave = () => {
    setValue("body_buried_cremated_secondary", textFieldValue);
    trigger("body_buried_cremated_secondary");
    handleClose();
  };
  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "500px" }}
        height="auto"
        open={open}
        handleClose={handleClose}
      >
        <Box>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "black", fontSize: "18px" }}>
              Customize your required answer
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, mt: 1 }} />
          <Typography sx={{ mt: 1, color: "black" }}>
            My wishes are that my ashes be:
          </Typography>
          {/* <Typography variant="caption" sx={{ color: "grey" }}>
            Type an answer below or copy/paste and edit a sample answer
          </Typography> */}
          <TextField
            placeholder="Type an answer below or copy/paste and edit a sample answer"
            InputLabelProps={{
              shrink: true,
            }}
            value={textFieldValue}
            defaultValue={textFieldValue}
            onChange={(e) => {
              setTextFieldValue(e.target.value);
            }}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              mt: 1,
              // background: (theme) => theme.additionalColors?.lightBlue,
              p: 1,
              // borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                mb: 1,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Here are sample answers to choose from:
            </Typography>
            {AshesSuggestion?.map((el, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  // background: "#ffffff",
                  justifyContent: "space-between",
                  // border: "1px solid #e0e0e0",
                  alignItems: "center",
                  mb: 1,
                  p: 1,
                  // borderRadius: 1,
                  background: "#F5F9FF",
                  borderLeft: `5px solid #0050A8`,
                  // padding: "0px 16px",
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", color: "black", mb: "4px" }}
                >
                  {el?.title}
                </Typography>
                {i === copyIndex && copy ? (
                  <Done sx={{ fontSize: "16px", ml: 1 }} />
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      p: 0,
                      m: 0,
                      textTransform: "none",
                      background: "#4C8CD3",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInsert(el?.title, i);
                      toast.success("Text inserted in text box.");
                    }}
                  >
                    Insert
                  </Button>
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <CustomButton
              onClick={handleClose}
              mr={2}
              width="100px"
              type="CANCEL"
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={handleSave} width="100px" type="ADD">
              Save
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export const LaidModalSecondary = ({ open, handleClose }: IModalProps) => {
  const { setValue, trigger } = useFormContext();
  const [copy, setCopy] = useState(false);
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleInsert = (value: string, index: number) => {
    setCopyIndex(index);
    setCopy(true);
    const addToNewLine = textFieldValue ? `\n` : "";
    setTextFieldValue(textFieldValue + addToNewLine + value);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
      setCopyIndex(null);
    }, 1000);
  };
  const handleSave = () => {
    setValue("body_buried_cremated_secondary", textFieldValue);
    trigger("body_buried_cremated_secondary");
    handleClose();
  };
  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "500px" }}
        height="auto"
        open={open}
        handleClose={handleClose}
      >
        <Box>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "black", fontSize: "18px" }}>
              Customize your required answer
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, mt: 1 }} />
          <Typography sx={{ mt: 1, color: "black" }}>
            My wishes are that my body be laid to rest:
          </Typography>
          {/* <Typography variant="caption" sx={{ color: "grey" }}>
            Type an answer below or copy/paste and edit a sample answer
          </Typography> */}
          <TextField
            placeholder="Type an answer below or copy/paste and edit a sample answer"
            InputLabelProps={{
              shrink: true,
            }}
            value={textFieldValue}
            defaultValue={textFieldValue}
            onChange={(e) => {
              setTextFieldValue(e.target.value);
            }}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              mt: 1,
              // background: (theme) => theme.additionalColors?.lightBlue,
              p: 1,
              // borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                mb: 1,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Here are sample answers to choose from:
            </Typography>
            {laidSuggestion?.map((el, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  // background: "#ffffff",
                  justifyContent: "space-between",
                  // border: "1px solid #e0e0e0",
                  alignItems: "center",
                  mb: 1,
                  p: 1,
                  // borderRadius: 1,
                  background: "#F5F9FF",
                  borderLeft: `5px solid #0050A8`,
                  // padding: "0px 16px",
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", color: "black", mb: "4px" }}
                >
                  {el?.title}
                </Typography>
                {i === copyIndex && copy ? (
                  <Done sx={{ fontSize: "16px", ml: 1 }} />
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      p: 0,
                      m: 0,
                      textTransform: "none",
                      background: "#4C8CD3",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInsert(el?.title, i);
                      toast.success("Text inserted in text box.");
                    }}
                  >
                    Insert
                  </Button>
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <CustomButton
              onClick={handleClose}
              mr={2}
              width="100px"
              type="CANCEL"
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={handleSave} width="100px" type="ADD">
              Save
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export const FuneralModalSecondary = ({ open, handleClose }: IModalProps) => {
  const { setValue, trigger } = useFormContext();
  const [copy, setCopy] = useState(false);
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleInsert = (value: string, index: number) => {
    setCopyIndex(index);
    setCopy(true);
    const addToNewLine = textFieldValue ? `\n` : "";
    setTextFieldValue(textFieldValue + addToNewLine + value);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
      setCopyIndex(null);
    }, 1000);
  };
  const handleSave = () => {
    setValue("funeral_service_secondary", textFieldValue);
    trigger("funeral_service_secondary");
    handleClose();
  };
  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "500px" }}
        height="auto"
        open={open}
        handleClose={handleClose}
      >
        <Box>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "black", fontSize: "18px" }}>
              Customize your required answer
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, mt: 1 }} />
          <Typography sx={{ mt: 1, color: "black" }}>
            My funeral/memorial services are the following:
          </Typography>
          {/* <Typography variant="caption" sx={{ color: "grey" }}>
            Type an answer below or copy/paste and edit a sample answer
          </Typography> */}
          <TextField
            placeholder="Type an answer below or copy/paste and edit a sample answer"
            InputLabelProps={{
              shrink: true,
            }}
            value={textFieldValue}
            defaultValue={textFieldValue}
            onChange={(e) => {
              setTextFieldValue(e.target.value);
            }}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              mt: 1,
              // background: (theme) => theme.additionalColors?.lightBlue,
              p: 1,
              // borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                mb: 1,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Here are sample answers to choose from:
            </Typography>
            {FuneralSuggestion?.map((el, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  // background: "#ffffff",
                  justifyContent: "space-between",
                  // border: "1px solid #e0e0e0",
                  alignItems: "center",
                  mb: 1,
                  p: 1,
                  // borderRadius: 1,
                  background: "#F5F9FF",
                  borderLeft: `5px solid #0050A8`,
                  // padding: "0px 16px",
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", color: "black", mb: "4px" }}
                >
                  {el?.title}
                </Typography>
                {i === copyIndex && copy ? (
                  <Done sx={{ fontSize: "16px", ml: 1 }} />
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      p: 0,
                      m: 0,
                      textTransform: "none",
                      background: "#4C8CD3",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInsert(el?.title, i);
                      toast.success("Text inserted in text box.");
                    }}
                  >
                    Insert
                  </Button>
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <CustomButton
              onClick={handleClose}
              mr={2}
              width="100px"
              type="CANCEL"
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={handleSave} width="100px" type="ADD">
              Save
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export const ArrangementModalSecondary = ({
  open,
  handleClose,
}: IModalProps) => {
  const { setValue, trigger } = useFormContext();
  const [copy, setCopy] = useState(false);
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleInsert = (value: string, index: number) => {
    setCopyIndex(index);
    setCopy(true);
    const addToNewLine = textFieldValue ? `\n` : "";
    setTextFieldValue(textFieldValue + addToNewLine + value);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
      setCopyIndex(null);
    }, 1000);
  };
  const handleSave = () => {
    setValue("post_death_arrangement_secondary", textFieldValue);
    trigger("post_death_arrangement_secondary");
    handleClose();
  };
  return (
    <>
      <CustomModal
        width={{ xs: "100%", sm: "500px" }}
        height="auto"
        open={open}
        handleClose={handleClose}
      >
        <Box>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "black", fontSize: "18px" }}>
              Customize your required answer
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, mt: 1 }} />
          <Typography sx={{ mt: 1, color: "black" }}>
            The following are my post-death arrangements:
          </Typography>
          {/* <Typography variant="caption" sx={{ color: "grey" }}>
            Type an answer below or copy/paste and edit a sample answer
          </Typography> */}
          <TextField
            placeholder="Type an answer below or copy/paste and edit a sample answer"
            InputLabelProps={{
              shrink: true,
            }}
            value={textFieldValue}
            defaultValue={textFieldValue}
            onChange={(e) => {
              setTextFieldValue(e.target.value);
            }}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              mt: 1,
              // background: (theme) => theme.additionalColors?.lightBlue,
              p: 1,
              // borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                mb: 1,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Here are sample answers to choose from:
            </Typography>
            {PostDeathSuggestion?.map((el, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  // background: "#ffffff",
                  justifyContent: "space-between",
                  // border: "1px solid #e0e0e0",
                  alignItems: "center",
                  mb: 1,
                  p: 1,
                  // borderRadius: 1,
                  background: "#F5F9FF",
                  borderLeft: `5px solid #0050A8`,
                  // padding: "0px 16px",
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", color: "black", mb: "4px" }}
                >
                  {el?.title}
                </Typography>
                {i === copyIndex && copy ? (
                  <Done sx={{ fontSize: "16px", ml: 1 }} />
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      p: 0,
                      m: 0,
                      textTransform: "none",
                      background: "#4C8CD3",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInsert(el?.title, i);
                      toast.success("Text inserted in text box.");
                    }}
                  >
                    Insert
                  </Button>
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <CustomButton
              onClick={handleClose}
              mr={2}
              width="100px"
              type="CANCEL"
            >
              Cancel
            </CustomButton>
            <CustomButton onClick={handleSave} width="100px" type="ADD">
              Save
            </CustomButton>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};
