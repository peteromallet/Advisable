import React, { useState } from "react";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
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

const getHoursList = (from) => {
  return Array(24 - from)
    .fill(0)
    .map((_, i) => {
      let hour = from + i;
      let string = hour.toString();
      string = string.length === 2 ? string : "0" + string;
      return { value: string, label: string };
    });
};

const MINUTES = Array(6)
  .fill(0)
  .map((_, i) => ({ value: `${i}0`, label: `${i}0` }));

const validationSchema = object().shape({
  comment: string(),
  date: string().required("Please select a date"),
  hour: string().required("Select an hour"),
  minutes: string().required("Select minutes"),
});

export default function CallRescheduleModal({ modal, interview }) {
  const [timezone, setTimezone] = useState(DateTime.local().zoneName || "UTC");
  const now = DateTime.now().setZone(timezone);
  const currentDate = new Date(now.year, now.month - 1, now.day);
  const [hoursList, setHoursList] = useState(getHoursList(0));
  const [rescheduleInterview] = useRescheduleInterview();
  const navigate = useNavigate();
  const initialValues = {
    date: "",
    hour: "",
    minutes: "",
    comment: "",
  };

  const setDate = (formik) => (pickedDate) => {
    formik.setFieldValue("date", pickedDate);
    const pickedDay = Number(pickedDate.split("-")[2]);
    const pickedHour = Number(formik.values.hour?.value);
    const pickedDayIsToday = pickedDay === now.day;
    const pickedHourIsPast = pickedDayIsToday && pickedHour <= now.hour;
    if (pickedHourIsPast) {
      formik.setFieldValue("hour", "");
      setHoursList(getHoursList(now.hour + 1));
    } else if (!pickedHourIsPast && pickedDayIsToday) {
      setHoursList(getHoursList(now.hour + 1));
    } else {
      hoursList.length < 24 && setHoursList(getHoursList(0));
    }
  };

  const changeTimezone = (formik) => (event) => {
    formik.setFieldValue("date", "");
    formik.setFieldValue("hour", "");
    formik.setFieldValue("minute", "");
    setTimezone(event.target.value);
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const [year, month, day] = values.date.split("-");
    const startsAt = DateTime.fromObject(
      {
        year,
        day,
        month,
        hour: values.hour,
        minute: values.minutes,
      },
      { zone: timezone },
    ).toString();
    const res = await rescheduleInterview({
      variables: {
        input: { interview: interview.id, message: values.comment, startsAt },
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
                  onChange={setDate(formik)}
                  placeholder="Date"
                  fromDay={currentDate}
                  fromMonth={currentDate}
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
              <Field
                as={Select}
                name="hour"
                placeholder="Hour"
                aria-label="Hour picker"
              >
                {hoursList.map((hour) => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </Field>
              <Field
                as={Select}
                name="minutes"
                placeholder="Min"
                aria-label="Minutes picker"
              >
                {MINUTES.map((minute) => (
                  <option key={minute.value} value={minute.value}>
                    {minute.label}
                  </option>
                ))}
              </Field>
            </div>
            <div className="pb-5">
              <TimezoneSelect
                value={timezone}
                onChange={changeTimezone(formik)}
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
            <SubmitButton className="mt-3">Reschedule</SubmitButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
