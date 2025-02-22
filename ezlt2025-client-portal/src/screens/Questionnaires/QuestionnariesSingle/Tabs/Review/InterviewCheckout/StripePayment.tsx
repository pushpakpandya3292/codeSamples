import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useStripePaymentIntent } from "@/provider/StripePaymentIntent";
import { useFormContext } from "react-hook-form";
import { PaymentEnum } from "../../../constants";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Stripesecure from "@/assets/img/stripesecure.png";
import Image from "next/image";
import { useCreateInterviewClientCache } from "@/provider/InterviewCache";

interface CheckoutFormProps {
  chargeAmount: number;
  promoCode?: string | undefined;
  paymentType?: string;
}

let Publish_key: any = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const CheckoutForm = ({ chargeAmount, promoCode }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const StripePaymentIntent = useStripePaymentIntent({});
  const { getValues } = useFormContext();
  const createClientCacheInterView = useCreateInterviewClientCache({});

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string | undefined>(
    null,
  );

  const handleSubmit = async (event: any) => {
    setisLoading(true);
    event.preventDefault();

    if (elements == null) {
      setisLoading(false);
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setisLoading(false);
      return;
    }

    const StripePaymentIntentResults = await StripePaymentIntent.mutateAsync({
      data: {
        total: chargeAmount,
        client_detail_id: getValues("clientDetailId"),
        plan_id: getValues("plan_id"),
        investment_property_count: getValues("investment_properties").length,
        promo_code: promoCode,
      },
    });

    if (StripePaymentIntentResults?.clientSecret) {
      // createClientCacheInterView.mutate({
      //   key: "INTERVIEW" + `${getValues("clientDetailId")}`,
      //   data: {
      //     ...getValues(),
      //     steps_completed: 7,
      //   },
      //   form_type: 2,
      // });
      const { error }: any = await stripe?.confirmPayment({
        elements,
        clientSecret: StripePaymentIntentResults.clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboards?payment=${PaymentEnum.SUCCESS}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        toast.error(error.message, { position: "top-right" });
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    } else {
      toast.error(
        StripePaymentIntent.error?.message || "Something went wrong.",
        {
          position: "top-right",
        },
      );
      setisLoading(false);
      redirect("/dashboards");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        variant="contained"
        sx={{
          width: {
            sm: "100%",
            md: "100%",
          },
          display: "block",
          marginTop: "20px",
          background: (theme) => theme.palette.primary.main,
          ":disabled": {
            background: (theme) => theme.palette.primary.main,
          },
          height: "40px",
        }}
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? (
          <CircularProgress
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
            size={30}
          />
        ) : (
          "Pay Now"
        )}
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="h5">
          A paid receipt will be emailed to {getValues("userEmail")}
        </Typography>
        <Image
          src={Stripesecure}
          alt="Stripesecure"
          style={{ width: "100%", objectFit: "contain" }}
        />
      </Box>
      {/* Show error message to your customers */}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
    </form>
  );
};

const stripePromise = loadStripe(Publish_key);

const StripePayment = ({
  chargeAmount,
  promoCode,
  paymentType,
}: CheckoutFormProps) => {
  const optionsForStripe: any = {
    mode: "payment",
    amount: chargeAmount,
    currency: "usd",
    paymentMethodTypes: [paymentType],
    appearance: {
      /*...*/
      theme: "stripe",
    },
  };
  return (
    <Elements stripe={stripePromise} options={optionsForStripe}>
      <CheckoutForm chargeAmount={chargeAmount} promoCode={promoCode} />
    </Elements>
  );
};

export default StripePayment;
