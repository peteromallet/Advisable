import React from "react";
import { Text, Link } from "@advisable/donut";
import LoginWithLinkedin from "./LoginWithLinkedin";

function ValidationPending({ data }) {
  const { excerpt, primarySkill, specialist } = data.previousProject;

  return (
    <>
      <Text
        mb="s"
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="semibold"
      >
        Validate {primarySkill.name} project with {specialist.name}
      </Text>
      <Text lineHeight="m" color="neutral700" mb="l">
        {excerpt}
      </Text>
      <Text
        fontSize="l"
        lineHeight="m"
        color="neutral900"
        mb="m"
        fontWeight="medium"
      >
        To validate this project, please login with Linkedin below so we can
        verify who you are.
      </Text>
      <LoginWithLinkedin />
      <Text fontWeight="medium" mt="m" mb="xxs">
        Don&apos;t have a LinkedIn account?
      </Text>
      <Link.External href="mailto:hello@advisable.com">
        Verify via email
      </Link.External>
    </>
  );
}

export default ValidationPending;
