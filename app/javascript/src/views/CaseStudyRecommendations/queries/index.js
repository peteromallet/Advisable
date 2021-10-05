import { useMutation, useQuery, makeReference } from "@apollo/client";
import CASE_STUDY_SEARCH from "./getRecommendations.gql";
import ASSIGN from "./assignArticle.gql";
import ARCHIVED from "./archivedArticles.gql";
import SIDEBAR from "./sidebar.gql";
import SAVED from "./savedArticles.gql";
import SHARED from "./sharedArticles.gql";
import MEMBERS from "./members.gql";
import DELETE from "./deleteSearch.gql";
import SHARE from "./shareArticle.gql";
import CASE_STUDY from "./getCaseStudy.gql";
import FINALIZE_SEARCH from "./finalizeCaseStudySearch.gql";
import CREATE_SEARCH from "./createCaseStudySearch.gql";
import UPDATE_SEARCH from "./updateCaseStudySearch.gql";
import CREATE_OR_EDIT from "./createOrEditSearch.gql";
import SEARCH_FORM_DETAILS from "./caseStudySearchFormDetails.gql";

export function useCaseStudy(id) {
  return useQuery(CASE_STUDY, {
    variables: {
      id,
    },
  });
}

export function useArchive({ article, searchId }, opts) {
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

      if (searchId) {
        cache.modify({
          id: cache.identify({ __typename: "CaseStudySearch", id: searchId }),
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
    optimisticResponse: {
      assignCaseStudyArticle: {
        __typename: "AssignCaseStudyArticlePayload",
        article: {
          ...article,
          isSaved: isSaved ? false : true,
        },
      },
    },
    update(cache, response) {
      if (response.errors) return;
      const newArticle = response.data.assignCaseStudyArticle.article;
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
                : [...existing.savedArticles.nodes, newArticle],
            },
          },
        });
      }
    },
    ...opts,
  });
}

export function useUnarchive({ article }) {
  return useMutation(ASSIGN, {
    update(cache, response) {
      if (response.errors) return;

      const existing = cache.readQuery({ query: ARCHIVED });
      if (existing) {
        cache.writeQuery({
          query: ARCHIVED,
          data: {
            archivedArticles: {
              nodes: existing.archivedArticles.nodes.filter(
                (a) => a.id !== article.id,
              ),
            },
          },
        });
      }

      cache.modify({
        id: cache.identify(article),
        fields: {
          isArchived() {
            return false;
          },
        },
      });
    },
  });
}

export function useShareArticle() {
  return useMutation(SHARE);
}

export function useDeleteSearch(search) {
  return useMutation(DELETE, {
    variables: {
      input: {
        id: search.id,
      },
    },
    update(cache) {
      cache.modify({
        id: cache.identify(makeReference("ROOT_QUERY")),
        fields: {
          caseStudySearches(existing, { readField }) {
            return existing.filter((ref) => {
              return search.id !== readField("id", ref);
            });
          },
        },
      });
    },
  });
}

export function useCreateCaseStudySearch() {
  return useMutation(CREATE_SEARCH, {
    update(cache, { data }) {
      const previous = cache.readQuery({ query: SIDEBAR });
      const search = data.createCaseStudySearch.search;
      cache.writeQuery({
        query: SIDEBAR,
        data: {
          ...previous,
          caseStudySearches: [...previous.caseStudySearches, search],
        },
      });

      cache.writeQuery({
        query: SEARCH_FORM_DETAILS,
        variables: { id: search.id },
        data: {
          caseStudySearch: search,
        },
      });
    },
  });
}

export function useUpdateCaseStudySearch(opts) {
  return useMutation(UPDATE_SEARCH, opts);
}

export function useFinalizeCaseStudySearch(search) {
  return useMutation(FINALIZE_SEARCH, {
    refetchQueries: [
      {
        query: CASE_STUDY_SEARCH,
        variables: { id: search.id },
      },
    ],
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

export function useTeamMembers(opts) {
  return useQuery(MEMBERS, opts);
}

export function useCreateOrEditSearch(opts) {
  return useQuery(CREATE_OR_EDIT, opts);
}

export function useCaseStudySearchFormDetails(opts) {
  return useQuery(SEARCH_FORM_DETAILS, opts);
}