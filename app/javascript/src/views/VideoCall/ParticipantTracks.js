import React from "react";
import Publication from "./Publication";
import usePublications from "./usePublications";

export default function ParticipantTracks({ participant }) {
  const publications = usePublications(participant);

  return publications.map((publication) => (
    <Publication key={publication.kind} publication={publication} />
  ));
}
