import React, { createElement } from "react";
import { Formik, Form } from "formik";
import { ArrowRight } from "@styled-icons/feather";
import { Stack, Box, Text } from "@advisable/donut";
import FormField from "@advisable-main/components/FormField";
import SubmitButton from "@advisable-main/components/SubmitButton";
import { yourPostValidationSchema } from "./validationSchemas";
import { Question, Feedback, Group, BookOpen } from "@guild/icons";
import { ComposerBoxOption } from "./styles";
import { GuildBox } from "@guild/styles";
import RichTextEditor from "../RichTextEditor";

const YourPost = ({ onSubmit, initialValues = {} }) => {
  const yourPostInitialValues = {
    title: "",
    body: "",
    type: "Post",
    ...initialValues,
  };

  const postTypes = [
    {
      type: "AdviceRequired",
      desc: "Request For Advice",
      icon: Feedback,
    },
    {
      type: "Opportunity",
      desc: "Opportunity For Others",
      icon: Group,
    },
    {
      type: "CaseStudy",
      desc: "Case Study To Share",
      icon: BookOpen,
    },
    {
      type: "Post",
      desc: "Not Sure",
      icon: Question,
    },
  ];

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Your Post
        </Text>
        <Text mb="xl" lineHeight="l" color="neutral600">
          Please add a title, type, and body for your post - this is what people
          will see when they see your post!
        </Text>
        <Formik
          onSubmit={onSubmit}
          initialValues={yourPostInitialValues}
          validationSchema={yourPostValidationSchema}
        >
          {(formik) => (
            <Form>
              <Stack spacing="2xl" mb="xl">
                <Box as={Stack} spacing={"xl"}>
                  <FormField
                    label="What's the title of your post?"
                    name="title"
                    placeholder="Add a title..."
                    autoComplete="off"
                  />
                  <RichTextEditor
                    value={formik.values.body}
                    onChange={(raw) => formik.setFieldValue("body", raw)}
                  />

                  <Text fontSize="m" fontWeight="medium" color="nuetral800">
                    Please add the type of post that this is - this should be
                    the purpose of your post.
                  </Text>
                  <GuildBox flexWrap="wrap" wrapChildrenBoth={16}>
                    {postTypes.map(({ type, desc, icon }, key) => (
                      <ComposerBoxOption
                        key={key}
                        spacing="2xl"
                        selected={type === formik.values.type}
                        onClick={() => {
                          formik.setFieldValue("type", type);
                        }}
                      >
                        <GuildBox
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          spaceChildrenVertical={16}
                        >
                          {createElement(icon, { size: 24 })}
                          <Text>{desc}</Text>
                        </GuildBox>
                      </ComposerBoxOption>
                    ))}
                  </GuildBox>
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
