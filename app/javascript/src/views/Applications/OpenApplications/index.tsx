// Renders the freelancers open applications. An open application is any
// application record that they have applied to that has not reaached a
// concluded status.
import * as React from "react";
import Link from "../../../components/Link";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";
import Empty from "./Empty";
import Loading from "./Loading";
import Application from "./Application";
import FooterAction from "../FooterAction";
import { ApplicationType, SpecialistType } from "../../../types";

interface Props {
  loading: boolean;
  featuredURL: string;
  specialist: SpecialistType;
  applications: ApplicationType[];
}

const OpenApplications = (props: Props) => {
  if (props.loading) return <Loading />;

  let content: React.ReactNode = <Empty featuredURL={props.featuredURL} />;

  if (props.applications.length > 0) {
    return (
      <React.Fragment>
        {props.applications.map(application => (
          <Padding bottom="m" key={application.id}>
            <Application application={application} />
          </Padding>
        ))}
        <Padding top="l">
          <FooterAction icon='help-circle' css="width: 90%; max-width: 450px; margin: 0 auto;">
            <Link target="_blank" href={props.featuredURL}>
              Request an invitation to be a featured freelancer
            </Link>
          </FooterAction>
        </Padding>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Padding bottom="m">
        <Heading level={2}>Open Applications</Heading>
      </Padding>
      {content}
    </div>
  );
};

export default OpenApplications;
