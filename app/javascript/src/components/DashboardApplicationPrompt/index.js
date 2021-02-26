import React from "react";
import { Text, Button } from "@advisable/donut";
import { ArrowRight } from "@styled-icons/feather";
import PromptCard from "./PromptCard";

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

const ApplicationSubmitted = () => (
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
    >
      Update Application
    </Button>
    <Button variant="subtle" width={["100%", "auto"]}>
      Update Profile
    </Button>
  </>
);

export default function DashboardApplicationPrompt() {

  return (
    <PromptCard mb={10}>
      <ApplicationSubmitted />
    </PromptCard>
  );
}
