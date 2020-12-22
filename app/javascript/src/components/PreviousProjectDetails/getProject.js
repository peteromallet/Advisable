import { gql } from "@apollo/client";

const getProject = gql`
  query getProject($id: ID!) {
    previousProject(id: $id) {
      id
      title
      description
      validationStatus
      draft
      images {
        id
        url
        cover
      }
      skills {
        id
        name
      }
      industries {
        id
        name
      }
      specialist {
        id
        name
        avatar
        location
      }
      reviews {
        id
        name
        role
        avatar
        comment
        companyName
      }
    }
  }
`;

export default getProject;
