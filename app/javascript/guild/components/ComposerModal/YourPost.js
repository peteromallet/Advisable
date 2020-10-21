import React from "react";
import { Formik, Form } from "formik";
import { ArrowRight } from "@styled-icons/feather";
import { Stack, Box, Text, Textarea } from "@advisable/donut";
import FormField from "@advisable-main/components/FormField";
import SubmitButton from "@advisable-main/components/SubmitButton";
import { yourPostValidationSchema } from "./validationSchemas";

const YourPost = ({ onSubmit, initialValues = {} }) => {
  const yourPostInitialValues = {
    title: "",
    body: "",
    ...initialValues,
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Your Post
        </Text>
        <Text mb="xl" lineHeight="l" color="neutral600">
          Please add a title and body for your post - this is what people will
          see when they see your post!
        </Text>
        <Formik
          onSubmit={onSubmit}
          initialValues={yourPostInitialValues}
          validationSchema={yourPostValidationSchema}
        >
          {() => (
            <Form>
              <Stack spacing="2xl" mb="xl">
                <Box as={Stack} spacing={"xl"}>
                  <FormField
                    label="What's the title of your post?"
                    name="title"
                    placeholder="Add a title..."
                    autoComplete="off"
                  />
                  <FormField
                    as={Textarea}
                    size={"lg"}
                    minRows={12}
                    maxRows={20}
                    label="What's the body of this post?"
                    name="body"
                    placeholder="Add text here..."
                    autoComplete="off"
                  />
                </Box>
              </Stack>
              <SubmitButton size="l" suffix={<ArrowRight />}>
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
