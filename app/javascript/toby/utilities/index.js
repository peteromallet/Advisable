import { useEffect, useState, useCallback } from "react";
import pluralize from "pluralize";
import { gql, useApolloClient } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
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

async function convertFilterToIDs(resource, client, filter, schemaData) {
  const query = generateFilterQuery(schemaData, resource);
  const filterValue = await resolveFilterValue(
    resource,
    client,
    filter,
    schemaData,
  );
  const response = await client.query({
    query,
    fetchPolicy: "network-only",
    variables: {
      filters: [
        {
          attribute: filter.attribute,
          type: filter.type,
          value: filterValue,
        },
      ],
    },
  });

  return response.data.records.nodes.map((n) => n.id);
}

async function resolveFilterValue(resource, client, filter, schemaData) {
  if (Array.isArray(filter.value)) {
    return Promise.resolve(filter.value);
  }

  const type = getType(schemaData.schema, resource.type);
  const field = type.fields.find((f) => f.name === filter.attribute);
  const nextResource = getResource(schemaData.resources, field.type.name);
  return convertFilterToIDs(nextResource, client, filter.value, schemaData);
}

async function convertFilters(resourceData, client, filters, schemaData) {
  if (!filters.length) return [];

  const promises = filters.map(async (f) => ({
    attribute: f.attribute,
    type: f.type,
    value: await resolveFilterValue(resourceData, client, f, schemaData),
  }));

  return Promise.all(promises);
}

export function useFetchResources(filters) {
  const client = useApolloClient();
  const [loading, setLoading] = useState(true);
  const { resource } = useParams();
  const schemaData = useSchema();
  const resourceData = getResourceByParam(schemaData.resources, resource);
  const query = generateCollectionQuery(schemaData, resourceData);
  const [fetch, queryState] = useLazyQuery(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onCompleted() {
      setLoading(false);
    },
  });

  const fetchRecords = useCallback(
    async function fetchRecords() {
      const resolvedFilters = await convertFilters(
        resourceData,
        client,
        filters,
        schemaData,
      );
      fetch({
        variables: {
          filters: resolvedFilters,
        },
      });
    },
    [resourceData, schemaData, fetch, client, filters],
  );

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    ...queryState,
    resource: resourceData,
    loading,
  };
}

export function convertFiltersToVariable(filters) {
  if (!filters.length) return [];

  return filters.map((f) => ({
    attribute: f.attribute,
    type: f.type,
    value: f.value,
  }));
}

export function getResource(resources, name) {
  return resources.find((resource) => resource.type === name);
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

// Genreates a graphql query used for filtering an association down to an array
// of ID's.
function generateFilterQuery(schemaData, resourceData) {
  const queryObject = {
    query: {
      __variables: {
        filters: "[Filter!]",
      },
      records: {
        __args: {
          filters: new VariableType("filters"),
        },
        __aliasFor: resourceData.queryNameCollection,
        pageInfo: {
          hasNextPage: true,
          endCursor: true,
        },
        nodes: {
          id: true,
        },
      },
    },
  };

  const queryString = jsonToGraphQLQuery(queryObject);
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

  if (attribute.labeledBy) {
    let fieldResource;
    if (attribute.__typename.includes("HasMany")) {
      fieldResource = resourceByType(schemaData, field.type.ofType.ofType.name);
    } else {
      fieldResource = resourceByType(schemaData, field.type.name);
    }
    query[attribute.labeledBy] = selectionForField(
      schemaData,
      fieldResource,
      attribute.labeledBy,
    );
  }

  return query;
}
