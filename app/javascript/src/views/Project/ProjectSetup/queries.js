import { gql, useQuery, useMutation } from "@apollo/client";

const projectFields = gql`
  fragment ProjectSetupFields on Project {
    id
    isOwner
    status
    goals
    publishedAt
    characteristics
    optionalCharacteristics
    requiredCharacteristics
    likelyToHire
    locationImportance
    industryExperienceImportance
    deposit {
      paid
      amount
    }
    primarySkill {
      id
      name
      goalPlaceholder
      characteristicPlaceholder
    }
    salesPerson {
      id
      firstName
      name
      image
    }
    user {
      id
      location
      companyType
      industry {
        id
        name
        popularSkills(first: 10) {
          nodes {
            id
            name
          }
        }
      }
      country {
        id
        name
      }
    }
    skills {
      id
      name
      value: name
      label: name
    }
  }
`;

export const GET_JOB = gql`
  ${projectFields}

  query getJob($id: ID!) {
    skills {
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
      ...ProjectSetupFields
    }
  }
`;

export const UPDATE_PROJECT = gql`
  ${projectFields}

  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      project {
        ...ProjectSetupFields
      }
    }
  }
`;

export const PUBLISH_PROJECT = gql`
  ${projectFields}

  mutation publishProject($input: PublishProjectInput!) {
    publishProject(input: $input) {
      project {
        ...ProjectSetupFields
      }
    }
  }
`;

export const usePublishProject = (opts = {}) =>
  useMutation(PUBLISH_PROJECT, opts);

export const DELETE_JOB = gql`
  mutation deleteJob($input: DeleteJobInput!) {
    deleteJob(input: $input) {
      id
    }
  }
`;

export const GET_PAYMENT_DETAILS = gql`
  query getDepositPaymentDetails($id: ID!) {
    viewer {
      ... on User {
        id
        paymentMethod {
          id
          last4
          brand
          expMonth
          expYear
        }
      }
    }
    project(id: $id) {
      id
      publishedAt
      deposit {
        paid
        amount
        paymentIntent
      }
    }
  }
`;

export const usePaymentDetails = (id) =>
  useQuery(GET_PAYMENT_DETAILS, {
    variables: { id },
  });

export const GET_DEPOSIT_STATUS = gql`
  query getDepositStatus($id: ID!) {
    project(id: $id) {
      id
      status
      publishedAt
      deposit {
        paid
      }
    }
  }
`;

export const useDepositStatus = (id) => {
  return useQuery(GET_DEPOSIT_STATUS, {
    pollInterval: 2000,
    fetchPolicy: "network-only",
    variables: { id },
  });
};
