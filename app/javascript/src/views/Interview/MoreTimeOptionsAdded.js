import { Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import CallRequested from "./CallRequested";

export default function MoreTimeOptionsAdded({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  return isSpecialist ? (
    <MoreTimeOptionsAddedAsSpecialist interview={interview} />
  ) : (
    <CallRequested interview={interview} />
  );
}

function MoreTimeOptionsAddedAsSpecialist({ interview }) {
  return <Redirect to={`/interview_request/${interview.id}`} />;
}
