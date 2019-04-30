// Loads the empty state for the manage talent view
import React from "react";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { Padding } from "../../components/Spacing";
import NewProjectModal from "../Projects/NewProjectModal";
import illustration from "./illustration.png";

export default () => {
  const [modal, setModal] = React.useState(null);

  return (
    <div style={{ textAlign: "center" }}>
      <Padding top="xl" bottom="xl">
        <img src={illustration} width={320} alt="" />
      </Padding>
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <Padding bottom="xs">
          <Text weight="semibold" color="dark">
            No active bookings
          </Text>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            It looks like you haven't hired any freelancers yet. Once you start
            a project with a freelancer you will be able to manage their work
            from here.
          </Text>
        </Padding>
        <Button styling="plain" onClick={() => setModal("NEW_PROJECT")}>
          Create a project
        </Button>
        <NewProjectModal
          isOpen={modal === "NEW_PROJECT"}
          onClose={() => setModal(null)}
        />
      </div>
    </div>
  );
};
