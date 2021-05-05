import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";

export const GET_INTERVIEW_TIME = gql`
  query getClientApplicationInterviewTime {
    viewer {
      ... on User {
        id
        clientApplication {
          id
          interviewStartsAt
        }
      }
    }
  }
`;

export const useInterviewTime = () => {
  const { data } = useQuery(GET_INTERVIEW_TIME);

  const datetime = data?.viewer?.clientApplication?.interviewStartsAt;
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
