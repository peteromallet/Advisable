// Renders the freelancers open applications. An open application is any
// application record that they have applied to that has not reaached a
// concluded status.
import * as React from "react";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";
import Empty from "./Empty";
import Loading from "./Loading";
import Application from "./Application";
import { ApplicationType } from "../../../types";

interface Props {
  loading: boolean;
  applications: ApplicationType[];
}

const OpenApplications = (props: Props) => {
  if (props.loading) return <Loading />

  let content : React.ReactNode = <Empty />;

  if (props.applications.length === 0) {
    content = props.applications.map(application => (
      <Padding bottom="m" key={application.id}>
        <Application application={application} />
      </Padding>
    ));
  }

  return (
    <div>
      <Padding bottom="m">
        <Heading>Open Applications</Heading>
      </Padding>
      {content}
    </div>
  );
};

export default OpenApplications;
