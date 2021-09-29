import React from "react";
import css from "@styled-system/css";
import { Box, Text } from "@advisable/donut";
import { Twitter, LinkedinIn } from "@styled-icons/fa-brands";

function SocialLink(props) {
  return (
    <Box
      {...props}
      as="a"
      marginLeft={4}
      target="_blank"
      css={css({
        color: "neutral500",
        "&:hover": {
          color: "neutral900",
        },
      })}
    />
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      padding={8}
      display="flex"
      justifyContent="space-between"
      borderTop="1px solid"
      borderColor="neutral100"
    >
      <Box>
        <Text fontSize="sm" color="neutral600">
          &copy; {year} Advisable
        </Text>
      </Box>
      <Box>
        <SocialLink href="https://ie.linkedin.com/company/advisable-com">
          <LinkedinIn size={20} />
        </SocialLink>
        <SocialLink href="https://twitter.com/advisablehq">
          <Twitter size={20} />
        </SocialLink>
      </Box>
    </Box>
  );
}
