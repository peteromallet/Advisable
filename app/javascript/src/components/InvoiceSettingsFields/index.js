import React from "react";
import * as Yup from "yup";
import { Field } from "formik";
import { find, get } from "lodash";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Box } from "@advisable/donut";
import Loading from "../Loading";
import TextField from "../TextField";
import AddressFields from "../AddressFields";

const GET_DATA = gql`
  query getCountries {
    countries {
      id
      eu
      code
      name
    }
  }
`;

const runValidation = schema => value => {
  try {
    schema.validateSync(value);
  } catch (err) {
    return err.message;
  }
};

const emailValidation = Yup.string()
  .required("Please enter your billing email")
  .email("Please enter a valid email");

const InvoiceSettingsFields = ({ data, formik }) => {
  let countries = get(data, "countries", []);
  const countryValue = get(formik.values, "invoiceSettings.address.country");
  const country = find(countries, c => {
    return c.code === countryValue || c.name === countryValue;
  });

  if (data.loading) return <Loading />;

  const required = errorMessage => value => {
    if (!value) return errorMessage;
  };

  return (
    <>
      <Box mb="s">
        <Field
          as={TextField}
          label="Full Name"
          placeholder="Full Name"
          name="invoiceSettings.name"
          validate={required("Please provide your full name")}
          error={
            get(formik.touched, "invoiceSettings.name") &&
            get(formik.errors, "invoiceSettings.name")
          }
        />
      </Box>

      <Box mb="s">
        <Field
          as={TextField}
          name="invoiceSettings.companyName"
          validate={required("Please provide your company name")}
          label="Company Name"
          placeholder="Company Name"
          error={
            get(formik.touched, "invoiceSettings.companyName") &&
            get(formik.errors, "invoiceSettings.companyName")
          }
        />
      </Box>

      <Box mb="s">
        <Field
          as={TextField}
          label="Billing Email"
          placeholder="Billing Email"
          name="invoiceSettings.billingEmail"
          validate={runValidation(emailValidation)}
          error={
            get(formik.touched, "invoiceSettings.billingEmail") &&
            get(formik.errors, "invoiceSettings.billingEmail")
          }
        />
      </Box>

      <Box mb="m">
        <AddressFields
          formik={formik}
          label="Company Address"
          name="invoiceSettings.address"
        />
      </Box>

      {country && country.eu && (
        <Box mb="m">
          <Field
            as={TextField}
            name="invoiceSettings.vatNumber"
            validate={required("Please provide your VAT number")}
            label="VAT Number"
            placeholder="VAT Number"
            error={
              get(formik.touched, "invoiceSettings.vatNumber") &&
              get(formik.errors, "invoiceSettings.vatNumber")
            }
          />
        </Box>
      )}
    </>
  );
};

export default graphql(GET_DATA)(InvoiceSettingsFields);
