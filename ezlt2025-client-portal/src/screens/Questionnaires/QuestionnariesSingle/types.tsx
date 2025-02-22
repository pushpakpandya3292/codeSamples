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
      tabs: {
        active: boolean;
        nextEnabled: boolean;
        title:
          | "My Family"
          | "Successor Trustees"
          | "Health Agents"
          | "Financial Agents"
          | "Guardians"
          | "Children";

        tipsContent?: React.ReactNode | string;
      }[];
    }
  | {
      title: "Instructions";
      active: boolean;
      tabs: {
        active: boolean;
        nextEnabled: boolean;
        title: "Power of Attorney" | "Health Decisions" | "Burial Decisions";

        tipsContent?: React.ReactNode | string;
      }[];
    }
  | {
      title: "Estate";
      active: boolean;
      tabs: {
        active: boolean;
        nextEnabled: boolean;
        title:
          | "Primary Home"
          | "Other Properties"
          | "Estate Wishes"
          | "Wishes Summary";

        tipsContent?: React.ReactNode | string;
      }[];
    }
  | {
      title: "Logistics";
      active: boolean;
      tabs: {
        nextEnabled: boolean;
        active: boolean;
        title:
          | "Delivery Method"
          | "Witness"
          | "Notary"
          | "Signing Date"
          | "Acknowledgement & Agreement";

        tipsContent?: React.ReactNode | string;
      }[];
    }
  | {
      title: "Services";
      active: boolean;
      tabs: {
        active: boolean;
        nextEnabled: boolean;
        title:
          | "Protect your home"
          | "Insurance Planning"
          | "Retirement Plans"
          | "Other Professional Services"
          | "Legal Advice Insurance";
        tipsContent?: React.ReactNode | string;
      }[];
    }
  | {
      title: "Review";
      active: boolean;
      tabs: {
        active: boolean;
        nextEnabled: boolean;
        title:
          | "Review my answers"
          | "Viewing options"
          | "Payment Method"
          | "Checkout";
        tipsContent?: React.ReactNode | string;
        buttonContent?: string;
      }[];
    };

export type IQLivingTrustStepTab = IQLivingTrustStep["tabs"][number];

export interface ILIVING_TRUST_STRUCTURE {
  steps: IQLivingTrustStep[];
}

export interface ILIVING_TRUST_QUESTIONS {
  PaymentMethods: string;
  default_state: string;
  userEmail: string | undefined;
  is_mailing_address_for_doc: string;
  mailing_address_for_doc: null;
  additional_info: string;
  is_allowed_by_other: string;
  is_qualified: undefined | string;
  end_user: string;
  relation_with_end_user: string;
  is_probate_primary_home: string;
  investment_properties_count: string;
  sub_marriage_status: string;
  state: string;
  planId: string;
  last_married_person: string;
  died_person: string;
  died_person_death_date: string;
  last_married_person_divorce_date: string;
  shipping: string;
  claim: string;
  cartId: string | undefined;
  clientDetailId: string | undefined;
  plan_id: string | undefined;
  userId?: string;
  marriage_status: number | undefined | string;
  is_next_disabled: boolean;
  steps_completed_percentage: number;
  temp_agent_full_name: string;
  steps_completed: number;
  Agents_details: {
    full_Name: string;
    email: string;
    address: string;
    mobile: string;
    primary_trustee_child_relation: string;
    secondary_trustee_child_relation: string;
    secondary_primary_child_relation: string;
  }[];

  complete_trust_name: string;
  original_trust_name: string;
  trust_name_confirmed: boolean;
  trust_status: string;
  is_original_and_restated: boolean;
  original_trust_date: string;

  primary_trustee_is_editing: boolean;
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

  // primary_trustee_pronouns_relation: string;
  primary_trustee_gender: string | number;

  living_childern: boolean | undefined;
  living_childern_modal_open: boolean;
  living_childern_full_name: string;
  living_childern_date_of_birth: string;
  living_childern_age: number;
  living_childern_email: string;
  living_childern_address: null;
  living_childern_mobile_number: string;
  living_childern_primary_relation: string;
  living_childern_details: {
    full_Name: string;
    date_of_birth: string;
    email: string;
    address: string;
    mobile: string;
    primary_trustee_child_relation: string;
    secondary_trustee_child_relation: string;
    secondary_primary_child_relation: string;
  }[];
  living_childern_have_any_children: boolean;
  living_child_children_full_name: string;
  deceased_childern: boolean | undefined;
  deceased_childern_modal_open: boolean;
  deceased_childern_full_name: string;
  deceased_childern_date_of_birth: string;
  deceased_childern_date_of_decease: string;
  deceased_childern_details: {
    full_Name: string;
    date_of_birth: string;
    date_of_decease: string;
  }[];

  temp_primary_successor_modal_open: boolean;
  temp_primary_successor_full_name: string;
  temp_primary_successor_email: string;
  temp_primary_successor_phone_number: string;
  temp_primary_trustee_successor_relation: string;
  temp_primary_successor_address: null;
  temp_primary_successor_age: boolean;

  temp_backup_successor_modal_open: boolean;
  temp_backup_successor_full_name: string;
  temp_backup_successor_email: string;
  temp_backup_successor_phone_number: string;
  temp_backup_trustee_successor_relation: string;
  temp_backup_successor_address: null;
  temp_backup_successor_age: boolean;

  primary_successor_id: string;
  primary_successor_full_name: string;
  primary_successor_email: string;
  primary_successor_age: string;
  primary_successor_phone_number: string | undefined;
  primary_successor_relation: string;
  primary_trustee_successor_relation: string;
  primary_successor_address: string;

  backup_successor_id: string;
  backup_successor_full_name: string;
  backup_successor_email: string;
  backup_successor_age: string;
  backup_successor_phone_number: string | undefined;
  backup_successor_relation: string;
  backup_trustee_successor_relation: string;
  backup_successor_address: string;

  temp_primary_health_agent_modal_open: boolean;
  temp_primary_health_agent_full_name: string;
  temp_primary_health_agent_email: string;
  temp_primary_health_agent_phone_number: string;
  temp_primary_trustee_health_agent_relation: string;
  temp_primary_health_agent_address: null;
  temp_primary_health_agent_age: boolean;

  temp_backup_health_agent_modal_open: boolean;
  temp_backup_health_agent_full_name: string;
  temp_backup_health_agent_email: string;
  temp_backup_health_agent_phone_number: string;
  temp_backup_trustee_health_agent_relation: string;
  temp_backup_health_agent_address: null;
  temp_backup_health_agent_age: boolean;

  primary_health_agent_id: string;
  primary_health_agent_full_name: string;
  primary_health_agent_email: string;
  primary_health_agent_age: string;
  primary_health_agent_phone_number: string | undefined;
  primary_health_agent_relation: string;
  primary_trustee_health_agent_relation: string;
  primary_health_agent_address: string;

  backup_health_agent_id: string;
  backup_health_agent_full_name: string;
  backup_health_agent_email: string;
  backup_health_agent_age: string;
  backup_health_agent_phone_number: string | undefined;
  backup_health_agent_relation: string;
  backup_trustee_health_agent_relation: string;
  backup_health_agent_address: string;

  temp_primary_financial_agent_modal_open: boolean;
  temp_primary_financial_agent_full_name: string;
  temp_primary_financial_agent_email: string;
  temp_primary_financial_agent_phone_number: string;
  temp_primary_trustee_financial_agent_relation: string;
  temp_secondary_trustee_financial_agent_relation_primary: string;
  temp_secondary_primary_financial_agent_relation_primary: string;
  temp_primary_financial_agent_address: null;
  temp_primary_financial_agent_age: boolean;

  temp_backup_financial_agent_modal_open: boolean;
  temp_backup_financial_agent_full_name: string;
  temp_backup_financial_agent_email: string;
  temp_backup_financial_agent_phone_number: string;
  temp_backup_trustee_financial_agent_relation: string;
  temp_secondary_trustee_financial_agent_relation_backup: string;
  temp_secondary_primary_financial_agent_relation_backup: string;
  temp_backup_financial_agent_address: null;
  temp_backup_financial_agent_age: boolean;

  primary_financial_agent_id: string;
  primary_financial_agent_full_name: string;
  primary_financial_agent_email: string;
  primary_financial_agent_age: string;
  primary_financial_agent_phone_number: string | undefined;
  primary_financial_agent_relation: string;
  primary_trustee_financial_agent_relation: string;
  primary_financial_agent_address: string;

  backup_financial_agent_id: string;
  backup_financial_agent_full_name: string;
  backup_financial_agent_email: string;
  backup_financial_agent_age: string;
  backup_financial_agent_phone_number: string | undefined;
  backup_financial_agent_relation: string;
  backup_trustee_financial_agent_relation: string;
  backup_financial_agent_address: string;

  //Step 3 (Instructions) types start
  //Power of Attorney
  power_of_attorny_primary: string;
  transactions_categories_for_primary: boolean;
  select_all_for_primary_power_of_attorney: {
    title: string;
    value: string;
    checked: boolean;
    key_name: string;
  }[];

  power_of_attorny_secondary: string;
  transactions_categories_for_secondary: boolean;
  //Health Decisions
  health_care_primary: string;
  perform_autopsy_primary: number;
  organ_donation_primary: number;
  select_all_for_primary_health_decision: {
    title: string;
    value: string;
    checked: boolean;
    key_name: string;
  }[];
  //Burial Decisions burial_decisions_for_primary: "",
  burial_decisions_for_primary: string;
  body_buried_cremated_primary: string;
  funeral_service_primary: string;
  post_death_arrangement_primary: string;
  //Step 3 (Instructions) types End

  //Step 5 (Officialize) types start
  //Witness
  witness_primary_full_name: string;
  witness_primary_address: null;
  witness_secondary_full_name: string;
  witness_secondary_address: null;
  //Notary
  delivery_option: string;
  is_shipping_address_for_doc: string;
  shipping_name_for_doc: string;
  shipping_address_for_doc: null;
  licensed_notary_public_0fficer_option: string;
  notary: string;
  notary_complete_name: string;
  notary_country_name: string;
  //Signing Date
  signing_date: string;
  signing_date_field: string;
  //Acknowledgment And Agrement
  e_signature: string;

  // Step (Estate) Start
  //primary home
  primary_home_address: null;
  primary_home_rent_this_property: null;
  primary_home_put_in_trust: null;
  primary_home_property_api_details: null | undefined;
  is_check_county_record: boolean;
  property_question: string | null;
  mailing_address_checkbox: string;
  mailing_address_field: null;
  primary_residence: string;
  quit_qlaim: string;
  //other properites
  investment_property: boolean;
  investment_properties: {
    investment_property_primary_home_address: null;
    mailing_address_checkbox: string;
    mailing_address_field: null;
    property_ownership_status: string;
    property_api_details: string;
    property_question: string | null;
  }[];
  // investment_property_primary_home_address: null;
  // property_ownership_status: string;
  //estate wishes
  trustee_responsibility: string;
  trustee_responsibility_approve: boolean;
  trustee_responsibility_minimum_age: number;

  property_division: string;
  property_division_skip: boolean;
  property_division_approve: boolean;

  gifts_to_other_people: string;
  gifts_to_other_people_skip: boolean;
  gifts_to_other_people_approve: boolean;

  retirement_and_insurance: string;
  retirement_and_insurance_skip: boolean;
  retirement_and_insurance_approve: boolean;

  wishes_for_pets: string;
  wishes_for_pets_skip: boolean;
  wishes_for_pets_approve: boolean;

  businesses_and_social_media: string;
  businesses_and_social_media_skip: boolean;
  businesses_and_social_media_approve: boolean;

  debts_or_loans: string;
  debts_or_loans_skip: boolean;
  debts_or_loans_approve: boolean;

  trustee_compensation: string;
  trustee_compensation_skip: boolean;
  trustee_compensation_approve: boolean;

  additional: string;
  additional_skip: boolean;
  additional_approve: boolean;

  gifts_to_charities: string;
  gifts_to_charities_skip: boolean;

  division_of_foreign_property: string;
  division_of_foreign_property_skip: boolean;

  is_summary_approved: false;
  //Step 5 (Officialize) types End
  temp_primary_guardian_modal_open: boolean;
  temp_primary_guardian_full_name: string;
  temp_primary_guardian_email: string;
  temp_primary_guardian_phone_number: string;
  temp_primary_trustee_guardian_relation: string;
  temp_primary_guardian_address: null;
  temp_primary_guardians_agent_age: boolean;

  temp_backup_guardian_modal_open: boolean;
  temp_backup_guardian_full_name: string;
  temp_backup_guardian_email: string;
  temp_backup_guardian_phone_number: string;
  temp_backup_trustee_guardian_relation: string;
  temp_backup_guardian_address: null;
  temp_backup_guardians_agent_age: boolean;

  primary_guardian_id: string;
  primary_guardian_full_name: string;
  primary_guardian_email: string;
  primary_guardian_age: string;
  primary_guardian_phone_number: string | undefined;
  primary_guardian_relation: string;
  primary_trustee_guardian_relation: string;
  primary_guardian_address: string;

  backup_guardian_id: string;
  backup_guardian_full_name: string;
  backup_guardian_email: string;
  backup_guardian_age: string;
  backup_guardian_phone_number: string | undefined;
  backup_guardian_relation: string;
  backup_trustee_guardian_relation: string;
  backup_guardian_address: string;

  isChildUnderAge: boolean;

  fund_your_trust: boolean;
  legal_shield: boolean;

  mortgage_or_life_Insurance: string;
  health_insurance: string;
  medicare_insurance: string;
  retirement_and_investing_plans: string;
  setupIRA: string;
  general_investing: string;
  quote_for_life_insurance: boolean;
  ProfessionalServices: {
    key: string;
    value: boolean;
  }[];
  ProfessionalServicesOthers: string;
  property_type_question: string | null;
}

export interface ILIVING_TRUST_STATE {
  packageCode: "LT-C";
  questionnaire: ILIVING_TRUST_STRUCTURE;
  questions: ILIVING_TRUST_QUESTIONS;
  packageSelected: number;
  errors: Record<keyof ILIVING_TRUST_QUESTIONS, string | undefined>;
}
