import React from "react";
import useViewer from "src/hooks/useViewer";
import { PlusSm } from "@styled-icons/heroicons-solid";
import { forwardClassName } from "src/utilities/forwardClassName";
import Avatar from "../Avatar";

export default function ConnectedAvatars({ specialist, className }) {
  const viewer = useViewer();
  return (
    <div
      className={forwardClassName(
        "flex justify-center items-center",
        className,
      )}
    >
      <Avatar size="xl" src={specialist.avatar} name={specialist.name} />
      <div className="w-7 h-7 bg-blue500 rounded-full border-2 border-solid border-white -mx-2 z-10 grid place-items-center">
        <PlusSm className="w-5 h-5 text-white" />
      </div>
      <Avatar size="xl" src={viewer.avatar} name={viewer.name} />
    </div>
  );
}
