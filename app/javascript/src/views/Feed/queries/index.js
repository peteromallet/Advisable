import { useQuery } from "@apollo/client";
import FEED from "./feed.gql";
import INTEREST from "./interest.gql";
import INTERESTS from "./interests.gql";

export function useInterests() {
  return useQuery(INTERESTS);
}

export function useInterest(opts) {
  return useQuery(INTEREST, opts);
}

export function useFeed() {
  return useQuery(FEED, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
}
