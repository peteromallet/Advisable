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
        proposal {
          id
        }
        questions {
          question
          answer
        }
        specialist {
          id
          name
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
          skills
        }
      }
    }
  }
`;
