// Renders the view for updating a freelancer location in their profile
// settings
import * as React from "react";
import { Formik, Form } from "formik";
import { get } from "lodash-es";
import { Card, Button, Select, Checkbox } from "@advisable/donut";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Text from "../../../components/Text";
import Loading from "../../../components/Loading";
import Heading from "../../../components/Heading";
import FieldRow from "../../../components/FieldRow";
import FormField from "../../../components/FormField";
import Padding from "../../../components/Spacing/Padding";
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
    await mutate({
      variables: {
        input: values,
      },
    });

    notifications.notify("Your profile has been updated");
    formikBag.setSubmitting(false);
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
          <Padding bottom="m">
            <Heading level={2}>Location</Heading>
          </Padding>
          <Card>
            <Padding size="l">
              <Form>
                <FieldRow>
                  <FormField
                    name="city"
                    label="City"
                    placeholder="e.g Berlin"
                  />
                  <FormField as={Select} name="country" label="Country">
                    {countriesQuery.data.countries.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </FormField>
                </FieldRow>
                <Padding bottom="m">
                  <Text weight="semibold" colour="dark">
                    Are you happy to work remotely?
                  </Text>
                </Padding>
                <Padding bottom="m">
                  <Checkbox
                    name="remote"
                    checked={formik.values.remote}
                    onChange={(e) => {
                      formik.setFieldValue("remote", true);
                    }}
                  >
                    Yes, I’m happy to work remote
                  </Checkbox>
                </Padding>
                <Padding bottom="xl">
                  <Checkbox
                    name="remote"
                    checked={formik.values.remote === false}
                    onChange={(e) => {
                      formik.setFieldValue("remote", false);
                    }}
                  >
                    No, I only work with clients in person
                  </Checkbox>
                </Padding>
                <Button loading={formik.isSubmitting}>Save Changes</Button>
              </Form>
            </Padding>
          </Card>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default Location;
