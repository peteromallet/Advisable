import { useQuery } from "@apollo/client";
import FEED from "./feed.gql";
import INTERESTS from "./interests.gql";

export function useInterests() {
  return useQuery(INTERESTS);
}

export function useFeed() {
  return useQuery(FEED);
}
