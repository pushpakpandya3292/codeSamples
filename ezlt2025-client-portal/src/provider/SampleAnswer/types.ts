export namespace SampleAnswer {
  export type SampleAnswerDetailsListingProps = {
    marriageStatus?: number;
    category?: string;
  };

  export type SampleAnswerDetailsListingResponse = {
    id: string;
    title: string;
    answer: string;
    category: string;
    marriageStatus: number;
    updatedAt: string;
    createdAt: string;
    order: number;
  };
}
