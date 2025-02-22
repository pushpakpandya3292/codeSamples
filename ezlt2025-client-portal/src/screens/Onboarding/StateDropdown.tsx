import {
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  //   { value: "HI", label: "Hawaii" },
  //   { value: "ID", label: "Idaho" },
  //   { value: "IL", label: "Illinois" },
  //   { value: "IN", label: "Indiana" },
  //   { value: "IA", label: "Iowa" },
  //   { value: "KS", label: "Kansas" },
  //   { value: "KY", label: "Kentucky" },
  //   { value: "LA", label: "Louisiana" },
  //   { value: "ME", label: "Maine" },
  //   { value: "MD", label: "Maryland" },
  //   { value: "MA", label: "Massachusetts" },
  //   { value: "MI", label: "Michigan" },
  //   { value: "MN", label: "Minnesota" },
  //   { value: "MS", label: "Mississippi" },
  //   { value: "MO", label: "Missouri" },
  //   { value: "MT", label: "Montana" },
  //   { value: "NE", label: "Nebraska" },
  //   { value: "NV", label: "Nevada" },
  //   { value: "NH", label: "New Hampshire" },
  //   { value: "NJ", label: "New Jersey" },
  //   { value: "NM", label: "New Mexico" },
  //   { value: "NY", label: "New York" },
  //   { value: "NC", label: "North Carolina" },
  //   { value: "ND", label: "North Dakota" },
  //   { value: "OH", label: "Ohio" },
  //   { value: "OK", label: "Oklahoma" },
  //   { value: "OR", label: "Oregon" },
  //   { value: "PA", label: "Pennsylvania" },
  //   { value: "RI", label: "Rhode Island" },
  //   { value: "SC", label: "South Carolina" },
  //   { value: "SD", label: "South Dakota" },
  //   { value: "TN", label: "Tennessee" },
  //   { value: "TX", label: "Texas" },
  //   { value: "UT", label: "Utah" },
  //   { value: "VT", label: "Vermont" },
  //   { value: "VA", label: "Virginia" },
  //   { value: "WA", label: "Washington" },
  //   { value: "WV", label: "West Virginia" },
  //   { value: "WI", label: "Wisconsin" },
  //   { value: "WY", label: "Wyoming" },
];

const StateDropDown = ({ value, onChange, name }: any) => {
  return (
    <>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <Select
          size="small"
          defaultValue="CA"
          id={name}
          name={name}
          label="Grouping"
          onChange={onChange}
          value={value}
          sx={{
            ".menuPaper": {
              height: "300px",
            },
          }}
        >
          <MenuItem sx={{ fontSize: "16px", fontWeight: "600" }} value="CA">
            {" "}
            California
          </MenuItem>
          <ListSubheader
            sx={{
              color: "#979797",
              lineHeight: "20px",
              background: "#ffd09b8a",
            }}
          >
            Coming Soon
          </ListSubheader>
          {states?.map((el) => (
            <MenuItem disabled key={el.value} value={el.value}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default StateDropDown;
