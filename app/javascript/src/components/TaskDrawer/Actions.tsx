import * as React from "react";
import { compose, graphql } from "react-apollo";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import VerticalLayout from "../VerticalLayout";
import REQUEST_QUOTE from "./requestQuote.graphql";

const Component = ({ task, isClient, requestQuote }) => {
  const [loading, setLoading] = React.useState(null);
  const { stage } = task;

  const handleRequestQuote = async () => {
    setLoading("REQUEST_QUOTE");
    await requestQuote({
      variables: {
        input: {
          task: task.id,
        }
      }
    })
    setLoading(null);
  };

  let actions = [];

  if (isClient && stage === "Not Assigned") {
    actions.push(
      <Button
        key="quote"
        styling="primary"
        disabled={loading}
        onClick={handleRequestQuote}
        loading={loading === "REQUEST_QUOTE"}
      >
        Request Quote
      </Button>
    );
    actions.push(
      <Button disabled={loading} loading={loading === "ASSIGN"} key="quote">
        Assign
      </Button>
    );
  }

  if (isClient && stage === "Quote Requested") {
    actions.push(
      <Button key="assign" styling="primary">
        Assign
      </Button>
    );
  }

  if (isClient && stage === "Quote Provided") {
    actions.push(
      <Button key="assign" styling="primary">
        Assign
      </Button>
    );
  }

  if (!isClient && stage === "Assigned") {
    actions.push(
      <Button key="start" styling="primary">
        Start Working
      </Button>
    );
  }

  if (!isClient && stage === "In Progress") {
    actions.push(
      <Button key="submit" styling="primary">
        Submit for approval
      </Button>
    );
  }

  if (isClient && stage === "Pending Approval") {
    actions.push(
      <Button key="approve" styling="primary">
        Approve
      </Button>
    );
  }

  if (actions.length > 0) {
    return (
      <VerticalLayout.Footer style={{ background: "white" }}>
        <Padding size="l">
          <ButtonGroup>{actions}</ButtonGroup>
        </Padding>
      </VerticalLayout.Footer>
    );
  }

  return null;
};

export default compose(graphql(REQUEST_QUOTE, { name: "requestQuote" }))(
  Component
);
