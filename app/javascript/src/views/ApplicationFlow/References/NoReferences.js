import * as React from "react";
import Text from "../../../components/Text";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import ButtonGroup from "../../../components/ButtonGroup";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";

const ConfirmationModal = ({
  isOpen,
  onClose,
  openAddReferenceModal,
  onSkip,
}) => {
  const handleAdd = () => {
    onClose();
    openAddReferenceModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl">
        <Padding bottom="s">
          <Heading>Are you sure?</Heading>
        </Padding>
        <Padding bottom="xl">
          <Text>
            Previous project references help us and the client validate your
            skills and make you far more likely to get projects.
          </Text>
        </Padding>
        <ButtonGroup>
          <Button styling="primary" onClick={handleAdd}>
            Add a project
          </Button>
          <Button onClick={onSkip}>Continue without references</Button>
        </ButtonGroup>
      </Padding>
    </Modal>
  );
};

const NoReferences = ({ openAddReferenceModal, onSkip }) => {
  const [confirm, setConfirm] = React.useState(false);

  return (
    <Padding size="xl">
      <Padding bottom="s">
        <Heading level={1}>References</Heading>
      </Padding>
      <Padding bottom="l">
        <Text>
          We require references from all freelancers prior to their first
          project on Advisable. We do this to ensure that their self-reported
          experience is verified by a third party. Only once verified will these
          references be shown on your profile and visible to clients.
        </Text>
      </Padding>
      <Padding bottom="l">
        <Button size="l" styling="green" onClick={openAddReferenceModal}>
          Add a previous project
        </Button>
      </Padding>
      <Button size="s" styling="plainSubtle" onClick={onSkip}>
        I don't want to provide references
      </Button>

      <ConfirmationModal
        onSkip={onSkip}
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        openAddReferenceModal={openAddReferenceModal}
      />
    </Padding>
  );
};

export default NoReferences;
