import React, { Fragment, useEffect } from "react";
import { Spring } from "react-spring/renderprops";
import graphqlClient from "src/graphqlClient";
import CONFIRM_PROJECT from "./confirmProject.graphql";
import { Wrapper, Progress } from "./styles";
import illustration from "./illustration.png";

const SubmitConfirmation = ({
  project,
  match,
  history
}) => {

  useEffect(() => {
    if (project.depositOwed !== 0) {
      history.replace("deposit");
    }

    if (project.acceptedTerms === false) {
      history.replace("terms");
    }
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      const response = await graphqlClient.mutate({
        mutation: CONFIRM_PROJECT,
        variables: {
          input: {
            id: match.params.projectID
          }
        },
      });

      const { errors } = response.data.confirmProject;
      if (errors) {
        console.log(errors);
        return
      }

      window.location = `/projects/${match.params.projectID}`
    }, 1000);
  }, []);

  return (
    <Fragment>
      <Wrapper>
        <img src={illustration} alt="" />
        <h4>Setting up your project...</h4>
        <Progress>
          <Spring from={{ width: "50%" }} to={{ width: "100%" }}>
            {props => <div style={props} />}
          </Spring>
        </Progress>
      </Wrapper>
    </Fragment>
  );
};

export default SubmitConfirmation;
