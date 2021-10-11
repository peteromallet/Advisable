import { gql, useQuery } from "@apollo/client";

export const GET_APPLICATION = gql`
  query getApplication($id: ID!) {
    application(id: $id) {
      id
      invoiceRate
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
        clientName
        coverPhoto {
          url
        }
        excerpt
        primaryIndustry {
          id
          name
          color
        }
        primarySkill {
          id
          name
        }
        skills {
          id
          name
        }
        industries {
          id
          name
        }
      }
      specialist {
        id
        name
        email
        firstName
        avatar
        location
        website
        linkedin
        reviews {
          id
          name
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
