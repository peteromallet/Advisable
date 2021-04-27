import { gql } from "@apollo/client";

const clientApplicationFields = gql`
  fragment ClientApplicationFields on ClientApplication {
    id
    status
    # Company Overview
    companyName
    companyType
    industry {
      label: name
      value: name
    }
    # Company Stage
    businessType
    # Goals
    goals
    # Preferences
    budget
    feedback
    marketingAttitude
  }
`;

export const CLIENT_APPLICATION_DATA = gql`
  ${clientApplicationFields}

  query ClientApplicationData {
    industries {
      value: name
      label: name
    }
    clientApplication {
      ...ClientApplicationFields
    }
  }
`;

export const UPDATE_CLIENT_APPLICATION = gql`
  ${clientApplicationFields}

  mutation UpdateClientApplication($input: UpdateClientApplicationInput!) {
    updateClientApplication(input: $input) {
      clientApplication {
        ...ClientApplicationFields
      }
    }
  }
`;

export const SUBMIT_CLIENT_APPLICATION = gql`
  ${clientApplicationFields}

  mutation SubmitClientApplication($input: SubmitClientApplicationInput!) {
    submitClientApplication(input: $input) {
      clientApplication {
        ...ClientApplicationFields
      }
    }
  }
`;
