import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_SKILLS = gql`
  query {
    clientApplication {
      companyType
      industry {
        name
      }
      businessType
    }
    skills {
      id
      value: name
      label: name
    }
    popularCaseStudySkills {
      id
      name
    }
  }
`;

export const GET_SKILLS_CASE_STUDY_SEARCH = gql`
  query ($id: ID!) {
    clientApplication {
      companyType
      industry {
        name
      }
      businessType
    }
    skills {
      id
      value: name
      label: name
    }
    caseStudySearch(id: $id) {
      id
      name
      goals
      skills {
        id
        skill {
          id
          value: name
          label: name
        }
      }
    }
  }
`;

export const useSavedSearch = (id) => {
  const res = useQuery(id ? GET_SKILLS_CASE_STUDY_SEARCH : GET_SKILLS, {
    variables: id ? { id } : undefined,
  });

  return res;
};
