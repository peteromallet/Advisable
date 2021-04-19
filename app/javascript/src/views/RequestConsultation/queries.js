import { gql } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useParams, useLocation } from "react-router";
import viewerFields from "../../graphql/fragments/viewerFields.graphql";

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
  ${viewerFields}

  mutation createConsultation($input: CreateConsultationInput!) {
    createConsultation(input: $input) {
      viewer {
        ...ViewerFields
      }
      consultation {
        ...ConsultationFields
      }
    }
  }
`;

export const useCreateConsultation = () => {
  const params = useParams();
  const location = useLocation();

  const [mutate, state] = useMutation(CREATE_CONSULTATION, {
    update(cache, response) {
      if (!response.errors) {
        cache.writeQuery({
          query: VIEWER,
          data: {
            viewer: response.data.createConsultation.viewer,
          },
        });
      }
    },
  });

  const create = useCallback(
    async (input) => {
      return await mutate({
        variables: {
          input: {
            ...input,
            skill: location.state?.skill,
            specialist: params.specialistId,
            utmSource: location.state?.utmSource,
            utmCampaign: location.state?.utmCampaign,
            utmMedium: location.state?.utmMedium,
            gclid: location.state?.gclid,
          },
        },
      });
    },
    [mutate, location, params.specialistId],
  );

  return [create, state];
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
