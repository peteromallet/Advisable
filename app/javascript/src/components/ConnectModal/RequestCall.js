import { ArrowLeft, VideoCamera } from "@styled-icons/heroicons-solid";
import React, { useState } from "react";
import CircularButton from "../CircularButton";
import Availability from "./Availability";
import ConnectedAvatars from "./ConnectedAvatars";
import MessageForm from "./MessageForm";
import SubHeading from "./SubHeading";
import ModalHeading from "./ModalHeading";
import { useRequestInterview } from "./queries";
import MessagesIllustration from "src/illustrations/zest/messages";
import Button from "../Button";

function RequestCallMessage({ specialist, onBack, onComplete, article }) {
  const [requestInterview] = useRequestInterview();

  const handleSubmit = async (values) => {
    await requestInterview({
      variables: {
        input: {
          article: article?.id,
          accounts: [specialist.account.id],
          message: values.message,
        },
      },
      update(cache, result) {
        cache.modify({
          id: cache.identify(specialist),
          fields: {
            interview: () => result.data.requestInterview.interview,
          },
        });
      },
    });

    onComplete();
  };

  return (
    <>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={onBack} />
      </div>
      <ConnectedAvatars
        specialist={specialist}
        className="mb-4"
        icon={VideoCamera}
      />
      <ModalHeading>Request a call with {specialist.firstName}</ModalHeading>
      <SubHeading>
        Request a 30 minute call with {specialist.firstName} to talk about your
        project. Please select your available times below.
      </SubHeading>
      <MessageForm
        specialist={specialist}
        buttonLabel="Request call"
        onSubmit={handleSubmit}
        placeholder={`Include a message to ${specialist.firstName}...`}
      />
    </>
  );
}

export function CallRequested({ specialist, modal }) {
  return (
    <div className="text-center pb-3">
      <MessagesIllustration
        width="150px"
        className="mx-auto my-4"
        color="var(--color-violet-200)"
        secondaryColor="var(--color-blue900)"
      />
      <h5 className="font-medium text-xl mb-1">Request sent</h5>
      <SubHeading>
        Your request has been sent to {specialist.firstName}. We will let you
        know when they respond.
      </SubHeading>
      <Button variant="secondary" onClick={modal.hide}>
        Okay
      </Button>
    </div>
  );
}

export default function RequestCall({ modal, specialist, onBack, article }) {
  const [step, setStep] = useState("AVAILABILITY");

  return (
    <>
      {step === "SENT" && (
        <CallRequested modal={modal} specialist={specialist} />
      )}
      {step === "AVAILABILITY" && (
        <Availability
          specialist={specialist}
          onSubmit={() => setStep("MESSAGE")}
          onBack={onBack}
        />
      )}
      {step === "MESSAGE" && (
        <RequestCallMessage
          article={article}
          specialist={specialist}
          onBack={() => setStep("AVAILABILITY")}
          onComplete={() => setStep("SENT")}
        />
      )}
    </>
  );
}
