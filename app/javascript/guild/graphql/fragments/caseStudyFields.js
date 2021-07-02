import { gql } from "@apollo/client";

export default gql`
  fragment CaseStudyFields on GuildPostCaseStudy {
    article {
      subtitle
      sections {
        id
        type
        contents {
          id
          ... on Heading {
            size
            text
          }
          ... on Paragraph {
            text
          }
          ... on Results {
            results
          }
          ... on Images {
            images {
              id
              url
            }
          }
        }
      }
    }
  }
`;
