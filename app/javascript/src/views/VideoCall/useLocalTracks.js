import Video from "twilio-video";
import { useState, useEffect, useCallback } from "react";

export const DEFAULT_VIDEO_CONSTRAINTS = {
  width: 1280,
  height: 720,
  frameRate: 24,
};

export default function useLocalTracks() {
  const [audioTrack, setAudioTrack] = useState();
  const [videoTrack, setVideoTrack] = useState();
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState();

  const getLocalVideoTrack = useCallback((newOptions) => {
    // In the DeviceSelector and FlipCameraButton components, a new video track is created,
    // then the old track is unpublished and the new track is published. Unpublishing the old
    // track and publishing the new track at the same time sometimes causes a conflict when the
    // track name is 'camera', so here we append a timestamp to the track name to avoid the
    // conflict.
    const options = {
      name: `camera-${Date.now()}`,
      ...DEFAULT_VIDEO_CONSTRAINTS,
      ...newOptions,
    };

    return Video.createLocalVideoTrack(options).then((newTrack) => {
      setVideoTrack(newTrack);
      return newTrack;
    });
  }, []);

  const removeLocalVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(undefined);
    }
  }, [videoTrack]);

  useEffect(() => {
    setIsAcquiringLocalTracks(true);
    Video.createLocalTracks({
      audio: true,
      video: {
        // In the DeviceSelector and FlipCameraButton components, a new video track is created,
        // then the old track is unpublished and the new track is published. Unpublishing the old
        // track and publishing the new track at the same time sometimes causes a conflict when the
        // track name is 'camera', so here we append a timestamp to the track name to avoid the
        // conflict.
        name: `camera-${Date.now()}`,
        ...DEFAULT_VIDEO_CONSTRAINTS,
      },
    })
      .then((tracks) => {
        const videoTrack = tracks.find((t) => t.kind === "video");
        const audioTrack = tracks.find((t) => t.kind === "audio");
        if (videoTrack) setVideoTrack(videoTrack);
        if (audioTrack) setAudioTrack(audioTrack);
      })
      .finally(() => setIsAcquiringLocalTracks(false));
  }, []);

  const localTracks = [audioTrack, videoTrack].filter((t) => t !== undefined);
  return {
    localTracks,
    isAcquiringLocalTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
  };
}
