import React from "react";
import { DateTime } from "luxon";
import { Chat, Tag } from "@styled-icons/heroicons-outline";
import { Link, DialogDisclosure, Tooltip } from "@advisable/donut";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import commaSeparated from "src/utilities/commaSeparated";
import { BadgeCheck, LocationMarker } from "@styled-icons/heroicons-solid";

const StyledIcon = ({ icon: Icon, color }) => {
  const bgColors = {
    red: "bg-red-100",
    purple: "bg-purple-100",
    cyan: "bg-cyan-100",
  };

  const strokeColors = {
    red: "stroke-red-900",
    purple: "stroke-purple-900",
    cyan: "stroke-blue-900",
  };

  return (
    <div
      className={`${bgColors[color]} rounded-full p-2 min-w-[36px] w-[36px] h-[36px] flex items-center justify-center`}
    >
      <Icon size={24} className={strokeColors[color]} />
    </div>
  );
};

const StyledCategoryName = ({ children }) => (
  <div className="text-xs font-medium text-neutral500">{children}</div>
);

const StyledCategoryContent = ({ children }) => (
  <div className="text-base font-medium leading-5 text-blue900">{children}</div>
);

const PRICE_RANGES = {
  low: "< $75",
  medium: "$75 - $150",
  high: "$150 - $300",
  "very high": "> $300",
};

const COLLABORATION_TYPES = {
  hands_on: "Hands-On Work",
  consultancy: "Consultations",
  mentorship: "Mentoring",
};

export default function SpecialistSection({ article, modal, isOwner }) {
  const { specialist } = article;
  const { name, location, bio, priceRange, collaborationTypes } = specialist;
  const date = DateTime.fromISO(specialist.createdAt).toFormat("MMMM dd, yyyy");
  const availableFor = collaborationTypes.map((t) => COLLABORATION_TYPES[t]);

  return (
    <>
      <div className="inline-block relative mb-2">
        <Link
          className="flex overflow-hidden justify-center items-center rounded-full border-2 border-solid w-[104px] h-[104px] border-neutral100 hover:border-neutral300"
          to={specialist.profilePath}
        >
          <Avatar src={specialist.avatar} name={specialist.name} size="3xl" />
        </Link>
        <Tooltip
          placement="bottom-end"
          content={`${specialist.firstName} has been a verified Advisable freelancer
              since ${date}`}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://more.advisable.com/vetting"
            className="flex absolute right-1 bottom-2 justify-center items-center p-0.5 bg-white rounded-full"
          >
            <BadgeCheck size={24} className="fill-blue500" />
          </a>
        </Tooltip>
      </div>

      <div>
        <Link to={specialist.profilePath} className="mb-0.5">
          <div className="text-2xl font-bold tracking-tight hover:underline text-blue900 decoration-blue200">
            {name}
          </div>
        </Link>
      </div>

      <div className="flex gap-1 items-center mb-4">
        <div className="flex justify-center items-center">
          <LocationMarker className="fill-neutral400" size="20px" />
        </div>
        <div className="leading-none text-neutral600 line-clamp-1">
          {location}
        </div>
      </div>

      <div className="mb-6 text-neutral900">{bio}</div>

      <div className="space-y-5">
        {priceRange && (
          <div className="flex gap-3">
            <StyledIcon icon={Tag} color="red" />
            <div>
              <StyledCategoryName>Hourly Rate</StyledCategoryName>
              <StyledCategoryContent>
                {PRICE_RANGES[priceRange]}
              </StyledCategoryContent>
            </div>
          </div>
        )}

        {collaborationTypes?.length > 0 && (
          <div className="flex gap-3">
            <StyledIcon icon={Chat} color="purple" />
            <div>
              <StyledCategoryName>Available For</StyledCategoryName>
              <StyledCategoryContent>
                {commaSeparated(availableFor)}
              </StyledCategoryContent>
            </div>
          </div>
        )}

        {/* <div className="flex gap-2">
          <StyledIcon icon={Briefcase} color="cyan" />
          <div>
            <StyledCategoryName>Previous Roles</StyledCategoryName>
            <div>See work history</div>
          </div>
        </div> */}
      </div>

      {!specialist.unavailableUntil && !isOwner && (
        <div className="mt-8">
          <DialogDisclosure {...modal}>
            {(disclosure) => (
              <Button
                className="w-full"
                size="lg"
                aria-label="Talk with specialist"
                {...disclosure}
              >
                Contact
              </Button>
            )}
          </DialogDisclosure>
        </div>
      )}
    </>
  );
}
