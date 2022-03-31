import ONBOARDING_DATA from "./onboardingData.gql";
import UPDATE_COMPANY from "./updateCompany.gql";
import CREATE_INTEREST from "./createInterest.gql";
import DELETE_INTEREST from "./deleteInterest.gql";
import { useMutation, useQuery } from "@apollo/client";

export const useOnboardingData = () => {
  return useQuery(ONBOARDING_DATA);
};

export const useUpdateCompany = () => {
  return useMutation(UPDATE_COMPANY);
};

export const useCreateInterest = () => {
  return useMutation(CREATE_INTEREST, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          interests(existingInterests) {
            return [
              ...existingInterests,
              data.createCaseStudyInterest.interest,
            ];
          },
        },
      });
    },
  });
};

export const useDeleteInterest = () => {
  return useMutation(DELETE_INTEREST);
};
