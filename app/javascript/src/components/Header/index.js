import React from "react";
import FreelancerHeader from "./FreelancerHeader";
import useViewer from "src/hooks/useViewer";
import ClientHeader from "./ClientHeader";
import PublicHeader from "./PublicHeader";

export default function Header() {
  const viewer = useViewer();
  if (!viewer) return <PublicHeader />;
  if (viewer?.isClient) return <ClientHeader />;

  return <FreelancerHeader />;
}
