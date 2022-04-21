import React from "react";
import css from "@styled-system/css";
import { Box } from "@advisable/donut";
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
    <div className="py-8 px-[90px] flex justify-between border-t border-solid border-neutral100">
      <div className="text-neutral600">&copy; {year} Advisable</div>
      <div>
        <SocialLink href="https://ie.linkedin.com/company/advisable-com">
          <LinkedinIn size={20} />
        </SocialLink>
        <SocialLink href="https://twitter.com/advisablehq">
          <Twitter size={20} />
        </SocialLink>
      </div>
    </div>
  );
}
