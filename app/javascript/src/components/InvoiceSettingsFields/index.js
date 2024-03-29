import React from "react";
import { string } from "yup";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Box } from "@advisable/donut";
import Loading from "../Loading";
import FormField from "../FormField";
import AddressFields from "../AddressFields";
import { validateVAT } from "src/utilities/validateVAT";

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

const composeValidation =
  (...fns) =>
  (value) => {
    for (let validator of fns) {
      const error = validator(value);
      if (error) return error;
    }
  };

const InvoiceSettingsFields = ({ formik }) => {
  const { data, loading } = useQuery(GET_DATA);
  const countries = data?.countries || [];
  const countryValue = formik.values?.address?.country;
  const country = countries.find((c) => {
    return c.code === countryValue || c.name === countryValue;
  });

  if (loading) return <Loading />;

  const required = (errorMessage) => (value) => {
    if (!value) return errorMessage;
  };

  const validateVatNumber = (message) => (value) => {
    const isValid = validateVAT(country.code, value);
    if (!isValid) return message;
  };

  const { touched, errors } = formik;

  return (
    <>
      <FormField
        marginBottom="s"
        label="Full Name"
        placeholder="Full Name"
        name="name"
        validate={required("Please provide your full name")}
        error={touched.name && errors.name}
      />

      <FormField
        marginBottom="s"
        name="companyName"
        validate={required("Please provide your company name")}
        label="Company Name"
        placeholder="Company Name"
        error={touched.companyName && errors.companyName}
      />

      <Box mb="s">
        <FormField
          label="Billing Email"
          placeholder="Billing Email"
          name="billingEmail"
          validate={runValidation(emailValidation)}
          error={touched.billingEmail && errors.billingEmail}
        />
      </Box>

      <Box mb="m">
        <AddressFields formik={formik} label="Company Address" name="address" />
      </Box>

      {country && country.eu && (
        <Box mb="m">
          <FormField
            name="vatNumber"
            label="VAT Number"
            placeholder="VAT Number"
            validate={composeValidation(
              required("Please provide your VAT number"),
              validateVatNumber(`Invalid VAT number for ${country.name}`),
            )}
          />
        </Box>
      )}
    </>
  );
};

export default InvoiceSettingsFields;
