import { gql } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
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
  const [completeTutorial] = useMutation(COMPLETE_TUTORIAL);
  if (!viewer) return { isComplete: true };

  const isComplete = viewer.completedTutorials.indexOf(name) > -1;
  const autoStart = opts.autoStart || false;
  const initialActive = autoStart ? !isComplete : false;
  const [isActive, setActive] = useState(initialActive);

  const start = () => setActive(true);
  const stop = () => setActive(false);

  const complete = async () => {
    if (!isComplete) {
      await completeTutorial({
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
