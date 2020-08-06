import React from "react";
import { string } from "yup";
import { find, get } from "lodash-es";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Box } from "@advisable/donut";
import Loading from "../Loading";
import FormField from "../FormField";
import AddressFields from "../AddressFields";

export const GET_DATA = gql`
  query getCountries {
    countries {
      id
      eu
      code
      name
    }
  }
`;

const runValidation = (schema) => (value) => {
  try {
    schema.validateSync(value);
  } catch (err) {
    return err.message;
  }
};

const emailValidation = string()
  .required("Please enter your billing email")
  .email("Please enter a valid email");

const InvoiceSettingsFields = ({ formik }) => {
  const { data, loading } = useQuery(GET_DATA);
  let countries = get(data, "countries", []);
  const countryValue = get(formik.values, "invoiceSettings.address.country");
  const country = find(countries, (c) => {
    return c.code === countryValue || c.name === countryValue;
  });

  if (loading) return <Loading />;

  const required = (errorMessage) => (value) => {
    if (!value) return errorMessage;
  };

  const { touched, errors } = formik;

  return (
    <>
      <FormField
        marginBottom="s"
        label="Full Name"
        placeholder="Full Name"
        name="invoiceSettings.name"
        validate={required("Please provide your full name")}
        error={touched.invoiceSettings?.name && errors.invoiceSettings?.name}
      />

      <FormField
        marginBottom="s"
        name="invoiceSettings.companyName"
        validate={required("Please provide your company name")}
        label="Company Name"
        placeholder="Company Name"
        error={
          touched.invoiceSettings?.companyName &&
          errors.invoiceSettings?.companyName
        }
      />

      <Box mb="s">
        <FormField
          label="Billing Email"
          placeholder="Billing Email"
          name="invoiceSettings.billingEmail"
          validate={runValidation(emailValidation)}
          error={
            touched.invoiceSettings?.billingEmail &&
            errors.invoiceSettings?.billingEmail
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
          <FormField
            name="invoiceSettings.vatNumber"
            validate={required("Please provide your VAT number")}
            label="VAT Number"
            placeholder="VAT Number"
          />
        </Box>
      )}
    </>
  );
};

export default InvoiceSettingsFields;
