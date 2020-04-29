// Renders the freelancers open applications. An open application is any
// application record that they have applied to that has not reaached a
// concluded status.
import * as React from "react";
import { Text } from "@advisable/donut";
import Link from "../../../components/Link";
import { HelpCircle } from "@styled-icons/feather";
import Padding from "../../../components/Spacing/Padding";
import Empty from "./Empty";
import Loading from "./Loading";
import Application from "./Application";
import FooterAction from "../FooterAction";

const OpenApplications = (props) => {
  if (props.loading) return <Loading />;

  if (props.applications.length === 0) {
    return <Empty featuredURL={props.featuredURL} />;
  }

  return (
    <React.Fragment>
      {props.onHold && (
        <Text color="neutral.9" mb="m" size="l" weight="medium">
          We're currently evaluating the projects you've applied for
        </Text>
      )}
      {props.applications.map((application) => (
        <Padding bottom="m" key={application.id}>
          <Application application={application} />
        </Padding>
      ))}
      <Padding top="l">
        <FooterAction
          icon={<HelpCircle size={24} strokeWidth={2} />}
          css="width: 90%; max-width: 450px; margin: 0 auto;"
        >
          <Link target="_blank" href={props.featuredURL}>
            Request an invitation to be a featured freelancer
          </Link>
        </FooterAction>
      </Padding>
    </React.Fragment>
  );
};

export default OpenApplications;
