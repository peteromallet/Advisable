import React from "react";
import { Text, Button } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { ArrowRight } from "@styled-icons/feather";
import PromptCard from "./PromptCard";
import { useHistory } from "react-router-dom";

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

const promptContentFromStage = (stage) => {
  switch (stage) {
    case "Started":
      return AccountCreated;
    case "Application Submitted":
      return ApplicationSubmitted;
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

  const PromptContextComponent = promptContentFromStage(applicationStage);

  return (
    <PromptCard mb={10}>
      <PromptContextComponent {...actions} />
    </PromptCard>
  );
}
