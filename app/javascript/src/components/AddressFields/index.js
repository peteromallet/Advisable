import React from "react";
import gql from "graphql-tag";
import { find, get, flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { connect, Field } from "formik";
import { Box } from "@advisable/donut";
import Select from "../Select";
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

const AddressFields = ({ label, name, formik, data }) => {
  let countries = get(data, "countries");
  let country = find(countries, { id: get(formik.values, `${name}.country`) });

  if (data.loading) return <>loading...</>;

  return (
    <>
      <Box mb="xs">
        <Field
          name={`${name}.line1`}
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              placeholder="line 1"
              error={
                get(formik.touched, `${name}.line1`) &&
                get(formik.errors, `${name}.line1`)
              }
            />
          )}
        />
      </Box>
      <Box mb="xs">
        <Field
          name={`${name}.line2`}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="line 2"
              error={
                get(formik.touched, `${name}.line2`) &&
                get(formik.errors, `${name}.line2`)
              }
            />
          )}
        />
      </Box>
      <Box mb="xs" display="flex">
        <Box width="100%" mr="xxs">
          <Field
            name={`${name}.city`}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="City"
                error={
                  get(formik.touched, `${name}.city`) &&
                  get(formik.errors, `${name}.city`)
                }
              />
            )}
          />
        </Box>
        {country && country.states.length > 0 && (
          <Box width="100%" ml="xxs">
            <Field
              name={`${name}.state`}
              render={({ field }) => (
                <Select
                  {...field}
                  options={country.states.map(s => ({
                    value: s,
                    label: s,
                  }))}
                />
              )}
            />
          </Box>
        )}
      </Box>
      <Box mb="xs" display="flex">
        <Box width="100%" mr="xxs">
          <Field
            name={`${name}.country`}
            render={({ field }) => (
              <Select
                {...field}
                options={countries.map(c => ({
                  value: c.id,
                  label: c.name,
                }))}
              />
            )}
          />
        </Box>
        <Box width="100%" ml="xxs">
          <Field
            name={`${name}.postcode`}
            render={({ field }) => (
              <TextField {...field} placeholder="Postcode" />
            )}
          />
        </Box>
      </Box>
    </>
  );
};

export default compose(
  connect,
  graphql(GET_DATA)
)(AddressFields);
