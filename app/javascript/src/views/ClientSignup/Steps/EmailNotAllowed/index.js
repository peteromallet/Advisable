import React from "react";
import { Text, Link } from "@advisable/donut";
import MotionStack from "../MotionStack";
import { Title } from "../styles";

function EmailNotAllowed() {
  return (
    <MotionStack>
      <Title mb="m">Public emails are not allowed</Title>
      <Text>
        You could either email{" "}
        <Link.External href="mailto:hello@advisable.com">
          hello@advisable.com
        </Link.External>{" "}
        to tell us why you should be considered for Advisable or try again with
        your corporate email.
      </Text>
    </MotionStack>
  );
}

export default EmailNotAllowed;
