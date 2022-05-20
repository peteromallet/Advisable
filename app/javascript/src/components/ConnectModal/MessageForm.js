import React from "react";
import { Form, Formik, Field } from "formik";
import { Textarea } from "@advisable/donut";
import { CheckCircle } from "@styled-icons/heroicons-solid";
import SubmitButton from "../SubmitButton";

function ListItem({ children }) {
  return (
    <li className="flex gap-2">
      <CheckCircle className="w-4 h-4 mt-1" />
      <p>{children}</p>
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <div className="mb-4">
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
        <ul className="space-y-2 mb-6">
          <ListItem>
            Explain why you’re excited about potentially working together.
          </ListItem>
          <ListItem>Describe how you envision collaborating.</ListItem>
          <ListItem>Be nice, friendly and professional!</ListItem>
        </ul>
        <SubmitButton size="l" className="w-full">
          {buttonLabel}
        </SubmitButton>
      </Form>
    </Formik>
  );
}
