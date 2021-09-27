import { useApolloClient, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import ARTICLE from "./article.gql";
import SHORTLIST from "./shortlist.gql";
import SHORTLISTS from "./shortlists.gql";
import ARCHIVE_ARTICLE from "./archiveArticle.gql";
import FINALIZE_SEARCH from "./finalizeCaseStudySearch.gql";
import UPDATE_SEARCH from "./updateCaseStudySearch.gql";
import SEARCH_FORM_DETAILS from "./caseStudySearchFormDetails.gql";
import CREATE_SEARCH from "./createCaseStudySearch.gql";
import CREATE_OR_EDIT from "./createOrEditSearch.gql";

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

export function useCaseStudySearchFormDetails(opts) {
  return useQuery(SEARCH_FORM_DETAILS, opts);
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

export function useCreateOrEditSearch(opts) {
  return useQuery(CREATE_OR_EDIT, opts);
}

export function useFinalizeCaseStudySearch(search) {
  return useMutation(FINALIZE_SEARCH, {
    refetchQueries: [
      {
        query: SHORTLIST,
        variables: { id: search.id },
      },
    ],
  });
}

export function useUpdateCaseStudySearch(opts) {
  return useMutation(UPDATE_SEARCH, opts);
}
