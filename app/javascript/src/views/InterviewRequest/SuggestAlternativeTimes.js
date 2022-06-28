import React, { useState } from "react";
import { DateTime } from "luxon";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { Link, useParams } from "react-router-dom";
import { useNotifications } from "src/components/Notifications";
import AvailabilityInput from "src/components/AvailabilityInput";
import Button from "src/components/Button";
import SubmitButton from "src/components/SubmitButton";
import { Availability, Textarea, useBreakpoint } from "@advisable/donut";
import TimezoneSelect from "src/components/ConnectModal/TimezoneSelect";
import commaSeparated from "src/utilities/commaSeparated";
import Loading from "src/components/Loading";
import {
  useAvailability,
  useDeclineInterview,
  useRequestCall,
  useUpdateAvailability,
} from "./queries";
import FormField from "src/components/FormField";

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
                i.participants.map((p) => p.firstName),
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
        Suggest alternative times for a call with {account.firstName}
      </h3>
      <p className="text-neutral700 text-base mb-6">
        Please update your available times below.
      </p>
      {loading && <Loading />}
      {!loading && data && <AvailabilityForm data={data} onSubmit={onSubmit} />}
      {error && <>Failed to load availability</>}
    </div>
  );
}

const validationSchema = object({
  message: string().required("Please include a message"),
});

function MessageStep({ account, onSubmit, interviewID }) {
  const [requestCall] = useRequestCall();
  const [declineInterview] = useDeclineInterview(interviewID);
  const { error } = useNotifications();

  const initialValues = {
    message: `Hey ${account.firstName}. Unfortunately, none of these times work for me. I have suggested a few alternatives that will hopefully work for you!`,
  };

  const handleSubmit = async (values) => {
    const declineRes = await declineInterview();
    if (declineRes.errors) {
      error("Something went wrong. Please try again.");
      return;
    }

    const res = await requestCall({
      variables: {
        input: {
          accounts: [account.id],
          message: values.message,
        },
      },
    });
    if (res.errors) {
      error("Something went wrong. Please try again.");
      return;
    }

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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
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

function CallRequested({ account }) {
  const handleBack = () => {
    if (window.history.length > 2) {
      window.history.back();
    }
  };

  return (
    <div className="text-center">
      <h5 className="font-medium text-xl mb-1">Request sent</h5>
      <p className="text-center mb-8 max-w-[400px] mx-auto">
        Your suggestion has been sent to {account.firstName}. We will let you
        know when they respond.
      </p>
      <Button variant="secondary" onClick={handleBack}>
        {window.history.length <= 2 && <Link to="/" />}
        Okay
      </Button>
    </div>
  );
}

export default function SuggestAlternativeTimes({ account }) {
  const [step, setStep] = useState("AVAILABILITY");
  const params = useParams();

  switch (step) {
    case "AVAILABILITY":
      return (
        <AvailabilityStep
          account={account}
          onSubmit={() => setStep("MESSAGE")}
        />
      );
    case "MESSAGE":
      return (
        <MessageStep
          interviewID={params.interviewID}
          account={account}
          onSubmit={() => setStep("SENT")}
        />
      );
    default:
      return (
        <CallRequested interviewID={params.interviewID} account={account} />
      );
  }
}
