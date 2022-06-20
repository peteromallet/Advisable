import React from "react";
import { Link, useLocation } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import { useBreakpoint, useModal, DialogDisclosure } from "@advisable/donut";
import CircularButton from "src/components/CircularButton";
import FavoriteArticleButton from "src/views/Feed/components/FavoriteArticleButton";
import { ArrowSmLeft } from "@styled-icons/heroicons-outline";
import EditCaseStudyButton from "./EditCaseStudyButton";
import ShareArticleButton from "./ShareArticleButton";
import Avatar from "src/components/Avatar";
import ConnectModal from "src/components/ConnectModal";
import Button from "src/components/Button";
import { ChatAlt } from "@styled-icons/heroicons-solid";

const Availability = ({ unavailableUntil }) => {
  const color = unavailableUntil ? "bg-neutral600" : "bg-blue500";
  return (
    <div className="flex justify-items-center items-center">
      <div className={`h-[6px] w-[6px] ${color} rounded-full mr-1`} />
      <div className="text-xs font-[430] text-neutral600 leading-3 line-clamp-1 pr-2">
        {unavailableUntil ? "Unavailable for hire" : "Available for hire"}
      </div>
    </div>
  );
};

export default function SpecialistBar({ article }) {
  const viewer = useViewer();
  const location = useLocation();
  const modal = useModal();
  const { back } = location.state || {};
  const { specialist } = article;
  const sUp = useBreakpoint("sUp");
  const TalkButton = sUp ? Button : CircularButton;

  return (
    <div className="sticky top-[var(--header-height)] left-0 right-0 bg-white h-[72px] shadow transition-all z-10">
      <div className="px-6 sm:px-8 md:px-0 w-full md:max-w-[696px] lg:max-w-[960px] xl:max-w-[1198px] h-full mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {back && (
            <CircularButton
              aria-label="Go back"
              icon={ArrowSmLeft}
              className="mr-4 hidden sm:block"
              onClick={() => window.history.back()}
            />
          )}
          <div className="flex gap-3 items-center h-full">
            <Link to={specialist.profilePath}>
              <Avatar src={specialist.avatar} name={specialist.name} />
            </Link>
            <div>
              <Link to={specialist.profilePath}>
                <div className="text-base sm:text-lg leading-none sm:leading-none text-neutral900 font-[620] mb-1 tracking-tight line-clamp-1 pr-3">
                  {specialist.name}
                </div>
              </Link>
              <Availability unavailableUntil={specialist.unavailableUntil} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <EditCaseStudyButton article={article} />
          <ShareArticleButton slug={article.slug} />
          <FavoriteArticleButton article={article} />
          {article.specialist.id !== viewer?.id &&
            !article.specialist.unavailableUntil && (
              <>
                <ConnectModal modal={modal} specialist={article.specialist} />
                <DialogDisclosure {...modal}>
                  {(disclosure) => (
                    <TalkButton {...disclosure} icon={ChatAlt} color="blue">
                      Talk with {article.specialist.firstName}
                    </TalkButton>
                  )}
                </DialogDisclosure>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
