import React from "react";
import composeStyles from "src/utilities/composeStyles";
import { Tooltip } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import { useFavoriteArticle, useUnfavoriteArticle } from "../queries";

function BookmarkIcon({ width = "20", ...props }) {
  return (
    <svg fill="none" viewBox="0 0 20 20" width={width} {...props}>
      <path
        strokeWidth="2"
        d="M9.553 14.606L6 16.382V4a1 1 0 011-1h6a1 1 0 011 1v12.382l-3.553-1.776-.447-.224-.447.224z"
      ></path>
    </svg>
  );
}

const buttonClasses = composeStyles({
  base: `
    group
    flex
    justify-center
    items-center
    ring-2
    ring-inset
    ring-neutral900
    hover:ring-blue800
    rounded-full
    h-10
    w-10
    ml-auto
  `,
});

const iconClasses = composeStyles({
  base: `
    fill-none
    stroke-neutral900
    group-hover:stroke-blue800
  `,
  variants: {
    active: `fill-neutral900 group-hover:fill-blue800`,
  },
});

export default function FavoriteArticleButton({ caseStudy, className }) {
  const { isFavorited, id } = caseStudy;
  const [favorite] = useFavoriteArticle(id);
  const [unfavorite] = useUnfavoriteArticle(id);
  const notification = useNotifications();

  const handleClick = async () => {
    const action = isFavorited ? unfavorite : favorite;
    const res = await action();

    if (res.errors) {
      notification.error("Something went wrong, please try again.");
      return;
    }

    notification.notify(
      isFavorited
        ? "Removed from Favorites list"
        : "Included to Favorites list",
    );
  };

  return (
    <Tooltip placement="bottom" content={!isFavorited && "Add to Favorite"}>
      <div
        className={`${buttonClasses({ active: isFavorited })} ${className}`}
        onClick={handleClick}
      >
        <BookmarkIcon className={iconClasses({ active: isFavorited })} />
      </div>
    </Tooltip>
  );
}
