import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import useViewer from "src/hooks/useViewer";

export const GET_INTERVIEW_TIME = gql`
  query specialistInterviewTime($id: ID!) {
    specialist(id: $id) {
      id
      applicationInterviewStartsAt
    }
  }
`;

export const useInterviewTime = () => {
  const viewer = useViewer();
  const { data } = useQuery(GET_INTERVIEW_TIME, {
    variables: { id: viewer?.id },
  });

  const datetime = data?.specialist.applicationInterviewStartsAt;
  if (!datetime) return null;

  // format time
  const date = DateTime.fromISO(datetime).toLocaleString({
    day: "2-digit",
    month: "long",
    year: "numeric",
  }); //=> '12 March 2021'
  const time = DateTime.fromISO(datetime).toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); //=> '02:30 pm'
  const formatted = `${date} at ${time}`; //=> '12 March 2021 at 02:30 pm'
  return formatted;
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
