import { gql } from "@apollo/client";

export const applicationFields = gql`
  fragment ApplicationFields on Application {
    id
    status
    rate
    acceptsFee
    acceptsTerms
    airtableId
    introduction
    availability
    trialProgram
    questions {
      answer
      question
    }
    previousProjects(fallback: false) {
      id
    }
    specialist {
      id
      bio
      airtableId
      previousProjects(includeDrafts: true) {
        nodes {
          id
          title
          excerpt
          draft
        }
      }
    }
    project {
      id
      currency
      questions
      airtableId
      primarySkill {
        id
        name
      }
      description
      industry
      companyType
      applicationsOpen
      companyDescription
      specialistDescription
    }
  }
`;

export const fetchApplication = gql`
  query Application($id: ID!) {
    application(id: $id) {
      ...ApplicationFields
    }
  }
  ${applicationFields}
`;

export const submitApplication = gql`
  mutation SubmitApplication($input: SubmitApplicationInput!) {
    submitApplication(input: $input) {
      application {
        id
        status
      }
      errors {
        code
      }
    }
  }
`;

export const updateApplication = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        ...ApplicationFields
      }
      errors {
        code
      }
    }
  }
  ${applicationFields}
`;

export const updateOverviewStep = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        introduction
        availability
      }
      errors {
        code
      }
    }
  }
`;

export const getUpdateOverviewStepOptimisticResponse = (id, values) => ({
  __typename: "Mutation",
  updateApplication: {
    __typename: "UpdateApplicationPayload",
    application: {
      __typename: "Application",
      id,
      ...values,
    },
    errors: null,
  },
});

export const updateQuestionStep = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        questions {
          question
          answer
        }
      }
      errors {
        code
      }
    }
  }
`;

export const getUpdateQuestionStepOptimisticResponse = (
  id,
  applicationQuestions,
  question,
  values,
) => {
  const questionIndex = applicationQuestions.findIndex(
    (item) => item.question === question,
  );

  const newApplicationQuestions = applicationQuestions.concat();
  newApplicationQuestions[questionIndex] = {
    __typename: "ApplicationQuestion",
    answer: values.answer,
    question,
  };

  return {
    __typename: "Mutation",
    updateApplication: {
      __typename: "UpdateApplicationPayload",
      application: {
        __typename: "Application",
        id,
        questions: newApplicationQuestions,
      },
      errors: null,
    },
  };
};

export const updateReferencesStep = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        previousProjects(fallback: false) {
          id
        }
      }
      errors {
        code
      }
    }
  }
`;

export const getUpdateReferencesStepOptimisticResponse = (id, references) => ({
  __typename: "Mutation",
  updateApplication: {
    __typename: "UpdateApplicationPayload",
    application: {
      __typename: "Application",
      id,
      previousProjects: references.map((ref) => ({
        id: ref,
        __typename: "PreviousProject",
      })),
    },
    errors: null,
  },
});

export const updateTermsStep = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        acceptsFee
        acceptsTerms
        rate
        trialProgram
      }
      errors {
        code
      }
    }
  }
`;

export const getUpdateTermsStepOptimisticResponse = (id, values) => ({
  __typename: "Mutation",
  updateApplication: {
    __typename: "UpdateApplicationPayload",
    application: {
      __typename: "Application",
      id,
      acceptsTerms: values.acceptsTerms,
      acceptsFee: values.acceptsFee,
      rate: values.rate,
      trialProgram: values.trialProgram,
    },
    errors: null,
  },
});
