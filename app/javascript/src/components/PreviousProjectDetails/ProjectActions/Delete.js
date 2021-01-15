import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Trash } from "@styled-icons/heroicons-outline";
import { useNotifications } from "src/components/Notifications";
import { Modal, Box, Tooltip, Button, Text, Paragraph } from "@advisable/donut";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import CircularButton from "src/components/CircularButton";
import { DELETE_PREVIOUS_PROJECT } from "./mutations";

function DeletePost({ project, size }) {
  const modal = useDialogState();
  const notifications = useNotifications();
  const history = useHistory();

  const [deletePreviousProject, { loading }] = useMutation(
    DELETE_PREVIOUS_PROJECT,
  );

  const handleDelete = async () => {
    await deletePreviousProject({ variables: { input: { id: project.id } } });
    notifications.notify("Deleted guild post");
    history.push(`/freelancers/${project.specialist.id}`);
    modal.hide();
  };

  return (
    <>
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
        <Button
          size="s"
          variant="subtle"
          disabled={loading}
          onClick={modal.hide}
        >
          Cancel
        </Button>
      </Modal>

      <Tooltip placement="top" content="Delete">
        <Box
          css={`
            outline: none;
          `}
        >
          <DialogDisclosure {...modal}>
            {(props) => (
              <CircularButton
                {...props}
                size={size}
                bg="neutral100"
                color="neutral600"
                aria-label="Delete post"
                data-testid="deletePost"
                icon={<Trash />}
              />
            )}
          </DialogDisclosure>
        </Box>
      </Tooltip>
    </>
  );
}

export default DeletePost;
