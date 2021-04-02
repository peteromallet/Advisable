import useViewer from "./useViewer";

export default function useFeatureFlag(name) {
  const viewer = useViewer();
  const features = viewer?.features || [];
  return features.includes(name);
}
