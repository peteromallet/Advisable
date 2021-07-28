import React from "react";
import { Bookmark } from "@styled-icons/heroicons-solid/Bookmark";
import { useFavorite } from "../queries";
import IconButton from "src/components/IconButton";

export default function FavoriteButton({ article }) {
  const [favorite] = useFavorite({
    article,
  });

  const handleClick = async () => {
    favorite();
  };

  return (
    <IconButton
      icon={Bookmark}
      variant={article.isSaved ? "yellow" : "subtle"}
      label={article.isSaved ? "Favorited" : "Favorite"}
      onClick={handleClick}
    />
  );
}
