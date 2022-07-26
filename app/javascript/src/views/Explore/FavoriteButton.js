import React from "react";
import { useApolloClient } from "@apollo/client";
import { useFavoriteArticle, useUnfavoriteArticle } from "./queries";
import HeartIcon from "src/icons/duo/heart";
import composeStyles from "src/utilities/composeStyles";

const buttonClasses = composeStyles({
  base: `
    icon-duo-neutral
    w-8
    h-8
    grid
    rounded-full
    place-items-center
    border border-solid border-neutral-200
  `,
  variants: {
    isFavorited: "!icon-solid-red",
  },
});

export default function FavoriteButton({ article }) {
  const client = useApolloClient();
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
    const res = await action();
  };

  return (
    <button
      onClick={handleClick}
      className={buttonClasses({ isFavorited })}
      title={isFavorited ? "Remove from favorites" : "Favorite this project"}
    >
      <HeartIcon
        stroke={isFavorited ? "var(--color-red-700)" : "var(--color-neutral-700)"}
        fill={isFavorited ? "var(--color-red-200)" : "var(--color-neutral-200)"}
        width="16" />
    </button>
  );
}
