import * as React from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/react-hooks";
import Modal from "../../components/Modal";
import Text from "../../components/Text";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import { Padding } from "../../components/Spacing";
import ACCEPT_PROPOSAL from "./acceptProposal.graphql";

let AcceptedModal = ({ isOpen, onClose, application, firstName }) => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [mutate] = useMutation(ACCEPT_PROPOSAL);

  const handleAccept = async () => {
    setLoading(true);
    const response = await mutate({
      variables: {
        input: { id: application.airtableId },
      },
    });

    const { errors } = response.data.acceptProposal;
    if (errors) {
      setLoading(false);
    } else {
      history.replace(`/manage/${application.airtableId}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl">
        <Padding bottom="s">
          <Heading level={3}>Accept propsal from {firstName}</Heading>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            Accepting this proposal wont assign any tasks. You’ll have the
            opportunity to assign and add tasks once you start working with{" "}
            {firstName}. Once you assign a task, if you’re not happy with the
            quality of the work, we’ll give you a 100% refund for up to 8 hours
            work.
          </Text>
        </Padding>
        <ButtonGroup fullWidth>
          <Button loading={loading} styling="primary" onClick={handleAccept}>
            Accept Proposal
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </Padding>
    </Modal>
  );
};

export default AcceptedModal;
