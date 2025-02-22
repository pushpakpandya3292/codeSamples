export enum MortgageInsuranceEnum {
  "INTRESTED" = "I am interested in a quote, contact me.",
  "REVIEW_POLICY" = "Review my current policy.",
  "UPDATING_BENEFICIARIES" = "I need updating my beneficiaries",
  "SKIP" = "Skip. Not interested at this time.",
}
export enum HealthInsuranceEnum {
  "INTRESTED" = "I am interested in a quote, contact me.",
  "REVIEW_POLICY" = "Review my current policy for better pricing.",
  "SKIP" = "Skip. Not interested at this time.",
}
export enum MedicareInsuranceEnum {
  "INTRESTED" = "I am turning 65 soon, contact me.",
  "INTRESTED_OTHER_OPTIONS" = "Interested in learning about other options.",
  "SKIP" = "Skip. Not interested at this time.",
}
export enum RetirementandInvestingPlansEnum {
  "INTRESTED" = "I am interesting in a rollover, contact me.",
  "INTRESTED_QUOTE" = "I need an advice for my current plan.",
  "UPDATING_BENEFICIARIES" = "I need updating my beneficiaries",
  "SKIP" = "Skip. Not interested at this time.",
}
export enum SetupIRAEnum {
  "INTRESTED" = "I am interested in a new plan, contact me.",
  "NEED_ADVICE" = "I need advice for my current plan.",
  "UPDATING_BENEFICIARIES" = "I need updating my beneficiaries.",
  "SKIP" = "Skip. Not interested at this time.",
}
export enum GeneralInvestingEnum {
  "INTRESTED" = "I am interested in investing, contact me.",
  "NEED_ADVICE" = "I need advice for my current plan.",
  "UPDATING_BENEFICIARIES" = "I need updating my beneficiaries.",
  "SKIP" = "Skip. Not interested at this time.",
}
export enum MarriageStatusEnum {
  "SINGLE" = 1,
  "COUPLE" = 2,
}
export enum TrustEnum {
  "new" = 1,
  "restated" = 2,
}

export enum SpringingAuthorizationEnum {
  "RECOMMENDED" = 1,
  "CONDITIONAL" = 2,
}

export enum EndLifeAuthorizationEnum {
  "RIGHT_TO_DIE" = 1,
  "PROLONG_LIFE" = 2,
}

export enum BurialEnum {
  "NONE" = 0,
  "BURIED" = 1,
  "CREMATED" = 2,
}

export enum CitizenShipEnum {
  "USCITIZEN" = "US citizen",
  "CURRENTLYNOTAUSCITIZEN" = "Currently not a US citizen",
}
export enum TrusteesRealtionEnum {
  "HUSBAND" = "Husband",
  "WIFE" = "Wife",
  "SPOUSE" = "Spouse",
  "SIGNIFICANTOTHER" = "Significant Other",
}

export enum WishesEnum {
  "trustee_responsibility" = 0,
  "property_division" = 1,
  "gifts_to_other_people" = 2,
  "retirement_and_insurance" = 3,
  "wishes_for_pets" = 4,
  "businesses_and_social_media" = 5,
  "debts_or_loans" = 6,
  "trustee_compensation" = 7,
  "additional" = 8,
}

export enum EmploymentStatusEnum {
  "FULLTIME" = "Full Time",
  "PARTTIME" = "Part Time",
  "SELFEMPLOYMENT" = "Self Employed",
  "RETIRED" = "Retired",
  "NOTEMPLOYMENT" = "Not Employed",
  "DISABLED" = "Disabled",
}

export enum PronounsEnum {
  "SHE/HER/HERS" = "She / Her / Hers",
  "HE/HIM/HIS" = "He / Him / His",
}

export enum TrusteeChildRealtionEnum {
  "MYSON" = "my son",
  "MYDAUGHTER" = "my daughter",
  "MYCHILD" = "my child",
  "MYSTEPCHILD" = "my step-child",
  "MYADOPTEDCHILD" = "my adopted-child",
}

export enum TrusteeChildBothRealtionEnum {
  "OURSON" = "our son",
  "OURDAUGHTER" = "our daughter",
  "OURCHILD" = "our child",
  "OURSTEPCHILD" = "our step-child",
  "OURADOPTEDCHILD" = "our adopted-child",
}
export enum TrusteeRealtionWithPersonEnum {
  "MYPARENT" = "my parent",
  "MYBROTHER" = "my brother",
  "MYSISTER" = "my sister",
  "MYGRANDCHILD" = "my grand child",
  "MYRELATIVE" = "my relative",
  "MYSIBLINGINLAW" = "my sibling in-law",
  "MYPARENTINLAW" = "my parent in-law",
  "MYFRIEND" = "my friend",
  "MYATTORNEY" = "my attorney",
  "MYCOLLEAGUE" = "my colleague",
  "MYSIGNIFICANTOTHER" = "my significant other",
}

export enum TrusteeBothRealtionWithPersonEnum {
  "PARENT" = "parent",
  "BROTHER" = "brother",
  "SISTER" = "sister",
  "RELATIVE" = "relative",
  "SIBLINGINLAW" = "sibling in-law",
  "PARENTINLAW" = "parent in-law",
  "FRIEND" = "friend",
  "ATTORNEY" = "attorney",
  "COLLEAGUE" = "colleague",
  "SIGNIFICANTOTHER" = "significant other",
}
export enum DeliveryOptionEnum {
  "SHIP" = "Ship",
  "PICKUP" = "Pickup",
  "PICKUP_NOTARY" = "Pickup And Notary",
}

export enum TypeOfPropertyEnum {
  "IS_SINGLE_FAMILY" = "Single-family house (one unit on one lot)",
  "IS_DUPLEX" = "Duplex (two units on one lot)",
  "IS_Multi_UNIT" = "Multi-unit (more than two units on one lot)"
}

export enum MailingAddressEnum {
  "MAILING_ADDRESS" = "Same as primary home address",
  "IS_MAILING_ADDRESS" = "I want to add different mailing address",
}

export enum EstatePlanBinderEnum {
  "USPS" = "USPS 2-day Priority Shipping (included)",
  "LOCAL" = "Local pick-up at the EZ Living Trust Office (South Pasadena, CA office)",
}

export enum ShippedToEnum {
  "ME" = "Ship to someone else",
  "PRIMARY" = "Shipped to Primary Trustee",
  "PICKUP" = "Pick-up ONLY",
  "PICKUPNOTARY" = "Pick-up and Notarize in the EZ Living Trust office",
}
