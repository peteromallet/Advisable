import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import calendly from "src/utilities/calendly";
import { ArrowRight } from "@styled-icons/feather";
import { Text, Button } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import PromptCard from "./PromptCard";
import ProgressLine from "./ProgressLine";

const Header = (props) => (
  <Text
    zIndex="2"
    mb={2}
    fontSize="4xl"
    fontWeight="medium"
    color="#003846"
    {...props}
  />
);

const Description = (props) => (
  <Text color="#0C1214" lineHeight="m" mb={6} {...props} />
);

const AccountCreated = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={0} />
    <Header>Account Created</Header>
    <Description>
      In order to be accepted to the Advisable network you must complete your
      application. Once submitted, we will review your application and you
      should hear from us within 2 working days.
    </Description>
    <Button
      as={Link}
      variant="gradient"
      suffix={<ArrowRight />}
      to="/freelancers/apply"
    >
      Continue Application
    </Button>
  </PromptCard>
);

const ApplicationSubmitted = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={1} />
    <Header>Application Submitted</Header>
    <Description>
      Your application to Advisable has been is being reviewed by our team. You
      should hear from us within the next 2 working days. In the mean time you
      can update application or profile to increase your chances of being
      accepted
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
  const { firstName, lastName, email } = useViewer();
  const fullName = `${firstName} ${lastName}`;

  const handleScheduled = () => {
    calendly("https://calendly.com/guandjoy/15min", {
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
        return eventId;
      }
    };

    window.addEventListener("message", handleCalendly);
    return () => window.addEventListener("message", handleCalendly);
  }, []);

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
  const handleReschedule = () => {
    calendly(
      "https://calendly.com/d/c9sf-mhb/an-introduction-to-advisable-guild",
      {},
    );
  };

  return (
    <PromptCard mb={10}>
      <ProgressLine progress={3} />
      <Header>Interview Scheduled</Header>
      <Description>
        Your interview with Annie is scheduled for 10:00am on Friday, 5th
        February. You should have also received a calendar invite by now.
      </Description>
      <Button variant="subtle" onClick={handleReschedule}>
        Reschedule
      </Button>
    </PromptCard>
  );
};

const InterviewCompleted = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={4} />
    <Header>Interview Completed</Header>
    <Description>
      Thank you for joining your call with Annie. We are reviewing your
      application and you should here from us within the next 2 working days.
    </Description>
  </PromptCard>
);

const ApplicationStage = ({ stage }) => {
  switch (stage) {
    case "Started":
      return <AccountCreated />;
    case "Application Submitted":
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
