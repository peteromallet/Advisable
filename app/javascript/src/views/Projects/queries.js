import gql from "graphql-tag";

export const GET_PROJECTS = gql`
  query getProjects {
    viewer {
      ... on User {
        id
        projects {
          id
          airtableId
          primarySkill
          status
          candidateCount
          proposedCount
          hiredCount
          createdAt
        }
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation createJob($input: CreateJobInput!) {
    createJob(input: $input) {
      project {
        id
        airtableId
        primarySkill
        status
        candidateCount
        proposedCount
        hiredCount
        createdAt
      }
    }
  }
`;
