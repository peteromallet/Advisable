import { Formik, Form, Field } from "formik";
import Loader from "components/Loader";
import {
  Business,
  ColorFilter,
  Location,
  HelpCircle,
} from "@styled-icons/ionicons-outline";
import React from "react";
import { useUpdateGuildPostWriteCache } from "./mutations";
import useLocationStages from "@advisable-main/hooks/useLocationStages";
import { ArrowLeft } from "@styled-icons/feather";
import { Circle, Box, Text, Link, Paragraph } from "@advisable/donut";
import RadioOption from "./RadioOption";

/*
  Edits the Post Audience type.
    This is necessary to determine the 'type' of guild topicable that can be added in the next step
*/

const TYPES = [
  {
    value: "skills",
    icon: ColorFilter,
    title: "Target by skill",
    description: "Show post to other guild members with particilar skills",
  },
  {
    value: "industries",
    icon: Business,
    title: "Target by industry",
    description: "Show post to other guild members in particular industries",
  },
  {
    value: "locations",
    icon: Location,
    title: "Location",
    description: "Target other Guild members by location",
  },
  {
    value: "none",
    icon: HelpCircle,
    title: "Not Sure",
    description: "Not sure how to target this post",
  },
];

export default function EditAudience({ guildPost }) {
  const { navigate, pathWithState } = useLocationStages();
  const [updateGuildPost] = useUpdateGuildPostWriteCache();
  const nextPath = `/composer/${guildPost.id}/targeting`;

  const initialValues = {
    audienceType: guildPost.audienceType || "",
  };

  const handleSubmit = async (values) => {
    await updateGuildPost({
      variables: {
        input: {
          guildPostId: guildPost.id,
          ...values,
        },
      },
    });

    navigate(nextPath);
  };

  const handleChange = (formik, e) => {
    formik.setFieldValue(e.target.name, e.target.value);
    formik.submitForm();
  };

  const handleClick = (formik, e) => {
    if (formik.values[e.target.name] === e.target.value) {
      navigate(nextPath);
    }
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Link
          mb="s"
          fontSize="l"
          fontWeight="medium"
          to={pathWithState(`/composer/${guildPost.id}/images`)}
        >
          <Box display="inline-block" mr="xxs">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          Back
        </Link>
        <Text
          mb="xs"
          fontSize="5xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.03rem"
        >
          Post targeting
        </Text>
        <Paragraph size="lg" mb="l">
          What kind of audience would you like to reach with this post - we’ll
          make sure it reaches the right people.
        </Paragraph>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                {TYPES.map((type) => (
                  <Field
                    name="audienceType"
                    type="radio"
                    as={RadioOption}
                    key={type.value}
                    value={type.value}
                    onChange={(e) => handleChange(formik, e)}
                    onClick={(e) => handleClick(formik, e)}
                  >
                    <Circle
                      size={64}
                      bg="white"
                      color="blue900"
                      marginBottom="lg"
                    >
                      {formik.isSubmitting &&
                      formik.values.audienceType === type.value ? (
                        <Loader color="blue900" />
                      ) : (
                        <type.icon size={32} />
                      )}
                    </Circle>
                    <Text
                      fontSize="l"
                      letterSpacing="-0.02rem"
                      fontWeight="medium"
                      marginBottom="2xs"
                    >
                      {type.title}
                    </Text>
                    <Text lineHeight="16px" fontSize="xs" color="neutral700">
                      {type.description}
                    </Text>
                  </Field>
                ))}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
