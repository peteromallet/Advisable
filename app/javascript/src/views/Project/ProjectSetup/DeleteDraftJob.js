import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Trash } from "@styled-icons/feather";
import { DELETE_JOB } from "./queries";
import { GET_PROJECTS } from "../../Projects/queries";
import {
  Text,
  Box,
  Button,
  Modal,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";

export default function DeleteDraftJob({ id }) {
  const modal = useModal();
  const history = useHistory();
  const [deleteProject, { loading }] = useMutation(DELETE_JOB, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = async () => {
    await deleteProject({
      variables: {
        input: { id },
      },
    });

    history.replace("/projects");
  };

  return (
    <>
      <Modal modal={modal} padding="40px" label="Delete project">
        <Box textAlign="center">
          <Text
            mb="xs"
            fontSize="28px"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.03em"
          >
            Are you sure?
          </Text>
          <Text color="neutral600" mb="l">
            This action can not be undone.
          </Text>
          <Button
            mr="4px"
            variant="secondary"
            onClick={handleDelete}
            loading={loading}
          >
            Delete
          </Button>
          <Button ml="4px" variant="subtle" onClick={modal.hide}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <DialogDisclosure
        prefix={<Trash />}
        as={Button}
        size="m"
        variant="minimal"
        {...modal}
      >
        Delete
      </DialogDisclosure>
    </>
  );
}
