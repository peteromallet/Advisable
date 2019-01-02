import React, { useState } from "react";
import { graphql } from "react-apollo";
import View from "src/components/View";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Loading from "src/components/Loading";
import Divider from "src/components/Divider";
import Heading from "src/components/Heading";
import Container from "src/components/Container";
import { Action } from "./styles";
import calendly from 'src/utilities/calendly';
import convertToSelfService from "./convertToSelfService.graphql";

const ScheduleSetupCall = ({ project, mutate }) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const openCalendly = () => {
    calendly(
    "https://calendly.com/advisable-marketing/advisable-briefing-call-app/12-19-2018", {
      full_name: project.user.name,
      email: project.user.email,
      a2: project.airtableId
    })
  }

  const convertToSelfService = async () => {
    setLoading(true);
    
    await mutate({
      variables: {
        input: {
          id: project.airtableId
        }
      }
    })

    window.location = `/project_setup/${project.airtableId}`;
  };

  return (
    <View>
      <Container size="s">
        <Card center padding="xl">
          <Heading marginBottom="m">Request a call back</Heading>
          <Text marginBottom="l">
            Have an Advisable team member setup your project with you making
            sure you don’t miss anything!
          </Text>
          <Action onClick={openCalendly}>Schedule a call</Action>
          <Divider marginTop="xl" marginBottom="xl">
            Or
          </Divider>
          <Action onClick={convertToSelfService}>Continue by yourself</Action>
        </Card>
      </Container>
    </View>
  );
};

export default graphql(convertToSelfService)(ScheduleSetupCall);
