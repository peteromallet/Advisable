import React from "react";
import { useHistory } from "react-router-dom";
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

const AccountCreated = ({ continueApplication }) => (
  <>
    <Header>Account Created</Header>
    <Description>
      In order to be accepted to the Advisable network you must complete your
      application. Once submitted, we will review your application and you
      should hear from us within 2 working days.
    </Description>
    <Button
      variant="gradient"
      suffix={<ArrowRight />}
      onClick={continueApplication}
    >
      Continue Application
    </Button>
  </>
);

const ApplicationSubmitted = ({ updateApplication, updateProfile }) => (
  <>
    <Header>Application Submitted</Header>
    <Description>
      Your application to Advisable has been is being reviewed by our team. You
      should hear from us within the next 2 working days. In the mean time you
      can update application or profile to increase your chances of being
      accepted
    </Description>
    <Button
      variant="gradient"
      suffix={<ArrowRight />}
      mr={[0, 3]}
      mb={[3, 0]}
      width={["100%", "auto"]}
      onClick={updateApplication}
    >
      Update Application
    </Button>
    <Button variant="subtle" width={["100%", "auto"]} onClick={updateProfile}>
      Update Profile
    </Button>
  </>
);

const InvitedToInterview = () => (
  <>
    <Header>Invited To Interview</Header>
    <Description>
      Great news! We have reviewed your application and would like to invite you
      to interview. Please click the link below to schedule your interview at
      one of our available times.
    </Description>
    <Button variant="gradient" suffix={<ArrowRight />}>
      Schedule Interview
    </Button>
  </>
);

const InterviewScheduled = () => (
  <>
    <Header>Interview Scheduled</Header>
    <Description>
      Your interview with Annie is scheduled for 10:00am on Friday, 5th
      February. You should have also received a calendar invite by now.
    </Description>
    <Button variant="subtle">Reschedule</Button>
  </>
);

const InterviewCompleted = () => (
  <>
    <Header>Interview Completed</Header>
    <Description>
      Thank you for joining your call with Annie. We are reviewing your
      application and you should here from us within the next 2 working days.
    </Description>
  </>
);

const MoreDetailsRequired = () => (
  <>
    <Header>More Details Required</Header>
    <Description>
      We have reviewed your application and would like to get some more details
      on some of your past work. Please add at least 3 projects to your profile.
      Once you have added and verified at least 3 projects we will revisit your
      application.{" "}
    </Description>
    <Button variant="gradient" suffix={<ArrowRight />}>
      UpdateProfile
    </Button>
  </>
);

const promptContentFromStage = (stage) => {
  switch (stage) {
    case "Started":
      return { component: AccountCreated, progress: 0 };
    case "Application Submitted":
      return { component: ApplicationSubmitted, progress: 1 };
    case "Invited To Interview":
      return { component: InvitedToInterview, progress: 2 };
    case "Interview Scheduled":
      return { component: InterviewScheduled, progress: 3 };
    case "Interview Completed":
      return { component: InterviewCompleted, progress: 4 };
    case "More Details Required":
      return { component: MoreDetailsRequired, progress: 5 };
    default:
      return null;
  }
};

export default function DashboardApplicationPrompt() {
  const viewer = useViewer();
  const history = useHistory();
  const applicationStage = viewer?.applicationStage;

  const actions = {
    continueApplication: () => history.push("/freelancers/apply/"),
    updateApplication: () => history.push("/freelancers/apply/introduction"),
    updateProfile: () => history.push("/profile"),
  };

  const context = promptContentFromStage(applicationStage);
  if (!context) return null;

  return (
    <PromptCard mb={10}>
      <ProgressLine progress={context.progress} />
      <context.component {...actions} />
    </PromptCard>
  );
}
