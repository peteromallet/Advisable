import useViewer from "src/hooks/useViewer";

const ACCEPTED_STAGES = [
  "Invited To Interview",
  "Interview Scheduled",
  "Interview Completed",
];

export default function useUserAcceptance() {
  const viewer = useViewer();

  // Accepting condition for either client or specialist
  const isAccepted =
    viewer?.isClient || ACCEPTED_STAGES.includes(viewer?.applicationStage);

  return isAccepted;
}
