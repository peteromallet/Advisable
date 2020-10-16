import { Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";

export default function RootPath() {
  const viewer = useViewer();
  const isSpecialist = viewer && viewer.__typename === "Specialist";

  if (isSpecialist) {
    return <Redirect to="/applications" />;
  }

  return <Redirect to="/projects" />;
}
