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
import { AgreementModal } from "./AgreementCreatedMessage";

function ConversationActiveAgreement({ agreement }) {
  const viewer = useViewer();
  const detailsModal = useModal();
  const { specialist, company } = agreement;

  return (
    <>
      <Modal modal={detailsModal}>
        <AgreementDetails
          specialistName={specialist?.name}
          companyName={company?.name}
          collaboration={agreement.collaboration}
          invoicing={agreement.invoicing}
          hourlyRate={agreement.hourlyRate}
        />
      </Modal>
      <h4 className="leading-tight font-medium mb-2">Agreement</h4>
      <p className="leading-tight text-[15px] text-neutral-700 mb-2">
        {viewer.isSpecialist ? (
          <>You have an active agreement with {company.name}.</>
        ) : (
          <>You have an active agreement with {specialist.firstName}.</>
        )}
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

function ConversationPendingAgreement({ agreement }) {
  const modal = useModal();
  const viewer = useViewer();
  const { specialist, company } = agreement;

  return (
    <div>
      <h4 className="leading-tight font-medium mb-2">Pending agreement</h4>
      <p className="leading-tight text-[15px] text-neutral-700 mb-2">
        {viewer.isSpecialist ? (
          <>
            You have a pending agreement with {company.name}. They hasn't made a
            decision yet.
          </>
        ) : (
          <>
            {specialist.firstName} has created an agreement and waiting for your
            decision.
          </>
        )}
      </p>
      <AgreementModal agreement={agreement} modal={modal} />
      <ConversationActionsList>
        <DialogDisclosure {...modal}>
          {(disclosure) => (
            <ConversationAction icon={DocumentText} {...disclosure}>
              {viewer.isSpecialist ? "View agreement" : "Respond"}
            </ConversationAction>
          )}
        </DialogDisclosure>
      </ConversationActionsList>
    </div>
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
        <h4 className="leading-none font-medium mb-2">
          Work with {other.user.company.name}
        </h4>
        <p className="text-[15px] text-neutral-700 mb-2">
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
    <>
      <h4 className="leading-none font-medium mb-2">
        Work with {other.firstName}
      </h4>
      <p className="text-[15px] text-neutral-700 mb-4">
        {other.firstName} hasn’t created an agreement to work together yet. If
        you want to start working with them, ask them to share an agreement on
        Advisable.
      </p>
    </>
  );
}

export default function ConversationAgreement({ conversation }) {
  const { agreement } = conversation;
  const components = {
    accepted: ConversationActiveAgreement,
    pending: ConversationPendingAgreement,
  };
  const Component = components[agreement?.status] || ConversationNoAgreement;

  if (!isSpecialistAndUser(conversation)) return null;

  return (
    <div className="p-7">
      <Component conversation={conversation} agreement={agreement} />
    </div>
  );
}
