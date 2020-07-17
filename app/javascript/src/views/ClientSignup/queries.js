import gql from "graphql-tag";

export const ABOUT_COMPANY_QUERY = gql`
  query ClientApplication($id: ID!) {
    industries {
      id
      name
      color
    }
    clientApplication(id: $id) {
      # About Your Company step
      companyName
      industry {
        id
        name
        color
      }
      companyType
    }
  }
`;

export const ABOUT_COMPANY_UPDATE = gql`
  mutation UpdateClientApplication(
    $id: ID!
    $companyName: String!
    $industry: String!
    $companyType: String!
  ) {
    updateClientApplication(
      input: {
        id: $id
        companyName: $companyName
        industry: $industry
        companyType: $companyType
      }
    ) {
      clientApplication {
        # About Your Company step
        companyName
        industry {
          id
          name
          color
        }
        companyType
      }
    }
  }
`;

export const ABOUT_REQUIREMENTS_QUERY = gql`
  query ClientApplication($id: ID!) {
    skills(local: true) {
      id
      label: name
      value: name
    }
    clientApplication(id: $id) {
      # About Your Requirements
      skills {
        id
        name
      }
      numberOfFreelancers
      budget
    }
  }
`;

export const ABOUT_REQUIREMENTS_UPDATE = gql`
  mutation UpdateClientApplication(
    $id: ID!
    $skills: [String!]
    $numberOfFreelancers: String!
    $budget: Int
  ) {
    updateClientApplication(
      input: {
        id: $id
        skills: $skills
        numberOfFreelancers: $numberOfFreelancers
        budget: $budget
      }
    ) {
      clientApplication {
        id
        skills {
          id
          name
        }
        numberOfFreelancers
        budget
      }
    }
  }
`;

export const ABOUT_PREFERENCES_QUERY = gql`
  query ClientApplication($id: ID!) {
    clientApplication(id: $id) {
      localityImportance
      acceptedGuaranteeTerms
      talentQuality
    }
  }
`;

export const ABOUT_PREFERENCES_SUBMIT = gql`
  mutation UpdateClientApplication(
    $id: ID!
    $skills: [String!]
    $numberOfFreelancers: String!
    $budget: Int
  ) {
    updateClientApplication(
      input: {
        id: $id
        skills: $skills
        numberOfFreelancers: $numberOfFreelancers
        budget: $budget
      }
    ) {
      clientApplication {
        # About Your Requirements
        skills {
          id
          name
        }
        numberOfFreelancers
        budget
      }
    }
  }
`;

export const GET_CLIENT_APPLICATION = gql`
  query ClientApplication($id: ID!) {
    clientApplication(id: $id) {
      id
      firstName
      lastName
      # About Your Company step
      companyName
      industry {
        id
        name
        color
      }
      companyType
      # About Your Requirements step
      skills {
        id
        name
      }
      numberOfFreelancers
      budget
      # About Your Preferences step
      localityImportance
      acceptedGuaranteeTerms
      talentQuality
      # Status on submit
      status
      rejectionReason
    }
  }
`;

export const START_CLIENT_APPLICATION = gql`
  mutation StartClientApplication(
    $firstName: String!
    $lastName: String
    $email: String!
  ) {
    startClientApplication(
      input: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      clientApplication {
        id
        firstName
        lastName
        # About Your Company
        companyName
        industry {
          id
          name
          color
        }
        companyType
        # About Your Requirements
        skills {
          id
          name
        }
        numberOfFreelancers
        budget
        # About Your Preferences
        localityImportance
        acceptedGuaranteeTerms
        talentQuality
        # Status on submit
        status
        rejectionReason
      }
    }
  }
`;

export const SUBMIT_CLIENT_APPLICATION = gql`
  mutation SubmitClientApplication(
    $id: ID!
    $talentQuality: String
    $localityImportance: Int
    $acceptGuaranteeTerms: Boolean
  ) {
    submitClientApplication(
      input: {
        id: $id
        localityImportance: $localityImportance
        acceptGuaranteeTerms: $acceptGuaranteeTerms
        talentQuality: $talentQuality
      }
    ) {
      clientApplication {
        id
        firstName
        lastName
        # About Your Company step
        companyName
        industry {
          id
          name
          color
        }
        companyType
        # About Your Requirements step
        skills {
          id
          name
        }
        numberOfFreelancers
        budget
        # About Your Preferences step
        localityImportance
        acceptedGuaranteeTerms
        talentQuality
        # Status on submit
        status
        rejectionReason
      }
    }
  }
`;
