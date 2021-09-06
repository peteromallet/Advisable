import { relayStylePagination } from "@apollo/client/utilities";
import React, { useEffect, createContext, useContext, useMemo } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

export const SchemaContext = createContext();

const SCHEMA_INTROSPECTION = gql`
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }

    resources {
      type
      queryNameCollection
      queryNameItem
      queryNameUpdate
      queryNameSearch
      attributes {
        name
        readonly
        sortable
        description
        columnLabel
        columnName
        filters {
          name
          type
          nested
        }
        ... on SelectAttribute {
          options
        }
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
      }
    }
  }
`;

export function useSchema() {
  return useContext(SchemaContext);
}

function buildTypePolicies(data) {
  const typePolicies = {
    Query: {
      fields: {},
    },
  };

  data.resources.forEach((resource) => {
    typePolicies.Query.fields[resource.queryNameCollection] =
      relayStylePagination();
  });

  return typePolicies;
}

export default function SchemaIntrospection({ children }) {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(SCHEMA_INTROSPECTION);

  // when the schema info has been fetched we need to build the type policies
  // for each resource.
  useEffect(() => {
    if (data) {
      client.cache.policies.addTypePolicies(buildTypePolicies(data));
    }
  }, [data, client.cache.policies]);

  const value = useMemo(
    () => ({
      schema: data?.__schema,
      resources: data?.resources,
    }),
    [data],
  );

  if (error) {
    return <>Failed to load schema</>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>
  );
}
