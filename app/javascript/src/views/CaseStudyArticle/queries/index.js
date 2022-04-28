import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";
import FAVORITES from "src/views/Feed/queries/favoritedArticles.gql";
import FAVORITE_CS_ARTICLE from "./favoriteCaseStudyArticle.gql";
import UNFAVORITE_CS_ARTICLE from "./unfavoriteCaseStudyArticle.gql";

export function useArticle() {
  const { slug } = useParams();
  return useQuery(ARTICLE, {
    variables: { slug },
  });
}

export function useFavoriteArticle(article) {
  return useMutation(FAVORITE_CS_ARTICLE, {
    variables: { input: { article: article.id } },
    update(cache) {
      const existing = cache.readQuery({ query: FAVORITES });
      if (!existing) return;

      const { favoritedArticles } = existing;

      cache.writeQuery({
        query: FAVORITES,
        data: {
          favoritedArticles: {
            edges: [...favoritedArticles.edges, { node: article }],
            ...favoritedArticles,
          },
        },
      });
    },
  });
}

export function useUnfavoriteArticle(article) {
  return useMutation(UNFAVORITE_CS_ARTICLE, {
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
