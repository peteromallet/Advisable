import gql from "graphql-tag";

export const GET_APPLICATIONS = gql`
  query {
    viewer {
      ... on Specialist {
        id
        email
        airtableId
        applicationStage
        applications(
          status: [
            "Applied"
            "Application Accepted"
            "Offered"
            "Interview Scheduled"
            "Interview Completed"
            "Proposed"
            "Invited To Apply"
          ]
          salesStatus: ["Open"]
        ) {
          id
          airtableId
          status
          appliedAt
          project {
            id
            industry
            companyType
            primarySkill
            user {
              id
              companyName
            }
          }
          interview {
            id
            airtableId
            status
            startsAt
            timeZone
          }
        }
      }
    }
  }
`;
