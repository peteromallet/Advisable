import { gql, useQuery } from "@apollo/client";

const userFields = gql`
  fragment UserFields on User {
    id
    name
    city
    country {
      id
      name
    }
    industry {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  ${userFields}
  query Specialist($id: ID!) {
    countries {
      id
      name
      __typename
    }
    skills {
      value: id
      label: name
    }
    industries {
      value: id
      label: name
    }
    user(id: $id) {
      ...UserFields
    }
  }
`;

export const useGetUser = (id) => {
  const response = useQuery(GET_USER, { variables: { id } });
  return response;
};
