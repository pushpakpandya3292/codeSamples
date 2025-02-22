import { Box, Button, CircularProgress } from "@mui/material";

interface IActionButtonProps {
  isNext?: boolean;
  isPrev?: boolean;
  handleNext?: () => void;
  handlePrev?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  loading?: boolean;
}

const ActionButton = ({
  isPrev,
  isNext,
  handleNext,
  handlePrev,
  prevLabel = "Back",
  nextLabel = "Save and Next",
  loading,
}: IActionButtonProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 4,
        justifyContent: isPrev ? "space-between" : "flex-end",
      }}
    >
      {isPrev && (
        <Button
          variant="contained"
          sx={{
            background: (theme) => theme.palette.primary.main,
            width: "166px",
          }}
          onClick={handlePrev}
        >
          {prevLabel}
        </Button>
      )}
      {isNext && (
        <Button
          variant="contained"
          sx={{
            background: (theme) => theme.palette.primary.main,
            width: "166px",
          }}
          onClick={handleNext}
        >
          {loading ? (
            <CircularProgress
              sx={{ color: (theme) => theme.palette.text.secondary }}
              size={30}
            />
          ) : (
            nextLabel
          )}
        </Button>
      )}
    </Box>
  );
};

export default ActionButton;
