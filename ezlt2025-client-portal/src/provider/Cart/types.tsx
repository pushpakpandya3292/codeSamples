export namespace Cart {
  export type CreatePorps = {};
  export type CreateResponse = {};
  export type CreateAPIMutationPayload = {
    is_qualified: boolean;
    is_probate_primary_home?: boolean;
    investment_properties_count: number;
    marriage_status: 1 | 2;
    sub_marriage_status: number;
    state: string;
    notary: number | string;
    primary_trustee: {
      first_name: string;
      middle_name: string;
      last_name: string;
      email: string;
      phone_no: string;
    };
    secondary_trustee?: {
      first_name: string;
      middle_name: string;
      last_name: string;
      email: string;
      phone_no: string;
    };
    planId: string | number;
    shipping: number | string;
    claim: number | string;
    residence_address: string;
  };
  export interface CreateAPIPayload extends CreatePorps {
    data: CreateAPIMutationPayload;
  }

  export type DeleteProps = {};
  export type DeleteResponse = {};
  export type DeleteAPIMutationPayload = {
    id: string;
  };
  export interface DeleteAPIPayload extends DeleteProps {
    data: DeleteAPIMutationPayload;
  }
}
