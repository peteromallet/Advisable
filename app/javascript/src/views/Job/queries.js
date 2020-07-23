import gql from "graphql-tag";

const projectFields = gql`
  fragment ProjectFields on Project {
    id
    status
    goals
    characteristics
    optionalCharacteristics
    requiredCharacteristics
    primarySkill
    likelyToHire
    locationImportance
    industryExperienceImportance
    user {
      id
      location
      companyType
      industry {
        id
        name
      }
      country {
        id
        name
      }
    }
    skills {
      id
      name
    }
  }
`;

export const GET_JOB = gql`
  ${projectFields}

  query getJob($id: ID!) {
    skills(local: true) {
      id
      name
    }

    popularSkills(first: 10) {
      nodes {
        id
        name
      }
    }

    project(id: $id) {
      ...ProjectFields
    }
  }
`;

export const UPDATE_PROJECT = gql`
  ${projectFields}

  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      project {
        ...ProjectFields
      }
    }
  }
`;

export const PUBLISH_PROJECT = gql`
  ${projectFields}

  mutation publishProject($input: PublishProjectInput!) {
    publishProject(input: $input) {
      project {
        ...ProjectFields
      }
    }
  }
`;
