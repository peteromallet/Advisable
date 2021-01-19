import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Modal, Button, Text, Paragraph } from "@advisable/donut";
import { Trash } from "@styled-icons/heroicons-outline";
import { useNotifications } from "src/components/Notifications";
import { DELETE_PREVIOUS_PROJECT } from "./mutations";

function DeleteProjectDialog({ modal, project, onDelete }) {
  const client = useApolloClient();
  const { notify, error } = useNotifications();

  const [deletePreviousProject, { loading }] = useMutation(
    DELETE_PREVIOUS_PROJECT,
  );

  const handleDelete = async () => {
    const { errors } = await deletePreviousProject({
      variables: { input: { id: project.id } },
    });
    if (errors) {
      error("Something went wrong, please try again.");
    } else {
      modal.hide();
      notify("Previous project has been deleted");
      client.cache.evict({ id: client.cache.identify(project) });
      client.cache.gc();
      onDelete();
    }
  };

  return (
    <Modal modal={modal} label="Delete post" padding="l">
      <Text
        as="h4"
        mb={2}
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Delete Project?
      </Text>
      <Paragraph mb={6}>
        Are you sure you want to delete this project. This can not be undone.
      </Paragraph>
      <Button
        mr={2}
        size="s"
        loading={loading}
        disabled={loading}
        prefix={<Trash />}
        onClick={handleDelete}
      >
        Confirm
      </Button>
      <Button size="s" variant="subtle" disabled={loading} onClick={modal.hide}>
        Cancel
      </Button>
    </Modal>
  );
}

export default DeleteProjectDialog;
