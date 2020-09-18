// Renders the desktop version of the freelancer profile
import React from "react";
import { Box, Text, Card } from "@advisable/donut";
import PreviousProjects from "./PreviousProjects";
import Testimonials from "./Testimonials";

function FreelancerProfileDesktop({ data }) {
  console.log("data", data);

  return (
    <Box maxWidth="960px" mx="auto">
      <Card minHeight="514px" bg="#fff" mt="m" p="12px" borderRadius={8} mb="l">
        <Box
          as="img"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/92b19080680791.5ce7e63751fcd.jpg"
          css="object-fit: cover;"
          width="100%"
          bg="red500"
          height="300px"
          mx="auto"
          borderRadius={8}
        />
        <Box display="flex">
          <Box
            as="img"
            src={data.specialist.avatar}
            width="148px"
            height="148px"
            borderRadius="50%"
            css="object-fit: cover;"
            mt="-32px"
            ml="l"
            mr="m"
          />
          <Box>
            <Text fontSize="xxxl" fontWeight="semibold" color="neutral900">
              {data.specialist.name}
            </Text>
            <Text>{data.specialist.location}</Text>
            <Text>{data.specialist.bio}</Text>
          </Box>
        </Box>
      </Card>
      <PreviousProjects data={data} />
      <Testimonials reviews={data.specialist.reviews} />
    </Box>
  );
}

export default FreelancerProfileDesktop;
