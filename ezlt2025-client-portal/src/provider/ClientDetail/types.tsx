export namespace ClinetDetail {
  //create
  export type CreatePorps = {};
  export type CreateResponse = {};
  export type CreateAPIMutationPayload = {
    key: string;
    data: { [X: string]: any };
    form_type: 1;
  };
  export interface CreateAPIPayload extends CreatePorps {
    data: CreateAPIMutationPayload;
  }

  //list
  export type ListingProps = {
    id: string | undefined;
  };
  export type ListingResponse = { [X: string]: any };
  export interface ListingAPIPayload extends ListingProps {}
}
