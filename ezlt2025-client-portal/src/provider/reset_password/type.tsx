export namespace ResetPassword {
  export type ResetPasswordProps = {};
  export type ResetPasswordResponse = {
    message: string;
    data: {
      email: string;
    };
  };
  export type ResetPasswordAPIMutationPayload = {
    password: string;
    hash: string | null;
  };
  export interface ResetPasswordAPIPayload extends ResetPasswordProps {
    data: ResetPasswordAPIMutationPayload;
  }
}
