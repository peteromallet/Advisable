import React from "react";
import { Field } from "formik";
import { find, get } from "lodash";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Box } from "@advisable/donut";
import Select from "../Select";
import Loading from "../Loading";
import TextField from "../TextField";

const GET_DATA = gql`
  query getCountries {
    countries {
      id
      eu
      name
      states
    }
  }
`;

const InvoiceSettingsFields = ({ data, formik }) => {
  let countries = get(data, "countries", []);

  let hasSelectedEUCountry = formik => {
    let country = find(countries, {
      id: get(formik.values, "invoiceSettings.address.country"),
    });
    if (!country) return false;
    return country.eu;
  };

  let countryStates = formik => {
    let country = find(countries, {
      id: get(formik.values, "invoiceSettings.address.country"),
    });
    if (!country) return [];
    return country.states;
  };

  if (data.loading) return <Loading />;

  const required = errorMessage => value => {
    if (!Boolean(value)) return errorMessage;
  };

  return (
    <>
      <Box mb="s">
        <Field
          name="invoiceSettings.name"
          validate={required("Please provide your full name")}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              placeholder="Full Name"
              error={
                get(formik.touched, "invoiceSettings.name") &&
                get(formik.errors, "invoiceSettings.name")
              }
            />
          )}
        />
      </Box>

      <Box mb="s">
        <Field
          name="invoiceSettings.companyName"
          validate={required("Please provide your company name")}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              placeholder="Company Name"
              error={
                get(formik.touched, "invoiceSettings.companyName") &&
                get(formik.errors, "invoiceSettings.companyName")
              }
            />
          )}
        />
      </Box>

      <Box mb="xs">
        <Field
          name="invoiceSettings.address.line1"
          validate={required("This field is required")}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Address"
              placeholder="Line 1"
              error={
                get(formik, "touched.invoiceSettings.address.line1") &&
                get(formik, "errors.invoiceSettings.address.line1")
              }
            />
          )}
        />
      </Box>
      <Box mb="xs">
        <TextField
          name="invoiceSettings.address.line2"
          placeholder="Line 2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={get(formik.values, "invoiceSettings.address.line2")}
        />
      </Box>
      <Box mb="xs" display="flex">
        <Box width="100%" mr="xxs">
          <Field
            name="invoiceSettings.address.city"
            validate={required("This field is required")}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="City"
                error={
                  get(formik, "touched.invoiceSettings.address.city") &&
                  get(formik, "errors.invoiceSettings.address.city")
                }
              />
            )}
          />
        </Box>
        {countryStates(formik).length > 0 && (
          <Box width="100%" ml="xxs">
            <Select
              name="invoiceSettings.address.state"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={get(formik.values, "invoiceSettings.address.state")}
              options={countryStates(formik).map(s => ({
                value: s,
                label: s,
              }))}
            />
          </Box>
        )}
      </Box>
      <Box mb="m" display="flex">
        <Box width="100%" mr="xxs">
          <Select
            name="invoiceSettings.address.country"
            placeholder="Country"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={get(formik.values, "invoiceSettings.address.country")}
            options={countries.map(c => ({
              value: c.id,
              label: c.name,
            }))}
          />
        </Box>
        <Box width="100%" ml="xxs">
          <TextField
            name="invoiceSettings.address.postcode"
            placeholder="Postcode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={get(formik.values, "invoiceSettings.address.postcode")}
          />
        </Box>
      </Box>
      {hasSelectedEUCountry(formik) && (
        <Box mb="m">
          <Field
            name="invoiceSettings.vatNumber"
            validate={required("Please provide your VAT number")}
            render={({ field }) => (
              <TextField
                {...field}
                label="VAT Number"
                placeholder="VAT Number"
                error={
                  get(formik.touched, "invoiceSettings.vatNumber") &&
                  get(formik.errors, "invoiceSettings.vatNumber")
                }
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default graphql(GET_DATA)(InvoiceSettingsFields);
