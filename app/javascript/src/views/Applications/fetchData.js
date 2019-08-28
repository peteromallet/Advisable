import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on Specialist {
        id
        email
        airtableId
        accountStatus
        invitations: applications(
          status: ["Invited To Apply"]
          salesStatus: ["Open"]
        ) {
          id
          status
          airtableId
          project {
            id
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
