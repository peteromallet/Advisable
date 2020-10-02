import Video from "twilio-video";
import { useState, useEffect, useCallback } from "react";
import { getAvailableDevices } from "./utilities";

export const DEFAULT_VIDEO_CONSTRAINTS = {
  width: 1280,
  height: 720,
  frameRate: 24,
};

export default function useLocalTracks() {
  const [audioTrack, setAudioTrack] = useState();
  const [videoTrack, setVideoTrack] = useState();
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState();
  const [audioTrackError, setAudioTrackError] = useState();
  const [videoTrackError, setVideoTrackError] = useState();

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

    return Video.createLocalVideoTrack(options)
      .then((newTrack) => {
        setVideoTrack(newTrack);
        return newTrack;
      })
      .catch((err) => {
        setVideoTrackError(err.name);
      });
  }, []);

  const removeLocalVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(undefined);
    }
  }, [videoTrack]);

  async function acquireTracks() {
    setIsAcquiringLocalTracks(true);
    let audioTrack, videoTrack;

    // First iteratre through the users devices to see if they have an audio
    // or video device. This will be used to determine which permissions we want
    // to ask for. It prevents us having to ask for video and audio permissions
    // separately.
    const { isAudioAvailable, isVideoAvailable } = await getAvailableDevices();

    const videoOptions = {
      // In the VideoSelection component, a new video track is created, then
      // the old track is unpublished and the new track is published.
      // Unpublishing the old track and publishing the new track at the same
      // time sometimes causes a conflict when the rack nme is 'camera', so here
      // we append a timestamp to the track name to avoid the conflict
      name: `camera-${Date.now()}`,
      ...DEFAULT_VIDEO_CONSTRAINTS,
    };

    // If audio is available but video is not, then only ask for audio
    if (isAudioAvailable && !isVideoAvailable) {
      setVideoTrackError("NotFound");
      try {
        audioTrack = await Video.createLocalAudioTrack();
      } catch (err) {
        setAudioTrackError(err.name);
      }
      // If video is available but audio is not, then only ask for video
    } else if (isVideoAvailable && !isAudioAvailable) {
      setAudioTrackError("NotFound");
      try {
        videoTrack = await Video.createLocalVideoTrack(videoOptions);
      } catch (err) {
        setVideoTrackError(err.name);
      }
      // if both are available then ask for both.
    } else {
      try {
        const tracks = await Video.createLocalTracks({
          audio: true,
          video: videoOptions,
        });

        videoTrack = tracks.find((t) => t.kind === "video");
        audioTrack = tracks.find((t) => t.kind === "audio");
      } catch (err) {
        setAudioTrackError(err.name);
        setVideoTrackError(err.name);
      }
    }

    if (videoTrack) setVideoTrack(videoTrack);
    if (audioTrack) setAudioTrack(audioTrack);

    setIsAcquiringLocalTracks(false);
  }

  useEffect(() => {
    acquireTracks();
  }, []);

  const localTracks = [audioTrack, videoTrack].filter((t) => t !== undefined);
  return {
    localTracks,
    audioTrackError,
    videoTrackError,
    isAcquiringLocalTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
  };
}
