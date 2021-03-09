import { gql, useQuery } from "@apollo/client";
import useViewer from "src/hooks/useViewer";

export const GET_EVENT_ID = gql`
  query specialistEventId($id: ID!) {
    specialist(id: $id) {
      id
      applicationInterviewCalendlyId
    }
  }
`;

export const useGetSpecialistEventId = () => {
  const viewer = useViewer();
  const { data } = useQuery(GET_EVENT_ID, { variables: { id: viewer?.id } });
  return data?.specialist.applicationInterviewCalendlyId;
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
