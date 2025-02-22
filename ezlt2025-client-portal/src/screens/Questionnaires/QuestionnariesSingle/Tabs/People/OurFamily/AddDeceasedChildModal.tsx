import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import CustomModal from "@/components/CustomModal";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import dayjs from "dayjs";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
}));

interface IModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  handleCancel?: () => void;
}

const AddDeceasedChildModal = ({
  open,
  handleClose,
  handleOpen,
  handleCancel,
}: IModalProps) => {
  const { control, watch } = useFormContext();

  return (
    <CustomModal open={open} width={{ xs: "100%", sm: "auto" }} height="auto" handleClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2">Add Deceased Child</Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"deceased_childern_full_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label="Full Name"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"deceased_childern_date_of_birth"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomeDateTimePicker
                    {...field}
                    {...renderDateFieldProps(error)}
                    minDate={dayjs(watch("primary_trustee_date_of_birth"))}
                    maxDate={dayjs()}
                    label={"Date of birth"}
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <Controller
                name={"deceased_childern_date_of_decease"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomeDateTimePicker
                    {...field}
                    {...renderDateFieldProps(error)}
                    minDate={
                      watch("deceased_childern_date_of_birth")
                        ? dayjs(watch("deceased_childern_date_of_birth") as any)
                        : dayjs()
                    }
                    maxDate={dayjs()}
                    label={"Date of death"}
                  />
                )}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex" },
          justifyContent: "flex-end",
          gap: "10px",
          // flexDirection: { xs: "column-reverse", md: "row" }
        }}
      >
        <Button
          sx={{
            height: "44px",
            width: { xs: "100%", md: "150px" },
            background: (theme) => theme.additionalColors?.button.cancelbg,
            color: (theme) => theme.additionalColors?.button.canceltext,
            borderRadius: "5px",
            padding: "12px 45px",
            fontSize: "18px",
            fontFamily: "Roboto",
            textTransform: "capitalize",
            fontWeight: "600",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{
            height: "44px",
            width: { xs: "100%", md: "150px" },
            background: (theme) => theme.additionalColors?.background.tertiary,
            color: (theme) => theme.palette.primary.main,
            borderRadius: "5px",
            padding: "12px 45px",
            fontSize: "18px",
            fontFamily: "Roboto",
            textTransform: "capitalize",
            fontWeight: "600",
          }}
          onClick={handleClose}
        >
          Add
        </Button>
      </Box>
    </CustomModal>
  );
};
export default AddDeceasedChildModal;
