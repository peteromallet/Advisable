import gql from "graphql-tag";

export const GET_CLIENT_APPLICATION = gql`
  query ClientApplication($id: ID!) {
    clientApplication(id: $id) @client {
      id
      firstName
      lastName
      email
      __typename
    }
  }
`;

export const START_CLIENT_APPLICATION = gql`
  mutation StartClientApplication(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    startClientApplication(
      input: { firstName: $firstName, lastName: $lastName, email: $email }
    ) @client {
      id
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_CLIENT_APPLICATION = gql`
  mutation UpdateClientApplication(
    $id: ID!
    $companyName: String
    $industry: String
    $companyType: String
    $skills: [String]
    $budget: Int
    $remoteFriendly: Int
    $provideFeedback: Boolean
    $talentQuality: String
  ) {
    updateClientApplication(
      input: {
        id: $id
        companyName: $companyName
        industry: $industry
        companyType: $companyType
        skills: $skills
        budget: $budget
        remoteFriendly: $remoteFriendly
        provideFeedback: $provideFeedback
        talentQuality: $talentQuality
      }
    ) @client {
      id
      firstName
      lastName
      email
    }
  }
`;

export const SUBMIT_CLIENT_APPLICATION = gql`
  mutation SubmitClientApplication(
    $id: ID!
    $companyName: String
    $industry: String
    $companyType: String
    $skills: [String]
    $budget: Int
    $remoteFriendly: Int
    $provideFeedback: Boolean
    $talentQuality: String
  ) @client {
    submitClientApplication(
      input: {
        id: $id
        companyName: $companyName
        industry: $industry
        companyType: $companyType
        skills: $skills
        budget: $budget
        remoteFriendly: $remoteFriendly
        provideFeedback: $provideFeedback
        talentQuality: $talentQuality
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
