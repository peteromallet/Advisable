import React from "react";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";
import TalentCard from "./TalentCard";
import { Cards } from "./styles";

export default ({ onClick, applications }) => {
  return (
    <>
      <Heading level={2}>Manage Talent</Heading>
      <Padding bottom="xl" top="xl">
        <Divider />
      </Padding>
      <Cards>
        {applications.map(application => (
          <TalentCard
            key={application.id}
            application={application}
            onClick={() => onClick(application)}
          />
        ))}
      </Cards>
    </>
  );
};
