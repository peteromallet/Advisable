import React from "react";
import { ArrowLeft, VideoCamera } from "@styled-icons/heroicons-solid";
import ConnectedAvatars from "./ConnectedAvatars";
import CircularButton from "../CircularButton";
import ModalHeading from "./ModalHeading";
import Loading from "../Loading";
import { useAvailability } from "./queries";
import SubHeading from "./SubHeading";
import AvailabilityForm from "../AvailabilityForm";

export default function RequestCallAvailability({
  onSubmit,
  specialist,
  onBack,
}) {
  const { data, loading, error } = useAvailability();

  return (
    <>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={onBack} />
      </div>
      <>
        <ConnectedAvatars
          specialist={specialist}
          className="mb-4"
          icon={VideoCamera}
        />
        <ModalHeading>Request a call with {specialist.firstName}</ModalHeading>
        <SubHeading>
          Request a 30 minute call with {specialist.firstName} to talk about
          your project. Please select your available times below.
        </SubHeading>
        {loading && <Loading />}
        {error && <p>Error</p>}
        {!loading && data && (
          <AvailabilityForm data={data} onSubmit={onSubmit} />
        )}
      </>
    </>
  );
}
