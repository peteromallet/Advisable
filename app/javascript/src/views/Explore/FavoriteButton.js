import React from "react";
import { useApolloClient } from "@apollo/client";
import { useFavoriteArticle, useUnfavoriteArticle } from "./queries";
import HeartIcon from "src/icons/duo/heart";
import composeStyles from "src/utilities/composeStyles";
import { useNotifications } from "src/components/Notifications";

const buttonClasses = composeStyles({
  base: `
    w-8
    h-8
    grid
    rounded-full
    place-items-center
    border border-solid border-neutral-200
  `,
  variants: {
    isFavorited: "!bg-red-100 !border-red-100",
  },
});

export default function FavoriteButton({ article }) {
  const client = useApolloClient();
  const { notify } = useNotifications();
  const [favorite] = useFavoriteArticle(article);
  const [unfavorite] = useUnfavoriteArticle(article);
  const { isFavorited } = article;

  const handleClick = async () => {
    client.cache.modify({
      id: client.cache.identify(article),
      fields: {
        isFavorited: () => !isFavorited,
      },
    });

    const action = isFavorited ? unfavorite : favorite;
    await action();

    if (isFavorited) {
      notify("Removed from favorites")
    } else {
      notify("Added to favorites")
    }
  };

  return (
    <button
      onClick={handleClick}
      className={buttonClasses({ isFavorited })}
      title={isFavorited ? "Remove from favorites" : "Favorite this project"}
    >
      <HeartIcon
        className="mt-[2px]"
        stroke={isFavorited ? "var(--color-red-900)" : "var(--color-neutral-700)"}
        fill={isFavorited ? "var(--color-red-300)" : "var(--color-neutral-200)"}
        width="16" />
    </button>
  );
}
