import React from "react";
import { Modal, Box, Text, Textarea, Select } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import { Form, Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import FETCH_COUNTRIES from "./fetchCountries.graphql";
import { updateProfileOptimisticResponse, UPDATE_PROFILE } from "../../queries";
import { get } from "lodash-es";
import { object, string } from "yup";

const validationSchema = object().shape({
  city: string(),
  country: string(),
  bio: string(),
  linkedin: string().url(),
  website: string().url(),
});

function EditInfoModal({ modal, specialist }) {
  const [mutate] = useMutation(UPDATE_PROFILE);
  const initialValues = {
    city: specialist.city || "",
    country: get(specialist, "country.id"),
    bio: specialist.bio || "",
    linkedin: specialist.linkedin || "",
    website: specialist.website || "",
  };
  const handleSubmit = (values) => {
    const mutateValues = { ...values, linkedin: values.linkedin || null };
    const optimisticResponse = updateProfileOptimisticResponse(
      specialist,
      mutateValues,
    );
    mutate({
      variables: { input: { ...mutateValues } },
      optimisticResponse,
    });
    modal.hide();
  };
  const countriesQuery = useQuery(FETCH_COUNTRIES);
  console.log("countries query", countriesQuery);
  return (
    <Modal modal={modal} p="xxl" label="Edit profile info" width={640}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <Text
              as="h2"
              fontSize="xxxl"
              fontWeight="medium"
              color="neutral900"
              mb="l"
            >
              Edit profile info
            </Text>
            <Box display="flex" mb="l">
              <Box mr="s" width="100%">
                <FormField
                  name="city"
                  label="City"
                  width="100%"
                  placeholder="e.g Berlin"
                />
              </Box>
              <Box width="100%">
                <FormField as={Select} name="country" label="Country">
                  {countriesQuery.data.countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </FormField>
              </Box>
            </Box>
            <Box mb="l">
              <FormField
                as={Textarea}
                name="bio"
                minRows={5}
                label="About me"
                description="Add a short 2 - 3 sectence bio to describe who you are."
                placeholder="Add a short 2 - 3 sectence bio to describe who you are."
                caption="A well structured bio demonstrates your experience and expertise by referencing past projects and achievements, including notable clients or numeric results. You will have a chance to customize this each time you apply for a project."
              />
            </Box>
            <Box mb="l">
              <FormField
                name="linkedin"
                label="LinkedIn"
                placeholder="https://linkedin.com/in/your-name"
                error={null}
              />
            </Box>
            <Box mb="xl">
              <FormField
                name="website"
                label="Website"
                placeholder="https://your-website.com"
                error={null}
              />
            </Box>
            <SubmitButton>Update</SubmitButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default EditInfoModal;
