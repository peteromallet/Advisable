import React from "react";
import LogoMark from "src/components/LogoMark";
import useViewer from "src/hooks/useViewer";

export default function HeaderLogo() {
  const viewer = useViewer();
  const logoURL = viewer ? "/" : "https://advisable.com/";

  return (
    <a href={logoURL}>
      <LogoMark size={24} />
    </a>
  );
}
