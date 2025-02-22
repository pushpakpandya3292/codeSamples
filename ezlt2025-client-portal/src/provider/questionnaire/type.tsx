export namespace Questionnaire {
  export type QuestionnaireProps = {};
  export type QuestionnaireResponse = {
    data: true;
  };
  export type QuestionnaireAPIMutationPayload = { [X: string]: any };
  export interface QuestionnaireAPIPayload extends QuestionnaireProps {
    data: QuestionnaireAPIMutationPayload;
  }
}
