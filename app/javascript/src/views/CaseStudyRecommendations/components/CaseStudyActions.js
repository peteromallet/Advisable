import React from "react";
import ShareButton from "./ShareButton";
import ArchiveButton from "./ArchiveButton";
import FavoriteButton from "./FavoriteButton";
import MoveToInboxButton from "./MoveToInboxButton";

export default function CaseStudyActions({
  searchId,
  caseStudy,
  onArchive,
  onUnarchive,
}) {
  return (
    <>
      {!caseStudy.isArchived && <FavoriteButton article={caseStudy} />}
      {caseStudy.isArchived && (
        <MoveToInboxButton article={caseStudy} onArchive={onUnarchive} />
      )}
      {searchId && !caseStudy.isArchived && (
        <ArchiveButton
          searchId={searchId}
          article={caseStudy}
          onArchive={onArchive}
        />
      )}
      <ShareButton article={caseStudy} />
    </>
  );
}
