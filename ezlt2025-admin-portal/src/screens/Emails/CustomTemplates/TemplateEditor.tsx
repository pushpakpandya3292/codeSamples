import React, { LegacyRef, Ref } from "react";
import EmailEditor, { Editor, EditorRef } from "react-email-editor";
// import { mergeTags } from "./constants";
import { Box, CircularProgress } from "@mui/material";

interface TemplateEditorProps {
  emailEditorRef: LegacyRef<EditorRef> | undefined;
  isEditorReady: boolean;
  mergeTags: {
    [name: string]: {
      name: string;
      value?: string;
      sample?: string;
      icon?: string;
      rules?: {
        [key: string]: {
          name: string;
          before: string;
          after: string;
          sample?: boolean | Array<Record<string, string>>;
        };
      };
    };
  };
  onReady: (unlayer: Editor) => void;
  onLoad: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  isEditorReady,
  emailEditorRef,
  onReady,
  onLoad,
  mergeTags,
}) => {
  return (
    <>
      {!isEditorReady && (
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      )}
      <EmailEditor
        ref={emailEditorRef}
        onReady={onReady}
        style={{ minHeight: "70vh", display: isEditorReady ? "block" : "none" }}
        onLoad={onLoad}
        options={{
          mergeTags: mergeTags,
          version: "latest",
          appearance: {
            theme: "modern_light",
          },
        }}
      />
    </>
  );
};

export default TemplateEditor;
