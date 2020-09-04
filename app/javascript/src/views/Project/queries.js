import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";

const applicationDetails = gql`
  fragment ApplicationDetails on Application {
    id
    rate
    comment
    score
    status
    appliedAt
    introduction
    availability
    proposalComment
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
      email
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
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      status
      user {
        id
        availability
        salesPerson {
          id
          name
          image
          firstName
        }
      }
      primarySkill {
        id
        name
      }
    }
  }
`;

export const GET_CANDIDATES = gql`
  query getCandidates($id: ID!) {
    project(id: $id) {
      id
      candidates: applications(
        status: [
          "Application Accepted"
          "Interview Scheduled"
          "Interview Completed"
          "Proposed"
        ]
      ) {
        id
        rate
        score
        status
        availability
        interview {
          id
          startsAt
        }
        specialist {
          id
          name
          avatar
          location
          firstName
        }
      }
    }
  }
`;

export function useCandidates(opts) {
  return useQuery(GET_CANDIDATES, opts);
}

export const GET_CANDIDATE = gql`
  ${applicationDetails}

  query getCandidate($id: ID!) {
    application(id: $id) {
      ...ApplicationDetails

      interview {
        id
        startsAt
      }
    }
  }
`;

export function useCandidate(opts) {
  return useQuery(GET_CANDIDATE, opts);
}

export const GET_PROPOSAL = gql`
  query getPropposal($id: ID!) {
    application(id: $id) {
      id
      proposedAt
      projectType
      proposalComment
      specialist {
        id
        avatar
        firstName
        name
      }
      tasks {
        id
        name
        dueDate
        estimate
        estimateType
        flexibleEstimate
      }
    }
  }
`;

export function useProposal(opts) {
  return useQuery(GET_PROPOSAL, opts);
}

export const GET_MATCHES = gql`
  ${applicationDetails}

  query getMatches($id: ID!) {
    viewer {
      ... on User {
        id
        walkthroughComplete: hasCompletedTutorial(tutorial: "RECOMMENDATIONS")
      }
    }
    project(id: $id) {
      id
      sourcing
      user {
        id
      }
      accepted: applications(status: ["Application Accepted"]) {
        id
        specialist {
          id
          avatar
          name
        }
      }
      matches: applications(status: ["Applied"]) {
        ...ApplicationDetails
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
    refetchQueries: [
      {
        query: GET_CANDIDATES,
        variables: {
          id: projectId,
        },
      },
    ],
    update() {
      // First update the inbox queries
      const data = client.readQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
      });

      const isLastApplication = data.project.matches.length === 1;

      client.writeQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
        data: {
          ...data,
          project: {
            ...data.project,
            sourcing: isLastApplication ? false : true,
            accepted: [...data.project.accepted, application],
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

      const isLastApplication = data.project.matches.length === 1;
      const hasRequestedIntroductions = data.project.accepted.length > 0;

      client.writeQuery({
        query: GET_MATCHES,
        variables: {
          id: projectId,
        },
        data: {
          ...data,
          project: {
            ...data.project,
            sourcing: !(isLastApplication && hasRequestedIntroductions),
            matches: data.project.matches.filter((app) => {
              return app.id !== application.id;
            }),
          },
        },
      });
    },
  });
}

export const GET_AVAILABILITY = gql`
  query getAvailability {
    viewer {
      ... on User {
        id
        availability
        interviews(status: "Call Scheduled") {
          id
          startsAt
          specialist {
            id
            firstName
          }
        }
      }
    }
  }
`;

export function useAvailability(opts) {
  return useQuery(GET_AVAILABILITY, opts);
}

export const UPDATE_AVAILABILITY = gql`
  mutation UpdateAvailability($input: UpdateAvailabilityInput!) {
    updateAvailability(input: $input) {
      user {
        id
        availability
      }
    }
  }
`;

export function useUpdateAvailability() {
  return useMutation(UPDATE_AVAILABILITY);
}

export const GET_TASK = gql`
  query getTask($id: ID!) {
    task(id: $id) {
      id
      name
      dueDate
      estimate
      description
      estimateType
      flexibleEstimate
    }
  }
`;

export function useTask(opts) {
  return useQuery(GET_TASK, opts);
}

export const COMPLETE_TUTORIAL = gql`
  mutation completeTutorial($input: CompleteTutorialInput!) {
    completeTutorial(input: $input) {
      viewer {
        ... on User {
          id
          walkthroughComplete: hasCompletedTutorial(tutorial: "RECOMMENDATIONS")
        }
      }
    }
  }
`;

export function useCompleteTutorial(opts) {
  return useMutation(COMPLETE_TUTORIAL, opts);
}
