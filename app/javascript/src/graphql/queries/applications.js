import gql from "graphql-tag";
import { taskFields } from "../fragments/tasks";
import { specialistFields } from "../fragments/specialists";
import { applicationFields } from "../fragments/applications";

export const getActiveApplication = gql`
  query application($id: ID!) {
    application(id: $id) {
      ...applicationFields
      tasks {
        ...taskFields
      }
      project {
        id
        currency
        primarySkill
        user {
          id
          companyName
        }
      }
      specialist {
        ...specialistFields
      }
    }
  }

  ${taskFields}
  ${specialistFields}
  ${applicationFields}
`;

// Used to fetch fields to display an application invitation
export const getApplicationInvitation = gql`
  query GetApplicationInvitation($id: ID!) {
    application(id: $id) {
      id
      status
      referralUrl
      airtableId
      project {
        id
        airtableId
        name
        applicationsOpen
        primarySkill
        description
        companyDescription
        goals
        requiredCharacteristics
        optionalCharacteristics
        estimatedBudget
        remote
        user {
          id
          country {
            id
            name
          }
        }
      }
    }
  }
`;
