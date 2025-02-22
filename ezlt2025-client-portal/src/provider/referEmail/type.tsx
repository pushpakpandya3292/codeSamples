export namespace referEmail {

  export type referEmailProps = {};
  export type referEmailResponse = {
  };
  export type referEmailAPIMutationPayload = {
    friendName: string;
    friendEmail: string;
    senderName: string;
    senderEmail: string;
  };
  export interface referEmailAPIPayload extends referEmailProps {
    data: referEmailAPIMutationPayload;
  }
}
