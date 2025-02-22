import React from "react";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Fade, Modal, Typography } from "@mui/material";
const styles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "460px",
  height: "350px",
  padding: { xsm: "10px 15px", sm: "20px 26px", md: "50px 56px" },
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "30px 20px",
};

interface DeleteModalProps {
  handleDeleteChild?: () => void;
}
interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children: any;
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
}

export function DeleteModal({ handleDeleteChild }: DeleteModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteCallback = () => {
    if (handleDeleteChild) handleDeleteChild();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          padding: "12px 13px",
          borderRadius: "4px",
          background: (theme) => theme.additionalColors?.button.canceltext,
          color: (theme) => theme.palette.primary.light,
        }}
      >
        <DeleteOutlinedIcon onClick={handleOpen} />
      </Box>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...styles,
            borderRadius: "12px",
            background: (theme) => theme.additionalColors?.background.primary,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              width: "90px",
              borderRadius: "50%",
              background: (theme) => theme.additionalColors?.button.canceltext,
              color: (theme) => theme.palette.primary.light,
            }}
          >
            <DeleteIcon fontSize="large" />
          </Box>
          <Box>
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: "24px",
                fontFamily: "Roboto",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Are you sure you want to delete this child?
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "flex", md: "flex" },
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              sx={{
                height: "44px",
                width: { sm: "100%", md: "110px" },
                background: (theme) => theme.additionalColors?.button.cancelbg,
                color: (theme) => theme.additionalColors?.button.canceltext,
                borderRadius: "5px",
                padding: "12px 45px",
                fontSize: "20px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
                fontWeight: "400",
              }}
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              sx={{
                height: "44px",
                width: { sm: "100%", md: "110px" },
                background: (theme) =>
                  theme.additionalColors?.background.tertiary,
                color: (theme) => theme.palette.primary.main,
                borderRadius: "5px",
                padding: "12px 45px",
                fontSize: "20px",
                fontFamily: "Roboto",
                textTransform: "capitalize",
                fontWeight: "400",
              }}
              onClick={deleteCallback}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function CustomModal({
  open,
  handleClose,
  children,
  width,
  height,
  minHeight,
}: ModalProps) {
  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Fade
        in={open}
        style={{ transitionDelay: open ? "500ms" : "0ms", ...style }}
        unmountOnExit
        mountOnEnter
      >
        <Box
          sx={{
            borderRadius: "12px",
            background: (theme) => theme.additionalColors?.background.primary,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: { width },
            height: { height },
            minHeight: { minHeight },
            overflowY: 'auto'
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}

export default CustomModal;
