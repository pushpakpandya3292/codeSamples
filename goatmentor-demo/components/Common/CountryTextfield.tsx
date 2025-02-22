import restcountries from "@/utils/restcountries.json";
import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Avatar from "./Avatar";
import SelectCountry from "./SelectCountry";

interface Props {
  set: (country: string) => void;
  defaultValue?: string | null;
}

const CountryTextField = ({
  set,
  defaultValue = "NO",
  label = "Country",
  ...props
}: Props & Partial<SelectProps>) => {
  const [showSelect, setShowSelect] = useState(false);
  const [country, setCountry] = useState(defaultValue ?? "NO");

  return (
    <FormControl fullWidth>
      <InputLabel id="country-label">{label}</InputLabel>
      <Select
        labelId="country-label"
        label={label}
        open={showSelect}
        defaultValue="NO"
        value={country}
        {...props}
        renderValue={(value) => {
          const c = restcountries.find((e) => e.cca2 === value);
          return (
            <Stack direction="row" gap="1rem" alignItems="center">
              {c && <Avatar src={c.flag} width={21} alt="Country Flag" />}
              {c?.name}
            </Stack>
          );
        }}
        onOpen={() => setShowSelect(true)}
        onClose={() => setShowSelect(false)}>
        <SelectCountry
          restcountries={restcountries}
          onClose={() => setShowSelect(false)}
          set={(e) => {
            set(e);
            setCountry(e);
          }}
        />
      </Select>
    </FormControl>
  );
};

export default CountryTextField;
