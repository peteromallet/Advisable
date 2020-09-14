import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfileData($id: ID!) {
    specialist(id: $id) {
      id
      name
      firstName
      avatar
      location
      bio

      projectSkills {
        nodes {
          id
          name
        }
      }

      industries {
        id
        name
      }

      ratings {
        overall
      }

      profileProjects {
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
        skills {
          id
          name
        }
        industries {
          id
          name
        }
        reviews {
          id
          name
          role
          comment
          companyName
        }
      }

      reviews {
        id
        name
        role
        comment
        companyName
        avatar
      }
    }
  }
`;
