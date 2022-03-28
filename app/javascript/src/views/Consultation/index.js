import React from "react";
import { Box } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import { useParams, Navigate } from "react-router-dom";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import GET_CONSULTATION from "./getConsultation";
import PendingConsultation from "./PendingConsultation";
import DeclinedConsultation from "./DeclinedConsultation";

const Consultation = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_CONSULTATION, {
    variables: { id },
  });

  if (loading) return <Loading />;

  if (error?.graphQLErrors[0].extensions.code === "NOT_FOUND") {
    return <NotFound />;
  }

  if (!data?.consultation?.viewerIsSpecialist) {
    return <NotFound />;
  }

  const status = data.consultation.status;

  let content;
  switch (status) {
    case "Specialist Rejected": {
      content = <DeclinedConsultation data={data} />;
      break;
    }
    case "Accepted By Specialist": {
      content = (
        <Navigate to={`/interview_request/${data.consultation.interview.id}`} />
      );
      break;
    }
    default: {
      content = <PendingConsultation data={data} />;
      break;
    }
  }

  return (
    <Box width="90%" maxWidth={600} mx="auto" py="l">
      {content}
    </Box>
  );
};

export default Consultation;