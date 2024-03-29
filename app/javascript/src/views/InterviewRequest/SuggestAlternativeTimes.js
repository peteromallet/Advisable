import React, { useState } from "react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "src/components/Notifications";
import SubmitButton from "src/components/SubmitButton";
import { Textarea } from "@advisable/donut";
import Loading from "src/components/Loading";
import { useAvailability, useRequestAlternateCall } from "./queries";
import FormField from "src/components/FormField";
import AvailabilityForm from "src/components/AvailabilityForm";
import CircularButton from "src/components/CircularButton";
import { ArrowLeft } from "@styled-icons/heroicons-solid";

function AvailabilityStep({ onSubmit }) {
  const { data, loading, error } = useAvailability();
  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl text-neutral900 font-semibold tracking-tight mb-1">
          Suggest alternative times
        </h3>
        <p className="text-neutral700 text-base mb-6">
          Please select your available times below.
        </p>
      </div>
      {loading && <Loading />}
      {!loading && data && <AvailabilityForm data={data} onSubmit={onSubmit} />}
      {error && <>Failed to load availability</>}
    </div>
  );
}

const validationSchema = object({
  message: string().required("Please include a message"),
});

function MessageStep({ account, onBack }) {
  const { interviewID } = useParams();
  const navigate = useNavigate();
  const [requestAlternateCall] = useRequestAlternateCall();
  const { error } = useNotifications();

  const initialValues = {
    message: `Hey ${account.firstName}. Unfortunately, none of these times work for me. I have suggested a few alternatives that will hopefully work for you!`,
  };

  const handleSubmit = async (values) => {
    const res = await requestAlternateCall({
      variables: {
        input: {
          interview: interviewID,
          reason: values.message,
        },
      },
    });

    if (res.errors) {
      error("Something went wrong. Please try again.");
      return;
    }

    const { conversation } = res.data.requestAlternateCall.interview;
    navigate(`/messages/${conversation.id}`);
  };

  return (
    <>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={onBack} />
      </div>
      <div className="pb-6 pr-4 text-center">
        <h3 className="text-3xl text-neutral900 font-semibold tracking-tight mb-1">
          Include a message
        </h3>
        <p className="text-neutral700 tracking-tight">
          Write a short message to include in your request
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        <Form>
          <div className="mb-6">
            <FormField
              autoFocus
              as={Textarea}
              name="message"
              placeholder="Write a short message to include in your request..."
              minRows={8}
              showError={false}
            />
          </div>
          <SubmitButton
            variant="gradient"
            width="100%"
            size="l"
            disableUntilValid
          >
            Send Request
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}

export default function SuggestAlternativeTimes({ account }) {
  const [step, setStep] = useState("AVAILABILITY");

  if (step === "AVAILABILITY") {
    return (
      <AvailabilityStep account={account} onSubmit={() => setStep("MESSAGE")} />
    );
  } else {
    return (
      <MessageStep account={account} onBack={() => setStep("AVAILABILITY")} />
    );
  }
}
