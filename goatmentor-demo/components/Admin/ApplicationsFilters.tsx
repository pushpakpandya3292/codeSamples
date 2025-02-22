import { MODAL_BOX } from "@/components/Mui/overrides/Modal";
import { TECHNICAL_SKILLS, TECHNOLOGIES } from "@/utils/constants";
import { fieldValidation } from "@/utils/fieldValidation";
import {
  faBadgeCheck,
  faBarsSort,
  faClockFive,
  faClose,
  faSliders,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ApplicationStatus } from "@prisma/client";
import { useFormik } from "formik";
import LoadingButton from "../Common/LoadingButton";
import { AutocompleteTextField } from "../Mui/overrides/Autocomplete";

interface Props {
  open: boolean;
  onClose: (e: any, reason: any) => void;
  onSubmit: (values: ApplicationsFilter) => void;
  filter?: ApplicationsFilter;
  positions: {
    uid: string;
    title: string;
  }[];
}

export interface ApplicationsFilter {
  skills: string[];
  status: ApplicationStatus;
  position: string;
  sortBy: string | null;
  interviewed: boolean;
  notInterviewed: boolean;
}

const ApplicationsFilters = ({
  open,
  onClose,
  positions,
  filter,
  onSubmit,
}: Props) => {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik<ApplicationsFilter>({
    initialValues: {
      skills: filter?.skills ?? [],
      status: filter?.status ?? "pending",
      position: filter?.position ?? "all",
      sortBy: filter?.sortBy ?? null,
      interviewed: filter?.interviewed ?? true,
      notInterviewed: filter?.notInterviewed ?? true,
    },
    async onSubmit(values, formikHelpers) {
      onSubmit(values);
      onClose(null, "submit");
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      aria-labelledby="filters-title">
      <Box sx={MODAL_BOX}>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ color: "var(--text-title)", position: "relative" }}>
          <FontAwesomeIcon icon={faSliders} size="2x" />
          <Typography id="filters-title" variant="headlinelg">
            Filters
          </Typography>
          <IconButton
            onClick={(e) => onClose(e, "close-button")}
            sx={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-title)",
            }}>
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </Stack>
        <Stack component="form" onSubmit={handleSubmit} gap={2}>
          <FormControl>
            <InputLabel id="status-label">Application Status</InputLabel>
            <Select
              labelId="status-label"
              label="Application Status"
              value={values.status}
              name="status"
              {...fieldValidation(touched, errors, "status")}
              onChange={handleChange}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="hired">Hired</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="position-label">Position</InputLabel>
            <Select
              labelId="position-label"
              label="Position"
              value={values.position}
              name="position"
              {...fieldValidation(touched, errors, "position")}
              onChange={handleChange}>
              <MenuItem value={"all"}>All</MenuItem>
              {positions.map((position) => (
                <MenuItem key={position.uid} value={position.uid}>
                  {position.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            multiple
            options={TECHNICAL_SKILLS.concat(TECHNOLOGIES).map((v) => v.key)}
            value={values.skills}
            onChange={(e, value) => setFieldValue("skills", value)}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography>
                    {
                      TECHNICAL_SKILLS.concat(TECHNOLOGIES).find(
                        (e) => e.key === option
                      )?.label
                    }
                  </Typography>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="skills"
                label="Required skills"
                placeholder="Type to search skills"
                {...fieldValidation(touched, errors, "skills")}
                sx={{
                  ...AutocompleteTextField,
                }}
              />
            )}
          />
          <Stack direction="row" gap="0.75rem" alignItems="center">
            <FontAwesomeIcon
              icon={faBadgeCheck}
              size="2x"
              style={{ color: "var(--text-subtitle)" }}
            />
            <Typography
              variant="labellg"
              sx={{
                flexGrow: 1,
              }}>
              Already Interviewed
            </Typography>
            <Switch
              checked={values.interviewed}
              onChange={handleChange}
              name="interviewed"
            />
          </Stack>
          <Stack direction="row" gap="0.75rem" alignItems="center">
            <FontAwesomeIcon
              icon={faClockFive}
              size="2x"
              style={{ color: "var(--text-subtitle)" }}
            />
            <Typography
              variant="labellg"
              sx={{
                flexGrow: 1,
              }}>
              Not Interviewed
            </Typography>
            <Switch
              checked={values.notInterviewed}
              onChange={handleChange}
              name="notInterviewed"
            />
          </Stack>
          <FormControl>
            <InputLabel id="sortBy-label">Sort by</InputLabel>
            <Select
              labelId="sortBy-label"
              label="Sort by"
              value={values.sortBy}
              name="sortBy"
              startAdornment={<FontAwesomeIcon icon={faBarsSort} />}
              {...fieldValidation(touched, errors, "sortBy")}
              onChange={handleChange}>
              {TECHNICAL_SKILLS.concat(TECHNOLOGIES).map((tech) => (
                <MenuItem key={tech.key} value={tech.key}>
                  {tech.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoadingButton
            variant="contained"
            loading={isSubmitting}
            type="submit"
            size="large">
            Apply
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ApplicationsFilters;
