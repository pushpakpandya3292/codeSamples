import { FC, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SelectBoxWrapper } from "./Styled";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type ICustomeDateTimePicker = {
  label: string | React.ReactElement;
  // value?: null | Date;
  value?: null | Date | string;
  defaultValue?: Date | null;
  currentDate?: Date | null;
  helperText?: string;
  onChange?: (e?: any) => void;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  labelShrink?: boolean
};

const CustomeDateTimePicker: FC<ICustomeDateTimePicker> = ({
  label,
  value,
  onChange,
  defaultValue,
  currentDate,
  helperText,
  minDate,
  maxDate,
  labelShrink,
  ...rest
}) => {
  const [cleared, setCleared] = useState<boolean>(false);
  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => { };
  }, [cleared]);

  return (
    // <SelectBoxWrapper gridColumn="span 3">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          "& > label": {
            color: "#535F6B",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          },
          "& .MuiFormHelperText-root": {
            height: "6.5px",
            marginTop: 0,
            padding: 0,
            fontSize: "10px",
            color: (theme) => theme.palette.error.main,
          },
          "& .MuiOutlinedInput-root:hover fieldset": {
            borderColor: " rgba(0, 0, 0, 0.26)!important",
            borderWidth: "1px !important",
          },
          // "& .MuiFormHelperText-root": {
          //   position: "absolute",
          //   bottom: "-6px",
          //   height: "6.5px",
          //   marginTop: "0",
          //   padding: "0",
          //   fontSize: "10px",
          //   color: (theme) => theme.palette.error.main,
          // },
        }}
        slotProps={{
          field: { clearable: true, onClear: () => setCleared(true) },
          textField: { helperText: helperText, size: "small", InputLabelProps: { shrink: labelShrink } },
        }}
        className="datetime_picker"
        label={label}
        value={value ? dayjs(value) : null}
        onChange={onChange}
        defaultValue={defaultValue}
        minDate={minDate}
        maxDate={maxDate}
        {...rest}
      />
    </LocalizationProvider>
    // </SelectBoxWrapper>
  );
};
export const renderDateFieldProps = (error?: any) => {
  return {
    size: "small" as any,
    variant: "outlined" as any,
    error: error ? true : false,
    helperText: error?.message ? error?.message : " ",
  };
};
export default CustomeDateTimePicker;
