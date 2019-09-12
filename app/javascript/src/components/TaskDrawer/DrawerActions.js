import React from "react";
import { useMenuState, useMenu } from "reakit/menu";
import { Box, Menu, Button } from "@advisable/donut";
import DeleteTask from "./DeleteTask";
import ToggleTrial from "./ToggleTrial";
import ToggleRepeating from "./ToggleRepeating";

const Actions = props => {
  const menu = useMenuState({ placement: "bottom-end" });
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
        state={menu}
        aria-label="Task actions"
        trigger={<Button type="button" icon="more-horizontal" />}
      >
        {!props.isClient && (
          <ToggleTrial menu={menu} {...props} onToggle={menu.hide} />
        )}
        <ToggleRepeating {...props} />
        <DeleteTask {...props} />
      </Menu>
    </Box>
  );
};

export default Actions;
