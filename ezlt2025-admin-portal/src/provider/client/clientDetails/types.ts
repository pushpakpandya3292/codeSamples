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
  export type UpdatePatchProps = {
    clientDetailId: string | undefined;
    data: {
      delivery_option: string;
    };
  };
  export type ListingResponse = { [X: string]: any };
  export type UpdateResponse = boolean;
  export interface UpdatePatch {}
  export interface ListingAPIPayload extends ListingProps {}
  export type DeactivateUserProps = {
    id: string | undefined;
    reason: string | null;
  };
  export type ActivateUserProps = {
    id: string | undefined;
  };
  export type DeleteUserProps = {
    id: string | undefined;
  };
}
