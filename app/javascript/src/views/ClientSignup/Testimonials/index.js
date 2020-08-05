import React from "react";
import { Text, Box, Link } from "@advisable/donut";
import { Sidebar, BackgroundImage } from "./styles";
import StarRating from "./StarRating";
import trustpilot from "./trustpilot.png";
import background from "./bg.png";
import { Quotes, Quote, Logos, Logo } from "./styles";
import TESTIMONIALS from "./data";
import useInterval from "../../../hooks/useInterval";

const DELAY = 4000;

const Testimonials = () => {
  const [current, setCurrent] = React.useState(0);

  const { resetInterval } = useInterval(() => {
    if (current === TESTIMONIALS.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }, DELAY);

  const handleLogoClick = (i) => {
    resetInterval();
    setCurrent(i);
  };

  return (
    <Sidebar>
      <StarRating />
      <BackgroundImage src={background} alt="background image" />
      <Box position="absolute" right="24px" top="24px" zIndex={2}>
        <Link.External
          href="https://www.trustpilot.com/review/advisable.com"
          target="_blank"
        >
          <Box
            width={120}
            height={30}
            css={`
              background-size: cover;
              background-image: url(${trustpilot});
            `}
          />
        </Link.External>
      </Box>
      <Box width="100%" zIndex={2}>
        <Quotes current={current}>
          {TESTIMONIALS.map((t, i) => (
            <Quote key={i} isCurrent={current === i}>
              <Text
                color="white"
                fontSize="xxl"
                lineHeight="xl"
                fontWeight="medium"
                mb="m"
              >
                "{t.content}"
              </Text>
              <Text color="white" fontSize="xs" fontWeight="semibold" mb="xxs">
                {t.name}
              </Text>
              <Text color="white" fontSize="xs" mb="xxs">
                {t.role}
              </Text>
              <Text color="white" fontSize="xs" color="white.6">
                {t.company}
              </Text>
            </Quote>
          ))}
        </Quotes>
        <Logos>
          {TESTIMONIALS.map((t, i) => (
            <Logo
              key={i}
              onClick={() => handleLogoClick(i)}
              isCurrent={current === i}
              css={`
                background-image: url(${t.logo});
              `}
            />
          ))}
        </Logos>
      </Box>
    </Sidebar>
  );
};

export default Testimonials;
