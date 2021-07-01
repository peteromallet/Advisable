import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ArrowLeft } from "@styled-icons/feather/ArrowLeft";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import { Box, Link, InputError } from "@advisable/donut";
import SubmitButton from "@advisable-main/components/SubmitButton";
import { yourPostValidationSchema } from "./validationSchemas";
import PostTitle from "./PostTitle";
import RichTextEditor from "../RichTextEditor";

const YourPost = ({ guildPost, onSubmit, initialValues = {} }) => {
  const { pathWithState } = useLocationStages();

  const handleSubmit = async (values, actions) => {
    const response = await onSubmit(values);
    if (response?.errors) {
      /*
        This is a fallback in case the yup schema does not have parity w/ the server.
        INVALID_REQUEST response is not keyed by the resepctive attribute name.
      */
      response.errors.forEach(({ message }) => {
        const errorKey = message[0].toLowerCase();
        actions.setFieldError(errorKey, message);
      });
      actions.setSubmitting(false);
    }
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        {guildPost?.id && !guildPost?.postPrompt && (
          <Link
            mb="s"
            fontSize="l"
            fontWeight="medium"
            to={pathWithState(`/composer/${guildPost.id}/type`)}
          >
            <Box display="inline-block" mr="xxs">
              <ArrowLeft size={20} strokeWidth={2} />
            </Box>
            Back
          </Link>
        )}
        <Formik
          validateOnMount
          onSubmit={handleSubmit}
          initialValues={initialValues}
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
              <SubmitButton
                size="l"
                marginY="3xl"
                disableUntilValid
                suffix={<ArrowRight />}
                loading={formik.isSubmitting}
              >
                Continue
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default YourPost;
