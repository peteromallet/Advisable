import { useMutation, useQuery } from "@apollo/client";
import CASE_STUDY_SEARCH from "./getRecommendations.gql";
import ASSIGN from "./assignArticle.gql";
import ARCHIVED from "./archivedArticles.gql";
import SIDEBAR from "./sidebar.gql";
import SAVED from "./savedArticles.gql";
import SHARED from "./sharedArticles.gql";

export function useArchive({ article, search }, opts) {
  return useMutation(ASSIGN, {
    update(cache, response) {
      if (response.errors) return;

      const existing = cache.readQuery({ query: ARCHIVED });

      if (existing) {
        cache.writeQuery({
          query: ARCHIVED,
          data: {
            archivedArticles: {
              nodes: [...existing.archivedArticles.nodes, article],
            },
          },
        });
      }

      cache.modify({
        id: cache.identify(article),
        fields: {
          isArchived() {
            return true;
          },
        },
      });

      if (search) {
        cache.modify({
          id: cache.identify(search),
          fields: {
            results(previous, { readField }) {
              return {
                ...previous,
                nodes: previous.nodes.filter((node) => {
                  return article.id !== readField("id", node);
                }),
              };
            },
          },
        });
      }
    },
    ...opts,
  });
}

export function useFavorite({ article }, opts) {
  const isSaved = article.isSaved;

  return useMutation(ASSIGN, {
    variables: {
      input: {
        action: isSaved ? "unsave" : "save",
        article: article.id,
      },
    },
    update(cache, response) {
      if (response.errors) return;

      const existing = cache.readQuery({ query: SAVED });
      if (existing) {
        cache.writeQuery({
          query: SAVED,
          data: {
            savedArticles: {
              nodes: isSaved
                ? existing.savedArticles.nodes.filter(
                    (a) => a.id !== article.id,
                  )
                : [...existing.savedArticles.nodes, article],
            },
          },
        });
      }

      cache.modify({
        id: cache.identify(article),
        fields: {
          isSaved() {
            return isSaved ? false : true;
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

export function useArchived(props, opts) {
  return useQuery(ARCHIVED, props, opts);
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

export function useSharedArticles(opts) {
  return useQuery(SHARED, opts);
}
