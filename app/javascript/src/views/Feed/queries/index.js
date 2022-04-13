import { useQuery } from "@apollo/client";
import FEED from "./feed.gql";
import ARTICLE from "./article.gql";
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
    notifyOnNetworkStatusChange: true,
  });
}

export function useArticle(opts) {
  return useQuery(ARTICLE, opts);
}
