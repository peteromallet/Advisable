import gql from "graphql-tag";
import { taskFields } from "../../graphql/fragments/tasks";
import { specialistFields } from "../../graphql/fragments/specialists";
import { applicationFields } from "../../graphql/fragments/applications";

export default gql`
  query application($id: ID!) {
    viewer {
      ... on User {
        id
        projectPaymentMethod
      }
    }
    application(id: $id) {
      ...applicationFields
      billingCycle
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
        email
        ...specialistFields
      }
    }
  }

  ${taskFields}
  ${specialistFields}
  ${applicationFields}
`;
