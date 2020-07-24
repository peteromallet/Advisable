import React, { lazy } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../../components/Loading";
import NotFound, { isNotFound } from "../NotFound";
import { GET_JOB } from "./queries";
const JobSetup = lazy(() => import("./JobSetup"));

export default function Job() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_JOB, { variables: { id } });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return <JobSetup data={data} />;
}
