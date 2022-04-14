import { useQuery } from "@apollo/client";
import ARTICLE from "./article.gql";

export function useArticle(opts) {
  return useQuery(ARTICLE, opts);
}
