import { useQuery, useMutation } from "@apollo/client";
import FEED from "./feed.gql";
import TOPICS from "./topics.gql";
import TRENDING from "./trending.gql";
import FAVORITES from "./favorites.gql";
import FAVORITE_ARTICLE from "./favoriteArticle.gql";
import UNFAVORITE_ARTICLE from "./unfavoriteArticle.gql";
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
