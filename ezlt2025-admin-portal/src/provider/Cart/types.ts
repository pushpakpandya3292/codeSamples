export namespace Cart {
  //listing
  export type CartProps = {
    id: string;
  };
  export interface CartResponse {
    is_qualified: boolean;
    is_probate_primary_home: boolean;
    investment_properties_count: number;
    marriage_status: number;
    died_person: any;
    last_married_person: any;
    sub_marriage_status: number | string;
    state: string;
    notary: number;
    shipping: number;
    claim: number;
    plan: Plan;
    primary_trustee: PrimaryTrustee;
    secondary_trustee: SecondaryTrustee;
  }
  export type CartAPIPutPayload = {
    id?: string;
    data?:
      | {
          finalInvoiceAmount?: number;
          finalPaymentType?: string;
          commission?: number;
          finalClearedDate?: string;
        }
      | undefined;
  };
  export interface CartPatchResponse {}
  export type CartAPIMutationPayload = {};
  export type CartAPIPatchPayload = {
    id?: string;
    data?:
      | {
          status?: string;
          notes?: string;
        }
      | undefined;
  };

  export interface CartOrderStatusResponse {}
  export type CartOrderStatusAPIPayload = {
    data: {
      cartId: string;
      cleared?: number;
      qcReview?: number;
      docReview?: number;
    };
  };

  export interface CartAPIPayload extends CartProps {}

  export interface Plan {
    id: string;
    name: string;
    description: string;
    single_price: string;
    couple_price: string;
    is_main: boolean;
  }

  export interface PrimaryTrustee {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_no: string | undefined;
    order: number;
  }

  export interface SecondaryTrustee {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_no: string | undefined;
    order: number;
  }
  // User Cart

  export type UserCartprops = {
    page?: number;
    limit?: number;
    userId?: string;
    sort?: string;
    filterId?: string;
  };

  export type Trustee = {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_no: string;
    order: number;
  };

  export interface UsserCartResponse {
    data: {
      user: {
        id: string;
        firstName: string;
        lastName: string;
        reference_code: string;
        email: string;
        referenceCode: string;
      };
      id: string;
      createdAt: string;
      paymentStatus: number;
      status: string;
      clientDetail: {
        id: string;
        marriage_status: number;
        state: string;
        steps_completed: number;
        steps_completed_percentage: number;
        createdAt: string;
        trust_name: string;
        PrimaryTrustee: {
          id: string;
          first_name: string;
          middle_name: string;
          last_name: string;
          email: string;
          phone_no: string;
          order: number;
        };
        SecondaryTrustee: {
          id: string;
          first_name: string;
          middle_name: string;
          last_name: string;
          email: string;
          phone_no: string;
          order: number;
        } | null;
      };
      plan: {
        id: string;
        name: string;
      };
    }[];
    limit:number;
    total:number;
    current:number;
  }
  export interface UserCardPayload extends UserCartprops {}

  export type UserOrdersprops = {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
    paymentStatus?: number;
    sort?: string;
  };
  export type UserOrdersResponse = {
    data: {
      user: {
        firstName: string;
        reference_code: string;
      };
      cartId: string;
      status: string;
      total: number | null;
      payment_status: number;
      statusHistory: {
        status: string;
        timestamp: string;
      }[];
      plan: {
        name: string;
      };
      clientDetail: {
        trust_name: string | null;
        state: string;
        stepsCompleted: number;
        progressPercent: number;
      };
      createdAt: string;
      updatedAt: string;
    }[];
    current: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
  };
}
