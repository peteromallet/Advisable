// Renders the page for creating a client. If the user is already associated
// with a client they will be redirected back to the projects view.
import React from "react";
import get from "lodash/get";
import { Formik } from "formik";
import { graphql, Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import View from "src/components/View";
import Card from "src/components/Card";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import FieldRow from "src/components/FieldRow";
import TextField from "src/components/TextField";
import Container from "src/components/Container";
import CountriesSelect from "src/components/CountriesSelect";
import SETUP from "./setup.graphql";
import VIEWER from "../../components/AuthenticatedRoute/viewer.graphql";

const CreateClient = ({ history, data }) => {
  if (data.viewer.client) {
    return <Redirect to="/projects" />;
  }

  return (
    <View>
      <Container size="s">
        <Card padding="xl">
          <Mutation mutation={SETUP}>
            {setup => (
              <Formik
                initialValues={{
                  firstName: get(data, "viewer.firstName") || "",
                  lastName: get(data, "viewer.lastName") || "",
                  companyName: get(data, "viewer.companyName") || "",
                  countryName: get(data, "viewer.country.name") || ""
                }}
                onSubmit={async values => {
                  const r = await setup({ variables: { input: values } });
                  window.location = '/projects'
                }}
              >
                {formik => (
                  <form onSubmit={formik.handleSubmit}>
                    <Heading center marginBottom="xl">Setup your account</Heading>
                    <FieldRow>
                      <TextField
                        name="firstName"
                        label="First Name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      />
                      <TextField
                        name="lastName"
                        label="Last Name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                      />
                    </FieldRow>
                    <FieldRow>
                      <CountriesSelect
                        block
                        name="countryName"
                        label="Country Name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.countryName}
                      />
                    </FieldRow>
                    <FieldRow>
                      <TextField
                        name="companyName"
                        label="Company Name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                      />
                    </FieldRow>
                    <Button block loading={formik.isSubmitting} size="l" styling="primary">
                      Finish Setup
                    </Button>
                  </form>
                )}
              </Formik>
            )}
          </Mutation>
        </Card>
      </Container>
    </View>
  );
};

export default graphql(VIEWER)(CreateClient);
