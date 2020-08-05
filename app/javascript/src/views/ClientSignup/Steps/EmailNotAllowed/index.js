import React from "react";
import { Link } from "@advisable/donut";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";

function EmailNotAllowed() {
  return (
    <MotionStack>
      <Title mb="m">Personal emails are not allowed</Title>
      <Description>
        Please try again with your company email address. If you don&apos;t have
        a company email address, you can email us at{" "}
        <Link.External href="mailto:hello@advisable.com">
          hello@advisable.com
        </Link.External>{" "}
        to tell us why you should be considered.
      </Description>
    </MotionStack>
  );
}

export default EmailNotAllowed;
