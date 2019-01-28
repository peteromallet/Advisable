// Renders the view that allows specialists to manage their references.
import React from "react";
import Text from "../../components/Text";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import PreviousProjects from "./PreviousProjects";

const References = ({ match }) => {
  return (
    <React.Fragment>
      <Header />
      <Container size="m">
        <Heading marginBottom="m" level="1">
          Previous Projects
        </Heading>
        <Text marginBottom="l">
          References are one of the most effective ways to get hired for any
          role. This is some placeholder text that explains a bit way references
          are so important and why specialists should care about adding as many
          as they can.
        </Text>

        <Heading level="6" paddingTop="l" marginBottom="s">
          Previous Projects
        </Heading>
        <PreviousProjects specialistId={match.params.specialistID} />
      </Container>
    </React.Fragment>
  );
};

export default References;
