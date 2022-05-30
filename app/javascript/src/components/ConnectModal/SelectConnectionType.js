import {
  ChevronRight,
  VideoCamera,
  ChatAlt,
} from "@styled-icons/heroicons-solid";
import React, { createElement } from "react";
import ConnectedAvatars from "./ConnectedAvatars";

function ConnectionTypeOption({ title, children, icon, ...props }) {
  return (
    <div
      className="p-4 flex gap-4 items-center border-2 border-solid border-neutral100 rounded-lg cursor-pointer hover:border-blue600"
      {...props}
    >
      <div className="w-10 h-10 bg-blue100 rounded-full flex-shrink-0 grid place-items-center">
        {createElement(icon, { className: "w-5 h-5 text-blue500" })}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <p className="text-neutral800 leading-snug">{children}</p>
      </div>
      <div className="flex-shrink-0">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
}

export default function SelectConnectionType({
  specialist,
  requestCall,
  message,
}) {
  return (
    <div className="p-8">
      <ConnectedAvatars specialist={specialist} className="mb-4" />
      <h3 className="text-2xl font-semibold tracking-tight leading-none mb-2 text-center">
        Talk with {specialist.firstName}
      </h3>
      <p className="text-center font-inter mb-8 max-w-[360px] mx-auto">
        Connect with {specialist.firstName} to discuss your project and
        collaborate together.
      </p>
      <div className="flex flex-col gap-3">
        <ConnectionTypeOption
          icon={VideoCamera}
          title="Free consultation"
          onClick={requestCall}
        >
          Request a free 30 minute consultation call with {specialist.firstName}
        </ConnectionTypeOption>
        <ConnectionTypeOption icon={ChatAlt} title="Message" onClick={message}>
          Send {specialist.firstName} a message
        </ConnectionTypeOption>
      </div>
    </div>
  );
}
