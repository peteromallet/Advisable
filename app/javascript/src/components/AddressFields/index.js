import React from "react";
import gql from "graphql-tag";
import { get, flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { connect, Field } from "formik";
import { Box } from "@advisable/donut";
import Select from "../Select";
import TextField from "../TextField";

export const addressFieldsFragment = gql`
  fragment AddressFieldsFragment on Country {
    id
    name
    code
  }
`;

const GET_DATA = gql`
  query getCountries {
    countries {
      ...AddressFieldsFragment
    }
  }

  ${addressFieldsFragment}
`;

const AddressFields = ({ label, name, formik, data }) => {
  let countries = get(data, "countries") || [];

  if (data.loading) return <>loading...</>;

  return (
    <>
      <Box mb="xxs">
        <Field
          label={label}
          as={TextField}
          name={`${name}.line1`}
          placeholder="Line 1"
          error={
            get(formik.touched, `${name}.line1`) &&
            get(formik.errors, `${name}.line1`)
          }
        />
      </Box>
      <Box mb="xxs">
        <Field
          as={TextField}
          name={`${name}.line2`}
          placeholder="Line 2"
          error={
            get(formik.touched, `${name}.line2`) &&
            get(formik.errors, `${name}.line2`)
          }
        />
      </Box>
      <Box mb="xxs" display="flex">
        <Box width="100%" mr="xxs">
          <Field
            as={TextField}
            name={`${name}.city`}
            placeholder="City"
            error={
              get(formik.touched, `${name}.city`) &&
              get(formik.errors, `${name}.city`)
            }
          />
        </Box>
        <Box width="100%">
          <Field as={TextField} name={`${name}.state`} placeholder="County" />
        </Box>
      </Box>
      <Box mb="xs" display="flex">
        <Box width="100%" mr="xxs">
          <Field
            as={Select}
            name={`${name}.country`}
            options={countries.map((c, i) => ({
              key: i,
              value: c.code || c.name,
              label: c.name,
            }))}
          />
        </Box>
        <Box width="100%">
          <Field
            as={TextField}
            placeholder="Postcode"
            name={`${name}.postcode`}
          />
        </Box>
      </Box>
    </>
  );
};

export default compose(connect, graphql(GET_DATA))(AddressFields);
