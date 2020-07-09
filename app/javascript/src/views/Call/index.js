import React, { useEffect } from "react";
import { connect } from "twilio-video";
import useViewer from "../../hooks/useViewer";
import { Artstation } from "@styled-icons/fa-brands";

const client =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzFhMGNjMWI4YzNkY2ZkNDQ1MzViOWM5MGNjYWUzZTU0LTE1OTQyNDc2MTUiLCJpc3MiOiJTSzFhMGNjMWI4YzNkY2ZkNDQ1MzViOWM5MGNjYWUzZTU0Iiwic3ViIjoiQUNjMDI5MWU0MzIwMDY5ZGQ5NjdmNjNlNTlkM2MxODcwZSIsImV4cCI6MTU5NDI1MTIxNSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQ2xpZW50IiwidmlkZW8iOnt9fX0.FBd3Iu3ePCSYpHwfpz67NYROip0AK2PgSB8rGMe0iDQ";

const specialist =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzFhMGNjMWI4YzNkY2ZkNDQ1MzViOWM5MGNjYWUzZTU0LTE1OTQyNDc2NDIiLCJpc3MiOiJTSzFhMGNjMWI4YzNkY2ZkNDQ1MzViOWM5MGNjYWUzZTU0Iiwic3ViIjoiQUNjMDI5MWU0MzIwMDY5ZGQ5NjdmNjNlNTlkM2MxODcwZSIsImV4cCI6MTU5NDI1MTI0MiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiU3BlY2lhbGlzdCIsInZpZGVvIjp7fX19.j4-QH-P6MaZBK95Ce09eV1pAjVlQe4yDDN4KSGmhvi4";

function useRoom(name) {
  const viewer = useViewer();
  const token = viewer.isClient ? client : specialist;
  const [room, setRoom] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [participants, setParticipants] = React.useState([]);

  useEffect(() => {
    connect(token, {
      audio: true,
      name,
      video: { width: 800 },
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
      style={{ width: "800px", height: "500px", background: "#eee" }}
    />
  );
}

export default function Call() {
  const { loading, participants } = useRoom("Dunder Mifflin");

  return (
    <div>
      {loading && <>connecting...</>}
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </div>
  );
}
