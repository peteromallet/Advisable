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
    node[attr.name] = selectionForField(schemaData, resourceData, attr.name);
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

export function resourceByType(schemaData, type) {
  return schemaData.resources.find((r) => r.type === type);
}

export function resourceAttribute(resourceData, attributeName) {
  return resourceData.attributes.find((a) => a.name === attributeName);
}

// Returns the query selection for a given field. If the field is a scalar type
// we just return true which the json-to-graphql package will use to query for.
function selectionForField(schemaData, resourceData, fieldName) {
  const type = getType(schemaData.schema, resourceData.type);
  const field = type.fields.find((f) => f.name === fieldName);
  // if its a scalar type just return true
  if (field.type.kind === "SCALAR") return true;

  // handle specialist case when we might have a list of SCALAR types
  if (field.type.kind === "LIST") {
    if (field.type.ofType.ofType?.kind === "SCALAR") {
      return true;
    }
  }

  const attribute = resourceAttribute(resourceData, fieldName);

  const query = {
    id: true,
  };

  if (attribute.labelledBy) {
    const fieldResource = resourceByType(schemaData, field.type.name);
    query[attribute.labelledBy] = selectionForField(
      schemaData,
      fieldResource,
      attribute.labelledBy,
    );
  }

  return query;
}
