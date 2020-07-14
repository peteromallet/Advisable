import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import { Text } from "@advisable/donut";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";

export default function JobLocation({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    location: "",
  };

  const handleSubmit = (values, formik) => {
    updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    history.push(`/jobs/${id}/characteristics`);
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("location", val);
    formik.submitForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Text
            mb="xs"
            color="blue900"
            fontSize="32px"
            fontWeight="semibold"
            letterSpacing="-0.04em"
          >
            How important is it that they are in{" "}
            {data.project.user.country?.name}?
          </Text>
          <Text color="neutral800" lineHeight="22px" mb="l">
            Do you need this freelancer to spend any time on site or can they
            complete their work remotely?
          </Text>
          <Field
            name="location"
            as={RangeSelection}
            onChange={handleSelection(formik)}
          />
        </Form>
      )}
    </Formik>
  );
}
