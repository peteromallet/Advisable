import React from "react";
import ShareButton from "./ShareButton";
import ArchiveButton from "./ArchiveButton";
import MoveToInboxButton from "./MoveToInboxButton";

export default function CaseStudyActions({
  search,
  caseStudy,
  onArchive,
  onUnarchive,
}) {
  return (
    <>
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
      <ShareButton article={caseStudy} />
    </>
  );
}
