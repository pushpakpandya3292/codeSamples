import { UseQueryResult, useQuery } from "react-query";
import * as api from "./api";
import { ClinetDetail } from "./types";

const KEY = "CLIENTDETAIL";

export function getKeyFromProps(props: any, type: "LISTING"): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

export function useClientDetail(
  props?: ClinetDetail.ListingProps,
): UseQueryResult<ClinetDetail.ListingResponse> {
  return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props), {
    enabled: !!props?.id,
  });
}
