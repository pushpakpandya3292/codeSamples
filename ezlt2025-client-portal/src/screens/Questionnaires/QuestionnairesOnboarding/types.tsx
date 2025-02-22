import React from "react";

export type IQLivingTrustStep =
  | {
      title: "Setup";
      active: boolean;
      tabs: {
        active: boolean;
        nextEnabled: boolean;
        title:
          | "Account Setup"
          | "Qualifications"
          | "Pricing"
          | "Initial Trustee(s)"
          | "Trust Name"
          | "Terminology";
        tipsContent?: React.ReactNode | string;
      }[];
    }
  | {
      title: "People";
      active: boolean;
      tabs: [];
    }
  | {
      title: "Instructions";
      active: boolean;
      tabs: [];
    }
  | {
      title: "Estate";
      active: boolean;
      tabs: [];
    }
  | {
      title: "Logistics";
      active: boolean;
      tabs: [];
    }
  | {
      title: "Services";
      active: boolean;
      tabs: [];
    }
  | {
      title: "Review";
      active: boolean;
      tabs: [];
    };

export type IQLivingTrustStepTab = IQLivingTrustStep["tabs"][number];

export interface IONBOARDING_STRUCTURE {
  steps: IQLivingTrustStep[];
}

export interface ILIVING_TRUST_QUESTIONS {
  is_mailing_address_for_doc: undefined;
  mailing_address_for_doc: null;
  is_allowed_by_other: boolean | undefined | string;
  is_qualified: boolean | undefined | string;
  end_user: string;
  relation_with_end_user: string;
  is_probate_primary_home: string;
  investment_properties_count: number;
  additional_info: string;
  sub_marriage_status: string;
  state: string;
  otherState: string;
  notary: string;
  planId: string;
  shipping: string;
  claim: string;
  userId?: string;
  marriage_status: number | undefined | string;
  died_person: string;
  last_married_person: string;
  died_person_death_date: string;
  last_married_person_divorce_date: string;

  complete_trust_name: string;
  original_trust_name: string;
  trust_name_confirmed: boolean;
  trust_status: string;
  is_original_and_restated: boolean;
  original_trust_date: string;

  primary_trustee_first_name: string;
  primary_trustee_middle_name: string;
  primary_trustee_last_name: string;
  primary_trustee_email: string;
  primary_trustee_mobile: string;
  primary_trustee_date_of_birth: string;
  primary_trustee_citizenship: string;
  primary_trustee_empolyment_status: string;
  primary_trustee_estimated_annual_income: string | number;
  primary_trustee_address: null;
  primary_trustee_county: string;

  secondary_trustee_first_name: string;
  secondary_trustee_middle_name: string;
  secondary_trustee_last_name: string;
  secondary_trustee_email: string;
  secondary_trustee_mobile: string;
  secondary_trustee_date_of_birth: string;
  secondary_trustee_citizenship: string;
  secondary_trustee_empolyment_status: string;
  secondary_trustee_estimated_annual_income: string | number;
  secondary_trustee_address: null;
  secondary_trustee_county: string;

  // primary_trustee_pronouns_relation: string;
  // secondary_trustee_pronouns_relation: string;
  primary_trustee_gender: string | number;
  secondary_trustee_gender: string;
  primary_trustee_secondary_relation: string;
  secondary_trustee_primary_relation: string;
}

export interface ILIVING_TRUST_STATE {
  packageCode: "LT-C";
  questionnaire: IONBOARDING_STRUCTURE;
  questions: ILIVING_TRUST_QUESTIONS;
  packageSelected: number;
  errors: Record<keyof ILIVING_TRUST_QUESTIONS, string | undefined>;
}
