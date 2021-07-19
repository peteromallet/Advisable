import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  query FreelancerApplications {
    viewer {
      ... on Specialist {
        id
        email
        previousProjects {
          nodes {
            id
            validationStatus
          }
        }
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
          status
          appliedAt
          project {
            id
            industry
            companyType
            primarySkill {
              id
              name
            }
            user {
              id
              companyName
            }
          }
          interview {
            id
            status
            startsAt
            timeZone
          }
        }
      }
    }
  }
`;
