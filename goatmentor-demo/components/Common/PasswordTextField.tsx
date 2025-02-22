"use client";
import { faEye, faEyeSlash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

const PasswordTextField = (props: TextFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <IconButton onClick={() => setShow((e) => !e)}>
            <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordTextField;
