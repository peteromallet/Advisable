import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import Modal from "../../../components/Modal";

const ConfirmationModal = ({
  formik,
  isOpen,
  onClose,
  onSubmit,
  loading,
  onAddReference,
  noOfAvailableProjects,
}) => {
  const noOfSelectedProjects = formik.values.references.length;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box padding="l">
        <Text fontSize="xl" color="blue.9" mb="xs" fontWeight="medium">
          {noOfSelectedProjects === 0 ? (
            <>Are you sure?</>
          ) : (
            <>You've only attached 1 reference</>
          )}
        </Text>
        <Text color="neutral.7" fontSize="s" lineHeight="s" mb="m">
          The average successful application attaches at least two references of
          relevant previous projects they have completed.
        </Text>
        {noOfSelectedProjects === 0 && noOfAvailableProjects === 0 && (
          <Button
            mr="xs"
            type="button"
            appearance="primary"
            onClick={onAddReference}
          >
            Add a Reference
          </Button>
        )}

        {noOfSelectedProjects === 0 && noOfAvailableProjects > 0 && (
          <Button mr="xs" type="button" onClick={onClose} appearance="primary">
            Cancel
          </Button>
        )}

        {noOfSelectedProjects > 0 && (
          <Button
            mr="xs"
            type="button"
            appearance="primary"
            onClick={onAddReference}
          >
            Add Another Project
          </Button>
        )}
        <Button type="button" loading={loading} onClick={onSubmit}>
          {noOfSelectedProjects === 0
            ? "Continue Without References"
            : "Continue With 1 Reference"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
