import * as React from "react";
import Rate from "./Rate";

export default (props) => {
  // If there is already a proposal for the application then redirect to that
  // proposal record.
  if (props.application.proposal) {
    props.history.replace(props.application.proposal.airtableId)
  }

  return (
    <Rate {...props} />
  )
}