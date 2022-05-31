import { CreditCard, DocumentText } from "@styled-icons/heroicons-outline";
import React from "react";
import { Modal, useModal, DialogDisclosure } from "@advisable/donut";
import { useNavigate } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import ConversationAction, {
  ConversationActionLink,
} from "./ConversationAction";
import ConversationActionsList from "./ConversationActionsList";
import AgreementDetails from "src/views/NewAgreement/AgreementDetails";
import { isSpecialistAndUser } from "../utilities";

function ConversationActiveAgreement({ conversation }) {
  const viewer = useViewer();
  const detailsModal = useModal();
  const other = conversation.participants.find((p) => !p.isViewer);
  const { agreement } = conversation;
  const user = conversation.participants.find((p) => p.user)?.user;
  const specialist = conversation.participants.find(
    (p) => p.specialist,
  )?.specialist;

  return (
    <>
      <Modal modal={detailsModal}>
        <AgreementDetails
          specialistName={specialist.name}
          companyName={user.company.name}
          collaboration={agreement.collaboration}
          invoicing={agreement.invoicing}
          hourlyRate={agreement.hourlyRate}
        />
      </Modal>
      <p className="leading-tight text-[15px] text-neutral-700 mb-2">
        You have an active agreement with {other.firstName}.
      </p>
      <ConversationActionsList>
        {viewer.isSpecialist && (
          <ConversationActionLink
            icon={CreditCard}
            variant="blue"
            to="/payment_requests/new"
          >
            Request payment
          </ConversationActionLink>
        )}
        <DialogDisclosure {...detailsModal}>
          {(disclosure) => (
            <ConversationAction icon={DocumentText} {...disclosure}>
              View agreement
            </ConversationAction>
          )}
        </DialogDisclosure>
      </ConversationActionsList>
    </>
  );
}

function ConversationNoAgreement({ conversation }) {
  const viewer = useViewer();
  const navigate = useNavigate();
  const other = conversation.participants.find((p) => !p.isViewer);

  const handleRequest = () => {
    navigate(`/new_agreement/${other.user.id}`);
  };

  if (viewer.isSpecialist) {
    return (
      <>
        <p className="leading-tight text-[15px] text-neutral-700 mb-2">
          Create an agreement with {other.firstName} to start working together
          and accept payments from them.
        </p>
        <ConversationActionsList>
          <ConversationAction
            icon={DocumentText}
            variant="blue"
            onClick={handleRequest}
          >
            Create agreement
          </ConversationAction>
        </ConversationActionsList>
      </>
    );
  }

  return (
    <p className="leading-tight text-[15px] text-neutral-700 mb-4">
      {other.firstName} has not created an agreement with you yet.
    </p>
  );
}

export default function ConversationAgreement({ conversation }) {
  const { agreement } = conversation;

  if (!isSpecialistAndUser(conversation)) {
    return null;
  }

  return (
    <div className="p-7">
      <h4 className="leading-none font-medium mb-2">Collaboration</h4>
      {agreement ? (
        <ConversationActiveAgreement conversation={conversation} />
      ) : (
        <ConversationNoAgreement conversation={conversation} />
      )}
    </div>
  );
}
