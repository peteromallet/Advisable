import React from "react";
import {
  Box,
  Text,
  RoundedButton,
  Modal,
  DialogDisclosure,
} from "@advisable/donut";

const ConfirmationModal = ({
  modal,
  formik,
  onSubmit,
  loading,
  newProjectModal,
  noOfAvailableProjects,
}) => {
  const noOfSelectedProjects = formik.values.references.length;

  return (
    <Modal modal={modal} label="Are you sure?">
      <Box padding="l">
        <Text
          fontSize="24px"
          color="blue900"
          mb="xs"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          {noOfSelectedProjects === 0 ? (
            <>Are you sure?</>
          ) : (
            <>You've only attached 1 reference</>
          )}
        </Text>
        <Text color="neutral800" fontSize="s" lineHeight="m" mb="l">
          The average successful application attaches at least two references of
          relevant previous projects they have completed.
        </Text>
        {noOfSelectedProjects === 0 && noOfAvailableProjects === 0 && (
          <DialogDisclosure
            as={RoundedButton}
            mr="xs"
            type="button"
            variant="dark"
            {...newProjectModal}
          >
            Add a Reference
          </DialogDisclosure>
        )}

        {noOfSelectedProjects === 0 && noOfAvailableProjects > 0 && (
          <RoundedButton
            mr="xs"
            type="button"
            onClick={modal.hide}
            variant="subtle"
          >
            Cancel
          </RoundedButton>
        )}

        {noOfSelectedProjects > 0 && (
          <DialogDisclosure
            as={RoundedButton}
            mr="xs"
            type="button"
            {...newProjectModal}
            onClick={() => {
              newProjectModal.show();
              modal.hide();
            }}
          >
            Add Another Project
          </DialogDisclosure>
        )}
        <RoundedButton
          variant="dark"
          type="button"
          loading={loading}
          onClick={onSubmit}
        >
          {noOfSelectedProjects === 0
            ? "Continue Without References"
            : "Continue With 1 Reference"}
        </RoundedButton>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
