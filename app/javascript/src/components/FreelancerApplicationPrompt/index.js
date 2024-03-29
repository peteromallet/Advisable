import React from "react";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Text, Button, Link } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import PromptCard from "./PromptCard";
import ProgressLine from "./ProgressLine";
import AccountCreated from "./AccountCreated";
import { useInterviewTime } from "./queries";

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
      Thanks for taking the time to tell us about you! Your application to
      Advisable will be reviewed by our team, and you should hear back from us
      soon. In the meantime, you can still update your application by clicking
      below.
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

const OnHold = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={1} />
    <Header>Your application is currently on hold</Header>
    <Description>
      This means we are currently at high volumes of applicants or we are
      focusing on other industries at this time. We will keep you posted on any
      further update.
    </Description>
  </PromptCard>
);

const BuildCaseStudy = () => {
  const { firstName, lastName, id } = useViewer();
  const fullName = `${firstName} ${lastName}`;

  return (
    <PromptCard mb={10}>
      <ProgressLine progress={2} />
      <Header>Invited to the next step</Header>
      <Description>
        Great news! We have reviewed your application and would like to invite
        you to join the next step. Please click the link below to build a case
        study on your most impressive previous project. We will then use it to
        figure out if you’re a great fit for our network!
      </Description>
      <Button
        as={Link.External}
        target="_blank"
        variant="gradient"
        suffix={<ArrowRight />}
        href={`https://csi.advisable.com/freelancer/onboarding?specialist_id=${id}&contact_name=${fullName}`}
      >
        Build case study
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

const CaseStudySubmitted = () => (
  <PromptCard mb={10}>
    <ProgressLine progress={3} />
    <Header>Case study submitted</Header>
    <Description>
      Thank you for sharing about your best project! We are reviewing the final
      details of your application and you should hear from us within the next 2
      working days.
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
      return <BuildCaseStudy />;
    case "Interview Scheduled":
      return <InterviewScheduled />;
    case "Interview Completed":
      return <CaseStudySubmitted />;
    case "On Hold":
      return <OnHold />;
    default:
      return null;
  }
};

export default function DashboardApplicationPrompt() {
  const viewer = useViewer();
  const applicationStage = viewer?.applicationStage;

  return <ApplicationStage stage={applicationStage} />;
}
