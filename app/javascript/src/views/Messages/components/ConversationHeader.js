import { DotsHorizontal } from "@styled-icons/heroicons-solid";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import React from "react";
import CircularButton from "src/components/CircularButton";
import ParticipantAvatars from "./ParticipantAvatars";
import ParticipantNames from "./ParticipantNames";
import ConversationDetails from "./ConversationDetails";
import { X } from "@styled-icons/heroicons-outline";

const classNames = `
  border-b
  border-solid
  border-neutral100
`;

export default function ConversationHeader({ conversation }) {
  const dialog = useDialogState();

  return (
    <div className={classNames}>
      <div className="h-[72px] px-4 mx-auto w-full flex max-w-[700px] items-center">
        <div>
          <ParticipantAvatars
            conversation={conversation}
            size="md"
            className="mr-3"
          />
        </div>
        <div className="flex-1">
          <ParticipantNames
            conversation={conversation}
            className="font-medium tracking-tight leading-5 text-ellipsis"
          />
        </div>
        <div>
          <DialogDisclosure {...dialog}>
            {(disclosure) => (
              <CircularButton icon={DotsHorizontal} {...disclosure} />
            )}
          </DialogDisclosure>
          <Dialog
            {...dialog}
            className="fixed bg-white z-10 top-[var(--header-height)] bottom-0 right-0 left-0"
          >
            <div className="max-w-[700px] mx-auto relative p-8">
              <CircularButton
                icon={X}
                onClick={dialog.hide}
                className="absolute right-4 top-4"
              />
              <ConversationDetails conversation={conversation} />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
