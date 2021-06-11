import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_SKILLS = gql`
  query {
    skills {
      id
      value: name
      label: name
    }
  }
`;

const GET_SKILLS_CASE_STUDY_SEARCH = gql`
  query {
    skills {
      id
      value: name
      label: name
    }
    caseStudySearch(id: $id) {
      id
      goals
    }
  }
`;

export const useSavedSearch = (id) => {
  const res = useQuery(id ? GET_SKILLS_CASE_STUDY_SEARCH : GET_SKILLS, {
    variables: id ? { id } : undefined,
  });

  return res;
};
