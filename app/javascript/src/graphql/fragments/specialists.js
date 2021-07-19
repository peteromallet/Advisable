import { gql } from "@apollo/client";

export const specialistFields = gql`
  fragment specialistFields on Specialist {
    id
    name
    firstName
    lastName
    city
    avatar
    country {
      id
      name
    }
  }
`;
