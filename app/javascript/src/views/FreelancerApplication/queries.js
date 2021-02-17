import { gql, useQuery } from "@apollo/client";

export const GET_SPECIALIST = gql`
  query Specialist($id: ID!) {
    specialist(id: $id) {
      id
      # Introduction step
      avatar
      bio
      city
      country {
        id
        name
      }
      publicUse
      # Overview step
      linkedin
      website
      resume {
        id
        filename
        size
        type
        url
      }
      # Previous work step
      # ...
      # Work preferences step
      # ...
      # Ideal project step
      # ...
    }
  }
`;

export const useGetSpecialist = (id) => {
  const response = useQuery(GET_SPECIALIST, { variables: { id } });
  return response;
};
