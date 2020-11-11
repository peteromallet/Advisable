import React from "react";
import { Formik, Form, Field } from "formik";
import {
  PeopleCircle,
  HelpBuoy,
  BarChart,
  DocumentText,
} from "@styled-icons/ionicons-outline";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Text, Circle } from "@advisable/donut";
import { CREATE_GUILD_POST } from "./mutations";
import { GUILD_POST_QUERY } from "@guild/views/Post/queries";
import PostType from "./PostType";
import { PATH_REGEX } from "./useComposerModal";
import { useUpdateGuildPost } from "./mutations";

export default function CreateGuildPost({ guildPost }) {
  const history = useHistory();
  const location = useLocation();
  const [updatePost] = useUpdateGuildPost();
  const [createGuildPost] = useMutation(CREATE_GUILD_POST, {
    update(cache, { data }) {
      const { guildPost } = data?.createGuildPost;
      cache.writeQuery({
        query: GUILD_POST_QUERY,
        variables: { id: guildPost.id },
        data: { guildPost },
      });
    },
  });

  const pathPrefix = location.pathname.replace(PATH_REGEX, "");

  const createOrUpdate = async (values) => {
    if (guildPost) {
      const response = await updatePost({
        variables: {
          input: {
            guildPostId: guildPost.id,
            ...values,
          },
        },
      });
      return response.data?.updateGuildPost.guildPost;
    } else {
      const response = await createGuildPost({
        variables: {
          input: { ...values },
        },
      });
      const guildPost = response.data?.createGuildPost.guildPost;
      history.replace(`${pathPrefix}/composer/${guildPost.id}/type`);
      return guildPost;
    }
  };

  const handleCreateGuildPost = async (values) => {
    const guildPost = await createOrUpdate(values);
    history.push(`${pathPrefix}/composer/${guildPost.id}/post`);
  };

  const initialValues = {
    type: guildPost?.denormalizedType || "",
  };

  const selectHandler = (formik, e) => {
    formik.handleChange(e);
    formik.submitForm();
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Text
          mb="xs"
          fontSize="5xl"
          color="neutral900"
          fontWeight="semibold"
          letterSpacing="-0.03rem"
        >
          Create a new post
        </Text>
        <Text fontSize="l" mb="xl" lineHeight="l" color="neutral800">
          What type of post that this is? This should be the purpose of your
          post.
        </Text>

        <Formik initialValues={initialValues} onSubmit={handleCreateGuildPost}>
          {(formik) => (
            <Form>
              <Box
                display="grid"
                gridGap="24px"
                gridTemplateColumns={{
                  _: "1fr",
                  m: "1fr 1fr",
                  xl: "1fr 1fr 1fr 1fr",
                }}
              >
                <Field
                  name="type"
                  type="radio"
                  as={PostType}
                  value="AdviceRequired"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="blue200"
                    color="blue900"
                    marginBottom="lg"
                  >
                    <HelpBuoy size={40} />
                  </Circle>
                  <Text
                    fontSize="l"
                    letterSpacing="-0.02rem"
                    fontWeight="medium"
                    marginBottom="2xs"
                  >
                    Looking for advice
                  </Text>
                  <Text lineHeight="16px" fontSize="xs" color="neutral700">
                    Ask the guild for advice on something
                  </Text>
                </Field>
                <Field
                  name="type"
                  type="radio"
                  as={PostType}
                  value="Opportunity"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="cyan200"
                    color="blue900"
                    marginBottom="lg"
                  >
                    <PeopleCircle size={40} />
                  </Circle>
                  <Text
                    fontSize="l"
                    letterSpacing="-0.02rem"
                    fontWeight="medium"
                    marginBottom="2xs"
                  >
                    Opportunity for others
                  </Text>
                  <Text lineHeight="16px" fontSize="xs" color="neutral700">
                    Find another freelancer to work with you on a project
                  </Text>
                </Field>
                <Field
                  name="type"
                  type="radio"
                  as={PostType}
                  value="CaseStudy"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="green200"
                    color="blue900"
                    marginBottom="lg"
                  >
                    <BarChart size={32} />
                  </Circle>
                  <Text
                    fontSize="l"
                    letterSpacing="-0.02rem"
                    fontWeight="medium"
                    marginBottom="2xs"
                  >
                    Case study
                  </Text>
                  <Text lineHeight="16px" fontSize="xs" color="neutral700">
                    Share a case study with other Guild members
                  </Text>
                </Field>
                <Field
                  name="type"
                  type="radio"
                  as={PostType}
                  value="Post"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="orange200"
                    color="blue900"
                    marginBottom="lg"
                  >
                    <DocumentText size={32} />
                  </Circle>
                  <Text
                    fontSize="l"
                    letterSpacing="-0.02rem"
                    fontWeight="medium"
                    marginBottom="2xs"
                  >
                    Other
                  </Text>
                  <Text lineHeight="16px" fontSize="xs" color="neutral700">
                    Post a generic post to other Guild members
                  </Text>
                </Field>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
