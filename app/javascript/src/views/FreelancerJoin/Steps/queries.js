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
  mutation CreateFreelancerAccount($input: CreateFreelancerAccountPayload!) {
    CreateFreelancerAccount(input: $input) {
      viewer
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignupPayload!) {
    signup(input: $input) {
      viewer
    }
  }
`;
