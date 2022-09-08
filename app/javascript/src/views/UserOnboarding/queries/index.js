import ONBOARDING_DATA from "./onboardingData.gql";
import UPDATE_COMPANY from "./updateCompany.gql";
import CREATE_INTERESTS from "./createInterests.gql";
import DELETE_INTEREST from "./deleteInterest.gql";
import { useMutation, useQuery } from "@apollo/client";
import RESULTS from "./results.gql";

export const useOnboardingData = (opts) => {
  return useQuery(ONBOARDING_DATA, opts);
};

export const useUpdateCompany = () => {
  return useMutation(UPDATE_COMPANY);
};

export const useCreateInterests = () => {
  return useMutation(CREATE_INTERESTS);
};

export const useDeleteInterest = () => {
  return useMutation(DELETE_INTEREST);
};

export const useResults = (opts) => {
  return useQuery(RESULTS, opts);
};
