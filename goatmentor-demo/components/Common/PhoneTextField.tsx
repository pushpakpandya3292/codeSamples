import restcountries from "@/utils/restcountries.json";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Stack, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import SelectCountry from "./SelectCountry";

type Props = TextFieldProps & {
  set: (phone: string, phoneCountry: string) => void;
  defaultValue?: string | null;
  defaultCountry?: string | null;
};

const PhoneTextField = ({
  set,
  defaultValue,
  defaultCountry,
  label = "Phone Number",
  ...props
}: Props) => {
  const [showSelect, setShowSelect] = useState(false);
  const [country, setCountry] = useState(defaultCountry || "NO");

  const inputRef = useRef<HTMLInputElement>();
  const textFieldRef = useRef<HTMLDivElement>(null);

  const c = restcountries.find((e) => e.cca2 === country);

  const handleChange = () => {
    const suffix = inputRef?.current?.value ?? "";
    const slice = suffix.startsWith("0") ? 1 : 0;
    const phone = `${c?.idd}${suffix.slice(slice)}`;
    if (suffix.length > 0) set(phone, country);
  };

  useEffect(handleChange, [country]);

  return (
    <>
      <TextField
        label={label}
        placeholder="000-000-0000"
        type="tel"
        inputRef={inputRef}
        ref={textFieldRef}
        {...props}
        defaultValue={defaultValue?.replace(c?.idd ?? "", "")}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <Stack
              direction="row"
              gap="0.5rem"
              alignItems="center"
              onClick={() => setShowSelect(true)}
              sx={{
                paddingBlock: "0.5rem",
                cursor: "pointer",
                marginLeft: "14px",
              }}>
              {c && <Avatar src={c.flag} width={21} alt="Country Flag" />}
              {c?.idd}
              <FontAwesomeIcon
                icon={faChevronDown}
                color="var(--text-subtitle)"
                size="sm"
              />
            </Stack>
          ),
        }}
      />
      <Menu
        anchorEl={textFieldRef.current}
        open={showSelect}
        onClose={() => setShowSelect(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          ".MuiList-root": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 0,
          },
          ".MuiPaper-root": {
            overflowY: "hidden",
            maxWidth: { sm: "432px" },
            minWidth: "unset !important",
            width: "100%",
          },
        }}>
        <SelectCountry
          restcountries={restcountries}
          onClose={() => setShowSelect(false)}
          set={setCountry}
          dialcode={true}
        />
      </Menu>
    </>
  );
};

export default PhoneTextField;
