import React from "react";
import { Text, Box, Select } from "@advisable/donut";
import useCallContext from "./useCallContext";
import VideoTrack from "./VideoTrack";
import { useVideoInputDevices } from "./useDevices";
import useMeidaStreamTrack from "./useMediaStreamTrack";

export default function VideoInputSelection() {
  const { localTracks } = useCallContext();
  const videoInputDevices = useVideoInputDevices();
  const localVideoTrack = localTracks.find((track) => track.kind === "video");
  const mediaStreamTrack = useMeidaStreamTrack(localVideoTrack);
  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

  function handleChange(e) {
    const newDeviceId = e.target.value;
    localVideoTrack?.restart({ deviceId: { exact: newDeviceId } });
  }

  let selectionInput = (
    <Select onChange={handleChange} value={localAudioInputDeviceId || ""}>
      {videoInputDevices.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </Select>
  );

  if (videoInputDevices.length <= 1) {
    selectionInput = (
      <Text>{localVideoTrack?.mediaStreamTrack.label || "No video found"}</Text>
    );
  }

  return (
    <>
      {selectionInput}
      <Box marginTop="lg" width="435px" height="290px">
        <VideoTrack track={localVideoTrack} />
      </Box>
    </>
  );
}
