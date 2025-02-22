import CustomCheckBox from "@/components/CustomCheckBox";
import { MarriageStatusEnum } from "@/constant";
import { Box, Typography } from "@mui/material";

interface SampleAnswerMartitalStatusProps {
  martialStatus: MarriageStatusEnum;
  handleMartialStatus: (status: MarriageStatusEnum) => void;
}
const SampleAnswerMartitalStatus = ({
  handleMartialStatus,
  martialStatus,
}: SampleAnswerMartitalStatusProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontSize: "14px" }}>
        Marital Status :{" "}
      </Typography>
      <CustomCheckBox
        setChecked={() => {
          handleMartialStatus(MarriageStatusEnum.Single);
        }}
        checked={martialStatus === MarriageStatusEnum.Single}
        type="CIRCLE"
      >
        <Typography variant="h5" sx={{ fontWeight: "500" }}>
          Single
        </Typography>
      </CustomCheckBox>
      <CustomCheckBox
        setChecked={() => {
          handleMartialStatus(MarriageStatusEnum.Couple);
        }}
        checked={martialStatus === MarriageStatusEnum.Couple}
        type="CIRCLE"
      >
        <Typography variant="h5" sx={{ fontWeight: "500" }}>
          Couple
        </Typography>
      </CustomCheckBox>
    </Box>
  );
};

export default SampleAnswerMartitalStatus;
