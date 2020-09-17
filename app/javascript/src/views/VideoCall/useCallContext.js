import { useContext } from "react";
import { VideoCallContext } from "./VideoCallProvider";

export default function useCallContext() {
  const context = useContext(VideoCallContext);
  if (!context) {
    throw new Error("useCallContext must be used within a VideoCallProvider");
  }
  return context;
}
