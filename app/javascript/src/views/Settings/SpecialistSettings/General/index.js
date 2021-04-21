import React from "react";
import { sortBy } from "lodash-es";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Card,
  Text,
  Link,
  InputError,
  Autocomplete,
  Checkbox,
} from "@advisable/donut";
import Loading from "components/Loading";
import FormField from "components/FormField";
import CurrencyInput from "components/CurrencyInput";
import { useNotifications } from "components/Notifications";
import { GET_DATA, UPDATE_PROFILE } from "./queries";
import SubmitButton from "components/SubmitButton";

const Profile = () => {
  const { loading, data } = useQuery(GET_DATA);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const notifications = useNotifications();

  const initialValues = {
    email: data?.viewer?.email || "",
    firstName: data?.viewer?.firstName || "",
    lastName: data?.viewer?.lastName || "",
    remote: data?.viewer?.remote || true,
    hourlyRate: data?.viewer?.hourlyRate / 100.0,
    publicUse: data?.viewer?.publicUse || false,
    skills: (data?.viewer?.skills || []).map((s) => s.name),
  };

  const handleSubmit = async (values) => {
    const input = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      hourlyRate: values.hourlyRate * 100,
      remote: values.remote,
      publicUse: values.publicUse,
      skills: values.skills,
    };
    const response = await updateProfile({ variables: { input } });
    if (response.errors) {
      notifications.notify("Something went wrong, please try again", {
        variant: "error",
      });
    } else {
      notifications.notify("Your profile has been updated");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <Form>
          <Card padding="l" borderRadius={8}>
            <Text
              size="xxl"
              color="neutral900"
              as="h2"
              weight="semibold"
              mb="l"
            >
              General Settings
            </Text>
            <Box display="flex">
              <Box width="50%" paddingRight="xs">
                <FormField name="firstName" label="First Name" />
              </Box>
              <Box width="50%" paddingLeft="xs">
                <FormField name="lastName" label="Last Name" />
              </Box>
            </Box>
            <Box height={1} bg="neutral100" my="l" />
            <FormField name="email" label="Email" />
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              multiple
              max={10}
              name="skills"
              as={Autocomplete}
              description="Add up to 10 skill’s that you have used in previously completed projects."
              label="What type of projects are you looking for?"
              placeholder="e.g Online Marketing"
              options={sortBy(data.skills, ["label"])}
              onChange={(skills) => {
                formik.setFieldTouched("skills", true);
                formik.setFieldValue("skills", skills);
              }}
            />
            <ErrorMessage mt="xs" name="skills" component={InputError} />
            {formik.values.skills.length >= 10 && (
              <Text mt="m" size="s" lineHeight="s">
                You can&apos;t add more than 10 primary skills. If you want to
                add more skills to your profile, you can do so by{" "}
                <Link to="/profile">adding a previous project.</Link>
              </Text>
            )}
            <Box height={1} bg="neutral100" my="l" />
            <Box paddingBottom="xs">
              <Text fontWeight="medium" color="neutral800">
                Are you happy to work remotely?
              </Text>
            </Box>
            <Box paddingBottom="xs">
              <Checkbox
                name="remote"
                checked={formik.values.remote}
                onChange={() => {
                  formik.setFieldValue("remote", true);
                }}
              >
                Yes, I’m happy to work remote
              </Checkbox>
            </Box>
            <Box>
              <Checkbox
                name="remote"
                checked={formik.values.remote === false}
                onChange={() => {
                  formik.setFieldValue("remote", false);
                }}
              >
                No, I only work with clients in person
              </Checkbox>
            </Box>
            <Box height={1} bg="neutral100" my="l" />
            <FormField
              as={CurrencyInput}
              prefix="$"
              name="hourlyRate"
              placeholder="Hourly rate"
              label="What is your typical hourly rate in USD?"
              description="This is just to get an idea of your rate. You will be able to set your rate on a per project basis when working with clients on Advisable."
            />
            <Box height={1} bg="neutral100" my="l" />
            <Box mb="l">
              <Field as={Checkbox} type="checkbox" name="publicUse">
                I’m okay with Advisable using my profile to promote me publicly
                on advisable.com
              </Field>
            </Box>
            <SubmitButton>Save Changes</SubmitButton>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
