import React from "react";
import { useMenuState, useMenu } from "reakit";
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
        trigger={
          <Button
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            type="button"
            size="s"
            icon="more-horizontal"
          />
        }
      >
        {!props.isClient && props.task.application.trialProgram && (
          <ToggleTrial menu={menu} {...props} onToggle={menu.hide} />
        )}
        <ToggleRepeating {...props} />
        <DeleteTask {...props} />
      </Menu>
    </Box>
  );
};

export default Actions;
