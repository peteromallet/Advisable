import React from "react";
import { useUpdateGuildPostWriteCache } from "./mutations";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import useProgressSteps from "./useProgressSteps";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Plus } from "@styled-icons/heroicons-outline";
import { Formik, Form, ErrorMessage } from "formik";
import { capitalize } from "@guild/utils";
import pluralize from "pluralize";
import { StyledTopicable } from "./styles";

import {
  Box,
  Text,
  Label,
  Link,
  InputError,
  Autocomplete,
  Button,
  Stack,
} from "@advisable/donut";
import { GuildBox } from "@guild/styles";

export default function EditTargeting({ guildPost, selectDataQuery }) {
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const { pathWithState } = useLocationStages();
  const { progress } = useProgressSteps();
  const nextPath = `/composer/${guildPost.id}/review`;

  const handleSubmit = async (values) => {
    await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          ...values,
        },
      },
    });
  };

  const handleAddSuggested = (suggested, formik) => {
    const prev = formik.values.guildTopicNames || [];
    formik.setFieldValue("guildTopicNames", [...prev, suggested]);
    formik.submitForm();
  };

  const guildTopicNames = guildPost?.guildTopics.map((gt) => gt.name);

  /*
    Setup formik guildTopic options based on the audienceType
  */
  const topicables =
    selectDataQuery?.data[
      guildPost?.audienceType === "locations"
        ? "countries"
        : guildPost?.audienceType
    ];

  /*
    Suggested topics for audienceType
  */
  const suggestedTopicables = (guildPost?.audienceType === "skills"
    ? selectDataQuery.data.popularSkills.nodes
    : guildPost?.audienceType === "industries"
    ? selectDataQuery.data?.industries.slice(0, 10)
    : selectDataQuery.data?.popularGuildCountries
  ).map((s) => s.label);

  const singularAudience = capitalize(
    pluralize.singular(guildPost.audienceType),
  );

  const onContinue = () => {
    progress("EDIT_TARGETING", nextPath);
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Formik initialValues={{ guildTopicNames }} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Link
                mb="s"
                fontSize="l"
                fontWeight="medium"
                to={pathWithState(`/composer/${guildPost.id}/audience`)}
              >
                <Box display="inline-block" mr="xxs">
                  <ArrowLeft size={20} strokeWidth={2} />
                </Box>
                Back
              </Link>

              <Text
                mb="xs"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
              >
                What {guildPost.audienceType} would you like to target ?
              </Text>

              <GuildBox spaceChildrenVertical={24}>
                <Label lineHeight="20px" size="l" fontWeight="light" mb="s">
                  What specific {guildPost.audienceType} would you like to
                  target - please select up to 5 and we’ll make sure these
                  people see your post.
                </Label>

                <Autocomplete
                  multiple
                  max={5}
                  error={null}
                  name="guildTopicNames"
                  options={topicables}
                  placeholder={`Search for a ${singularAudience}`}
                  value={formik.values.guildTopicNames}
                  onChange={(guildTopicNames) => {
                    formik.setFieldValue("guildTopicNames", guildTopicNames);
                    formik.submitForm();
                  }}
                />
                <ErrorMessage
                  mt="xs"
                  name="guildTopicNames"
                  component={InputError}
                />
              </GuildBox>

              <Stack spacing="2xl">
                {guildPost.audienceType !== "none" && (
                  <GuildBox marginTop="2xl">
                    <Text
                      marginBottom="12px"
                      size="l"
                      color="blue900"
                      fontWeight="semibold"
                    >
                      Some common {guildPost.audienceType}
                    </Text>
                    <GuildBox
                      width="100%"
                      display="flex"
                      flexWrap="wrap"
                      wrapChildrenBoth={8}
                    >
                      {/* Filter suggestions that have already been selected */}
                      {suggestedTopicables
                        .filter(
                          (t) => !formik.values.guildTopicNames.includes(t),
                        )
                        .map((name, key) => (
                          <StyledTopicable
                            selectable
                            disabled={formik.values.guildTopicNames.length > 4}
                            onClick={() => handleAddSuggested(name, formik)}
                            key={key}
                          >
                            <Plus size={16} color="#2B2D5F" strokeWidth={2} />
                            <Text size="s" color="#2B2D5F">
                              {name}
                            </Text>
                          </StyledTopicable>
                        ))}
                    </GuildBox>
                  </GuildBox>
                )}
                <Button
                  marginTop={"xs"}
                  size="l"
                  type="submit"
                  loading={formik.isSubmitting}
                  suffix={<ArrowRight />}
                  onClick={onContinue}
                  disabled={
                    formik.isSubmitting || !formik.values.guildTopicNames.length
                  }
                >
                  Continue
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
