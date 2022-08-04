import { Chat, Tag } from "@styled-icons/heroicons-outline";
import { Link, useModal, DialogDisclosure } from "@advisable/donut";
import React from "react";
import ConnectModal from "src/components/ConnectModal";
import Button from "src/components/Button";
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
      <Icon className={strokeColors[color]} />
    </div>
  );
};

const StyledCategoryName = ({ children }) => (
  <div className="text-xs font-medium text-neutral500">{children}</div>
);

const StyledCategoryContent = ({ children }) => (
  <div className="font-medium text-base leading-5 text-blue900">{children}</div>
);

const PRICE_RANGES = {
  low: "< $75",
  medium: "$75 - $150",
  high: "$150 - $300",
  "very high": "> $300",
}

export default function SpecialistSection({ article }) {
  const { specialist } = article;
  const { name, location, bio, priceRange } = specialist;
  const modal = useModal();

  return (
    <div className="p-14 min-w-[348px] w-[348px]">
      <div className="relative inline-block mb-2">
        <Link
          className="rounded-full overflow-hidden w-[104px] h-[104px] border-2 border-neutral100 border-solid hover:border-neutral300"
          to={specialist.profilePath}
        >
          {specialist.avatar && (
            <img
              src={specialist.avatar}
              className="h-full w-full object-cover rounded-full border-2 border-white border-solid"
            />
          )}
        </Link>
        <div className="flex justify-center items-center absolute bottom-2 right-1 rounded-full p-0.5 bg-white">
          <BadgeCheck size={24} className="fill-blue500" />
        </div>
      </div>
      
      <div>
      <Link to={specialist.profilePath} className="mb-2">
        <div className="text-2xl font-bold text-blue900 tracking-tight hover:underline decoration-blue200">
          {name}
        </div>
      </Link>
      </div>

      <div className="flex gap-1 items-center mb-4">
        <div className="flex justify-center items-center">
          <LocationMarker className="fill-neutral400" size="20px" />
        </div>
        <div className="text-neutral600 leading-none line-clamp-1">
          {location}
        </div>
      </div>

      <div className="text-neutral900 mb-6">{bio}</div>

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

        <div className="flex gap-3">
          <StyledIcon icon={Chat} color="purple" />
          <div>
            <StyledCategoryName>Available For</StyledCategoryName>
            <StyledCategoryContent>
              Consultations, Mentoring and Hands-On Work
            </StyledCategoryContent>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <StyledIcon icon={Briefcase} color="cyan" />
          <div>
            <StyledCategoryName>Previous Roles</StyledCategoryName>
            <div>See work history</div>
          </div>
        </div> */}
      </div>

      <ConnectModal modal={modal} specialist={specialist} article={article} />
      {!specialist.unavailableUntil && (
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
    </div>
  );
}
