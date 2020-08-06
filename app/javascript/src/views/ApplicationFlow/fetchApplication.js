import { gql } from "@apollo/client";
import applicationFields from "./applicationFields";

export default gql`
  query Application($id: ID!) {
    application(id: $id) {
      ...ApplicationFields
    }
  }
  ${applicationFields}
`;
