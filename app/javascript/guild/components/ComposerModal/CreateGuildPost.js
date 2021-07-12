import React from "react";
import { Formik, Form, Field } from "formik";
import { PeopleCircle } from "@styled-icons/ionicons-outline/PeopleCircle";
import { HelpBuoy } from "@styled-icons/ionicons-outline/HelpBuoy";
import { BarChart } from "@styled-icons/ionicons-outline/BarChart";
import { DocumentText } from "@styled-icons/ionicons-outline/DocumentText";
import Loader from "components/Loader";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Text, Circle } from "@advisable/donut";
import { CREATE_GUILD_POST } from "./mutations";
import { GUILD_POST_QUERY } from "@guild/views/Post/queries";
import RadioOption from "./RadioOption";
import { PATH_REGEX } from "./useComposerModal";
import { useUpdateGuildPostWriteCache } from "./mutations";

export default function CreateGuildPost({ guildPost }) {
  const history = useHistory();
  const location = useLocation();
  const [updatePost] = useUpdateGuildPostWriteCache();
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
                  as={RadioOption}
                  value="AdviceRequired"
                  aria-label="Looking for advice"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="yellow300"
                    color="blue900"
                    marginBottom="lg"
                  >
                    {formik.isSubmitting &&
                    formik.values.type === "AdviceRequired" ? (
                      <Loader color="blue900" />
                    ) : (
                      <HelpBuoy size={40} />
                    )}
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
                  as={RadioOption}
                  value="Opportunity"
                  aria-label="Opportunity"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="cyan200"
                    color="blue900"
                    marginBottom="lg"
                  >
                    {formik.isSubmitting &&
                    formik.values.type === "Opportunity" ? (
                      <Loader color="blue900" />
                    ) : (
                      <PeopleCircle size={40} />
                    )}
                  </Circle>
                  <Text
                    fontSize="l"
                    letterSpacing="-0.02rem"
                    fontWeight="medium"
                    marginBottom="2xs"
                  >
                    Opportunity
                  </Text>
                  <Text lineHeight="16px" fontSize="xs" color="neutral700">
                    Find another freelancer to work with you on a project
                  </Text>
                </Field>
                <Field
                  name="type"
                  type="radio"
                  as={RadioOption}
                  value="Post"
                  aria-label="Other"
                  onChange={(e) => selectHandler(formik, e)}
                  onClick={(e) => selectHandler(formik, e)}
                >
                  <Circle
                    size={64}
                    bg="blue200"
                    color="blue900"
                    marginBottom="lg"
                  >
                    {formik.isSubmitting && formik.values.type === "Post" ? (
                      <Loader color="blue900" />
                    ) : (
                      <DocumentText size={32} />
                    )}
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
