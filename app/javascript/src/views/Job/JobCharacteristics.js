import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ArrowRight } from "@styled-icons/feather";
import { Formik, Form, Field } from "formik";
import { Text, Error } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import BulletPointInput from "components/BulletPointInput";
import { UPDATE_PROJECT } from "./queries";

export default function JobCharacteristics({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    characteristics: data.project.characteristics,
  };

  const handleSubmit = async (values, formik) => {
    const response = await updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    if (response.errors) {
      formik.setStatus("Failed to update characteristics, please try again.");
    } else {
      history.push(`/jobs/${id}/location`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Text
            mb="xs"
            color="blue900"
            fontSize="30px"
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            What character traits are you looking for?
          </Text>
          <Text color="neutral800" lineHeight="22px" mb="m">
            Use charateristics to describe the ideal freelancer. We will use
            these to find people who not only have the right skillset but are
            also a right fit.
          </Text>
          <Field
            name="characteristics"
            as={BulletPointInput}
            marginBottom="l"
            placeholder="e.g Strong communication skills"
            onChange={(items) => formik.setFieldValue("characteristics", items)}
          />
          <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}
