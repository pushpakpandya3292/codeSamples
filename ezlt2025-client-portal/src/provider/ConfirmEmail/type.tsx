export namespace ConfirmEmail {
  export type ConfirmEmailProps = {};
  export type ConfirmEmailResponse = {
    message: string;
    status: number;
  };
  export type ConfirmEmailAPIMutationPayload = {
    hash: string;
  };
  export interface ConfirmEmailAPIPayload extends ConfirmEmailProps {
    data: ConfirmEmailAPIMutationPayload;
  }
}
