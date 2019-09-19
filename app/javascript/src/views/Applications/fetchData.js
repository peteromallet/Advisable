import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on Specialist {
        id
        email
        airtableId
        applicationStage
        invitations: applications(
          status: ["Invited To Apply"]
          salesStatus: ["Open"]
        ) {
          id
          status
          airtableId
          project {
            id
            industry
            companyType
            primarySkill
            estimatedBudget
            companyDescription
          }
        }
        applications(
          status: [
            "Applied"
            "Application Accepted"
            "Offered"
            "Interview Scheduled"
            "Interview Completed"
            "Proposed"
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
