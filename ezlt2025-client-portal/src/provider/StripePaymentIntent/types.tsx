export namespace StripeIntent {
  export type StripeIntentProps = {};
  export type StripeIntentResponse = {
    clientSecret: string;
    price: number;
  };
  export type StripeIntentAPIMutationPayload = {
    data: {
      total: number | undefined;
      client_detail_id: string;
      plan_id: string;
      investment_property_count: number;
      promo_code: string | undefined;
    };
  };
  export interface StripeIntentAPIPayload extends StripeIntentProps {
    data: StripeIntentAPIMutationPayload;
  }
}
