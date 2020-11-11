import React from "react";
import { Formik, Form, Field } from "formik";
import { ArrowRight } from "@styled-icons/feather";
import { Box } from "@advisable/donut";
import SubmitButton from "@advisable-main/components/SubmitButton";
import { yourPostValidationSchema } from "./validationSchemas";
import PostTitle from "./PostTitle";
import RichTextEditor from "../RichTextEditor";

const YourPost = ({ onSubmit, initialValues = {} }) => {
  const yourPostInitialValues = {
    title: "",
    body: "",
    ...initialValues,
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Formik
          onSubmit={onSubmit}
          initialValues={yourPostInitialValues}
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
              <Box height="1px" bg="neutral100" marginY="xl" />
              <RichTextEditor
                value={formik.values.body}
                onChange={(raw) => formik.setFieldValue("body", raw)}
              />
              <SubmitButton marginY="3xl" size="l" suffix={<ArrowRight />}>
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
