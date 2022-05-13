import React from "react";
import { useApolloClient } from "@apollo/client";
import { Tooltip } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import composeStyles from "src/utilities/composeStyles";
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
    ring-1
    ring-inset
    ring-neutral200
    hover:ring-2
    hover:ring-neutral300
    rounded-full
    h-10
    w-10
  `,
});

const iconClasses = composeStyles({
  base: `
    fill-none
    stroke-neutral600
    group-hover:stroke-neutral900
  `,
  variants: {
    active: `fill-blue500 !stroke-blue500 group-hover:fill-blue500`,
  },
});

export default function FavoriteArticleButton({ article, className }) {
  const viewer = useViewer();
  const { isFavorited } = article;
  const client = useApolloClient();
  const [favorite] = useFavoriteArticle(article);
  const [unfavorite] = useUnfavoriteArticle(article);
  const notification = useNotifications();

  if (viewer?.__typename !== "User") return null;

  const handleClick = async () => {
    client.cache.modify({
      id: client.cache.identify(article),
      fields: {
        isFavorited: () => !isFavorited,
      },
    });

    const action = isFavorited ? unfavorite : favorite;
    const res = await action();

    if (res.errors) {
      notification.error("Something went wrong, please try again.");
      return;
    }

    notification.notify(
      isFavorited ? "Removed from favorites" : "Added to favorites",
    );
  };

  return (
    <Tooltip placement="bottom" content={!isFavorited && "Add to Favorites"}>
      <button
        onClick={handleClick}
        className={buttonClasses({ active: isFavorited, className })}
        aria-label={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      >
        <BookmarkIcon className={iconClasses({ active: isFavorited })} />
      </button>
    </Tooltip>
  );
}
