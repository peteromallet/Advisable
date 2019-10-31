import React from "react";
import { Text, Link } from "@advisable/donut";

const ValidationInProgress = ({ project }) => {
  return (
    <>
      <Text lineHeight="m" mb="m">
        An email has been sent to{" "}
        <Text fontWeight="medium" as="span">
          {project.contactEmail}
        </Text>{" "}
        to validate this project.
      </Text>

      <Text fontSize="s" lineHeight="s">
        If this was incorrect or you haven’t received this email, please email{" "}
        <Link.External href="mailto:hello@advisable.com">
          hello@advisable.com
        </Link.External>
        .
      </Text>
    </>
  );
};

export default ValidationInProgress;
