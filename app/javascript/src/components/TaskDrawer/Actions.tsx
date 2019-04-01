import * as React from "react";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Padding from "../Spacing/Padding";
import VerticalLayout from "../VerticalLayout";

export default ({ task, isClient }) => {
  const { status } = task;

  let actions = [];

  if (isClient && status === "Not Assigned") {
    actions.push(<Button styling="primary">Request Quote</Button>);
    actions.push(<Button>Assign</Button>);
  }

  if (isClient && status === "Quote Requested") {
    actions.push(<Button styling="primary">Assign</Button>);
  }

  if (isClient && status === "Quote Provided") {
    actions.push(<Button styling="primary">Assign</Button>);
  }

  if (!isClient && status === "Assigned") {
    actions.push(<Button styling="primary">Start Working</Button>);
  }

  if (!isClient && status === "In Progress") {
    actions.push(<Button styling="primary">Submit for approval</Button>);
  }

  if (isClient && status === "Pending Approval") {
    actions.push(<Button styling="primary">Approve</Button>);
  }

  if (actions.length > 0) {
    return (
      <VerticalLayout.Footer>
        <Padding size="l">
          <ButtonGroup>{actions}</ButtonGroup>
        </Padding>
      </VerticalLayout.Footer>
    );
  }

  return null;
};
