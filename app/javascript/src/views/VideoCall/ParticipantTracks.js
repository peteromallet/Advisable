import React from "react";
import Publication from "./Publication";
import usePublications from "./usePublications";
import NoVideo from "./NoVideo";

export default function ParticipantTracks({ participant, avatar }) {
  const publications = usePublications(participant);
  const hasVideo = publications.some((pub) => pub.kind === "video");

  const publicationElements = publications.map((publication) => (
    <Publication key={publication.kind} publication={publication} />
  ));

  return (
    <>
      {!hasVideo && <NoVideo avatar={avatar} />}
      {publicationElements}
    </>
  );
}
