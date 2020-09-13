// Renders the freelancers open applications. An open application is any
// application record that they have applied to that has not reaached a
// concluded status.
import * as React from "react";
import { Text, Box } from "@advisable/donut";
import Loading from "./Loading";
import Application from "./Application";

const OpenApplications = (props) => {
  if (props.loading) return <Loading />;

  return (
    <>
      {props.onHold && (
        <Text color="neutral900" mb="m" size="l" weight="medium">
          We&apos;re currently evaluating the projects you&apos;ve applied for
        </Text>
      )}
      {props.applications.map((application) => (
        <Box paddingBottom="m" key={application.id}>
          <Application application={application} />
        </Box>
      ))}
    </>
  );
};

export default OpenApplications;
