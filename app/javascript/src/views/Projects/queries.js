import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    viewer {
      ... on User {
        id
        companyType
        industry {
          id
          name
        }
        projects {
          id
          primarySkill {
            id
            name
          }
          status
          candidateCount
          proposedCount
          hiredCount
          createdAt
          matches: applications(status: ["Applied"]) {
            id
            specialist {
              id
              avatar
              name
            }
          }
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
        primarySkill {
          id
          name
        }
        status
        candidateCount
        proposedCount
        hiredCount
        createdAt
        matches: applications {
          id
        }
      }
    }
  }
`;
