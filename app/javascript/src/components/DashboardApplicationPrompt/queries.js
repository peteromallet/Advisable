import { gql, useQuery } from "@apollo/client";
import useViewer from "src/hooks/useViewer";

export const GET_INTERVIEW_TIME = gql`
  query specialistInterviewTime($id: ID!) {
    specialist(id: $id) {
      id
      applicationInterviewStartsAt
    }
  }
`;

export const useGetInterviewTime = () => {
  const viewer = useViewer();
  const { data } = useQuery(GET_INTERVIEW_TIME, {
    variables: { id: viewer?.id },
  });
  return data?.specialist.applicationInterviewStartsAt;
};

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
