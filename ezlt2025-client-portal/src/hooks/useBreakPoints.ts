import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function useBreakPoints() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const matchDownMD = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const matchBetweenXsMd = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  return { matchDownSM, matchDownMD, matchBetweenXsMd };
}

export default useBreakPoints;
