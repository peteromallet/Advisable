import React, { cloneElement } from "react";
import styled from "styled-components";
import { Box, Text, Link } from "@advisable/donut";
import Button from "src/components/Button";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import PaintRollerIllustration from "src/illustrations/zest/paintroller";
import CandidateIllustration from "src/illustrations/zest/candidate";
import ThumbsupIllustration from "src/illustrations/zest/thumbsup";

export const StyledHeader = styled(Text)`
  background: linear-gradient(90deg, #00199b, #00cbbf);
  letter-spacing: -0.04em;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function Section({ illustration, header, description }) {
  return (
    <div className="flex flex-row gap-5 md:flex-col">
      {illustration && (
        <div className="mb-3">
          {cloneElement(illustration, { className: "w-[132px]" })}
        </div>
      )}
      <div>
        <h5 className="mb-1.5 text-lg font-medium leading-tight">{header}</h5>
        <p className="text-neutral-800">{description}</p>
      </div>
    </div>
  );
}

export default function AccountCreated() {
  return (
    <div className="p-8 pb-16 mb-10 rounded-lg shadow-xl lg:p-14 lg:pb-20">
      <Box
        display="flex"
        alignItems={{ _: "start", m: "center" }}
        flexDirection="column"
      >
        <StyledHeader className="mb-3 font-serif text-4xl font-semibold md:text-center">
          Get your projects featured
        </StyledHeader>
        <p className="mx-auto mb-14 text-lg md:text-center max-w-[520px] text-neutral-800">
          To get your work featured and join our network of independent talent,
          you can begin your application below.
        </p>
        <Box
          display="grid"
          gridTemplateColumns={{ m: "repeat(3, 25.3%)" }}
          gridTemplateRows={{ s: "repeat(3, auto)" }}
          justifyContent="space-around"
          gridRowGap={{ m: 0, _: 8 }}
          mb={[9, 10, 12, 16]}
        >
          <Section
            illustration={<PaintRollerIllustration />}
            header="Show off your best achievements"
            description="Our profiles help tell the story of the most impressive projects you've executed."
          />
          <Section
            illustration={<CandidateIllustration />}
            header="Be discovered for opportunities"
            description="We recommend you to clients who need your expertise for meaningful projects."
          />
          <Section
            illustration={<ThumbsupIllustration />}
            header="Join a network of brilliant peers"
            description="Access a private network featuring talented peers from across hundreds of skills."
          />
        </Box>
        <Link
          to="/freelancers/apply"
          className="block mx-auto w-full md:inline md:w-auto"
        >
          <Button
            size="lg"
            suffix={<ArrowRight />}
            className="w-full md:w-auto"
          >
            Get Featured
          </Button>
        </Link>
      </Box>
    </div>
  );
}
