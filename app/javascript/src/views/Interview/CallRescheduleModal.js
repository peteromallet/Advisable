import React, { useEffect, useMemo, useState } from "react";
import { object, string } from "yup";
import { Formik, Form, Field, useFormikContext } from "formik";
import {
  Modal,
  Label,
  Textarea,
  InputError,
  Select,
  Error,
} from "@advisable/donut";
import DatePicker from "src/components/DatePicker";
import FormField from "src/components/FormField";
import TimezoneSelect from "src/components/AvailabilityForm/TimezoneSelect";
import SubmitButton from "src/components/SubmitButton";
import { DateTime } from "luxon";
import { useRescheduleInterview } from "./queries";
import { useNavigate } from "react-router-dom";

const MINUTES = ["00", "30"];
const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const validationSchema = object().shape({
  comment: string(),
  date: string().required("Please select a date"),
  hour: string().required("Select an hour"),
  minute: string().required("Select minutes"),
});

function HourAndMinuteSelection({ timezone }) {
  const formik = useFormikContext();
  const hours = useMemo(() => {
    const now = DateTime.now().setZone(timezone);
    const startsAt = DateTime.fromISO(formik.values.date, { zone: timezone });
    return HOURS.reduce((collection, hour) => {
      const atHour = startsAt.set({ hour });
      if (atHour <= now) return collection;
      return [...collection, atHour.toFormat("HH")];
    }, []);
  }, [formik, timezone]);

  useEffect(() => {
    const selectedHour = formik.values.hour;
    if (!hours.includes(String(selectedHour))) {
      formik.setFieldValue("hour", hours[0]);
    }
  }, [formik, hours]);

  return (
    <>
      <Field
        as={Select}
        name="hour"
        placeholder="Hour"
        aria-label="Hour picker"
        error={formik.errors.hour}
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </Field>
      <Field
        as={Select}
        name="minute"
        placeholder="Min"
        aria-label="Minute picker"
        error={formik.errors.minute}
      >
        {MINUTES.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </Field>
    </>
  );
}

function getDateFromFormik(values, zone) {
  const { date, hour, minute } = values;
  const [year, month, day] = date.split("-");
  return DateTime.fromObject({ year, day, month, hour, minute }, { zone });
}

function getInitialStartsAt(interview, zone) {
  const now = DateTime.now().setZone(zone);
  if (!interview.startsAt) return now;
  const datetime = DateTime.fromISO(interview.startsAt, { zone });
  return datetime <= now ? now : datetime;
}

export default function CallRescheduleModal({ modal, interview }) {
  const [timezone, setTimezone] = useState(DateTime.local().zoneName || "UTC");
  const now = DateTime.now().setZone(timezone);
  const startsAt = getInitialStartsAt(interview, timezone);
  const [rescheduleInterview] = useRescheduleInterview();
  const navigate = useNavigate();
  const initialValues = {
    date: startsAt.toISODate(),
    hour: startsAt.toFormat("HH"),
    minute: String(startsAt.minute),
    comment: "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const { comment } = values;
    const startsAt = getDateFromFormik(values, timezone).toString();

    const res = await rescheduleInterview({
      variables: {
        input: { interview: interview.id, message: comment, startsAt },
      },
    });

    if (res.errors) {
      setStatus("Something went wront. Please try again.");
      return;
    }
    navigate(`/messages/${interview.conversation?.id}`);
  };

  return (
    <Modal modal={modal} label="Reschedule the call" width={600}>
      <h2 className="mb-1 text-3xl font-semibold tracking-tight text-neutral900">
        Reschedule
      </h2>
      <p className="mb-4 font-neutral900">
        Please provide a new date and time for your call.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Label className="mb-2">Date and time</Label>
            <div className="flex gap-2">
              <div>
                <DatePicker.Input
                  value={formik.values.date}
                  onChange={(d) => formik.setFieldValue("date", d)}
                  placeholder="Date"
                  fromDay={now.toJSDate()}
                  fromMonth={now.toJSDate()}
                  disabledDays={[
                    {
                      from: new Date(now.year, now.month - 1, 0),
                      to: new Date(now.year, now.month - 1, now.day - 1),
                    },
                  ]}
                  className="sm:min-w-[300px]"
                  error={formik.errors.date}
                  aria-label="Date picker"
                />
                <InputError mt="xs">{formik.errors.date}</InputError>
              </div>
              <HourAndMinuteSelection timezone={timezone} />
            </div>
            <div className="pb-5">
              <TimezoneSelect
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </div>
            <FormField
              minRows={8}
              as={Textarea}
              name="comment"
              marginBottom={3}
              placeholder="Include a message"
              label="Comment"
            />
            <Error>{formik.status}</Error>
            <SubmitButton
              disabled={
                getDateFromFormik(formik.values, timezone).toMillis() ===
                startsAt.toMillis()
              }
              className="mt-3"
            >
              Reschedule
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
