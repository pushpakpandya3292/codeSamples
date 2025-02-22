import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import CustomModal, { DeleteModal } from "@/components/CustomModal";
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
  handleDeleteChild?: () => void;
  handleCancel?: () => void;
}

const EditDeceasedChildModal = ({
  open,
  handleClose,
  handleCancel,
  handleDeleteChild,
}: IModalProps) => {
  const { control, watch } = useFormContext();

  return (
    <CustomModal open={open} handleClose={handleClose} width={{ xs: "100%", sm: "auto" }} height="auto">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        <Typography variant="h2">Edit Deceased Child</Typography>
        <DeleteModal handleDeleteChild={handleDeleteChild} />
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
        }}
      >
        <Button
          sx={{
            height: "44px",
            width: { sm: "100%", md: "150px" },
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
            width: { sm: "100%", md: "150px" },
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
          Edit
        </Button>
      </Box>
    </CustomModal>
  );
};
export default EditDeceasedChildModal;
