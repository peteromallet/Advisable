import * as React from "react";
import ShareModal from "./ShareModal";
import RejectModal from "./RejectModal";
import { ButtonGroup, Button } from "../../components";

const Actions = ({ onApply, application, stack, fullWidth }) => {
  const [rejectModal, setRejectModal] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);

  let actions = null;

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
