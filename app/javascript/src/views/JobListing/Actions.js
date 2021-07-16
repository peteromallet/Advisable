import * as React from "react";
import ShareModal from "./ShareModal";
import RejectModal from "./RejectModal";
import {
  Text,
  Stack,
  Button,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";

const Actions = ({ onApply, application }) => {
  const rejectModal = useModal();
  const shareModal = useModal();

  let actions = null;

  if (application.status === "Applied") {
    actions = (
      <Stack spacing="xs">
        <Text size="xs">You have already applied for this project</Text>
        <Button onClick={onApply} size="l" width="100%">
          Update Application
        </Button>
      </Stack>
    );
  }

  if (application.status === "Invitation Rejected") {
    actions = (
      <Stack spacing="xs">
        <Text size="xs">
          You have already rejected this invitation. Changed your mind?
        </Text>
        <Button onClick={onApply} size="l" width="100%">
          Apply Now
        </Button>
      </Stack>
    );
  }

  if (application.status === "Application Rejected") {
    actions = (
      <Stack spacing="xs">
        <Text size="xs">
          Your previous application for this project was rejected. Would you
          like to re-apply?
        </Text>
        <Button onClick={onApply} size="l" width="100%">
          Apply Now
        </Button>
      </Stack>
    );
  }

  if (application.status === "Invited To Apply") {
    actions = (
      <React.Fragment>
        <RejectModal
          modal={rejectModal}
          application={application}
          onReject={shareModal.show}
        />
        <Stack>
          <Button onClick={onApply} size="l" width="100%" mb="12px">
            Apply
          </Button>
          <DialogDisclosure
            as={Button}
            size="l"
            width="100%"
            variant="subtle"
            {...rejectModal}
          >
            Reject Invitation
          </DialogDisclosure>
        </Stack>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ShareModal url={application.referralUrl} modal={shareModal} />
      {actions}
    </React.Fragment>
  );
};

export default Actions;
