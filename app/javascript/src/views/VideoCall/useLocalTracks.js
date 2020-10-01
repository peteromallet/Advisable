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
  const [localTracksError, setLocalTracksError] = useState();

  function handleMediaError(error) {
    setLocalTracksError(error.name);
    console.log(error);
  }

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
      .catch(handleMediaError);
  }, []);

  const removeLocalVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(undefined);
    }
  }, [videoTrack]);

  async function acquireTracks() {
    setIsAcquiringLocalTracks(true);
    let audioAvailable, videoAvailable, audioTrack, videoTrack;

    // First iteratre through the users devices to see if they have an audio
    // or video device. This will be used to determine which permissions we want
    // to ask for. It prevents us having to ask for video and audio permissions
    // separately.
    const devices = await navigator.mediaDevices.enumerateDevices();
    devices.forEach((device) => {
      if (!audioAvailable && device.kind === "audioinput") {
        audioAvailable = true;
      }

      if (!videoAvailable && device.kind === "videoinput") {
        videoAvailable = true;
      }
    });

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
    if (audioAvailable && !videoAvailable) {
      audioTrack = await Video.createLocalAudioTrack();
      // If video is available but audio is not, then only ask for video
    } else if (videoAvailable && !audioAvailable) {
      videoTrack = await Video.createLocalVideoTrack(videoOptions);
      // if both are available then ask for both.
    } else {
      const tracks = await Video.createLocalTracks({
        audio: true,
        video: videoOptions,
      });

      videoTrack = tracks.find((t) => t.kind === "video");
      audioTrack = tracks.find((t) => t.kind === "audio");
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
    isAcquiringLocalTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
  };
}
