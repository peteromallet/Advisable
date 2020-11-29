import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      industry
      estimatedBudget
      primarySkill {
        name
      }
      user {
        city
        country {
          name
        }
        companyName
      }
      remote
      goals
    }
  }
`;

export const CREATE_FREELANCER_ACCOUNT = gql`
  mutation CreateFreelancerAccount($input: CreateFreelancerAccountInput!) {
    createFreelancerAccount(input: $input) {
      viewer {
        ... on Specialist {
          id
        }
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      viewer {
        ... on Specialist {
          id
        }
      }
    }
  }
`;
