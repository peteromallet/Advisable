import React from "react";
import { useApolloClient } from "@apollo/client";
import { useFavoriteArticle, useUnfavoriteArticle } from "./queries";
import useViewer from "src/hooks/useViewer";
import HeartIcon from "src/icons/duo/heart";
import composeStyles from "src/utilities/composeStyles";
import { useNotifications } from "src/components/Notifications";

const buttonClasses = composeStyles({
  base: `
    grid
    rounded-full
    place-items-center
    ring-1
    ring-inset
    ring-neutral200
    hover:ring-neutral300
  `,
  variants: {
    isFavorited: "!bg-red-100 !border-red-100",
    size: {
      sm: `h-8 min-w-[32px] hover:ring-1`,
      md: `h-10 min-w-[40px] hover:ring-2`,
    },
  },
});

function FavoriteButton({ article, size }) {
  const viewer = useViewer();
  const client = useApolloClient();
  const { notify } = useNotifications();
  const [favorite] = useFavoriteArticle(article);
  const [unfavorite] = useUnfavoriteArticle(article);
  const { isFavorited } = article;

  if (viewer.__typename === "Specialist") return null;

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
      notify("Removed from favorites");
    } else {
      notify("Added to favorites");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={buttonClasses({ isFavorited, size })}
      title={isFavorited ? "Remove from favorites" : "Favorite this project"}
      aria-label={
        isFavorited ? "Remove from favorites" : "Favorite this project"
      }
    >
      <HeartIcon
        className="mt-[2px]"
        stroke={
          isFavorited ? "var(--color-red-900)" : "var(--color-neutral-700)"
        }
        fill={isFavorited ? "var(--color-red-300)" : "var(--color-neutral-200)"}
        width="16"
      />
    </button>
  );
}

FavoriteButton.defaultProps = {
  size: "md",
};

export default FavoriteButton;
