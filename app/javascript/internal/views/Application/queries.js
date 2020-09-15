import { gql, useQuery } from "@apollo/client";

export const GET_APPLICATION = gql`
  query getApplication($id: ID!) {
    application(id: $id) {
      id
      rate
      comment
      score
      status
      appliedAt
      introduction
      availability
      proposalComment
      questions {
        question
        answer
      }
      project {
        id
        status
        user {
          id
          availability
          salesPerson {
            id
            name
            image
            firstName
          }
        }
        primarySkill {
          id
          name
        }
      }
      previousProjects {
        id
        title
        excerpt
        skills {
          id
          name
        }
        coverPhoto {
          id
          url
        }
      }
      specialist {
        id
        name
        email
        firstName
        avatar
        location
        reviews {
          id
          name
          role
          avatar
          companyName
          comment
        }
      }
    }
  }
`;

export function useApplication(opts) {
  return useQuery(GET_APPLICATION, opts);
}
