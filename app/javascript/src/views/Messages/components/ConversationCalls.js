import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { PlusSm } from "@styled-icons/heroicons-outline";
import { VideoCamera } from "@styled-icons/heroicons-solid";
import { Modal, useModal, DialogDisclosure } from "@advisable/donut";
import ConversationCallRequest from "./ConversationCallRequest";

function EmptyState({ firstName }) {
  return (
    <p className="leading-tight text-[15px] text-neutral-700 mb-2">
      You don&apos;t have any upcoming calls with {firstName}.
    </p>
  );
}

function UpcomingCall({ interview }) {
  const time = DateTime.fromISO(interview.startsAt).toFormat(
    "dd LLLL 'at' hh:mma",
  );
  const other = interview.accounts.find((p) => !p.isViewer);
  return (
    <Link
      key={interview.id}
      to={`/interviews/${interview.id}`}
      state={{ back: true }}
      className="ring-1 ring-neutral200 hover:ring-2 hover:ring-blue400 transition-shadow p-4 rounded-sm block bg-white"
    >
      <div className="flex gap-2 items-center pb-0.5">
        <div className="w-[32px] color-blue200 bg-blue50 h-[32px] p-2 flex rounded-full">
          <VideoCamera className="fill-blue400" />
        </div>
        <div>
          <div className="font-medium text-base text-neutral800 leading-none mb-1">
            Call with {other.firstName}
          </div>
          <div className="text-sm text-neutral700 leading-none">{time}</div>
        </div>
      </div>
    </Link>
  );
}

function RequestCallAction() {
  return (
    <div className="border-2 border-dashed border-neutral100 rounded-sm p-4 hover:bg-white hover:border-blue400 hover:border-solid">
      <div className="flex gap-2 items-center pb-0.5">
        <div className="w-[32px] bg-neutral100 h-[32px] p-2 flex rounded-full">
          <PlusSm className="stroke-neutral700" />
        </div>
        <div className="font-medium text-neutral800 leading-none">
          Schedule a call
        </div>
      </div>
    </div>
  );
}

export default function ConversationCalls({ conversation }) {
  const other = conversation.participants.find((p) => !p.isViewer);
  const calls = other.upcomingInterviews;
  const modal = useModal();
  if (conversation.participants.length > 2) return null;

  return (
    <div className="p-8 border-t border-solid border-neutral100">
      <h4 className="leading-none font-medium mb-3">Upcoming calls</h4>
      <div className="space-y-3 mb-3">
        {calls.map((interview) => (
          <UpcomingCall key={interview.id} interview={interview} />
        ))}
      </div>
      {calls.length === 0 && <EmptyState firstName={other.firstName} />}
      <>
        <Modal
          width={600}
          modal={modal}
          label={`Request consultation with ${other.name}`}
        >
          <ConversationCallRequest account={other} modal={modal} />
        </Modal>
        <DialogDisclosure
          {...modal}
          className="w-full"
          aria-label="Request a call"
        >
          <RequestCallAction />
        </DialogDisclosure>
      </>
    </div>
  );
}
