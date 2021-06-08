import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import calendly from "src/utilities/calendly";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Text, Button } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import PromptCard from "./PromptCard";
import ProgressLine from "./ProgressLine";
import AccountCreated from "./AccountCreated";
import { useMutation } from "@apollo/client";
import {
  SCHEDULE_ADVISABLE_APPLICATION_INTERVIEW,
  useInterviewTime,
} from "./queries";

const Header = (props) => (
  <Text
    zIndex="2"
    mb={2}
    fontSize="4xl"
    fontWeight="500"
    color="neutral900"
    letterSpacing="-0.04rem"
    {...props}
  />
);

const Description = (props) => (
  <Text color="#0C1214" lineHeight="m" mb={6} {...props} />
);

const ApplicationSubmitted = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={1} />
    <Header>We are reviewing your application</Header>
    <Description>
      Thanks for taking the time to tell us more about you and your freelancing!
      Your application to Advisable will be reviewed by our team, and you should
      hear back from us within 2 working days. In the meantime, you can still
      update your application by clicking below.
    </Description>
    <Button
      as={Link}
      variant="gradient"
      suffix={<ArrowRight />}
      mr={[0, 3]}
      mb={[3, 0]}
      width={["100%", "auto"]}
      to="/freelancers/apply/introduction"
    >
      Update Application
    </Button>
  </PromptCard>
);

const InvitedToInterview = () => {
  const { firstName, lastName, email, id } = useViewer();
  const fullName = `${firstName} ${lastName}`;

  const [schedule] = useMutation(SCHEDULE_ADVISABLE_APPLICATION_INTERVIEW);

  const handleScheduled = () => {
    calendly("https://calendly.com/d/c9sf-mhb/an-introduction-to-advisable", {
      a2: id,
      full_name: fullName,
      email,
    });
  };

  // Listen calendly notifications:
  // https://calendly.stoplight.io/docs/embed-api-docs/docs/C-Notifying-the-parent-window.md
  useEffect(() => {
    const isCalendlyEvent = (e) =>
      e.data.event && e.data.event.indexOf("calendly") === 0;

    const handleCalendly = (e) => {
      if (!isCalendlyEvent(e)) return null;

      if (e.data.event === "calendly.event_scheduled") {
        // URI example:
        // https://api.calendly.com/scheduled_events/AEQZY6BZ7BGPC6EZ
        const url = new URL(e.data.payload.event.uri);
        const eventId = url.pathname.split("/")[2];
        schedule({ variables: { input: { eventId } } });
      }
    };

    window.addEventListener("message", handleCalendly);
    return () => window.addEventListener("message", handleCalendly);
  }, [schedule]);

  return (
    <PromptCard mb={10}>
      <ProgressLine progress={2} />
      <Header>Invited To Interview</Header>
      <Description>
        Great news! We have reviewed your application and would like to invite
        you to interview. Please click the link below to schedule your interview
        at one of our available times.
      </Description>
      <Button
        variant="gradient"
        suffix={<ArrowRight />}
        onClick={handleScheduled}
      >
        Schedule Interview
      </Button>
    </PromptCard>
  );
};

const InterviewScheduled = () => {
  const interviewTime = useInterviewTime();

  return (
    <PromptCard mb={10}>
      <ProgressLine progress={3} />
      <Header>Call Scheduled</Header>
      <Description>
        Your introductory call has been scheduled
        {interviewTime && ` for ${interviewTime}`}. You should also have
        received a calendar invite by now, where you can
        reschedule&#160;as&#160;needed.
      </Description>
    </PromptCard>
  );
};

const InterviewCompleted = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={3} />
    <Header>Interview Completed</Header>
    <Description>
      Thank you for joining the call! We are reviewing the final details of your
      application and you should hear from us within the next 2 working days.
    </Description>
  </PromptCard>
);

const ApplicationStage = ({ stage }) => {
  switch (stage) {
    case "Started":
      return <AccountCreated />;
    case "Submitted":
      return <ApplicationSubmitted />;
    case "Invited To Interview":
      return <InvitedToInterview />;
    case "Interview Scheduled":
      return <InterviewScheduled />;
    case "Interview Completed":
      return <InterviewCompleted />;
    default:
      return null;
  }
};

export default function DashboardApplicationPrompt() {
  const viewer = useViewer();
  const applicationStage = viewer?.applicationStage;

  return <ApplicationStage stage={applicationStage} />;
}
