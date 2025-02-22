import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as api from "./api";
import { SampleAnswer } from "./types";

const KEY = "SAMPLEANSWER";

export function getKeyFromProps(
  props: any,
  type: "SAMPLEANSWERLISTING" | "SAMPLEANSWERDETAILSLISTING",
): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

export function useSampleAnswerDetailsListing(
  props?: SampleAnswer.SampleAnswerDetailsListingProps,
): UseQueryResult<SampleAnswer.SampleAnswerDetailsListingResponse[]> {
  return useQuery(
    getKeyFromProps(props, "SAMPLEANSWERDETAILSLISTING"),
    () => api.sampleAnswersDetailsListing(props),
    {
      enabled: !!props?.category,
    },
  );
}
