import { Country } from "@/types";
import { faClose } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Avatar from "./Avatar";

interface Props {
  onClose: () => void;
  set: (country: string) => void;
  restcountries: Country[];
  dialcode?: boolean;
}

const SelectCountry = ({
  onClose,
  set,
  restcountries,
  dialcode = false,
}: Props) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ margin: "1rem 1rem 0" }}>
        <Typography variant="titlelg">Select Country</Typography>
        <IconButton onClick={onClose}>
          <FontAwesomeIcon icon={faClose} color="var(--text-subtitle)" />
        </IconButton>
      </Stack>
      <TextField
        placeholder="Search"
        type="search"
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginInline: "1rem" }}
      />
      <Stack
        gap="0.25rem"
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 1rem 1rem",
          maxHeight: "400px",
        }}>
        {restcountries
          .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
          .map((country) => (
            <Stack
              key={country.cca2}
              direction="row"
              gap="0.75rem"
              alignItems="center"
              onClick={() => {
                set(country.cca2);
                onClose();
              }}
              sx={{
                padding: "0.75rem 1rem 0.75rem 0.75rem",
                borderRadius: "var(--radius-lg)",
                transition: "background 300ms ease-in-out",
                textDecoration: "none",
                "&:hover": {
                  background: "var(--primary-container)",
                  cursor: "pointer",
                },
              }}>
              <Avatar src={country.flag} width={42} alt="Country Flag" />
              <Typography
                variant="labellg"
                className="text-ellipsis"
                sx={{
                  flexGrow: 1,
                }}>
                {country.name}
              </Typography>
              {dialcode && (
                <Typography
                  variant="labelmd"
                  color="var(--text-subtitle)"
                  sx={{}}>
                  {country.idd}
                </Typography>
              )}
            </Stack>
          ))}
      </Stack>
    </>
  );
};

export default SelectCountry;
