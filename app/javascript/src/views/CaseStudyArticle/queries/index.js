import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";

export function useArticle() {
  const { slug } = useParams();
  return useQuery(ARTICLE, {
    variables: { slug },
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });
}
