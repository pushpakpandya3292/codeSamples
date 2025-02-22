import { useState } from "react";
import { CopyAll, Done } from "@mui/icons-material";
import { Box, Dialog, Divider, Typography } from "@mui/material";

export interface ITip {
  title: string;
}
interface ITipsModalProps {
  anchorEl: any;
  handleClose?: () => void;
  handleClick?: (value: string) => void;
  copying?: boolean;
  suggestion: ITip[];
}

const TipsModal = ({
  anchorEl,
  handleClose,
  handleClick,
  copying,
  suggestion,
}: ITipsModalProps) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [copy, setCopy] = useState(false);
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const handleCopy = (value: string, index: number) => {
    setCopyIndex(index);
    setCopy(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      handleClose?.();
      setCopy(false);
      setCopyIndex(null);
    }, 1000);
  };
  return (
    <Dialog
      id={id}
      open={open}
      onClose={handleClose}

      // anchorEl={anchorEl}
      // anchorOrigin={{
      //   vertical: "bottom",
      //   horizontal: "left",
      // }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          boxShadow: "0px 2px 10px 0px #ccc",
          pb: 2,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography variant="h2" sx={{ px: 2, pt: 2 }}>
          Sample Answers
        </Typography>
        <Typography variant="h5" sx={{ pl: 2, fontSize: "14px", pt: "4px" }}>
          {`1) To Copy, click the `}
          <CopyAll sx={{ mb: -0.5, fontSize: "18px" }} />
          {` icon, then Paste (control V) in the answer
          box.`}
        </Typography>
        <Typography variant="h5" sx={{ pl: 2, fontSize: "14px" }}>
          {`2) Replace any text with CAP or __with your custom answer.`}
        </Typography>
      </Box>
      <Box sx={{ mb: 2, maxHeight: "400px", height: "90%" }}>
        <Box>
          <Divider />
          {suggestion?.map((el: any, index: any) => (
            <Box key={index}>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: 2,
                  }}
                >
                  {index === copyIndex && copy ? (
                    <Done sx={{ fontSize: "22px" }} />
                  ) : (
                    <CopyAll
                      onClick={() => handleCopy(el?.title, index)}
                      sx={{ fontSize: "22px", cursor: "pointer" }}
                    />
                  )}
                  <Divider
                    orientation="vertical"
                    sx={{
                      ml: 2,
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    key={index}
                    sx={{
                      mx: 2,
                      mb: 1,
                      p: 1,
                      fontSize: "14px",
                      color: "#000000",
                      fontWeight: "500",
                    }}
                  >
                    {el?.title}
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

export default TipsModal;
