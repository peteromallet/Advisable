import React from "react";
import { Formik, Form, Field } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Card, Text, Checkbox } from "@advisable/donut";
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
    remote: data?.viewer?.remote || true,
    hourlyRate: data?.viewer?.hourlyRate / 100.0,
    publicUse: data?.viewer?.publicUse || false,
  };

  const handleSubmit = async (values) => {
    const input = {
      hourlyRate: values.hourlyRate * 100,
      remote: values.remote,
      publicUse: values.publicUse,
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
