import React from "react";
import { InboxIn } from "@styled-icons/heroicons-solid/InboxIn";
import { useUnarchive } from "../queries";
import IconButton from "src/components/IconButton";

export default function MoveToInboxButton({ article, onSuccess = () => {} }) {
  const [unarchive] = useUnarchive({ article });

  const handleClick = async () => {
    await unarchive({
      variables: {
        input: {
          action: "unarchive",
          article: article.id,
        },
      },
    });

    onSuccess();
  };

  return <IconButton icon={InboxIn} onClick={handleClick} label="Unarchive" />;
}
