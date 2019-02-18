import * as React from "react";
import ShareModal from "./ShareModal";
import RejectModal from "./RejectModal";
import { ButtonGroup, Button, Text } from "../../components";

const Actions = ({ onApply, application, stack, fullWidth }) => {
  const [rejectModal, setRejectModal] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);

  let actions = null;

  if (application.status === "Applied") {
    actions = (
      <ButtonGroup stack={stack}>
        <Text size="xs">You have already applied for this project</Text>
        <Button onClick={onApply} styling="green" size="l" block>
          Update Application
        </Button>
      </ButtonGroup>
    );
  }

  if (application.status === "Invitation Rejected") {
    actions = (
      <ButtonGroup stack={stack}>
        <Text size="xs">
          You have already rejected this invitation. Changed your mind?
        </Text>
        <Button onClick={onApply} styling="green" size="l" block>
          Apply Now
        </Button>
      </ButtonGroup>
    );
  }

  if (application.status === "Application Rejected") {
    actions = (
      <ButtonGroup stack={stack}>
        <Text size="xs">
          Your previous application for this project was rejected. Would you
          like to re-apply?
        </Text>
        <Button onClick={onApply} styling="green" size="l" block>
          Apply Now
        </Button>
      </ButtonGroup>
    );
  }

  if (application.status === "Invited To Apply") {
    actions = (
      <React.Fragment>
        <RejectModal
          isOpen={rejectModal}
          applicationId={application.airtableId}
          onClose={() => setRejectModal(false)}
          onReject={() => setShareModal(true)}
        />
        <ButtonGroup stack={stack} fullWidth={fullWidth}>
          <Button onClick={onApply} styling="green" size="l" block>
            Apply
          </Button>
          <Button
            styling="outlined"
            size="l"
            onClick={() => setRejectModal(true)}
            block
          >
            Reject Invitation
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ShareModal
        url={application.referralUrl}
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
      />
      {actions}
    </React.Fragment>
  );
};

export default Actions;
