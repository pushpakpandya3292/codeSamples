import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AccordionSummaryProps,
  ComponentsOverrides,
  Theme,
} from "@mui/material";

export const MuiAccordionSummary: {
  defaultProps?: Partial<AccordionSummaryProps> | undefined;
  styleOverrides?: ComponentsOverrides<Theme>["MuiAccordionSummary"];
} = {
  defaultProps: {
    expandIcon: <FontAwesomeIcon icon={faChevronDown} />,
  },
  styleOverrides: {
    root: {
      backgroundColor: "var(--surface-secondary)",
      borderBlock: "1px solid var(--border)",
    },
  },
};
