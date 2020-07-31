import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useLocation } from "react-router";

export const GET_SPECIALIST = gql`
  query specialist($id: ID!) {
    specialist(id: $id) {
      id
      avatar
      name
      firstName
      location
      reviewsCount
      ratings {
        overall
      }
      skills(projectSkills: true, limit: 10) {
        id
        name
      }
    }
  }
`;

export const useSpecialist = (props) => useQuery(GET_SPECIALIST, props);

const consultationFragment = gql`
  fragment ConsultationFields on Consultation {
    id
    topic
    status
    user {
      id
      name
      firstName
      lastName
      companyName
      availability
      timeZone
    }
    specialist {
      id
      name
    }
  }
`;

export const CREATE_CONSULTATION = gql`
  ${consultationFragment}

  mutation createConsultation($input: CreateConsultationInput!) {
    createConsultation(input: $input) {
      consultation {
        ...ConsultationFields
      }
    }
  }
`;

export const useCreateConsultation = (props) => {
  const params = useParams();
  const location = useLocation();

  return useMutation(CREATE_CONSULTATION, {
    variables: {
      input: {
        skill: location.state?.skill,
        specialist: params.specialistId,
        utmSource: location.state?.utmSource,
        utmCampaign: location.state?.utmCampaign,
        utmMedium: location.state?.utmMedium,
        gclid: location.state?.gclid,
      },
    },
    ...props,
  });
};

export const UPDATE_CONSULTATION = gql`
  ${consultationFragment}

  mutation UpdateConsultation($input: UpdateConsultationInput!) {
    updateConsultation(input: $input) {
      consultation {
        ...ConsultationFields
      }
    }
  }
`;

export const useUpdateConsultation = (props) => {
  return useMutation(UPDATE_CONSULTATION, props);
};

export const SEND_CONSULTATION = gql`
  ${consultationFragment}

  mutation sendConsultationRequest($input: SendConsultationRequestInput!) {
    sendConsultationRequest(input: $input) {
      consultation {
        ...ConsultationFields
      }
    }
  }
`;

export const useSendConsultation = (props) => {
  return useMutation(SEND_CONSULTATION, props);
};

export const GET_CONSULTATION = gql`
  ${consultationFragment}

  query consultation($id: ID!) {
    consultation(id: $id) {
      ...ConsultationFields
    }
  }
`;

export const useConsultation = (props) => useQuery(GET_CONSULTATION, props);
