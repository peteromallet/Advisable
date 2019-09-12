import React from "react";
import { Box, Menu, Button } from "@advisable/donut";
import DeleteTask from "./DeleteTask";
import ToggleTrial from "./ToggleTrial";
import ToggleRepeating from "./ToggleRepeating";

const Actions = props => {
  const actions = [];

  const handleDelete = (e, menu) => {
    menu.hide();
    props.onDelete();
  };

  actions.push(
    <Menu.Item key="delete" title="Delete task" onClick={handleDelete} />
  );

  return (
    <Box mr="xxs" display="inline-block">
      <Menu
        placement="bottom-end"
        aria-label="Task actions"
        trigger={<Button type="button" icon="more-horizontal" />}
      >
        {!props.isClient && <ToggleTrial {...props} />}
        <ToggleRepeating {...props} />
        <DeleteTask {...props} />
      </Menu>
    </Box>
  );
};

export default Actions;
