import { ArrowLeft } from "@styled-icons/heroicons-solid";
import React, { useState } from "react";
import CircularButton from "../CircularButton";
import Availability from "./Availability";
import MessageForm from "./MessageForm";
import { useRequestInterview } from "./queries";

function RequestCallMessage({ state, specialist, onBack }) {
  const [requestInterview] = useRequestInterview();

  const handleSubmit = async (values) => {
    await requestInterview({
      variables: {
        input: {
          specialist: specialist.id,
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

    state.modal.hide();
  };

  return (
    <>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={onBack} />
      </div>
      <p className="text-center mb-6">
        Request a 30 minute call with {specialist.firstName} to talk about your
        project. Please select your available times below.
      </p>
      <MessageForm
        specialist={specialist}
        buttonLabel="Request call"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default function RequestCall({ state, specialist }) {
  const [step, setStep] = useState("AVAILABILITY");

  return (
    <div>
      <h3 className="text-2xl font-medium tracking-tight leading-none mb-2 text-center">
        Request a call with {specialist.firstName}
      </h3>
      {step === "AVAILABILITY" && (
        <Availability
          state={state}
          specialist={specialist}
          onSubmit={() => setStep("MESSAGE")}
        />
      )}
      {step === "MESSAGE" && (
        <RequestCallMessage
          state={state}
          specialist={specialist}
          onBack={() => setStep("AVAILABILITY")}
        />
      )}
    </div>
  );
}
