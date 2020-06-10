import gql from 'graphql-tag';

export default gql`
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    token
    errors {
      code
    }
  }
}
`