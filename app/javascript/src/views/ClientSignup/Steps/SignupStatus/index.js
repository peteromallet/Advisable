import React from "react";
import { useClientApplicationQuery } from "../../queries";
import Loading from "../../../../components/Loading";
import AcceptedStatus from "./AcceptedStatus/index";
import NotHiringStatus from "./NotHiringStatus";
import CheapStatus from "./CheapStatus";
import { motion } from "framer-motion";
import Navigation from "../Navigation";

function SignupStatus() {
  const { loading, error, data } = useClientApplicationQuery();

  if (loading || error)
    return (
      <motion.div exit>
        <Navigation error={error} />
        <Loading />
      </motion.div>
    );

  const {
    status,
    rejectionReason,
    firstName,
    lastName,
  } = data.clientApplication;

  if (status === "ACCEPTED") {
    return <AcceptedStatus firstName={firstName} lastName={lastName} />;
  } else if (rejectionReason === "NOT_HIRING") {
    return <NotHiringStatus />;
  } else {
    return <CheapStatus />;
  }
}

export default SignupStatus;
