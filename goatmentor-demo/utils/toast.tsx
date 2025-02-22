"use client";
import { faClose } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import { ReactNode, createContext, useContext, useState } from "react";

export interface ToastProps {
  open: boolean;
  children: ReactNode;
  severity: AlertColor;
  handleClose: () => void;
}

const DEFAULT_AUTO_HIDE_DURATION = 8000;

const Toast = ({ open, children, severity, handleClose }: ToastProps) => {
  const closeToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={DEFAULT_AUTO_HIDE_DURATION}
      onClose={closeToast}
      sx={{
        zIndex: 9999,
      }}>
      <Alert
        severity={severity}
        action={
          <IconButton
            size="small"
            onClick={closeToast}
            aria-label="Close"
            title="Close"
            data-xml-testing-id="close-button">
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "var(--text-subtitle)" }}
            />
          </IconButton>
        }>
        {children}
      </Alert>
    </Snackbar>
  );
};

interface Prop {
  showToast: (severity: AlertColor, message: string) => void;
}

const ToastContext = createContext<Prop>({
  showToast: (severity: AlertColor) => {
    console.log(severity);
  },
});

interface ProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ProviderProps) => {
  const [toastInfo, setToastInfo] = useState<{
    severity: AlertColor;
    message: string;
  }>({
    severity: "info",
    message: "",
  });

  const [toastOpen, setToastOpen] = useState(false);

  const showToast = (severity: AlertColor, message: string) => {
    setToastInfo({
      severity,
      message: message,
    });
    setToastOpen(true);
  };

  const close = () => {
    setToastOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast severity={toastInfo.severity} open={toastOpen} handleClose={close}>
        {toastInfo.message}
      </Toast>
    </ToastContext.Provider>
  );
};

export function useToast() {
  return useContext(ToastContext);
}
