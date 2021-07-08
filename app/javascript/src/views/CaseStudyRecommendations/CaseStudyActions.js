import React from "react";
import ShareButton from "./ShareButton";
import ArchiveButton from "./ArchiveButton";
import FavoriteButton from "./FavoriteButton";
import MoveToInboxButton from "./MoveToInboxButton";

export default function CaseStudyActions({
  search,
  caseStudy,
  onArchive,
  onUnarchive,
}) {
  return (
    <>
      <FavoriteButton article={caseStudy} />
      {caseStudy.isArchived ? (
        <MoveToInboxButton
          search={search}
          article={caseStudy}
          onArchive={onUnarchive}
        />
      ) : (
        <ArchiveButton
          search={search}
          article={caseStudy}
          onArchive={onArchive}
        />
      )}
      <ShareButton article={caseStudy} />
    </>
  );
}
