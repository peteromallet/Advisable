import React from "react";
import { Box, Text } from "@advisable/donut";
import { useLocation, useParams, generatePath } from "react-router-dom";
import Avatar from "../../components/Avatar";
import StarRating from "../../components/StarRating";
import ProgressSteps from "../../components/ProgressSteps";
import pluralize from "../../utilities/pluralize";

const Sidebar = ({ steps, data }) => {
  const params = useParams();
  const rating = data.specialist.ratings?.overall || 0;

  return (
    <>
      <Box mb="m">
        <Avatar
          size="l"
          url={data.specialist.avatar}
          name={data.specialist.name}
        />
      </Box>
      <Text
        as="h1"
        mb="xxs"
        fontSize="xl"
        color="blue.8"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        {data.specialist.name}
      </Text>
      <Text color="neutral.6" letterSpacing="-0.02em" mb="xs">
        {data.specialist.location}
      </Text>
      {rating > 0 && <StarRating showNumber={false} rating={rating} />}
      <Text color="neutral.5" fontSize="xxs" mb="m">
        {pluralize(data.specialist.reviewsCount || 0, "review", "reviews")}
      </Text>
      <Box height={1} bg="neutral.2" my="l" />
      <ProgressSteps
        steps={steps.map(step => ({
          label: step.label,
          url: generatePath(step.path, {
            ...params,
            consultationId: params.consultationId || "undefined",
          }),
          disabled: step.disabled,
        }))}
      />
    </>
  );
};

export default Sidebar;
