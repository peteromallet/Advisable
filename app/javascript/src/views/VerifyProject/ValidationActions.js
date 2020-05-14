import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, useModal, DialogDisclosure } from "@advisable/donut";
import { useValidatePreviousProject } from "./queries";
import FailValidationModal from "./FailValidationModal";

function ValidationActions() {
  const modal = useModal();
  const { id } = useParams();
  const history = useHistory();
  const [validate, validateMutation] = useValidatePreviousProject();

  const handleValidate = async () => {
    const response = await validate({
      variables: {
        input: {
          id,
        },
      },
    });

    history.push(`/verify_project/${id}/review`);
  };

  return (
    <>
      <Button
        mr="s"
        mb="xs"
        size="l"
        onClick={handleValidate}
        loading={validateMutation.loading}
        width={["100%", "auto"]}
      >
        Verify Project
      </Button>
      <DialogDisclosure
        {...modal}
        as={Button}
        size="l"
        mb="xs"
        variant="subtle"
        width={["100%", "auto"]}
      >
        I can&apos;t verify this project
      </DialogDisclosure>
      <FailValidationModal modal={modal} />
    </>
  );
}

export default ValidationActions;
