import { UseQueryResult, useQuery } from "react-query";
import * as api from "./api";
import { Client } from "./types";

const KEY = "CLIENTS";

export function getKeyFromProps(props: any, type: "LISTING"): string[] {
  const key = [KEY, type];
  key.push(props);
  return key;
}

//Listing
export function useClientListing(
  props?: Client.ListingProps,
): UseQueryResult<Client.ListingResponse> {
  return useQuery(
    getKeyFromProps(props, "LISTING"),
    () => api.listing(props),
    {},
  );
}
