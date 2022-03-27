import React from "react";
import { Link } from "react-router-dom";

export default function SidebarCard({ specialist }) {
  console.log(specialist);
  return (
    <div className="rounded-3xl bg-white drop-shadow p-8 pt-10">
      <div className="rounded-full overflow-hidden w-48 h-48">
        <img src={specialist.avatar} className="h-full w-full object-cover" />
      </div>
      <Link to={specialist.profilePath}>
        <h4 className="font-bold text-3xl">{specialist.name}</h4>
      </Link>
      <div className="flex justify-items-center items-center">
        <div className="h-2.5 w-2.5 bg-blue-700 rounded-full mr-2" />
        <p>
          {specialist.unavailableUntil
            ? "Unavailable for hire"
            : "Available for hire"}
        </p>
      </div>
      <hr />
      <span>{specialist.location}</span>
      <hr />
      <p>{specialist.bio}</p>
    </div>
  );
}
