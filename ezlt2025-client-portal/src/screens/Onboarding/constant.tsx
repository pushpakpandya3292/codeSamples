export interface OnboardingFormikPropInterface {
  marriage_status: "COUPLE" | "SINGLE";
  additional_info:
    | "NEVER_MARRIED"
    | "DIVORCED"
    | "WIDOWED"
    | "LEGALLY_MARRIED"
    | "COMMON_LAW"
    | undefined;
  died_person: string | undefined;
  last_married_person: string | undefined;
  state: string;
  planId: string | number;
  plan_to_entirely_disinherit: boolean | undefined;
  need_a_special_needs_trust: boolean | undefined;
  is_your_net_worth_greater: boolean | undefined;
  are_you_in_a_nursing_home: boolean | undefined;
  do_you_have_multiple: boolean | undefined;
  are_there_pending_lawsuits: boolean | undefined;
  primary_first_name: string;
  primary_middle_name: string;
  primary_last_name: string;
  primary_email: string;
  primary_mobile: string;
  secondary_first_name: string;
  secondary_middle_name: string;
  secondary_last_name: string;
  secondary_email: string;
  secondary_mobile: string;
  protect_home: boolean | undefined;
  no_of_investment_property: number;
  shipping: number | string;
  notary: number | string;
  quit_claim: number | string;
  discount?: number;
  stateCheckbox: boolean;
  relation_with_end_user: string;
  end_user: string;
}

export const states = [
  // { value: "CA", label: "California" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export enum CartChoiceEnum {
  "SELF" = "Self",
  "CLIENT" = "Client",
  "OTHERS" = "Others",
}
export enum MarriageStatusEnum {
  "SINGLE" = 1,
  "COUPLE" = 2,
}
export enum MarriageStatusForProfileEnum {
  "Single" = 1,
  "Couple" = 2,
}

export enum SubMarriageStatusEnum {
  "NEVER_MARRIED" = 1,
  "DIVORCED" = 2,
  "WIDOWED" = 3,
  "LEGALLY_MARRIED" = 11,
  "COMMON_LAW" = 12,
}
export enum SubMarriageStatusForProfileEnum {
  "Never Married" = 1,
  "Divorced" = 2,
  "Widowed" = 3,
  "Legally Married" = 11,
  "Common Law" = 12,
}
