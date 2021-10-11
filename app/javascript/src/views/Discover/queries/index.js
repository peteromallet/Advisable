import {
  gql,
  useApolloClient,
  useQuery,
  useMutation,
  makeReference,
} from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";
import SHORTLIST from "./shortlist.gql";
import SHORTLISTS from "./shortlists.gql";
import ARCHIVE_ARTICLE from "./archiveArticle.gql";
import CREATE_SEARCH from "./createCaseStudySearch.gql";
import REFRESH_RESULTS from "./refreshResults.gql";
import SKILL_CATEGORIES from "./skillCategories.gql";
import DELETE from "./deleteSearch.gql";
import CATEGORY_ARTICLES from "./categoryArticles.gql";

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
  const { id, articleId } = useParams();
  return useQuery(ARTICLE, {
    variables: { searchId: id, articleId: articleId },
  });
}

export function useArchiveArticle(search, article) {
  const client = useApolloClient();

  return useMutation(ARCHIVE_ARTICLE, {
    update() {
      client.cache.modify({
        id: client.cache.identify(search),
        fields: {
          results(existing, { readField }) {
            return {
              ...existing,
              nodes: existing.nodes.filter((ref) => {
                return article.id !== readField("id", ref);
              }),
            };
          },
        },
      });
    },
  });
}

export function useCreateCaseStudySearch() {
  return useMutation(CREATE_SEARCH, {
    refetchQueries: [
      {
        query: SHORTLISTS,
      },
    ],
    update(cache, { data }) {
      const search = data.createCaseStudySearch.search;

      cache.modify({
        fields: {
          caseStudySearches(existing = []) {
            const newRef = cache.writeFragment({
              data: search,
              fragment: gql`
                fragment NewShortlist on CaseStudySearch {
                  id
                }
              `,
            });

            return [...existing, newRef];
          },
        },
      });
    },
  });
}

export function useRefreshResults() {
  return useMutation(REFRESH_RESULTS);
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

export function useSkillCategories() {
  return useQuery(SKILL_CATEGORIES);
}

export function useCategoryArticles(props) {
  return useQuery(CATEGORY_ARTICLES, props);
}
