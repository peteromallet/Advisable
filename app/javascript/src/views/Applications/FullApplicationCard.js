import { Link } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather";
import { Card, Box, Text, Button } from "@advisable/donut";

function FullApplicationCard() {
  return (
    <Card padding="30px" textAlign="center">
      <Box color="blue500" mb="16px">
        <svg fill="currentColor" viewBox="0 0 20 20" width="40px">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          ></path>
        </svg>
      </Box>
      <Text
        mb="8px"
        color="blue900"
        fontSize="24px"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        Full Application
      </Text>
      <Text fontSize="14px" lineHeight="1.3em" color="neutral700" mb="32px">
        Be instantly available for clients on Advisable by filling out a more
        thorough application
      </Text>
      <Link to="/apply">
        <Button suffix={<ArrowRight />}>Apply Now</Button>
      </Link>
      <Text mt="12px" fontSize="13px" color="neutral600">
        15 - 20 Minutes
      </Text>
      <Box
        my="32px"
        width="40px"
        height="1px"
        bg="neutral200"
        display="inline-block"
      />
      <Text
        fontSize="13px"
        lineHeight="1.4em"
        color="neutral500"
        letterSpacing="-0.02rem"
      >
        We may not have suitable projects for you at this time.
      </Text>
    </Card>
  );
}

export default FullApplicationCard;
