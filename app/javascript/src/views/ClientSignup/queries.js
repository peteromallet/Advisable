import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useLocation } from "react-router";

export const useApplicationId = () => {
  const location = useLocation();
  return location.state.applicationId;
};

const clientApplicationFragment = gql`
  fragment Application on ClientApplication {
    id
    firstName
    lastName
    # About Your Company
    companyName
    industry {
      name
    }
    companyType
    # About Your Requirements
    skills {
      name
    }
    numberOfFreelancers
    budget
    # About Your Preferences
    localityImportance
    acceptedGuaranteeTerms
    talentQuality
    # Status on submit
    status
    rejectionReason
  }
`;

export const GET_CLIENT_APPLICATION = gql`
  ${clientApplicationFragment}
  query ClientApplication($id: ID!) {
    clientApplication(id: $id) {
      ...Application
    }
  }
`;

/* 0 Step. Start Client Application */

export const START_CLIENT_APPLICATION = gql`
  ${clientApplicationFragment}
  mutation StartClientApplication(
    $firstName: String!
    $lastName: String
    $email: String!
  ) {
    startClientApplication(
      input: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      clientApplication {
        ...Application
      }
    }
  }
`;

export const useStartClientApplication = () =>
  useMutation(START_CLIENT_APPLICATION);

/* 2 Step. About Company */

export const ABOUT_COMPANY_QUERY = gql`
  ${clientApplicationFragment}
  query ClientApplication($id: ID!) {
    industries {
      label: name
      value: name
    }
    clientApplication(id: $id) {
      ...Application
    }
  }
`;

export const useAboutCompanyQuery = () => {
  const id = useApplicationId();
  return useQuery(ABOUT_COMPANY_QUERY, { variables: { id } });
};

export const ABOUT_COMPANY_UPDATE = gql`
  mutation UpdateClientApplication(
    $id: ID!
    $companyName: String!
    $industry: String!
    $companyType: String!
  ) {
    updateClientApplication(
      input: {
        id: $id
        companyName: $companyName
        industry: $industry
        companyType: $companyType
      }
    ) {
      clientApplication {
        id
        # About Your Company
        companyName
        industry {
          name
        }
        companyType
      }
    }
  }
`;

export const useAboutCompanyUpdate = () => useMutation(ABOUT_COMPANY_UPDATE);

export const getAboutCompanyOptimisticReponse = (id, values) => ({
  __typename: "Mutation",
  updateClientApplication: {
    __typename: "UpdateClientApplicationPayload",
    clientApplication: {
      __typename: "ClientApplication",
      id,
      ...values,
      industry: {
        __typename: "Industry",
        name: values.industry,
      },
    },
  },
});

/* 3 Step. AboutRequirements */

export const ABOUT_REQUIREMENTS_QUERY = gql`
  ${clientApplicationFragment}
  query AboutRequirementsQuery($id: ID!) {
    skills(local: true) {
      label: name
      value: name
    }
    clientApplication(id: $id) {
      ...Application
    }
  }
`;

export const useAboutRequirementsQuery = () => {
  const id = useApplicationId();
  return useQuery(ABOUT_REQUIREMENTS_QUERY, { variables: { id } });
};

export const ABOUT_REQUIREMENTS_UPDATE = gql`
  mutation UpdateClientApplication(
    $id: ID!
    $skills: [String!]
    $numberOfFreelancers: String!
    $budget: Int
  ) {
    updateClientApplication(
      input: {
        id: $id
        skills: $skills
        numberOfFreelancers: $numberOfFreelancers
        budget: $budget
      }
    ) {
      clientApplication {
        id
        # About Your Requirements
        skills {
          name
        }
        numberOfFreelancers
        budget
      }
    }
  }
`;

export const getAboutRequirementsOptimisticReponse = (id, values) => ({
  __typename: "Mutation",
  updateClientApplication: {
    __typename: "UpdateClientApplicationPayload",
    clientApplication: {
      __typename: "ClientApplication",
      id,
      ...values,
      skills: values.skills.map((skill) => ({
        name: skill,
        __typename: "Skill",
      })),
    },
  },
});

export const useAboutRequirementsUpdate = () =>
  useMutation(ABOUT_REQUIREMENTS_UPDATE);

/* 4 Step. About Preferences */

export const SUBMIT_CLIENT_APPLICATION = gql`
  mutation SubmitClientApplication(
    $id: ID!
    $talentQuality: String
    $localityImportance: Int
    $acceptedGuaranteeTerms: Boolean
  ) {
    submitClientApplication(
      input: {
        id: $id
        localityImportance: $localityImportance
        acceptedGuaranteeTerms: $acceptedGuaranteeTerms
        talentQuality: $talentQuality
      }
    ) {
      clientApplication {
        id
        # About Your Preferences
        localityImportance
        acceptedGuaranteeTerms
        talentQuality
        # Status on submit
        status
        rejectionReason
      }
    }
  }
`;

export const useAboutPreferencesQuery = () => {
  const id = useApplicationId();
  return useQuery(GET_CLIENT_APPLICATION, { variables: { id } });
};

export const useAboutPreferencesSubmit = () =>
  useMutation(SUBMIT_CLIENT_APPLICATION);

export const getAboutPreferencesOptimisticResponse = (
  id,
  values,
  numberOfFreelancers,
) => {
  const { talentQuality } = values;
  let status = "ACCEPTED";
  let rejectionReason;

  // Might be better to return both reasons
  if (talentQuality === "CHEAP" || talentQuality === "BUDGET") {
    status = "REJECTED";
    rejectionReason = "CHEAP_TALENT";
  }
  if (numberOfFreelancers === "0") {
    status = "REJECTED";
    rejectionReason = "NOT_HIRING";
  }

  return {
    __typename: "Mutation",
    updateClientApplication: {
      __typename: "UpdateClientApplicationPayload",
      clientApplication: {
        __typename: "ClientApplication",
        id,
        ...values,
        status,
        rejectionReason,
      },
    },
  };
};

/* Step 5. Application Status page */

export const useClientApplication = () => {
  const id = useApplicationId();
  return useQuery(GET_CLIENT_APPLICATION, { variables: { id } });
};
