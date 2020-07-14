import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ArrowRight } from "@styled-icons/feather";
import { Formik, Form, Field } from "formik";
import { Box, Text, Autocomplete, Error, Input } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import MultipleSelect from "components/MultipleSelect";
import PopularSkills from "./PopularSkills";
import { UPDATE_PROJECT } from "./queries";

export default function JobSkills({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    test: "",
    skills: data.project.skills.map((s) => s.name),
  };

  const handleSubmit = async (values, formik) => {
    const response = await updateProject({
      variables: {
        input: {
          id,
          skills: values.skills,
        },
      },
    });

    if (response.errors) {
      formik.setStatus("Failed to save skills, please try again.");
    } else {
      history.push(`/jobs/${id}/location`);
    }
  };

  const skillOptions = React.useMemo(() => {
    return data.skills.map((skill) => ({
      label: skill.name,
      value: skill.name,
    }));
  }, [data.skills]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Text
            mb="xs"
            color="blue900"
            fontSize="30px"
            fontWeight="semibold"
            letterSpacing="-0.03em"
          >
            What skills are you looking for?
          </Text>
          <Text color="neutral800" lineHeight="22px" mb="m">
            Start by letting us know what kind of freelancer you are looking
            for? Please select up to 5 skills that you are looking for.
          </Text>
          <Field
            max={5}
            multiple
            name="skills"
            marginBottom="l"
            as={Autocomplete}
            options={skillOptions}
            placeholder="e.g Facebook Advertising"
            onChange={(skills) => formik.setFieldValue("skills", skills)}
          />
          <Box mb="l">
            <Text
              mb="s"
              color="blue900"
              fontWeight="medium"
              letterSpacing="-0.02rem"
            >
              Popular skills for finance startups
            </Text>
            <PopularSkills skills={data.popularSkills.nodes} />
          </Box>
          <SubmitButton
            disabled={formik.values.skills.length === 0}
            suffix={<ArrowRight />}
          >
            Continue
          </SubmitButton>
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}
