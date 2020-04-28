import { useMutation } from "@apollo/react-hooks";
import React, { Fragment, useEffect } from "react";
import { motion } from "framer-motion";
import CONFIRM_PROJECT from "./confirmProject.graphql";
import { Wrapper, Progress } from "./styles";
import illustration from "./illustration.png";
import { useParams, useHistory } from "react-router";

const SubmitConfirmation = ({ project }) => {
  const params = useParams();
  const history = useHistory();
  const [confirm] = useMutation(CONFIRM_PROJECT);

  useEffect(() => {
    if (project.acceptedTerms === false) {
      history.replace("terms");
    }

    if (project.depositOwed !== 0) {
      history.replace("deposit");
    }
  }, []);

  const executeConfirmation = async () => {
    const response = await confirm({
      variables: {
        input: {
          id: params.projectID,
        },
      },
    });

    const { errors } = response.data.confirmProject;
    if (errors) {
      console.log(errors);
      return;
    }

    history.push(`/projects/${params.projectID}`);
  };

  useEffect(() => {
    executeConfirmation();
  }, []);

  return (
    <Fragment>
      <Wrapper>
        <img src={illustration} alt="" />
        <h4>Setting up your project...</h4>
        <Progress>
          <motion.div
            initial={{ width: "50%" }}
            animate={{ width: "100%" }}
            transition={{ ease: "easeOut", duration: 2 }}
          />
        </Progress>
      </Wrapper>
    </Fragment>
  );
};

export default SubmitConfirmation;
