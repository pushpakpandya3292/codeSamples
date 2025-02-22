import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface Props extends ButtonProps {
  loading?: boolean;
}

const LoadingButton = ({ loading = false, ...props }: Props) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <CircularProgress
          color="inherit"
          size={props.size === "large" ? "1.5rem" : "1.25rem"}
        />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default LoadingButton;
