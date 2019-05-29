import { get } from "lodash";
import gql from "graphql-tag";
import { useState } from "react";
import useViewer from "./useViewer";

const COMPLETE_TUTORIAL = gql`
  mutation CompleteTutorial($input: CompleteTutorialInput!) {
    completeTutorial(input: $input) {
      viewer {
        ... on User {
          id
          completedTutorials
        }
        ... on Specialist {
          id
          completedTutorials
        }
      }
    }
  }
`;

const useTutorial = (name, opts = {}) => {
  const viewer = useViewer();
  const isComplete = viewer.completedTutorials.indexOf(name) > -1;
  const autoStart = get(opts, "autoStart", false);
  const initialActive = autoStart ? !isComplete : false;
  const [isActive, setActive] = useState(initialActive);
  const client = opts.client;

  // Until react apollo has production ready support for hooks we need to pass
  // the client in to the useTutorial hook.
  if (!client) {
    throw "useTutorial is missing the 'client' option";
  }

  const start = () => setActive(true);
  const stop = () => setActive(false);

  const complete = () => {
    if (!isComplete) {
      client.mutate({
        mutation: COMPLETE_TUTORIAL,
        variables: {
          input: {
            tutorial: name,
          },
        },
      });
    }

    stop();
  };

  return {
    name,
    isActive,
    isComplete,
    start,
    stop,
    complete,
  };
};

export default useTutorial;
