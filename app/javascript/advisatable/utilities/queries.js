import { gql } from "@apollo/client";
import { jsonToGraphQLQuery, VariableType } from "json-to-graphql-query";
import { getType } from "./schema";
import { getResourceByType } from "../components/resources";

export function generateResourcesQuery(schema) {
  const columnsUnion = getType(schema, "ColumnsUnion");
  const columnTypes = columnsUnion.possibleTypes.map((t) => t.name);

  const QUERY_OBJECT = {
    query: {
      __resources: {
        name: true,
        resourceType: true,
        friendlyName: true,
        indexQueryName: true,
        showQueryName: true,
        updateMutationName: true,
        columns: {
          __on: [],
        },
      },
    },
  };

  columnTypes.forEach((typeName) => {
    const fields = getType(schema, typeName).fields;
    const selections = { __typeName: typeName };
    // This is assuming that all column fild typs are scalar values, this may
    // not always be the case
    fields.forEach((field) => {
      selections[field.name] = true;
    });

    QUERY_OBJECT.query.__resources.columns.__on.push(selections);
  });

  return gql(jsonToGraphQLQuery(QUERY_OBJECT));
}

function resolveColumnField(type, column, resources, schema) {
  const field = type.fields.find((f) => f.name === column.field);
  if (field.type.kind === "SCALAR") {
    return true;
  } else {
    const nextType = getType(schema, field.type.name);
    const resource = getResourceByType(resources, nextType.name);
    const nextColumn = resource.columns.find(
      (c) => c.field === (column.labelledBy || "id"),
    );

    const query = { id: true };

    if (column.labelledBy) {
      query[column.labelledBy] = resolveColumnField(
        nextType,
        nextColumn,
        resources,
        schema,
      );
    }

    return query;
  }
}

export function generateIndexQuery(resource, resources, schema) {
  const queryObject = {
    query: {
      records: {
        __aliasFor: resource.indexQueryName,
      },
    },
  };

  const type = getType(schema, resource.resourceType);
  resource.columns.forEach((column) => {
    queryObject.query.records[column.field] = resolveColumnField(
      type,
      column,
      resources,
      schema,
    );
  });

  return gql(jsonToGraphQLQuery(queryObject));
}

export function generateShowQuery(resource, resources, schema) {
  const queryObject = {
    query: {
      __variables: {
        id: "ID!",
      },
      record: {
        __args: {
          id: new VariableType("id"),
        },
        __aliasFor: resource.showQueryName,
      },
    },
  };

  const type = getType(schema, resource.resourceType);
  resource.columns.forEach((column) => {
    queryObject.query.record[column.field] = resolveColumnField(
      type,
      column,
      resources,
      schema,
    );
  });

  return gql(jsonToGraphQLQuery(queryObject));
}

export function generateUpdateQuery(resource, resources, schema) {
  const mutationType = getType(schema, "Mutation");
  const field = mutationType.fields.find(
    (f) => f.name === resource.updateMutationName,
  );
  const attributes = field.args.find((a) => a.name === "attributes");
  const attributeType = attributes.type.ofType.name;

  const queryObject = {
    mutation: {
      __variables: {
        id: "ID!",
        attributes: `${attributeType}!`,
      },
      update: {
        __aliasFor: resource.updateMutationName,
        __args: {
          id: new VariableType("id"),
          attributes: new VariableType("attributes"),
        },
        resource: {},
      },
    },
  };

  const type = getType(schema, resource.resourceType);
  resource.columns.forEach((column) => {
    queryObject.mutation.update.resource[column.field] = resolveColumnField(
      type,
      column,
      resources,
      schema,
    );
  });

  return gql(jsonToGraphQLQuery(queryObject));
}
