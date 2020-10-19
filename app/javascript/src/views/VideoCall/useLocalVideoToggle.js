import { useState, useCallback, useRef } from "react";
import useCallContext from "./useCallContext";

export default function useLocalVideoToggle() {
  const {
    room,
    localTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
  } = useCallContext();
  const videoTrack = localTracks.find((track) => track.name.includes("camera"));
  const [isPublishing, setIspublishing] = useState(false);
  const previousDeviceIdRef = useRef();

  const toggleVideoEnabled = useCallback(() => {
    if (!isPublishing) {
      if (videoTrack) {
        previousDeviceIdRef.current = videoTrack.mediaStreamTrack.getSettings().deviceId;
        const localTrackPublication = room?.localParticipant.unpublishTrack(
          videoTrack,
        );
        room?.localParticipant.emit("trackUnpublished", localTrackPublication);

        removeLocalVideoTrack();
      } else {
        setIspublishing(true);
        getLocalVideoTrack({
          deviceId: { exact: previousDeviceIdRef.current },
        })
          .then((track) => {
            room?.localParticipant.publishTrack(track, { priority: "low" });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setIspublishing(false));
      }
    }
  }, [
    videoTrack,
    isPublishing,
    room,
    removeLocalVideoTrack,
    getLocalVideoTrack,
  ]);

  return [!!videoTrack, toggleVideoEnabled];
}
