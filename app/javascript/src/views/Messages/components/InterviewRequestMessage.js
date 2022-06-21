import { ArrowLeft, Calendar } from "@styled-icons/heroicons-solid";
import {
  theme,
  Modal,
  useModal,
  Textarea,
  DialogDisclosure,
} from "@advisable/donut";
import React, { useEffect, useMemo, useState } from "react";
import Button from "src/components/Button";
import useViewer from "src/hooks/useViewer";
import { BaseMessage } from "./Message";
import { useMessagePrompt } from "./MessagePrompt";
import CalendarIllustration from "src/illustrations/zest/calendar";
import { Link, useLocation } from "react-router-dom";
import CircularButton from "src/components/CircularButton";
import { useDeclineInterview } from "../queries";
import MessageCTA from "./MessageCTA";

function DeclineInterviewRequest({ message, onBack, onDecline }) {
  const [decline, { loading }] = useDeclineInterview();
  const [reason, setReason] = useState("");
  const sender = message.author?.name;

  const handleDecline = async () => {
    await decline({
      variables: {
        input: {
          interview: message.interview.id,
          reason: reason.trim(),
        },
      },
    });

    onDecline();
  };

  return (
    <>
      <div className="absolute left-3 top-3">
        <CircularButton onClick={onBack} icon={ArrowLeft} />
      </div>
      <h3 className="mb-2 text-center text-2xl font-semibold tracking-tight">
        Decline call request
      </h3>
      <p className="text-center mb-6">
        Let {sender} know why you are declining their request.
      </p>
      <Textarea
        autoFocus
        minRows={8}
        name="reason"
        value={reason}
        marginBottom={8}
        placeholder={`Message to ${sender}...`}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button
        size="lg"
        loading={loading}
        className="w-full"
        variant="secondary"
        onClick={handleDecline}
        disabled={reason.trim().length === 0}
      >
        Decline request
      </Button>
    </>
  );
}

function AcceptInterviewRequest({ message, onDecline }) {
  const location = useLocation();
  const sender = message.author?.name;

  return (
    <div>
      <CalendarIllustration
        className="mx-auto mb-5"
        width="160px"
        color={theme.colors.blue100}
      />
      <div className="text-center mb-8">
        <h4 className="text-xl font-semibold tracking-tight mb-1">
          New call request
        </h4>
        <p className="text-lg leading-normal">
          {sender} has requested a 30 minute call with you. After speaking with
          them you will be able to send them a request to work together.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          className="w-full"
          to={{
            state: { from: location.pathname },
            pathname: `/interview_request/${message.interview.id}`,
          }}
        >
          <Button size="lg" className="w-full">
            View availability
          </Button>
        </Link>
        <Button
          size="lg"
          className="w-full"
          variant="outlined"
          onClick={onDecline}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

function InterviewRequestModal({ message, modal }) {
  const [decline, setDecline] = useState(false);

  return (
    <Modal modal={modal}>
      {decline ? (
        <DeclineInterviewRequest
          message={message}
          onBack={() => setDecline(false)}
          onDecline={modal.hide}
        />
      ) : (
        <AcceptInterviewRequest
          message={message}
          onDecline={() => setDecline(true)}
        />
      )}
    </Modal>
  );
}

function InterviewRequestForRecipient({ message }) {
  const modal = useModal();
  const sender = message.author?.name;
  const { show, dismiss, highlight } = useMessagePrompt(
    message,
    "New call request",
  );

  const isPending = useMemo(() => {
    return ["Call Requested", "Call Reminded"].includes(
      message.interview.status,
    );
  }, [message]);

  useEffect(() => {
    if (isPending) {
      show();
    } else {
      dismiss();
    }
  }, [show, dismiss, isPending]);

  return (
    <BaseMessage message={message} highlight={highlight}>
      <MessageCTA
        icon={Calendar}
        title={`${sender} requested a call with you`}
        subText="Check their availability"
        onClick={isPending && modal.show}
        action={
          isPending && (
            <>
              <DialogDisclosure {...modal}>
                {(disclosure) => <Button {...disclosure}>Respond</Button>}
              </DialogDisclosure>
              <InterviewRequestModal modal={modal} message={message} />
            </>
          )
        }
      />
    </BaseMessage>
  );
}

function InterviewRequestForSender({ message }) {
  return (
    <BaseMessage message={message}>
      <div className="p-4 rounded-lg bg-neutral-100 flex items-center leading-none">
        {message.author?.name} requested a call
      </div>
    </BaseMessage>
  );
}

export default function InterviewRequestMessage({ message }) {
  const viewer = useViewer();

  if (viewer.account.id !== message.author.id) {
    return <InterviewRequestForRecipient message={message} />;
  }

  return <InterviewRequestForSender message={message} />;
}
