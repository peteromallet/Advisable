import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation } from "react-router";

export const useLocationState = () => {
  const location = useLocation();
  return location.state;
};

const clientApplicationFragment = gql`
  fragment Application on ClientApplication {
    id
    firstName
    lastName
    # About Your Company
    companyName
    industry {
      id
      name
    }
    companyType
    # About Your Requirements
    skills {
      id
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

export const useClientApplicationQuery = () => {
  const state = useLocationState();
  return useQuery(GET_CLIENT_APPLICATION, {
    variables: { id: state?.applicationId },
  });
};

/* 0 Step. Start Client Application */

export const START_CLIENT_APPLICATION = gql`
  ${clientApplicationFragment}
  mutation StartClientApplication($input: StartClientApplicationInput!) {
    startClientApplication(input: $input) {
      clientApplication {
        ...Application
      }
    }
  }
`;

export const useStartClientApplication = () =>
  useMutation(START_CLIENT_APPLICATION, { onError: () => {} });

/* 2 Step. About Company */

export const ABOUT_COMPANY_QUERY = gql`
  ${clientApplicationFragment}
  query ClientApplication($id: ID!) {
    industries {
      id
      label: name
      value: name
    }
    skills(local: true) {
      id
      label: name
      value: name
    }
    clientApplication(id: $id) {
      ...Application
    }
  }
`;

export const useAboutCompanyQuery = () => {
  const state = useLocationState();
  return useQuery(ABOUT_COMPANY_QUERY, {
    variables: { id: state?.applicationId },
  });
};

export const ABOUT_COMPANY_UPDATE = gql`
  mutation UpdateClientApplication($input: UpdateClientApplicationInput!) {
    updateClientApplication(input: $input) {
      clientApplication {
        id
        # About Your Company
        companyName
        industry {
          id
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
        id: "industry",
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
  const state = useLocationState();
  return useQuery(ABOUT_REQUIREMENTS_QUERY, {
    variables: { id: state?.applicationId },
  });
};

export const ABOUT_REQUIREMENTS_UPDATE = gql`
  mutation UpdateClientApplication($input: UpdateClientApplicationInput!) {
    updateClientApplication(input: $input) {
      clientApplication {
        id
        # About Your Requirements
        skills {
          id
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
        id: `skill_${skill}`,
        __typename: "Skill",
      })),
    },
  },
});

export const useAboutRequirementsUpdate = () =>
  useMutation(ABOUT_REQUIREMENTS_UPDATE);

/* 4 Step. About Preferences */

export const SUBMIT_CLIENT_APPLICATION = gql`
  mutation SubmitClientApplication($input: SubmitClientApplicationInput!) {
    submitClientApplication(input: $input) {
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

export const useAboutPreferencesSubmit = () =>
  useMutation(SUBMIT_CLIENT_APPLICATION);

export const getAboutPreferencesOptimisticResponse = (
  id,
  values,
  numberOfFreelancers,
) => {
  const { talentQuality } = values;
  let status = "Application Accepted";
  let rejectionReason = null;

  // Might be better to return both reasons
  if (talentQuality === "CHEAP" || talentQuality === "BUDGET") {
    status = "Application Rejected";
    rejectionReason = "CHEAP_TALENT";
  }
  if (numberOfFreelancers === "0") {
    status = "Application Rejected";
    rejectionReason = "NOT_HIRING";
  }

  return {
    __typename: "Mutation",
    submitClientApplication: {
      __typename: "SubmitClientApplicationPayload",
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

export const REQUEST_APPLICATION_REMINDER = gql`
  mutation RequestApplicationReminder(
    $input: RequestApplicationReminderInput!
  ) {
    requestApplicationReminder(input: $input) {
      clientApplication {
        id
        status
      }
    }
  }
`;

export const useRequestApplicationReminder = () =>
  useMutation(REQUEST_APPLICATION_REMINDER);

export const getRequestApplicationReminderOptimisticResponse = (id) => {
  return {
    __typename: "Mutation",
    requestApplicationReminder: {
      __typename: "RequestApplicationReminderPayload",
      clientApplication: {
        __typename: "ClientApplication",
        id,
        status: "Requested Reminder",
      },
    },
  };
};

export const REQUEST_APPLICATION_CALLBACK = gql`
  mutation RequestApplicationCallback(
    $input: RequestApplicationCallbackInput!
  ) {
    requestApplicationCallback(input: $input) {
      clientApplication {
        id
      }
    }
  }
`;

export const useRequestApplicationCallback = () =>
  useMutation(REQUEST_APPLICATION_CALLBACK);

export const QUERY_COUNTRY_CODE = gql`
  query ClientApplication($id: ID!) {
    clientApplication(id: $id) {
      id
      country {
        id
        code
      }
    }
  }
`;

export const useCoutryCode = () => {
  const state = useLocationState();
  return useQuery(QUERY_COUNTRY_CODE, {
    variables: { id: state?.applicationId },
  });
};
