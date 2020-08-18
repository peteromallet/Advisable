import { useParams } from "react-router-dom";
import { gql, useMutation, useApolloClient } from "@apollo/client";

export const GET_PROJECT = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      status
      primarySkill {
        id
        name
      }
    }
  }
`;

export const GET_MATCHES = gql`
  query getMatches($id: ID!) {
    project(id: $id) {
      id
      user {
        id
        salesPerson {
          id
          name
          image
          firstName
        }
      }
      matches: applications(status: ["Applied"]) {
        id
        rate
        comment
        score
        appliedAt
        introduction
        availability
        questions {
          question
          answer
        }
        previousProjects {
          id
          title
          excerpt
          skills {
            id
            name
          }
          coverPhoto {
            id
            url
          }
        }
        specialist {
          id
          name
          firstName
          avatar
          location
          reviews {
            id
            name
            role
            avatar
            companyName
            comment
            ratings {
              overall
              skills
              availability
              adherenceToSchedule
              qualityOfWork
              communication
            }
          }
        }
      }
    }
  }
`;

export const REQUEST_INTRODUCTION = gql`
  mutation requestIntroduction($input: RequestIntroductionInput!) {
    requestIntroduction(input: $input) {
      application {
        id
        status
      }
    }
  }
`;

export function useRequestIntroduction(application) {
  const params = useParams();
  const client = useApolloClient();
  const projectId = params.id;

  return useMutation(REQUEST_INTRODUCTION, {
    optimisticResponse: {
      __typename: "Mutation",
      requestIntroduction: {
        __typename: "RequestIntroductionPayload",
        application: {
          ...application,
          status: "Application Accepted",
        },
      },
    },
    update() {
      const data = client.readQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
      });

      client.writeQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
        data: {
          ...data,
          project: {
            ...data.project,
            matches: data.project.matches.filter((app) => {
              return app.id !== application.id;
            }),
          },
        },
      });
    },
  });
}

export const REJECT_APPLICATION = gql`
  mutation rejectApplication($input: RejectApplicationInput!) {
    rejectApplication(input: $input) {
      application {
        id
        status
      }
    }
  }
`;

export function useRejectApplication(application) {
  const params = useParams();
  const client = useApolloClient();
  const projectId = params.id;

  return useMutation(REJECT_APPLICATION, {
    optimisticResponse: {
      __typename: "Mutation",
      rejectApplication: {
        __typename: "RejectApplicationPayload",
        application: {
          ...application,
          status: "Application Rejected",
        },
      },
    },
    update() {
      const data = client.readQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
      });

      client.writeQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
        data: {
          ...data,
          project: {
            ...data.project,
            matches: data.project.matches.filter((app) => {
              return app.id !== application.id;
            }),
          },
        },
      });
    },
  });
}
