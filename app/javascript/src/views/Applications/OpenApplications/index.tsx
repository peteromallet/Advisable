// Renders the freelancers open applications. An open application is any
// application record that they have applied to that has not reaached a
// concluded status.
import * as React from "react";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";
import Empty from "./Empty";
import Application from "./Application";

const applications = [
  {
    id: "1",
    status: "Applied",
    appliedAt: "2019-02-26T14:00:00",
    project: {
      id: "2",
      primarySkill: "User Experience Design"
    }
  },
  {
    id: "2",
    status: "Interview Requested",
    appliedAt: "2019-02-27T07:00:00",
    project: {
      id: "1",
      primarySkill: "Tourism Marketing"
    }
  },
  {
    id: "3",
    status: "Interview Scheduled",
    appliedAt: "2019-02-27T07:00:00",
    project: {
      id: "2",
      primarySkill: "Web Content Optimization"
    }
  }
];

const OpenApplications = () => {
  let content;

  content = <Empty />;

  content = applications.map(application => (
    <Padding bottom="m" key={application.id}>
      <Application application={application} />
    </Padding>
  ));

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
