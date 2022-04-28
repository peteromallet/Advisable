import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";
import FAVORITE_CS_ARTICLE from "./favoriteCaseStudyArticle.gql";
import UNFAVORITE_CS_ARTICLE from "./unfavoriteCaseStudyArticle.gql";

export function useArticle() {
  const { slug } = useParams();
  return useQuery(ARTICLE, {
    variables: { slug },
  });
}

export function useFavoriteArticle(id) {
  return useMutation(FAVORITE_CS_ARTICLE, {
    variables: { input: { article: id } },
  });
}

export function useUnfavoriteArticle(id) {
  return useMutation(UNFAVORITE_CS_ARTICLE, {
    variables: { input: { article: id } },
  });
}
