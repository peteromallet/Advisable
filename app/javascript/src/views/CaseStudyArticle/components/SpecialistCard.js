import React from "react";
import { motion } from "framer-motion";
import { Link, useBreakpoint } from "@advisable/donut";
import Timezone from "./Timezone";
import Availability from "./Availability";
import ConnectModal from "src/components/ConnectModal";
import useConnectModal from "src/components/ConnectModal/useConnectModal";
import Button from "src/components/Button";
import { ChatAlt, VideoCamera } from "@styled-icons/heroicons-outline";

export default function SidebarCard({ specialist }) {
  const connectModal = useConnectModal();

  return (
    <motion.div
      id="specialistInfo"
      className="hidden lg:flex min-w-[264px] xl:min-w-[320px] w-[264px] xl:w-[320px] rounded-[28px] xl:rounded-[40px] bg-white shadow-articleCard p-6 xl:p-8 pt-8 xl:pt-10 flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        className="mb-7 mx-auto rounded-full overflow-hidden w-40 xl:w-48 h-40 xl:h-48 border-4 border-neutral100 border-solid hover:border-neutral300"
        to={specialist.profilePath}
      >
        {specialist.avatar && (
          <img
            src={specialist.avatar}
            className="h-full w-full object-cover rounded-full border-2 border-white border-solid"
          />
        )}
      </Link>
      <Link to={specialist.profilePath}>
        <h4 className="font-semibold tracking-tight xl:text-3xl text-2xl text-neutral800 hover:text-neutral800 xl:leading-8 leading-6 pt-px pb-[3px] mb-1 hover:underline decoration-neutral500">
          {specialist.name}
        </h4>
      </Link>
      <Availability unavailableUntil={specialist.unavailableUntil} />
      <ConnectModal state={connectModal} specialist={specialist} />
      <div className="pt-4 flex flex-col gap-2">
        <Button
          size="lg"
          prefix={<VideoCamera />}
          onClick={connectModal.requestCall}
        >
          Request call
        </Button>
        <Button
          size="lg"
          prefix={<ChatAlt />}
          variant="outlined"
          onClick={connectModal.message}
        >
          Message
        </Button>
      </div>
      <hr className="border-neutral200 mt-5 pb-[3px]" />
      <div className="py-2">
        <div className="text-[15px] xl:text-lg font-[450] text-neutral900 truncate">
          {specialist.location}
        </div>
        <Timezone timezone={specialist.account.timezone} />
      </div>
      <hr className="border-neutral200 mt-[3px] mb-3" />
      <p className="text-sm xl:text-[1.0625rem] text-neutral900 leading-5 xl:leading-6 pt-px pb-[3px] xl:py-0.5">
        {specialist.bio}
      </p>
    </motion.div>
  );
}
