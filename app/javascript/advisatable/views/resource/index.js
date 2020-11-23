import React from "react";
import { useQuery } from "@apollo/client";
import { Route, useParams } from "react-router-dom";
import { generateIndexQuery } from "../../utilities/queries";
import { useResources, getResource } from "../../components/resources";
import { useSchemaIntrospection } from "../../components/schema";
import Row from "../../components/row";
import ResourceModal from "../../components/resource-modal";
import TableNavigation from "../../components/table-navigation";
import ResourceColumns from "../../components/resource-columns";

export default function Resource() {
  const resources = useResources();
  const { resourceName } = useParams();
  const schema = useSchemaIntrospection();
  const resource = getResource(resources, resourceName);

  const query = generateIndexQuery(resource, resources, schema);
  const { loading, data, errors } = useQuery(query);

  const records = data?.records || [];

  return (
    <>
      <TableNavigation />
      <ResourceColumns />
      <Route path="/:resourceName/:id">
        <ResourceModal />
      </Route>
      {loading ? <>loading...</> : null}
      {records.map((r) => (
        <Row
          key={r.id}
          record={r}
          resource={resource}
          resources={resources}
          schema={schema}
        />
      ))}
    </>
  );
}
