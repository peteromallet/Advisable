import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Text, Box, InputError } from "@advisable/donut";
import SubmitButton from "@advisable-main/components/SubmitButton";
import { yourPostValidationSchema } from "./validationSchemas";
import PostTitle from "./PostTitle";
import RichTextEditor from "src/components/RichTextEditor";
import TargetDropdown from "./TargetDropdown";

export default function CollaborationRequestForm({
  initialValues,
  onSubmit,
  buttonLabel = "Publish",
}) {
  const formInitialValues = {
    title: initialValues?.title || "",
    body: initialValues?.body || "",
    labels: initialValues?.labels || [],
  };

  return (
    <>
      <Formik
        validateOnMount
        onSubmit={onSubmit}
        initialValues={formInitialValues}
        validationSchema={yourPostValidationSchema}
      >
        {(formik) => (
          <Form>
            <Field
              name="title"
              as={PostTitle}
              autoComplete="off"
              placeholder="Post title"
              autoFocus
            />
            <ErrorMessage component={InputError} name="title" mt="2" />
            <Box
              height="4px"
              borderTop="1px solid"
              borderColor="neutral100"
              marginY={8}
            />
            <RichTextEditor
              value={formik.values.body}
              onBlur={() => {
                formik.setFieldTouched("body", true);
              }}
              onChange={(raw) => {
                formik.setFieldValue("body", raw);
              }}
            />
            <ErrorMessage component={InputError} name="body" mt="2" />
            <Box height="1px" bg="neutral100" marginY={12} />
            <Text
              fontSize="18px"
              fontWeight={600}
              marginBottom={1}
              letterSpacing="-0.02rem"
            >
              Who would you like to reach with this post?
            </Text>
            <Text fontWeight={420} lineHeight="24px" marginBottom={6}>
              Let us know who you are trying to reach with this post and we will
              make sure it gets to the right people. You can add up to 5 tags.
            </Text>
            <TargetDropdown />
            <SubmitButton
              size="l"
              marginY="3xl"
              disableUntilValid
              variant="gradient"
              loading={formik.isSubmitting}
            >
              {buttonLabel}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}
