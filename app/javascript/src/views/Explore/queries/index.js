import { useQuery } from "@apollo/client";
import FEED from "./feed.gql";
import TOPICS from "./topics.gql";
import TRENDING from "./trending.gql";
import FAVORITES from "./favorites.gql";
import { useLocation } from "react-router-dom";

export function useFeed() {
  const location = useLocation();
  const fetchPolicy = location.state?.fetchPolicy;
  return useQuery(FEED, {
    fetchPolicy: fetchPolicy || "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
}

export function useTrending() {
  return useQuery(TRENDING);
}

export function useTopics() {
  return useQuery(TOPICS);
}

export function useFavorites() {
  return useQuery(FAVORITES);
}
