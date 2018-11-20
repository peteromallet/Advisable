import React, { useEffect } from 'react';
import graphqlClient from "src/graphqlClient";
import CONFIRM_PROJECT from './confirmProject.graphql'

const SubmitConfirmation = ({ match, history }) => {
  useEffect(async () => {
    const response = await graphqlClient.mutate({
      mutation: CONFIRM_PROJECT,
      variables: {
        input: {
          id: match.params.projectID,
        }
      }
    })
  }, [])

  return (
    <div>
      Setting up project...
    </div>
  )
}

export default SubmitConfirmation