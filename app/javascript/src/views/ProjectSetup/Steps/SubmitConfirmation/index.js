import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router';
import { useSpring, animated } from "react-spring";
import graphqlClient from "src/graphqlClient";
import CONFIRM_PROJECT from "./confirmProject.graphql";
import { Wrapper, Progress } from "./styles";
import illustration from "./illustration.png";

let progressTimer;

const SubmitConfirmation = ({ project, match, history }) => {
  const [progress, setProgres] = useState(50);
  const [props] = useSpring({ width: `${progress}%`, from: { width: "0%" } });

  if (project.depositOwed !== 0) {
    return <Redirect to="deposit" />
  }

  if (project.acceptedTerms === false) {
    return <Redirect to="terms" />
  }

  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    if (progress < 90) {
      setProgres(progress + 5);
    }
  }, 1000);

  useEffect(() => {
    setTimeout(async () => {
      const response = await graphqlClient.mutate({
        mutation: CONFIRM_PROJECT,
        variables: {
          input: {
            id: match.params.projectID
          }
        }
      });

      clearInterval(progressTimer);
      const { errors } = response.data.confirmProject;
      if (errors) {
        console.log(errors);
      }
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <img src={illustration} alt="" />
      <h4>Setting up your project...</h4>
      <Progress>
        <animated.div style={props} />
      </Progress>
    </Wrapper>
  );
};

export default SubmitConfirmation;
