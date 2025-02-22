import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export interface newAnswer {
  title: string;
  answer: string;
}

const AddSampleAnswer = ({
  isLoading,
  isAddingSampleAnswer,
  onAddSampleAnswer,
}: {
  isLoading: boolean;
  isAddingSampleAnswer: boolean;
  onAddSampleAnswer: (newAnswer: newAnswer) => Promise<boolean>;
}) => {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSave = async () => {
    if (title && answer) {
      const isSuccess = await onAddSampleAnswer({ title, answer });
      if (isSuccess) {
        setTitle("");
        setAnswer("");
      }
    } else {
      toast.error("Please fill all fields to save");
    }
  };

  return (
    <Collapse in={isAddingSampleAnswer} style={{ transition: "linear 0.3s" }}>
      <Box
        sx={{
          mb: 2,
          borderRadius: 1,
          padding: "18px 16px 16px",
          border: (theme) => `1px solid ${theme.additionalColors?.lightGrey}`,
          boxShadow: "0 0 11px #eee",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Enter new sample answer details
        </Typography>
        <TextField
          fullWidth
          label="Question"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          disabled={isLoading}
          sx={{
            mb: 2,
            background: (theme) => theme.palette.background.paper,
          }}
        />
        <TextField
          fullWidth
          label="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          rows={4}
          variant="outlined"
          disabled={isLoading}
          sx={{ mb: 2, background: (theme) => theme.palette.background.paper }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add Sample Answer"
          )}
        </Button>
      </Box>
    </Collapse>
  );
};

export default AddSampleAnswer;
