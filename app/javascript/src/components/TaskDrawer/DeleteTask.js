import React from "react";
import { Menu } from "@advisable/donut";
import { useTranslation } from "react-i18next";

const DeleteTask = ({ onDelete, task }) => {
  const { t } = useTranslation();

  let disabled;
  const allowedStages = ["Not Assigned", "Quote Requested", "QuoteProvided"];
  if (allowedStages.indexOf(task.stage) === -1) {
    disabled = true;
  }

  const handleClick = (_, menu) => {
    menu.hide();
    onDelete();
  };

  let title = t("actions.deleteTask");
  return <Menu.Item title={title} onClick={handleClick} disabled={disabled} />;
};

export default DeleteTask;
