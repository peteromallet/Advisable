import gql from "graphql-tag";

export const GET_APPLICATION = gql`
  query GetApplicationInvitation($id: ID!) {
    application(id: $id) {
      id
      status
      referralUrl
      airtableId
      specialist {
        id
        applicationStage
      }
      project {
        id
        airtableId
        name
        applicationsOpen
        description
        companyDescription
        goals
        industry
        companyType
        requiredCharacteristics
        optionalCharacteristics
        estimatedBudget
        remote
        primarySkill {
          id
          name
        }
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

export const REJECT_INVITATION = gql`
  mutation rejectApplicationInvitation(
    $input: RejectApplicationInvitationInput!
  ) {
    rejectApplicationInvitation(input: $input) {
      application {
        id
        status
      }
    }
  }
`;
