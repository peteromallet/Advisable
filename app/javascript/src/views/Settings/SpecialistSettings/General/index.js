import React from "react";
import { Formik, Form, Field } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Card, Text, Checkbox, Select } from "@advisable/donut";
import Loading from "components/Loading";
import FormField from "components/FormField";
import { useNotifications } from "components/Notifications";
import { GET_DATA, UPDATE_PROFILE } from "./queries";
import SubmitButton from "components/SubmitButton";

const Profile = () => {
  const { loading, data } = useQuery(GET_DATA);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const notifications = useNotifications();

  const initialValues = {
    remote: data?.viewer?.remote || true,
    priceRange: data?.viewer?.priceRange || "high",
    publicUse: data?.viewer?.publicUse || false,
    collaborationTypes: data?.viewer?.collaborationTypes || [],
  };

  const handleSubmit = async (values) => {
    const response = await updateProfile({ variables: { input: values } });
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
            <div className="mb-8">
              <h5 className="text-lg font-medium">What type of work are you available for?</h5>
              <p className="mb-2">
                This will be displayed on your profile
              </p>
              <Field
                as={Checkbox}
                type="checkbox"
                name="collaborationTypes" value="hands_on"
                checked={formik.values.collaborationTypes.includes("hands_on")}>
                Hands on work
              </Field>
              <Field
                as={Checkbox}
                type="checkbox"
                name="collaborationTypes" value="consultancy"
                checked={formik.values.collaborationTypes.includes("consultancy")}>
                Consultancy
              </Field>
              <Field
                as={Checkbox}
                type="checkbox"
                name="collaborationTypes" value="mentorship"
                checked={formik.values.collaborationTypes.includes("mentorship")}>
                Mentoring
              </Field>
            </div>
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
              as={Select}
              prefix="$"
              name="priceRange"
              placeholder="Hourly rate"
              label="What is your typical price range?"
              description="This is just to get an idea of your rate. You will be able to set your rate on a per project basis when working with clients on Advisable."
            >
              <option value="low">{"< $75 per hour"}</option>
              <option value="medium">{"$75 - $150 per hour"}</option>
              <option value="high">{"$150 - $300 per hour"}</option>
              <option value="very high">{"> $150 per hour"}</option>
            </FormField>
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
