import React from "react";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";
import ActiveProject from "./ActiveProject";
import { Cards } from "./styles";

export default ({ onClick, applications }) => {
  return (
    <>
      <Heading level={2}>Active Projects</Heading>
      <Padding bottom="l" top="l">
        <Divider />
      </Padding>
      <Cards>
        {applications.map(application => (
          <ActiveProject
            key={application.id}
            application={application}
            onClick={() => onClick(application)}
          />
        ))}
      </Cards>
    </>
  );
};
