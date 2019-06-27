import React from "react";
import useViewer from "../../../hooks/useViewer";
import ClientTopbar from "./ClientTopBar";
import SpecialistTopBar from "./SpecialistTopBar";

const TopBar = props => {
  const viewer = useViewer();
  return viewer.__typename === "User" ? (
    <ClientTopbar {...props} />
  ) : (
    <SpecialistTopBar {...props} />
  );
};

export default TopBar;
