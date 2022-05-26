import React from "react";
import { Link } from "react-router-dom";

export default function ProfileLink({ conversation }) {
  const other = conversation.participants.find((p) => !p.isViewer);

  if (!other.specialist) return null;

  return (
    <Link
      target="_blank"
      to={other.specialist.profilePath}
      className="text-blue-800 hover:text-blue-600"
    >
      View profile
    </Link>
  );
}
