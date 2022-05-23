import React, { createElement } from "react";
import useViewer from "src/hooks/useViewer";
import { forwardClassName } from "src/utilities/forwardClassName";
import Avatar from "../Avatar";

export default function ConnectedAvatars({ specialist, className, icon }) {
  const viewer = useViewer();
  return (
    <div
      className={forwardClassName(
        "flex justify-center items-center",
        className,
      )}
    >
      <Avatar size="lg" src={specialist.avatar} name={specialist.name} />
      <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-solid border-white -mx-3 z-10 grid place-items-center">
        {createElement(icon, { className: "w-4 h-4 text-white" })}
      </div>
      <Avatar size="lg" src={viewer.avatar} name={viewer.name} />
    </div>
  );
}
