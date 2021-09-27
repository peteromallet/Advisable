import { useApolloClient, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";
import SHORTLIST from "./shortlist.gql";
import SHORTLISTS from "./shortlists.gql";
import ARCHIVE_ARTICLE from "./archiveArticle.gql";

export function useShortlist() {
  const { id } = useParams();
  return useQuery(SHORTLIST, {
    variables: { id },
    returnPartialData: true,
  });
}

export function useShortlists() {
  return useQuery(SHORTLISTS);
}

export function useArticle() {
  const { articleId } = useParams();
  return useQuery(ARTICLE, { variables: { id: articleId } });
}

export function useArchiveArticle(search) {
  const client = useApolloClient();

  return useMutation(ARCHIVE_ARTICLE, {
    onCompleted(data) {
      const results = data?.archiveCaseStudyArticle?.search?.results;

      client.cache.modify({
        id: client.cache.identify(search),
        fields: {
          results() {
            return results;
          },
        },
      });
    },
  });
}
