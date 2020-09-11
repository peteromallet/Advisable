import React from "react";
import { Box, Text } from "@advisable/donut";
import { useParams, useLocation } from "react-router-dom";
import Avatar from "../../components/Avatar";
import StarRating from "../../components/StarRating";
import MultistepMenu from "../../components/MultistepMenu";
import useViewer from "../../hooks/useViewer";
import pluralize from "../../utilities/pluralize";

const Sidebar = ({ data }) => {
  const params = useParams();
  const viewer = useViewer();
  const location = useLocation();
  const rating = data.specialist.ratings?.overall || 0;

  const isClient = viewer?.isClient || false;

  const stepCompleted = (step) => {
    const completed = location.state?.completed || [];
    return completed.indexOf(step) > -1;
  };

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
        color="blue800"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        {data.specialist.name}
      </Text>
      <Text color="neutral600" letterSpacing="-0.02em" mb="xs">
        {data.specialist.location}
      </Text>
      {rating > 0 && (
        <>
          <StarRating showNumber={false} rating={rating} />
          <Text color="neutral500" fontSize="xxs" mb="m">
            {pluralize(data.specialist.reviewsCount || 0, "review", "reviews")}
          </Text>
        </>
      )}
      <MultistepMenu>
        <MultistepMenu.Item
          isComplete={stepCompleted("SKILLS")}
          to={{
            pathname: `/request_consultation/${params.specialistId}/skills`,
            state: location.state,
          }}
        >
          Skills
        </MultistepMenu.Item>
        {!isClient && (
          <MultistepMenu.Item
            isDisabled={!stepCompleted("SKILLS")}
            isComplete={stepCompleted("DETAILS")}
            to={{
              pathname: `/request_consultation/${params.specialistId}/details`,
              state: location.state,
            }}
          >
            Company Details
          </MultistepMenu.Item>
        )}
        <MultistepMenu.Item
          isDisabled={
            isClient ? !stepCompleted("SKILLS") : !stepCompleted("DETAILS")
          }
          isComplete={stepCompleted("AVAILABILITY")}
          to={{
            pathname: `/request_consultation/${params.specialistId}/availability`,
            state: location.state,
          }}
        >
          Availability
        </MultistepMenu.Item>
        <MultistepMenu.Item
          isDisabled={!stepCompleted("AVAILABILITY")}
          isComplete={stepCompleted("TOPIC")}
          to={{
            pathname: `/request_consultation/${params.specialistId}/topic`,
            state: location.state,
          }}
        >
          Topic
        </MultistepMenu.Item>
        <MultistepMenu.Item
          isDisabled={!stepCompleted("TOPIC")}
          isComplete={stepCompleted("SEND")}
          to={{
            pathname: `/request_consultation/${params.specialistId}/send`,
            state: location.state,
          }}
        >
          Send
        </MultistepMenu.Item>
      </MultistepMenu>
    </>
  );
};

export default Sidebar;
