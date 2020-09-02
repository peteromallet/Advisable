import React from "react";
import ApplicationQuestions from "./ApplicationQuestions";
import ProposalCard from "./ProposalCard";
import SpecialistReviews from "./SpecialistReviews";
import SpecialistProjects from "./SpecialistProjects";
import RecommendationComment from "./RecommendationComment";
import SpecialistIntroduction from "./SpecialistIntroduction";

export default function ApplicationDetails({ application, project }) {
  const hasProposal = application.status === "Proposed";

  return (
    <>
      {hasProposal && <ProposalCard application={application} />}
      {application.comment && (
        <RecommendationComment application={application} project={project} />
      )}
      <SpecialistIntroduction application={application} />
      {application.questions.length > 0 && (
        <ApplicationQuestions questions={application.questions} />
      )}
      {application.previousProjects.length > 0 && (
        <SpecialistProjects projects={application.previousProjects} />
      )}
      {application.specialist.reviews.length > 0 && (
        <SpecialistReviews reviews={application.specialist.reviews} />
      )}
    </>
  );
}
