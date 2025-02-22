export const getMainStatus = (filters: any, value: any) => {
  for (let group of filters) {
    for (let filter of group.filters) {
      if (filter.value === value) {
        return group.headerName;
      }
    }
  }
  return "-";
};
export const getKeyOfEnum = (enumObject: any, value: any) => {
  return enumObject
    ? (Object.keys(enumObject)?.find(
        (key) => enumObject[key] === value,
      ) as string)
    : ("" as string);
};

export enum PaymentMethodEnum {
  "card" = "Credit Card",
  "other" = "Invoice",
  "us_bank_account" = "Bank Account",
}

export enum AccountManagerStatusEnum {
  "INVITED" = "Invited",
  "ACTIVE" = "Active",
  "ARCHIVED" = "Archived",
}

export enum PartnerStatusEnum {
  "WAITING_APPROVAL" = "Waiting Approval",
  "APPROVED" = "Approved",
  "REJECTED" = "Rejected",
  "REGISTERED" = "Registered",
  "ARCHIVED" = "Archived",
  "TOTAL" = "Total",
}

export enum MarriageStatusEnum {
  "Single" = 1,
  "Couple" = 2,
}

export enum SubMarriageStatusEnum {
  "Never Married" = 1,
  "Divorced" = 2,
  "Widowed" = 3,
  "Legally married" = 11,
  "Common law" = 12,
}

export enum FilterUserEnum {
  "REGISTERED_USERS_LESS_THAN_SIXTY_DAYS" = "1",
  "ONBOARDED_USERS" = "2",
  "INTERVIEWED_USERS" = "3",
  "AMOUNT_PAID_USERS" = "4",
  "REGISTERED_USERS_MORE_THAN_SIXTY_DAYS" = "5",
  "ONLY_ONE_STEP_COMPLETED" = "6",
  "INCOMPLETE_QUESTIONS" = "7",
  "COMPLETED_QUESTIONS_WITHOUT_CHECKOUT" = "8",
  "REGISTERED_USER_BUT_NOT_ONBOARDED" = "9",
  "TOTAL_REGISTERED_USERS" = "10",
  "ONBOARDED_BUT_NOT_INTERVIEWED" = "11",
  "PAID_PENDING" = "12",
  "PAID_PROCESSING" = "13",
  "ABANDONED_USERS" = "14",
  "ARCHIVED_USERS" = "15",
  "ACTIVE_USERS" = "16",
  "SUSPEND_USERS" = "17",
}

export enum FilterUserChipEnum {
  "REGISTERED_USERS_LESS_THAN_SIXTY_DAYS" = "Registered Less Than 60 Days",
  "ONBOARDED_USERS" = "Onboarded",
  "INTERVIEWED_USERS" = "Interviewed",
  "AMOUNT_PAID_USERS" = "Amount Paid",
  "REGISTERED_USERS_MORE_THAN_SIXTY_DAYS" = "Registered More Than 60 Days",
  "ONLY_ONE_STEP_COMPLETED" = "Doc Created",
  "INCOMPLETE_QUESTIONS" = "Incompelete",
  "COMPLETED_QUESTIONS_WITHOUT_CHECKOUT" = "Ready To Pay",
  "REGISTERED_USER_BUT_NOT_ONBOARDED" = "Not Onboarded",
  "TOTAL_REGISTERED_USERS" = "Total Registered",
  "ONBOARDED_BUT_NOT_INTERVIEWED" = "Not Interviewed",
  "PAID_PENDING" = "Pipeline",
  "PAID_PROCESSING" = "Delivered",
  "ABANDONED_USERS" = "Abondoned Pay",
  "ARCHIVED_USERS" = "Archived",
  "ACTIVE_USERS" = "Active Users",
}

export enum PushNotificationType {
  "NewUserRegistered" = 101,
  "NewCheckout" = 102,
  "NewQuestionnaireCompleted" = 103,
  "NewSupportCreated" = 104,
}

export const CLIENT_PORTAL = `${process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL}/admin-verify?token=`;

export enum EmailFolders {
  INBOX = "Inbox",
  DRAFTS = "Drafts",
  TEMPLATES = "Templates",
  SNOOZED = "Snoozed",
  SENT = "Sent",
  SPAM = "Spam",
  TRASH = "Trash",
  OUTBOX = "Outbox",
  STARRED = "Starred",
  ARCHIVE = "Archive",
}

export enum StatusEnum {
  "PENDING" = "1",
  "IN_REVIEW" = "2",
  "PRINTED" = "3",
  "PROCESSING" = "4",
  "PRINT_SHIP" = "5",
  "PRINT_PICKUP" = "6",
  "QUIT_CLAIM" = "7",
  "BINDING_SHIP" = "8",
  "BINDING_PICKUP" = "9",
  "LABEL_SHIPPED" = "10",
  "PICKUP" = "11",
  "PICKUP_NOTARY" = "12",
  "IN_NOTARY" = "13",
  "SHIPPED" = "14",
  "DELIVERED" = "15",
  "RECIEVED" = "16",
  "CLOSED" = "17",
  "ARCHIVED" = "18",
  "BINDING" = "19",
  "ABANDONED" = "20",
  // "PENDING" = "PENDING",
  // "IN REVIEW" = "IN REVIEW",
  // "PRINTED" = "PRINTED",
  // "BINDING" = "BINDING",
  // "IN NOTARY" = "IN NOTARY",
  // "SHIPPED" = "SHIPPED",
  // "DELIVERED" = "DELIVERED",
  // "CLOSED" = "CLOSED",
}
export enum StatusEnumTimeLine {
  "PENDING" = "Pending",
  "IN_REVIEW" = "To Review",
  "QUIT_CLAIM" = "Assemble",
  "PRINTED" = "To Print",
  "BINDING" = "To Bind",
  "LABEL_SHIPPED" = "Label",
  "PICKUP" = "Pickup",
  "PICKUP_NOTARY" = "Pickup Notary",
  "SHIPPED" = "To Ship",
  "DELIVERED" = "Delivered",
  "ARCHIVED" = "Archive",
}
export enum StatusChipEnum {
  "PENDING" = "Pending",
  "IN_REVIEW" = "To Review",
  "QUIT_CLAIM" = "Assemble",
  "PRINTED" = "To Print",
  "BINDING" = "To Bind",
  "LABEL_SHIPPED" = "Label",
  "PICKUP" = "Pickup",
  "IN_NOTARY" = "In Notary",
  "SHIPPED" = "To Ship",
  "DELIVERED" = "Delivered",
  "PROCESSING" = "Processing",
  "PRINT_SHIP" = "Print Ship",
  "PRINT_PICKUP" = "Print Pickup",
  "BINDING_SHIP" = "Binding Ship",
  "BINDING_PICKUP" = "Binding Pickup",
  "PICKUP_NOTARY" = "Pickup Notary",
  "RECIEVED" = "Received",
  "CLOSED" = "Closed",
  "ARCHIVED" = "Archived",
  "ABANDONED" = "Abandoned",
}

// export enum StatusEnumColors {
//   PENDING = "#f1c40f", // Yellow for pending
//   "IN REVIEW" = "#e67e22", // Dark orange for in review
//   PRINTED = "#f39c12", // Orange for printed
//   BINDING = "#e74c3c", // Red for binding
//   "IN NOTARY" = "#1abc9c", // Turquoise for in notary
//   SHIPPED = "#2ecc71", // Green for shipped
//   DELIVERED = "#3498db", // Light blue for delivered
//   CLOSED = "#9b59b6", // Purple for closed
// }

export enum StatusEnumColors {
  PENDING = "#01a5a4", // Yellow
  IN_REVIEW = "#e67e22", // Dark orange
  PRINTED = "#f39c12", // Orange
  PROCESSING = "#d35400", // Dark orange
  PRINT_SHIP = "#f39c12", // Orange (same as printed)
  PRINT_PICKUP = "#e67e22", // Dark orange (same as in review)
  QUIT_CLAIM = "#c0392b", // Dark red
  BINDING_SHIP = "#e74c3c", // Red
  BINDING_PICKUP = "#c0392b", // Dark red (same as Assemble)
  LABEL_SHIPPED = "#2ecc71", // Green
  PICKUP = "#27ae60", // Dark green
  PICKUP_NOTARY = "#1abc9c", // Turquoise
  IN_NOTARY = "#16a085", // Dark turquoise
  SHIPPED = "#2ecc71", // Green (same as label shipped)
  DELIVERED = "#3498db", // Light blue
  RECEIVED = "#2980b9", // Dark blue
  CLOSED = "#9b59b6", // Purple
  ARCHIVED = "#8e44ad", // Dark purple
  BINDING = "#e74c3c", // Red (same as binding ship)
  ABANDONED = "#7f8c8d", // Gray
}

export const filtersOrder = [
  {
    headerName: "Pipeline",
    headerStatsKey: "PIPELINE_COUNT",
    filters: [
      {
        value: StatusEnum.PENDING,
        name: "Pending",
        statskey: "PENDING",
      },
      {
        value: StatusEnum.IN_REVIEW,
        name: "To Review",
        statskey: "IN_REVIEW",
      },
      {
        value: StatusEnum.QUIT_CLAIM,
        name: "Assemble",
        statskey: "QUIT_CLAIM",
      },
      {
        value: StatusEnum.PRINTED,
        name: "To Print",
        statskey: "PRINTED",
      },
      {
        value: StatusEnum.BINDING,
        name: "To Bind",
        statskey: "BINDING",
      },
      {
        value: StatusEnum.LABEL_SHIPPED,
        name: "Label",
        statskey: "LABEL_SHIPPED",
      },
      {
        value: StatusEnum.PICKUP,
        name: "Pickup",
        statskey: "PICKUP",
      },
      {
        value: StatusEnum.PICKUP_NOTARY,
        name: "PU Notary",
        statskey: "PICKUP_NOTARY",
      },
      {
        value: StatusEnum.SHIPPED,
        name: "To Ship",
        statskey: "SHIPPED",
      },
    ],
  },
  {
    headerName: "Delivered / Filed",
    headerStatsKey: "DELIVERED",
    filters: [
      {
        value: StatusEnum.DELIVERED,
        name: "Delivered",
        statskey: "DELIVERED",
      },
      {
        value: StatusEnum.ARCHIVED,
        name: "Archived",
        statskey: "ARCHIVED",
      },
    ],
  },
];

export const filtersQuestionnaire = [
  {
    headerName: "Pre-Checkout",
    headerStatsKey: "count_precheckout_questionnaires",
    filters: [
      {
        value: FilterUserEnum.COMPLETED_QUESTIONS_WITHOUT_CHECKOUT,
        name: "Ready To Pay",
        statskey: "total_users_with_complete_questionnaire_no_checkout",
      },
      {
        value: FilterUserEnum.INCOMPLETE_QUESTIONS,
        name: "Incomplete",
        statskey: "total_users_with_incomplete_questionnaire",
      },
      {
        value: FilterUserEnum.ONLY_ONE_STEP_COMPLETED,
        name: "Doc Created",
        statskey: "total_users_with_one_step_completed",
      },
      {
        value: FilterUserEnum.ABANDONED_USERS,
        name: "Abandoned",
        statskey: "count_users_abandoned_pay",
      },
    ],
  },
  {
    headerName: "Post-Checkout",
    headerStatsKey: "count_postcheckout_questionnaires",
    filters: [
      {
        value: FilterUserEnum.PAID_PENDING,
        name: "Pipeline",
        statskey: "count_users_paid_pending",
      },
      {
        value: FilterUserEnum.PAID_PROCESSING,
        name: "Delivered",
        statskey: "count_users_paid_processing",
      },
      {
        value: FilterUserEnum.ARCHIVED_USERS,
        name: "Archived",
        statskey: "count_users_archived",
      },
    ],
  },
];

export const filtersUsersList = {
  filters: [
    {
      value: FilterUserEnum.TOTAL_REGISTERED_USERS,
      name: "All",
      statskey: "total_registered_clients",
    },
    {
      value: FilterUserEnum.ACTIVE_USERS,
      name: "Active",
      statskey: "total_active_clients",
    },
    {
      value: FilterUserEnum.ABANDONED_USERS,
      name: "Abandoned",
      statskey: "total_abandoned_clients",
    },
    {
      value: FilterUserEnum.SUSPEND_USERS,
      name: "Suspended",
      statskey: "count_blocked_users",
    },
  ],
};

export const filtersAccountManager = [
  {
    value: AccountManagerStatusEnum.INVITED,
    name: "Invited",
  },
  {
    value: AccountManagerStatusEnum.ACTIVE,
    name: "Active",
  },
  // {
  //   value: AccountManagerStatusEnum.ARCHIVED,
  //   name: "Archived",
  // },
];

export enum GeneralStatusEnumColors {
  "In Progress" = "#b89401", // Yellow for in progress
  "Delivered" = "#2ecc71", // Green for completed
  "Closed" = "#9b59b6", // Purple for closed accounts
  "Filed" = "#9b59b6", // Purple for closed accounts
  "Pipeline" = "#3498db", // Light blue for pre-checkout
  "Pre-Checkout" = "#3498db", // Light blue for pre-checkout
  "Follow-Up" = "#e67e22", // Dark orange for follow-up
  "Post-Checkout" = "#1abc9c", // Turquoise for post-checkout
  "Ready To Pay" = "#f39c12", // Orange for ready to pay
  "Incomplete" = "#e74c3c", // Red for incomplete
  "Doc Created" = "#8e44ad", // Dark purple for doc created
  "Abondoned Pay" = "#34495e", // Dark blue for abandoned pay
  "Paid Pending" = "#d35400", // Dark orange for paid pending
  "Paid Processing" = "#c0392b", // Dark red for paid processing
  "Archived" = "#95a5a6", // Gray for archived
}

export enum PartnerStatusColors {
  "Rejected" = "red",
  "Waiting Approval" = "#b89401",
  "Approved" = "#2ecc71",
  "Registered" = "#34495e",
}
export enum UploaderEnum {
  "Automatic" = "Automatic",
  "Admin" = "Admin",
  "User" = "User",
}

export enum DeliveryOptionEnum {
  "SHIP" = "Ship",
  "PICKUP" = "Pickup",
  "PICKUP_NOTARY" = "Pickup And Notary",
}

export enum UserStatus {
  ALL = "ALL",
  READY_TO_PAY = "READY_TO_PAY",
  INCOMPLETE = "INCOMPLETE",
  DOC_CREATED = "DOC_CREATED",
  ABANDONED = "ABANDONED",
  PENDING = "PENDING",
  TO_REVIEW = "TO_REVIEW",
  ASSEMBLE = "ASSEMBLE",
  TO_PRINT = "TO_PRINT",
  TO_BIND = "TO_BIND",
  LABEL = "LABEL",
  PICKUP = "PICKUP",
  PU_NOTARY = "PU_NOTARY",
  TO_SHIP = "TO_SHIP",
  USERS_ONLY = "USERS_ONLY",
  DELIVERED = "DELIVERED",
  ARCHIVED = "ARCHIVED",
  PROSPECT_USERS = "PROSPECT_USERS",
  PROSPECT_PARTNER = "PROSPECT_PARTNER",
}
