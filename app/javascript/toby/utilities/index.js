import pluralize from "pluralize";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { jsonToGraphQLQuery, VariableType } from "json-to-graphql-query";
import { useSchema } from "../components/schema";

export function pluralizeType(type) {
  return pluralize(type.toLowerCase());
}

export function useResourceData() {
  const { resource } = useParams();
  const schemaData = useSchema();
  return getResourceByParam(schemaData.resources, resource);
}

// Assumes that there is a resource param in the URL. e.g /accounts
export function useResources() {
  const { resource } = useParams();
  const schemaData = useSchema();
  const resourceData = getResourceByParam(schemaData.resources, resource);
  const query = generateCollectionQuery(schemaData, resourceData);
  const response = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    variables: {},
  });
  return {
    ...response,
    resource: resourceData,
  };
}

// Takes the resources data and returns a matching resource bassed on the
// param version of its type. e.g accounts returns the Account resource.
function getResourceByParam(resources, param) {
  return resources.find((resource) => {
    return pluralizeType(resource.type) === param;
  });
}

// Generates a graphql a collection query for a resource
function generateCollectionQuery(schemaData, resourceData) {
  const node = {};
  resourceData.attributes.forEach((attr) => {
    node[attr.name] = selectionForField(
      schemaData.schema,
      resourceData.type,
      attr.name,
    );
  });

  const queryObject = {
    query: {
      __variables: {
        cursor: "String",
        filters: "[Filter!]",
      },
      records: {
        __args: {
          first: 100,
          after: new VariableType("cursor"),
          filters: new VariableType("filters"),
        },
        __aliasFor: resourceData.queryNameCollection,
        pageInfo: {
          hasNextPage: true,
          endCursor: true,
        },
        edges: {
          node,
        },
      },
    },
  };

  let queryString = jsonToGraphQLQuery(queryObject);
  queryString =
    queryString.substr(0, 6) +
    `${resourceData.type}Collection` +
    queryString.substr(6);

  return gql(queryString);
}

export function getType(schema, type) {
  return schema.types.find((t) => t.name === type);
}

// Returns the query selection for a given field. If the field is a scalar type
// we just return true which the json-to-graphql package will use to query for.
function selectionForField(schema, resourceType, fieldName) {
  const type = getType(schema, resourceType);
  const field = type.fields.find((f) => f.name === fieldName);
  // if its a scalar type just return true
  if (field.type.kind === "SCALAR") return true;
  const query = { id: true };
  return query;
}
