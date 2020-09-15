// Renders the desktop version of the freelancer profile
import React, { useState, useEffect, useReducer } from "react";
import Masonry from "./Masonry";
import { Box, useBreakpoint, Text, Card } from "@advisable/donut";
import useFilteredProjects from "./useFilteredProjects";
import RequestConsultationButton from "./RequestConsultationButton";
import PreviousProjects from "./PreviousProjects";

function FreelancerProfileDesktop({ data }) {
  console.log("data", data);
  const projects = useFilteredProjects(data);

  const reviews = data.specialist.reviews.map((review) => {
    return (
      <Card key={review.id} my="m" p="m" borderRadius={8}>
        <Box display="flex">
          <Box
            as="img"
            width="66px"
            height="66px"
            src={review.avatar}
            css="object-fit: cover;"
            borderRadius="33px"
          />
          <Box width="320px">
            <Text>{review.name}</Text>
            <Text>{review.role}</Text>
          </Box>
          <Box width="628px">
            <Text>{review.comment}</Text>
          </Box>
        </Box>
      </Card>
    );
  });

  return (
    <Box maxWidth="1024px" mx="auto">
      <Card minHeight="514px" bg="#fff" mt="m" p="12px" borderRadius={8}>
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
      <Box>
        <Text>Testimonials</Text>
        <Box>{reviews}</Box>
      </Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
