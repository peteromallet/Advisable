import { useMutation, useQuery } from "@apollo/client";
// import INBOX from "./getRecommendations.gql";
import CASE_STUDY from "./getCaseStudy.gql";
import ARCHIVE from "./archiveRecommendation.gql";
import ARCHIVED from "./archivedRecommendations.gql";
import GET_SEARCHES from "./getSearches.gql";

export function useArchive(opts) {
  return useMutation(ARCHIVE, {
    update(cache, response) {
      if (response.errors) return;

      const { article, search } = response.data.archiveCaseStudySearchArticle;

      cache.modify({
        id: cache.identify(article),
        fields: {
          isArchived() {
            return true;
          },
        },
      });

      cache.modify({
        id: cache.identify(search),
        fields: {
          results(previous, { readField }) {
            return {
              ...previous,
              nodes: previous.nodes.filter((nodeRef) => {
                return article.id !== readField("id", nodeRef);
              }),
            };
          },
          archived(previous, { toReference }) {
            return {
              ...previous,
              edges: [
                ...previous.edges,
                {
                  node: toReference(article),
                },
              ],
            };
          },
        },
      });
    },
    ...opts,
  });
}

export function useArchived(opts) {
  return useQuery(ARCHIVED, opts);
}

export function useCaseStudy(opts) {
  return useQuery(CASE_STUDY, opts);
}

export function useCaseStudySearches(opts) {
  return useQuery(GET_SEARCHES, opts);
}
