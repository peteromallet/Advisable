import React from "react";
import { Box, Text, Select } from "@advisable/donut";
import useCallContext from "./useCallContext";
import { useAudioInputDevices } from "./useDevices";
import useMeidaStreamTrack from "./useMediaStreamTrack";
import LocalAudioLevelIndicator from "./LocalAudioLevelIndicator";

export default function AudioInputSelection() {
  const { localTracks } = useCallContext();
  const audioInputDevices = useAudioInputDevices();
  const localAudioTrack = localTracks.find((track) => track.kind === "audio");
  const mediaStreamTrack = useMeidaStreamTrack(localAudioTrack);
  const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

  function handleChange(e) {
    const newDeviceId = e.target.value;
    localAudioTrack?.restart({ deviceId: { exact: newDeviceId } });
  }

  if (audioInputDevices.length <= 1) {
    return <Text>{localAudioTrack?.mediaStreamTrack.label || "No audio"}</Text>;
  }

  return (
    <Box display="flex" alignItems="center">
      <Select onChange={handleChange} value={localAudioInputDeviceId || ""}>
        {audioInputDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </Select>
      <Box paddingLeft="md">
        <LocalAudioLevelIndicator />
      </Box>
    </Box>
  );
}
