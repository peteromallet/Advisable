import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";

export function useArticle() {
  const { id, articleId } = useParams();
  return useQuery(ARTICLE, {
    variables: { searchId: id, articleId: articleId },
  });
}