import { useParams } from "react-router";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_VIDEO_CALL = gql`
  query videoCall($id: ID!) {
    videoCall(id: $id) {
      id
      name
      fallback
      accessToken
      zoomMeetingId
      zoomPasscode
      zoomUrl
    }
  }
`;

export function useVideoCall(opts) {
  const { id } = useParams();
  return useQuery(GET_VIDEO_CALL, { ...opts, variables: { id } });
}

const SETUP_ZOOM_FOR_VIDEO_CALL = gql`
  mutation setupZoomForVideoCall($input: SetupZoomForVideoCallInput!) {
    setupZoomForVideoCall(input: $input) {
      videoCall {
        id
        zoomUrl
        fallback
        zoomPasscode
        zoomMeetingId
      }
    }
  }
`;

export function useSetupZoomForVideoCall() {
  const { id } = useParams();
  return useMutation(SETUP_ZOOM_FOR_VIDEO_CALL, {
    variables: {
      input: {
        id,
      },
    },
  });
}

const GET_PARTICIPANT = gql`
  query getParticipant($videoCallId: ID!, $participantId: ID!) {
    videoCall(id: $videoCallId) {
      id
      participant(id: $participantId) {
        ... on User {
          id
          firstName
        }
        ... on Specialist {
          id
          avatar
          firstName
        }
      }
    }
  }
`;

export function useParticipantDetails(participantId) {
  const { id } = useParams();
  return useQuery(GET_PARTICIPANT, {
    variables: { videoCallId: id, participantId },
  });
}
