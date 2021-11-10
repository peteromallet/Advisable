import React from "react";
import { useHistory } from "react-router";
import { BadgeCheck } from "@styled-icons/heroicons-solid";
import CircularButton from "src/components/CircularButton";

export default function HireAction({ application, ...props }) {
  const history = useHistory();

  const handleHire = () => {
    history.push(`/book/${application.id}`);
  };
  return (
    <CircularButton
      size="sm"
      icon={BadgeCheck}
      label="Hire"
      onClick={handleHire}
      color="blue"
      {...props}
    />
  );
}
