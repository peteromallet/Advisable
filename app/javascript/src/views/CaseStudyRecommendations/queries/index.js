import { useMutation, useQuery } from "@apollo/client";
import CASE_STUDY_SEARCH from "./getRecommendations.gql";
import CASE_STUDY from "./getCaseStudy.gql";
import ASSIGN from "./assignRecommendation.gql";
import ARCHIVED from "./archivedArticles.gql";
import SIDEBAR from "./sidebar.gql";
import SAVED from "./savedArticles.gql";

export function useArchive(opts) {
  return useMutation(ASSIGN, {
    update(cache, response) {
      if (response.errors) return;

      const { article, search } = response.data.assignCaseStudyArticle;

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
              edges: previous.edges.filter((edge) => {
                return article.id !== readField("id", edge.node);
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

export function useUnarchive(opts) {
  return useMutation(ASSIGN, {
    update(cache, response) {
      if (response.errors) return;

      const { article, search } = response.data.assignCaseStudyArticle;

      cache.modify({
        id: cache.identify(article),
        fields: {
          isArchived() {
            return false;
          },
        },
      });

      cache.modify({
        id: cache.identify(search),
        fields: {
          archived(previous, { readField }) {
            return {
              ...previous,
              edges: previous.edges.filter((edge) => {
                return article.id !== readField("id", edge.node);
              }),
            };
          },
          results(previous, { toReference }) {
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

export function useCaseStudySearch(opts) {
  return useQuery(CASE_STUDY_SEARCH, opts);
}

export function useCaseStudySearches(opts) {
  return useQuery(SIDEBAR, opts);
}

export function useSavedArticles(opts) {
  return useQuery(SAVED, opts);
}

export function useArchivedArticles(opts) {
  return useQuery(ARCHIVED, opts);
}
