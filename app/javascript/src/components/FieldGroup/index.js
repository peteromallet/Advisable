// Used to render a group of fields side by side
import React from "react";
import { FieldGroup as FieldGroupContainer, FieldGroupItem } from "./styles";

const FieldGroup = ({ spacing, children }) => {
  return (
    <FieldGroupContainer spacing={spacing}>
      {React.Children.map(children, child => {
        if (child === null) return null;
        return <FieldGroupItem spacing={spacing}>{child}</FieldGroupItem>;
      })}
    </FieldGroupContainer>
  );
};

export default FieldGroup;
