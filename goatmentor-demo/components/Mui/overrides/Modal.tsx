import { SxProps } from "@mui/material";

export const MODAL_BOX: SxProps = {
  position: "absolute" as "absolute",
  top: { xs: "0", md: "50%" },
  left: { xs: "0", md: "50%" },
  bottom: { xs: "0", md: "auto" },
  right: { xs: "0", md: "auto" },
  transform: { xs: "none", md: "translate(-50%, -50%)" },
  width: "100%",
  maxWidth: { md: "37rem" },
  bgcolor: "var(--background)",
  boxShadow: "var(--modal)",
  padding: { xs: "2rem 1rem", sm: "2rem 1.5rem" },
  borderRadius: { xs: "0", md: "var(--radius-lg)" },
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  "&:focus": {
    border: "none",
    outline: "none",
  },
};
