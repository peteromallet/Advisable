import React from "react";
import { Formik, Form, Field } from "formik";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import { Box, Link } from "@advisable/donut";
import SubmitButton from "@advisable-main/components/SubmitButton";
import { yourPostValidationSchema } from "./validationSchemas";
import PostTitle from "./PostTitle";
import RichTextEditor from "../RichTextEditor";

const YourPost = ({ guildPost, onSubmit, initialValues = {} }) => {
  const { pathWithState } = useLocationStages();

  const yourPostInitialValues = {
    title: "",
    body: "",
    ...initialValues,
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
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
        <Formik
          validateOnMount
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
              <SubmitButton
                size="l"
                marginY="3xl"
                disableUntilValid
                suffix={<ArrowRight />}
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
