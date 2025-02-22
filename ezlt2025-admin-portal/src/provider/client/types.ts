export namespace Client {
  export interface IClient {
    id: string;
    email: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    reference_code: string;
    marriage_status: number;
    state: string;
    heardBy: string;
    deactivatedAt: string;
    deactivatedReason: string;
    plans: {
      id: string;
      name: string;
    }[];
  }

  //Listing

  export type ListingProps = {
    page?: number;
    limit?: number;
    filterId?: string;
    userId?: string;
  };
  export type ListingResponse = {
    data: IClient[];
    totalCount?: number;
    total?: number;
    hasNextPage: boolean;
  };
  export interface ListingAPIPayload extends ListingProps {}
}
