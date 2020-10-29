// Renders the view for updating a freelancer location in their profile
// settings
import * as React from "react";
import { Formik, Form } from "formik";
import { get } from "lodash-es";
import { Box, Card, Button, Select, Checkbox } from "@advisable/donut";
import { useQuery, useMutation } from "@apollo/client";
import Text from "../../../components/Text";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";
import FormField from "../../../components/FormField";
import { useNotifications } from "../../../components/Notifications";
import FETCH_PROFILE from "../fetchProfile.graphql";
import UPDATE_PROFILE from "../updateProfile";
import FETCH_COUNTRIES from "./fetchCountries.graphql";

let Location = () => {
  const notifications = useNotifications();
  const [mutate] = useMutation(UPDATE_PROFILE);
  const profileQuery = useQuery(FETCH_PROFILE);
  const countriesQuery = useQuery(FETCH_COUNTRIES);

  if (profileQuery.loading || countriesQuery.loading) return <Loading />;

  const handleSubmit = async (values, formikBag) => {
    const { errors } = await mutate({
      variables: {
        input: values,
      },
    });

    formikBag.setSubmitting(false);

    if (!errors) {
      notifications.notify("Your profile has been updated");
    } else {
      notifications.notify(
        "It looks like something went wrong, please try again",
        {
          variant: "error",
        },
      );
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        city: profileQuery.data.viewer.city,
        remote: profileQuery.data.viewer.remote,
        country: get(profileQuery.data.viewer, "country.id"),
      }}
    >
      {(formik) => (
        <React.Fragment>
          <Box paddingBottom="m">
            <Heading level={2}>Location</Heading>
          </Box>
          <Card>
            <Box padding="l">
              <Form>
                <Box display="flex" marginBottom="l">
                  <Box flex={1} paddingRight="8px">
                    <FormField
                      name="city"
                      label="City"
                      placeholder="e.g Berlin"
                    />
                  </Box>
                  <Box flex={1} paddingLeft="8px">
                    <FormField as={Select} name="country" label="Country">
                      {countriesQuery.data.countries.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </FormField>
                  </Box>
                </Box>
                <Box paddingBottom="xs">
                  <Text weight="semibold" colour="dark">
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
                <Box paddingBottom="xl">
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
                <Button loading={formik.isSubmitting}>Save Changes</Button>
              </Form>
            </Box>
          </Card>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default Location;
