import CustomRadioButton from "@/components/CustomRadioButton";
import { useManualInvoice } from "@/provider/ManualInvoice";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { PaymentEnum } from "../../../constants";
import { useRouter } from "next/navigation";
import { useCreateInterviewClientCache } from "@/provider/InterviewCache";
import { useFormContext } from "react-hook-form";

enum InvoiceTypeEnum {
  "PAY_AND_NOTARIZE_AT_OFFICE" = 1,
  "MAIL_IN_CHECK" = 2,
  "CARD_OVER_PHONE" = 3,
}
interface ManualPaymentProps {
  cartId: string;
  promoCode?: string;
}

const ManualPayment: React.FC<ManualPaymentProps> = ({ cartId, promoCode }) => {
  const manualInvoice = useManualInvoice({});
  const { getValues } = useFormContext();
  const createClientCacheInterView = useCreateInterviewClientCache({});
  const router = useRouter();
  const [invoiceType, setInvoiceType] = React.useState<number | undefined>(
    undefined,
  );
  const handleSubmit = async () => {
    if (invoiceType) {
      try {
        const invoiceResults = await manualInvoice.mutateAsync({
          cartId: cartId,
          invoicePaymentType: invoiceType,
          promoCode: promoCode,
        });
        if (invoiceResults) {
          // createClientCacheInterView.mutate({
          //   key: "INTERVIEW" + `${getValues("clientDetailId")}`,
          //   data: {
          //     ...getValues(),
          //     steps_completed: 7,
          //   },
          //   form_type: 2,
          // });
          toast.success("Your invoice has been created successfully");
          router.replace(`/dashboards?payment=${PaymentEnum.SUCCESS}`);
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    } else {
      toast.error("Please select a payment invoice type");
    }
  };
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: "22px",
        }}
      >
        Invoice me
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h4" sx={{ my: 1 }}>
        The EZ living Trust staff will contact you for alternative payment
        options. Select your preference
      </Typography>
      <RadioGroup
        name="notary"
        sx={{ my: 3 }}
        value={invoiceType}
        onChange={(e) => setInvoiceType(parseInt(e.target.value))}
      >
        <CustomRadioButton
          label={
            <Box sx={{ display: "flex" }}>
              <Typography variant="h4">
                Pay and Notarize at your office
              </Typography>
            </Box>
          }
          value={InvoiceTypeEnum.PAY_AND_NOTARIZE_AT_OFFICE}
        />
        <CustomRadioButton
          label={
            <Box sx={{ display: "flex" }}>
              <Typography variant="h4">Mail in a check</Typography>
            </Box>
          }
          value={InvoiceTypeEnum.MAIL_IN_CHECK}
        />
        <CustomRadioButton
          label={
            <Box sx={{ display: "flex" }}>
              <Typography variant="h4">Card over the phone</Typography>
            </Box>
          }
          value={InvoiceTypeEnum.CARD_OVER_PHONE}
        />
      </RadioGroup>
      <Typography variant="h4" sx={{ my: 1 }}>
        Note, your document will not be printed until payment is received.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ my: 1 }}
        disabled={manualInvoice.isLoading}
        onClick={handleSubmit}
      >
        {manualInvoice.isLoading ? <CircularProgress size={20} /> : "Submit"}
      </Button>
    </Box>
  );
};

export default ManualPayment;
