import React from "react";
import useViewer from "src/hooks/useViewer";
import AppHeader from "./AppHeader";
import PublicHeader from "./PublicHeader";

export default function Header() {
  const viewer = useViewer();
  if (!viewer) return <PublicHeader />;

  return <AppHeader />;
}
