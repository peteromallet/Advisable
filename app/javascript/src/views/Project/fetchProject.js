import gql from "graphql-tag";

export default gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      status
      airtableId
      currency
      primarySkill
      clientReferralUrl
      applicationCount
      user {
        id
        name
        email
      }
      applications {
        id
        rate
        status
        featured
        comment
        hidden
        airtableId
        availability
        introduction
        referencesRequested
        questions {
          question
          answer
        }
        specialist {
          id
          name
          email
          airtableId
          firstName
          city
          reviewsCount
          ratings {
            overall
          }
          image {
            url
          }
          country {
            id
            name
          }
          linkedin
          skills {
            name
          }
        }
      }
    }
  }
`;
