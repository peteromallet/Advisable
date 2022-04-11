import React from "react";
import { Link } from "@advisable/donut";
import Button from "src/components/Button";
import { ChatAlt } from "@styled-icons/heroicons-solid";
import Timezone from "./Timezone";

const Availability = ({ unavailableUntil }) =>
  unavailableUntil ? (
    <div className="flex justify-items-center items-center mb-3">
      <div className="h-2.5 w-2.5 bg-neutral600 rounded-full mr-2" />
      <div className="text-neutral600 leading-5 text-lg font-[440]">
        Unavailable for hire
      </div>
    </div>
  ) : (
    <div className="flex justify-items-center items-center mb-3">
      <div className="h-2.5 w-2.5 bg-blue500 rounded-full mr-2" />
      <div className="text-neutral600 leading-5 text-lg font-[440]">
        Available for hire
      </div>
    </div>
  );

export default function SidebarCard({ specialist }) {
  return (
    <div
      id="specialistInfo"
      className="min-w-[320px] w-[320px] rounded-[40px] bg-white drop-shadow-xl p-8 pt-10 flex flex-col"
    >
      <Link
        className="mb-7 mx-auto rounded-full overflow-hidden w-48 h-48 border-4 border-neutral100 border-solid hover:border-neutral300"
        to={specialist.profilePath}
      >
        <img
          src={specialist.avatar}
          className="h-full w-full object-cover rounded-full border-2 border-white border-solid"
        />
      </Link>
      <Link to={specialist.profilePath}>
        <h4 className="font-bold text-3xl text-neutral800 hover:text-neutral800 leading-8 pt-px pb-[3px] mb-1 hover:underline decoration-neutral500">
          {specialist.name}
        </h4>
      </Link>
      <Availability unavailableUntil={specialist.unavailableUntil} />
      <Button prefix={<ChatAlt />} variant="primary" size="lg" className="mb-5">
        Connect
      </Button>
      <hr className="border-neutral200 pb-[3px] mb-2" />
      <div className="text-lg font-[450] text-blue900 leading-5 mb-1 pt-[3px] pb-px">
        {specialist.location}
      </div>
      <Timezone timezone={specialist.account.timezone} />
      <hr className="border-neutral200 mt-[3px] mb-3" />
      <p className="text-[1.0625rem] text-neutral900 leading-6 py-0.5">
        {specialist.bio}
      </p>
    </div>
  );
}
