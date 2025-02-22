export function toCamelCase(str: string) {
  return str
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    )
    .replace(/^[A-Z]/, (firstLetter) => firstLetter.toLowerCase());
}

// Utility function to convert strings to Title Case
export function convertToTitleCase(str: string) {
  return str
    .replace(/([-_])/g, " ") // Replace - or _ with spaces
    .replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );
}

export enum EmailNameEnum {
  FORGOT_PASSWORD = "Forgot Password",
  USER_REGISTERED_ADMIN = "User Registered Admin",
  USER_REGISTERED_USER = "User Registered User",
  ORDER_VERIFICATION_ADMIN = "Order Verification Admin",
  ORDER_VERIFICATION_CLIENT = "Order Verification Client",
  SUPPORT_EMAIL_ADMIN = "Support Email Admin",
  SUPPORT_EMAIL_CLIENT = "Support Email Client",
  ORDER_STATUS_PICKUP_UPDATE = "Order Status Pickup Update",
  ORDER_STATUS_PICKUP_NOTARY_UPDATE = "Order Status Pickup Notary Update",
  ORDER_STATUS_SHIPPED_UPDATE = "Order Status Shipped Update",
  ORDER_STATUS_DELIVERED_UPDATE = "Order Status Delivered Update",
  ADMIN_APPROVAL = "Admin Approval",
  ACCOUNT_MANAGER_INVITE = "Account Manager Invite",
  ADMIN_PARTNER_NOTIFY = "Admin Partner Notify",
  REFERRAL_EMAIL = "Referral Email",
  SUBMIT_FOR_APPROVAL = "Submit For Approval",
  CLIENT_FEEDBACK = "Client Feedback",
  SERVICES_PDF = "Services PDF",
  PAYMENT_FAILED = "Payment Failed",
  LEGALSHIELD = "LegalShield",
  USER_DEACTIVATED = "User Deactivated",
  USER_ACTIVATED = "User Activated",
  USER_SUSPENDED = "User Suspended",
  USER_UNSUSPENDED = "User Unsuspended",
  USER_REGISTERED_PARTNER = "User Registered Partner",
  PARTNER_UNDER_REVIEW = "Partner Under Review",
  PARTNER_REJECTED = "Partner Rejected",
  PARTNER_APPROVED = "Partner Approved",
  BANK_ORDER_DELAY_ADMIN = "Bank Order Delay Admin",
  BANK_ORDER_DELAY_CLIENT = "Bank Order Delay Client",
  QUESTIONNAIRE_STARTED_ADMIN = "Questionnaire Started Admin",
  QUESTIONNAIRE_STARTED_CLIENT = "Questionnaire Started Client",
  INVOICE_PAYMENT_CLIENT = "Invoice Payment Client",
  INVOICE_PAYMENT_ADMIN = "Invoice Payment Admin",
  INVOICE_DELAY_ADMIN = "Invoice Delay Admin",
  INVOICE_DELAY_CLIENT = "Invoice Delay Client",
  BANK_ORDER_ADMIN = "Bank Order Admin",
  BANK_ORDER_CLIENT = "Bank Order Client",
}

export const mergeTags = {
  user_name: {
    name: "User Name",
    value: "{{userName}}",
    sample: "user_name",
  },
  email: {
    name: "Email",
    value: "{{email}}",
    sample: "email",
  },
  referalCode: {
    name: "Referal Code",
    value: "{{referalCode}}",
    sample: "referal_Code",
  },
  topic: {
    name: "Topic",
    value: "{{topic}}",
    sample: "topic",
  },
  contactBy: {
    name: "Contact By",
    value: "{{contactBy}}",
    sample: "contact_by",
  },
  mobile: {
    name: "Mobile",
    value: "{{mobile}}",
    sample: "mobile",
  },
  planName: {
    name: "Plan Name",
    value: "{{planName}}",
    sample: "plan_name",
  },
  discount: {
    name: "Discount",
    value: "{{discount}}",
    sample: "discount",
  },
  orderDate: {
    name: "Order Date",
    value: "{{orderDate}}",
    sample: "order_date",
  },
  totalAmount: {
    name: "Total Amount",
    value: "{{totalAmount}}",
    sample: "total_amount",
  },
  orderId: {
    name: "Order Id",
    value: "{{orderId}}",
    sample: "order_id",
  },
  status: {
    name: "Status",
    value: "{{status}}",
    sample: "status",
  },
  price: {
    name: "Price",
    value: "{{price}}",
    sample: "price",
  },
  claimsPrice: {
    name: "Claims Price",
    value: "{{claimsPrice}}",
    sample: "claims_price",
  },
  subTotal: {
    name: "Sub Total",
    value: "{{subTotal}}",
    sample: "sub_total",
  },
  paymentMethod: {
    name: "Payment Method",
    value: "{{paymentMethod}}",
    sample: "payment_method",
  },
  deliveryType: {
    name: "Delivery Type",
    value: "{{deliveryType}}",
    sample: "delivery_type",
  },
  promocode: {
    name: "Promocode",
    value: "{{promocode}}",
    sample: "promocode",
  },
  partnerName: {
    name: "Partner Name",
    value: "{{partnerName}}",
    sample: "partner_name",
  },
};
