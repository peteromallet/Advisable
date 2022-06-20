import { VideoCamera, ChatAlt } from "@styled-icons/heroicons-solid";
import React from "react";
import ConnectedAvatars from "./ConnectedAvatars";
import ModalHeading from "./ModalHeading";
import OptionsList, { OptionsListOption } from "./OptionsList";
import SubHeading from "./SubHeading";

export default function SelectConnectionType({
  specialist,
  requestCall,
  message,
}) {
  return (
    <div className="pt-3">
      <ConnectedAvatars specialist={specialist} className="mb-4" />
      <ModalHeading>Talk with {specialist.firstName}</ModalHeading>
      <SubHeading>
        Connect with {specialist.firstName} to discuss your project and
        collaborate together.
      </SubHeading>
      <OptionsList>
        <OptionsListOption
          icon={VideoCamera}
          title="Request call"
          onClick={requestCall}
        >
          Request a 30 minute call with {specialist.firstName}
        </OptionsListOption>
        <OptionsListOption icon={ChatAlt} title="Message" onClick={message}>
          Send {specialist.firstName} a message
        </OptionsListOption>
      </OptionsList>
    </div>
  );
}
