export namespace BillSummary {
  //BillSummary
  export type BillSummaryProps = {
    id: { userId: string | undefined };
  };
  export type BillSummaryResponse = {
    investmentPropertiesCount: number | null;
    investmentPropertiesTotalPrice: number;
    promoCodePercent: number;
    promoCodeDiscount: number;
    totalBill: number;
    packagePrice: number;
    planName: string;
    referringAgent: string | null;
    discountedTotal: number;
    amountPaid: number;
    isPaidStatus?: number;
    paymentMethod: string;
    finalInvoiceAmount: number;
    finalPaymentType: string;
    check: string;
    finalClearedDate: string;
    commission: number;
  };
  export interface BillSummaryAPIPayload extends BillSummaryProps {}
}
