import {
  UseQueryResult,
  useQuery,
} from "react-query";
import * as api from "./api";
import { BillSummary } from "./types";

const KEY = "BillSummary";

export function getKeyFromProps(
  props: any,
  type: "BillSummary",
): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

//BillSummary
export function useBillSummary(
  props: BillSummary.BillSummaryProps,
): UseQueryResult<BillSummary.BillSummaryResponse> {
  return useQuery(getKeyFromProps(props, "BillSummary"), () => api.billSummary(props), {
    enabled: props?.id?.userId ? true : false,
  });
}
