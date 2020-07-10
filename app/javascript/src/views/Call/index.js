import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "twilio-video";
import useViewer from "../../hooks/useViewer";

function useRoom(name) {
  const viewer = useViewer();
  const [room, setRoom] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [participants, setParticipants] = React.useState([]);

  useEffect(() => {
    connect(viewer.videoToken, {
      audio: true,
      name,
      video: { width: 2500 },
    }).then(
      (room) => {
        setRoom(room);
        setLoading(false);
        setParticipants(Array.from(room.participants.values()));
      },
      (error) => {
        console.error(`Unable to connect to Room: ${error.message}`);
      },
    );
  }, []);

  useEffect(() => {
    if (!room) return;
    const participantConnected = (participant) =>
      setParticipants((prev) => [...prev, participant]);
    const participantDisconnected = (participant) =>
      setParticipants((prev) => prev.filter((p) => p !== participant));
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  return { room, loading, participants };
}

function usePublications(participant) {
  const [publications, setPublications] = React.useState([]);

  useEffect(() => {
    // Reset the publications when the 'participant' variable changes.
    setPublications(Array.from(participant.tracks.values()));

    const publicationAdded = (publication) =>
      setPublications((prevPublications) => [...prevPublications, publication]);
    const publicationRemoved = (publication) =>
      setPublications((prevPublications) =>
        prevPublications.filter((p) => p !== publication),
      );

    participant.on("trackPublished", publicationAdded);
    participant.on("trackUnpublished", publicationRemoved);
    return () => {
      participant.off("trackPublished", publicationAdded);
      participant.off("trackUnpublished", publicationRemoved);
    };
  }, [participant]);

  return publications;
}

function useTrack(publication) {
  const [track, setTrack] = React.useState(publication && publication.track);

  useEffect(() => {
    // Reset the track when the 'publication' variable changes.
    setTrack(publication && publication.track);

    if (publication) {
      const removeTrack = () => setTrack(null);

      publication.on("subscribed", setTrack);
      publication.on("unsubscribed", removeTrack);
      return () => {
        publication.off("subscribed", setTrack);
        publication.off("unsubscribed", removeTrack);
      };
    }
  }, [publication]);

  return track;
}

function Participant({ participant }) {
  const publications = usePublications(participant);

  return publications.map((publication) => (
    <Publication key={publication.kind} publication={publication} />
  ));
}

function Publication({ publication }) {
  const track = useTrack(publication);
  if (!track) return null;

  if (track.kind === "video") {
    return <VideoPublication track={track} />;
  }

  if (track.kind === "audio") {
    return <AudioTrack track={track} />;
  }

  return null;
}

function AudioTrack({ track }) {
  const ref = React.useRef(null);

  useEffect(() => {
    ref.current = track.attach();
    ref.current.setAttribute("data-cy-audio-track-name", track.name);
    document.body.appendChild(ref.current);
    return () => track.detach().forEach((el) => el.remove());
  }, [track]);

  return null;
}

function VideoPublication({ track }) {
  const ref = React.useRef(null);

  useEffect(() => {
    const el = ref.current;
    track.attach(el);

    return () => {
      track.detach(el);
    };
  }, [track]);

  return (
    <video
      ref={ref}
      style={{
        width: 800,
        height: 450,
        background: "#eee",
        borderRadius: "20px",
        marginBottom: 20,
        boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.4)",
      }}
    />
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function Connected({ room, participants }) {
  const publications = usePublications(room.localParticipant);

  return (
    <Container>
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}

      {publications.map((publication) => (
        <Publication key={publication.kind} publication={publication} />
      ))}
    </Container>
  );
}

export default function Call() {
  const { loading, ...rest } = useRoom("Dunder Mifflin");

  return loading ? <div>connecting...</div> : <Connected {...rest} />;
}
