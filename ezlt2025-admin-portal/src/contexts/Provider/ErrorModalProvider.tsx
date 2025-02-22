"use client";
import { createContext, useState, useEffect } from "react";
import { ErrorModal } from "@/components/ErrorModal";

interface ErrorModalState {
  message: string;
  title?: string;
}

interface ErrorModalContextType {
  showBlockedError: (message: string, title?: string) => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(
  undefined,
);

// Global variable to hold the showBlockedError function
let globalShowBlockedError: ((message: string, title?: string) => void) | null =
  null;

export const ErrorModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errorState, setErrorState] = useState<ErrorModalState | null>(null);

  const showBlockedError = (message: string, title?: string) => {
    setErrorState({ message, title });
  };

  const handleClose = () => {
    setErrorState(null);
  };

  // Set the global function when the provider mounts
  useEffect(() => {
    globalShowBlockedError = showBlockedError;
    return () => {
      globalShowBlockedError = null; // Clean up on unmount
    };
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showBlockedError }}>
      {children}
      <ErrorModal
        defaultOpen={!!errorState}
        message={errorState?.message || ""}
        title={errorState?.title}
        onClose={handleClose}
      />
    </ErrorModalContext.Provider>
  );
};

// Function to access the global showBlockedError
export const triggerShowBlockedError = (message: string, title?: string) => {
  if (globalShowBlockedError) {
    globalShowBlockedError(message, title);
  } else {
    console.error("ErrorModalProvider is not mounted. Cannot show error.");
  }
};
