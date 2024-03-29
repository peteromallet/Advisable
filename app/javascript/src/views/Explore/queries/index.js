import { useQuery, useMutation, useSubscription } from "@apollo/client";
import FEED from "./feed.gql";
import HOME from "./home.gql";
import TOPIC from "./topic.gql";
import TOPICS from "./topics.gql";
import TRENDING from "./trending.gql";
import FAVORITES from "./favorites.gql";
import CREATE_INTERESTS from "./createInterests.gql";
import DELETE_INTEREST from "./deleteInterest.gql";
import FAVORITE_ARTICLE from "./favoriteArticle.gql";
import UNFAVORITE_ARTICLE from "./unfavoriteArticle.gql";
import FEED_UPDATED from "./feedUpdated.gql";
import { useLocation } from "react-router-dom";

export function useFeed() {
  const location = useLocation();
  const fetchPolicy = location.state?.fetchPolicy;
  return useQuery(FEED, {
    returnPartialData: true,
    fetchPolicy: fetchPolicy || "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
}

export function useHome() {
  return useQuery(HOME);
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

export function useFavoriteArticle(article) {
  return useMutation(FAVORITE_ARTICLE, {
    variables: { input: { article: article.id } },
    update(cache) {
      const existing = cache.readQuery({ query: FAVORITES });
      if (!existing) return;

      const { favoritedArticles } = existing;

      cache.writeQuery({
        query: FAVORITES,
        data: {
          favoritedArticles: {
            ...favoritedArticles,
            edges: [
              { node: { ...article, isFavorited: true } },
              ...favoritedArticles.edges,
            ],
          },
        },
      });
    },
  });
}

export function useUnfavoriteArticle(article) {
  return useMutation(UNFAVORITE_ARTICLE, {
    variables: { input: { article: article.id } },
    update(cache) {
      const existing = cache.readQuery({ query: FAVORITES });
      if (!existing) return;

      const { favoritedArticles } = existing;

      cache.writeQuery({
        query: FAVORITES,
        data: {
          favoritedArticles: {
            ...favoritedArticles,
            edges: favoritedArticles.edges.filter((edge) => {
              return edge.node.id !== article.id;
            }),
          },
        },
      });
    },
  });
}

export function useTopic(slug) {
  return useQuery(TOPIC, {
    variables: { slug },
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });
}

export function useCreateInterests() {
  return useMutation(CREATE_INTERESTS);
}

export const useDeleteInterest = () => {
  return useMutation(DELETE_INTEREST);
};

export const useFeedUpdatedSubscription = (callback) => {
  return useSubscription(FEED_UPDATED, {
    onSubscriptionData() {
      callback()
    },
  });
}
