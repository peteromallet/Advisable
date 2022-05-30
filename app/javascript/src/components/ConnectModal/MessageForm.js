import React from "react";
import { Form, Formik, Field } from "formik";
import { Textarea } from "@advisable/donut";
import { CheckCircle } from "@styled-icons/heroicons-solid";
import SubmitButton from "../SubmitButton";
import { object, string } from "yup";

const validationSchema = object({
  message: string().required("Please include a message"),
});

function ListItem({ children }) {
  return (
    <li className="flex gap-2">
      <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-blue700" />
      <p className="font-inter text-neutral700">{children}</p>
    </li>
  );
}

export default function MessageForm({
  specialist,
  onSubmit,
  placeholder,
  buttonLabel,
}) {
  const initialValues = { message: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      <Form>
        <div className="mb-6">
          <Field
            autoFocus
            minRows={6}
            as={Textarea}
            name="message"
            showError={false}
            placeholder={placeholder}
          />
        </div>
        <h4 className="font-medium text-lg tracking-tight mb-2">
          How to get a reply from {specialist.firstName}
        </h4>
        <ul className="space-y-2 mb-8">
          <ListItem>Explain why you’re reaching out to them.</ListItem>
          <ListItem>Describe how you envision collaborating.</ListItem>
          <ListItem>Be nice, friendly and professional!</ListItem>
        </ul>
        <SubmitButton size="l" className="w-full" disableUntilValid>
          {buttonLabel}
        </SubmitButton>
      </Form>
    </Formik>
  );
}
