import React from "react";
import Icon from "../Icon";
import { Tag as TagStyles, TagName, RemoveTag, Primary } from "./styles";

const Tag = ({ children, onRemove, isPrimary, onSelectPrimary }) => {
  return (
    <TagStyles isPrimary={isPrimary}>
      {onSelectPrimary && (
        <Primary type="button" isPrimary={isPrimary} onClick={onSelectPrimary}>
          <svg width="14" height="13" fill="none" viewBox="0 0 14 13">
            <path
              fill="currentColor"
              d="M7 0l1.975 4.282 4.682.555-3.462 3.201.92 4.625L7 10.36l-4.114 2.303.918-4.625L.343 4.837l4.682-.555L7 0z"
            ></path>
          </svg>
        </Primary>
      )}
      <TagName>{children}</TagName>
      <RemoveTag type="button" onClick={onRemove}>
        <Icon icon="x" width={16} height={16} />
      </RemoveTag>
    </TagStyles>
  );
};

export default Tag;
