import React from "react";
import { useParams } from "react-router-dom";
import { Button, useModal, DialogDisclosure } from "@advisable/donut";
import { useValidatePreviousProject } from "./queries";
import FailValidationModal from "./FailValidationModal";

function ValidationActions() {
  const modal = useModal();
  const { id } = useParams();
  const [validate, validateMutation] = useValidatePreviousProject();

  const handleValidate = async () => {
    await validate({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  return (
    <>
      <Button
        mr="s"
        mb="xs"
        size="l"
        onClick={handleValidate}
        loading={validateMutation.loading}
      >
        Verify Project
      </Button>
      <DialogDisclosure
        {...modal}
        as={Button}
        size="l"
        mb="xs"
        variant="subtle"
      >
        I can&apos;t verify this project
      </DialogDisclosure>
      <FailValidationModal modal={modal} />
    </>
  );
}

export default ValidationActions;
