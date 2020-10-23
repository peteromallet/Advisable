import { gql } from "@apollo/client";

const fields = gql`
  fragment SpecialistFields on Specialist {
    id
    name
    firstName
    avatar
    coverPhoto
    location
    bio
    linkedin
    website
    city
    country {
      id
    }

    projectSkills {
      nodes {
        id
        name
      }
    }

    industries {
      id
      name
    }

    # answers {
    #   id
    #   content
    #   question {
    #     content
    #     id
    #   }
    # }

    profileProjects {
      id
      title
      clientName
      coverPhoto {
        url
      }
      excerpt
      primaryIndustry {
        id
        name
        color
      }
      primarySkill {
        id
        name
      }
      skills {
        id
        name
      }
      industries {
        id
        name
      }
      reviews {
        id
        name
        role
        comment
        companyName
      }
    }

    reviews {
      id
      name
      role
      comment
      companyName
      avatar
    }
  }
`;

export const GET_PROFILE = gql`
  ${fields}
  query getProfileData($id: ID!) {
    # questions {
    #   id
    #   content
    # }
    specialist(id: $id) {
      ...SpecialistFields
    }
  }
`;

export const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      value: id
      label: name
    }
  }
`;

export const UPDATE_PROFILE = gql`
  ${fields}
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;

export const updateProfileOptimisticResponse = (specialist, values) => {
  return {
    __typename: "Mutation",
    updateProfile: {
      __typename: "UpdateProfilePayload",
      specialist: {
        __typename: "Specialist",
        ...specialist,
        ...values,
        country: {
          __typename: "Country",
          id: values.country,
        },
      },
    },
  };
};

export const SET_COVER_PHOTO = gql`
  ${fields}
  mutation SetCoverPhoto($input: SetCoverPhotoInput!) {
    setCoverPhoto(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;

export const ANSWER_QUESTION = gql`
  mutation AnswerQuestion($input: AnswerQuestionInput!) {
    answerQuestion(input: $input) {
      answer {
        id
        content
        question {
          id
          content
        }
      }
    }
  }
`;

export const editAnswerOptimisticResponse = (answer, values) => ({
  __typename: "Mutation",
  answerQuestion: {
    __typename: "AnswerQuestionPayload",
    answer: {
      __typename: "Answer",
      ...answer,
      content: values.content,
    },
  },
});

export const editAnswerUpdateCache = (profileId) => (
  proxy,
  { data: { answerQuestion } },
) => {
  const profile = proxy.readQuery({
    query: GET_PROFILE,
    variables: { id: profileId },
  });
  const data = {
    ...profile,
    specialist: {
      ...profile.specialist,
      answers: profile.specialist.answers.map((answer) =>
        answer.id === answerQuestion.answer.id ? answerQuestion.answer : answer,
      ),
    },
  };
  proxy.writeQuery({ query: GET_PROFILE, data, variables: { id: profileId } });
};

export const DELETE_ANSWER = gql`
  mutation DeleteAnswer($input: DeleteAnswerInput!) {
    deleteAnswer(input: $input) {
      id
    }
  }
`;

export const deleteAnswerOptimisticResponse = (id) => ({
  __typename: "Mutation",
  deleteAnswer: {
    __typename: "DeleteAnswerPayload",
    id,
  },
});

export const deleteAnswerUpdateCache = (profileId) => (
  proxy,
  { data: { deleteAnswer } },
) => {
  const profile = proxy.readQuery({
    query: GET_PROFILE,
    variables: { id: profileId },
  });
  const data = {
    ...profile,
    specialist: {
      ...profile.specialist,
      answers: profile.specialist.answers.filter(
        (answer) => answer.id !== deleteAnswer.id,
      ),
    },
  };
  proxy.writeQuery({ query: GET_PROFILE, data, variables: { id: profileId } });
};
