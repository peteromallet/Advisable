import React from "react";
import { useMenuState } from "reakit";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Menu, Button } from "@advisable/donut";
import DeleteTask from "./DeleteTask";
import ToggleTrial from "./ToggleTrial";
import ToggleRepeating from "./ToggleRepeating";
import { MoreHorizontal } from "@styled-icons/feather/MoreHorizontal";
import { SavingIndicator } from "./styles";

const Actions = (props) => {
  const menu = useMenuState({ placement: "bottom-end" });
  const actions = [];

  const handleDelete = (e, menu) => {
    menu.hide();
    props.onDelete();
  };

  actions.push(
    <Menu.Item key="delete" title="Delete task" onClick={handleDelete} />,
  );

  return (
    <Box mr="xxs" display="flex">
      <AnimatePresence>
        {props.isSaving && (
          <SavingIndicator
            as={motion.div}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.4 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path stroke="currentColor" d="M13 7a6 6 0 11-6-6" />
            </svg>
            Saving...
          </SavingIndicator>
        )}
      </AnimatePresence>
      <Menu
        state={menu}
        aria-label="Task actions"
        trigger={
          <Button
            size="s"
            type="button"
            variant="subtle"
            aria-label="Open task actions menu"
          >
            <MoreHorizontal />
          </Button>
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
