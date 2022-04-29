import { useMutation, useQuery, gql } from "@apollo/client";
import FEED from "./feed.gql";
import FAVORITED_ARTICLES from "./favoritedArticles.gql";
import SEARCH from "./search.gql";
import INTEREST from "./interest.gql";
import INTERESTS from "./interests.gql";
import DELETE_INTEREST from "./deleteInterest.gql";
import CREATE_INTERESTS from "./createInterests.gql";
import TRENDING from "./trending.gql";

export function useInterests() {
  return useQuery(INTERESTS);
}

export function useInterest(opts) {
  return useQuery(INTEREST, opts);
}

export function useFeed() {
  return useQuery(FEED, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
}

export function useFavoritedArticles() {
  return useQuery(FAVORITED_ARTICLES);
}

export function useCreateSearch() {
  return useMutation(SEARCH);
}

export function useCreateInterests() {
  return useMutation(CREATE_INTERESTS, {
    update(cache, { data: { createCaseStudyInterests } }) {
      const { interests } = createCaseStudyInterests;
      const refs = interests.map((interest) => {
        return cache.writeFragment({
          data: interest,
          fragment: gql`
            fragment InterestFields on CaseStudyInterest {
              id
              term
            }
          `,
        });
      });

      cache.modify({
        fields: {
          interests(existing) {
            return [...existing, ...refs];
          },
        },
      });
    },
  });
}

export function useDeleteInterest(subscribedInterest) {
  return useMutation(DELETE_INTEREST, {
    variables: {
      input: {
        id: subscribedInterest?.id,
      },
    },
    update(cache) {
      cache.modify({
        fields: {
          interests(existing, { readField }) {
            return existing.filter((ref) => {
              return subscribedInterest.id !== readField("id", ref);
            });
          },
        },
      });
    },
  });
}

export default function useTrending() {
  return useQuery(TRENDING);
}
