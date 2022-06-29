import React, { useState } from "react";
import { DateTime } from "luxon";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import Loading from "src/components/Loading";
import Button from "src/components/Button";
import { Availability, Textarea, useBreakpoint } from "@advisable/donut";
import AvailabilityInput from "src/components/AvailabilityInput";
import {
  useAvailability,
  useUpdateAvailability,
  useRequestCall,
} from "../queries";
import commaSeparated from "src/utilities/commaSeparated";
import TimezoneSelect from "src/components/ConnectModal/TimezoneSelect";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { CallRequested } from "src/components/ConnectModal/RequestCall";

function AvailabilityForm({ data, onSubmit }) {
  const sup = useBreakpoint("sUp");
  const [timezone, setTimezone] = useState(DateTime.local().zoneName || "UTC");
  const [updateAvailability, { loading }] = useUpdateAvailability();
  const [availability, setAvailability] = useState(
    data.viewer.availability || [],
  );

  const handleSubmit = async () => {
    await updateAvailability({
      variables: { input: { availability } },
    });
    onSubmit();
  };

  return (
    <>
      <div className="mb-6">
        {sup ? (
          <AvailabilityInput
            maxHeight="40vh"
            value={availability}
            timezone={timezone}
            onChange={setAvailability}
            events={data.viewer.interviews?.map((i) => ({
              time: i.startsAt,
              label: `Call with ${commaSeparated(
                i.accounts.map((p) => p.firstName),
              )}`,
            }))}
          />
        ) : (
          <div className="mb-8">
            <Availability
              timezone={timezone}
              value={availability}
              onChange={setAvailability}
            />
          </div>
        )}
        <div className="pt-4 pb-2">
          <TimezoneSelect
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </div>
      </div>
      {availability.length < 6 ? (
        <p className="text-neutral600 mt-5 tracking-tight">
          Please select at least 6 available times to continue
        </p>
      ) : (
        <Button
          size="lg"
          className="w-full"
          variant="primary"
          onClick={handleSubmit}
          loading={loading}
        >
          Continue
        </Button>
      )}
    </>
  );
}

function AvailabilityStep({ account, onSubmit }) {
  const { data, loading, error } = useAvailability();
  return (
    <div>
      <h3 className="text-3xl text-neutral900 font-semibold tracking-tight mb-1">
        Request a call with {account.firstName}
      </h3>
      <p className="text-neutral700 text-base mb-6">
        Request a 30 minute call with {account.firstName} to talk about your
        project. Please select your available times below.
      </p>
      {loading && <Loading />}
      {!loading && data && <AvailabilityForm data={data} onSubmit={onSubmit} />}
      {error && <>Failed to load availability</>}
    </div>
  );
}

const validationSchema = object({
  message: string(),
});

function MessageStep({ account, onSubmit }) {
  const [requestCall] = useRequestCall();

  const handleSubmit = async (values) => {
    await requestCall({
      variables: {
        input: {
          accounts: [account.id],
          message: values.message,
        },
      },
    });

    onSubmit();
  };

  return (
    <>
      <div className="pb-6 pr-4">
        <h3 className="text-3xl text-neutral900 font-semibold tracking-tight mb-1">
          Attach a message
        </h3>
        <p className="text-neutral700 tracking-tight">
          Write a short message to include in your request
        </p>
      </div>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <div className="mb-8">
              <FormField
                autoFocus
                as={Textarea}
                name="message"
                placeholder="Write a short message to include in your request..."
                minRows={8}
                showError={false}
              />
            </div>
            <Button
              onClick={() => {
                formik.setFieldValue("message", "");
              }}
              type="submit"
              size="lg"
              variant="outlined"
              className="w-full mb-3"
            >
              Request without message
            </Button>
            <SubmitButton
              variant="gradient"
              width="100%"
              size="l"
              disableUntilValid
            >
              Send Request
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default function ConversationCallRequest({ account, modal }) {
  const [step, setStep] = useState("AVAILABILITY");

  switch (step) {
    case "AVAILABILITY":
      return (
        <AvailabilityStep
          account={account}
          onSubmit={() => setStep("MESSAGE")}
        />
      );
    case "MESSAGE":
      return <MessageStep account={account} onSubmit={() => setStep("SENT")} />;
    default:
      return <CallRequested account={account} modal={modal} />;
  }
}