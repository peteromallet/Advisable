// Loads the empty state for the manage talent view
import React from "react";
import { Text, RoundedButton } from "@advisable/donut";
import { Padding } from "../../components/Spacing";
import NewProjectModal from "../Projects/NewProjectModal";
import illustration from "./illustration.png";

export default () => {
  const [modal, setModal] = React.useState(null);

  return (
    <div style={{ textAlign: "center" }}>
      <Padding top="xl" bottom="xl">
        <img src={illustration} width={250} alt="" />
      </Padding>
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <Text fontWeight="semibold" color="neutral.8" mb="xs">
          No active bookings
        </Text>
        <Text fontSize="s" mb="l" lineHeight="s" color="neutral.7">
          It looks like you haven't hired any freelancers yet. Once you start a
          project with a freelancer you will be able to manage their work from
          here.
        </Text>
        <RoundedButton onClick={() => setModal("NEW_PROJECT")}>
          Create a project
        </RoundedButton>
        <NewProjectModal
          isOpen={modal === "NEW_PROJECT"}
          onClose={() => setModal(null)}
        />
      </div>
    </div>
  );
};
