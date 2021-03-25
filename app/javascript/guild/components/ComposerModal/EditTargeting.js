import React from "react";
import { useUpdateGuildPostWriteCache } from "./mutations";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import useProgressSteps from "./useProgressSteps";
import { ArrowLeft } from "@styled-icons/feather/ArrowLeft";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Plus } from "@styled-icons/heroicons-outline/Plus";
import { Formik, Form, ErrorMessage } from "formik";
import pluralize from "pluralize";
import { StyledTopicable } from "./styles";
import {
  Box,
  Text,
  Label,
  Link,
  InputError,
  Button,
  Stack,
} from "@advisable/donut";
import Autocomplete from "@advisable/donut/components/Combobox";
import { GuildBox } from "@guild/styles";
import indefinite from "indefinite";

export default function EditTargeting({ guildPost, selectDataQuery }) {
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const { pathWithState } = useLocationStages();
  const { progress } = useProgressSteps();
  const nextPath = `/composer/${guildPost.id}/review`;

  const handleSubmit = async ({ guildTopicNames }) => {
    await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          labels: guildTopicNames.map((gt) => gt.label),
        },
      },
    });

    progress("EDIT_TARGETING", nextPath);
  };

  const handleAddSuggested = (suggested, formik) => {
    const prev = formik.values.guildTopicNames || [];
    formik.setFieldValue("guildTopicNames", [...prev, suggested]);
  };

  const guildTopicNames = guildPost?.guildTopics.map((gt) => ({
    label: gt.name,
    value: gt.name,
  }));

  /*
    Setup formik guildTopic options based on the audienceType
  */
  const topicables =
    selectDataQuery?.data[
      guildPost?.audienceType === "locations"
        ? "countries"
        : guildPost?.audienceType === "other"
        ? "otherLabels"
        : guildPost?.audienceType
    ];

  /*
    Suggested topics for audienceType
  */
  const suggestedTopicables =
    guildPost?.audienceType === "skills"
      ? selectDataQuery.data.popularSkills.nodes
      : guildPost?.audienceType === "industries"
      ? selectDataQuery.data?.industries.slice(0, 10)
      : guildPost?.audienceType === "other"
      ? selectDataQuery.data?.otherLabels.slice(0, 10)
      : selectDataQuery.data?.popularGuildCountries;

  const searchPlaceholder = `Search for ${indefinite(
    guildPost.audienceType === "other"
      ? "topic or create one"
      : pluralize.singular(guildPost.audienceType),
  )}`;

  const normalizedAudienceType =
    guildPost.audienceType === "other"
      ? "other topics"
      : guildPost.audienceType;

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
                What {normalizedAudienceType} would you like to target ?
              </Text>

              <GuildBox spaceChildrenVertical={24}>
                <Label lineHeight="20px" size="l" fontWeight="light" mb="s">
                  What specific {normalizedAudienceType} would you like to
                  target - please select up to 5 and we’ll make sure these
                  people see your post.
                  {guildPost.audienceType === "other" &&
                    " You can optionally create a new topic."}
                </Label>
                <Autocomplete
                  multiple
                  size="md"
                  creatable={guildPost.audienceType === "other"}
                  max={5}
                  error={null}
                  name="guildTopicNames"
                  options={topicables}
                  placeholder={searchPlaceholder}
                  value={formik.values.guildTopicNames}
                  onChange={(guildTopicNames) => {
                    formik.setFieldValue("guildTopicNames", guildTopicNames);
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
                  <Box marginTop="2xl">
                    <Text
                      marginBottom="12px"
                      size="l"
                      color="blue900"
                      fontWeight="semibold"
                    >
                      Some common {normalizedAudienceType}
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
                          (st) =>
                            !formik.values.guildTopicNames.find(
                              (existing) => existing.label === st.label,
                            ),
                        )
                        .map((suggested, key) => (
                          <StyledTopicable
                            selectable
                            type="button"
                            disabled={formik.values.guildTopicNames.length > 4}
                            onClick={() =>
                              handleAddSuggested(suggested, formik)
                            }
                            key={key}
                          >
                            <Plus size={16} color="#2B2D5F" strokeWidth={2} />
                            <Text size="xs" color="#2B2D5F">
                              {suggested.label}
                            </Text>
                          </StyledTopicable>
                        ))}
                    </GuildBox>
                  </Box>
                )}
                <Button
                  marginTop={"xs"}
                  size="l"
                  type="submit"
                  loading={formik.isSubmitting}
                  suffix={<ArrowRight />}
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
