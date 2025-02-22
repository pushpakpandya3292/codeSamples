export namespace Register {
  export type RegisterProps = {};
  export type RegisterResponse = {
    message: string;
    data: {
      email: string;
    };
  };
  export type RegisterAPIMutationPayload = {
    email: string;
    password: string;
    confirm_password: string;
    firstName: string;
    lastName?: string;
    licensed_partner?: string;
    defaultPromoCode?: string;
    heardBy: string;
    reference_code?: string;
    subdomain?: string;
    partner_name?:string;
    partner_license?:string;
  };
  export interface RegisterAPIPayload extends RegisterProps {
    data: RegisterAPIMutationPayload;
  }
}
