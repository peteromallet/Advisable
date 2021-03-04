import { gql } from "@apollo/client";

export const SCHEDULE_ADVISABLE_APPLICATION_INTERVIEW = gql`
  mutation ScheduleAdvisableApplicationInterview(
    $input: ScheduleAdvisableApplicationInterviewInput!
  ) {
    scheduleAdvisableApplicationInterview(input: $input) {
      specialist {
        id
        applicationStage
      }
    }
  }
`;
