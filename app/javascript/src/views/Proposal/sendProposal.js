import gql from "graphql-tag";

export default gql`
  mutation sendProposal($input: SendProposalInput!) {
    sendProposal(input: $input) {
      application {
        id
        airtableId
        rate
        status
        proposalComment
      }
      errors {
        code
      }
    }
  }
`;
