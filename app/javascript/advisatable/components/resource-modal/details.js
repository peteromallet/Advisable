import React from "react";
import { Formik, Form } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import { useResources, getResource } from "../resources";
import { useSchemaIntrospection } from "../schema";
import {
  generateShowQuery,
  generateUpdateQuery,
} from "../../utilities/queries";
import { getColumnInputComponent, getColumnInputValue } from "../../attributes";

export default function ResourceDetails() {
  const resources = useResources();
  const schema = useSchemaIntrospection();
  const { resourceName, id } = useParams();
  const resource = getResource(resources, resourceName);
  const query = generateShowQuery(resource, resources, schema);
  const UPDATE = generateUpdateQuery(resource, resources, schema);
  const [update] = useMutation(UPDATE);
  const { loading, data, errors } = useQuery(query, {
    variables: { id },
  });

  const handelSubmit = async (values) => {
    await update({
      variables: {
        id,
        attributes: values,
      },
    });
  };

  if (loading) return <>loading...</>;

  const { record } = data;

  const initialValues = {};
  resource.columns.map((c) => {
    if (!c.readonly) {
      initialValues[c.field] = getColumnInputValue(record, c);
    }
  });

  return (
    <Box padding="xl">
      <Formik onSubmit={handelSubmit} initialValues={initialValues}>
        <Form>
          {resource.columns.map((column) => {
            const Component = getColumnInputComponent(column);
            return (
              <div key={column.name}>
                <Component record={record} column={column} />
              </div>
            );
          })}
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </Box>
  );
}
