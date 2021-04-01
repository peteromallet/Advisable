import React from "react";
import { Button, Box } from "@advisable/donut";
import {
  useRequestApplicationReminder,
  getRequestApplicationReminderOptimisticResponse,
} from "../../queries";
import { Title, Description } from "../styles";
import Navigation from "../Navigation";
import TryAgainButton from "./TryAgainButton";
import { useLocation } from "react-router";

function NotHiringStatus() {
  const location = useLocation();
  const [mutation, { error, called }] = useRequestApplicationReminder();

  const requestApplicationReminder = () => {
    mutation({
      variables: { input: { id: location.state?.applicationId } },
      optimisticResponse: getRequestApplicationReminderOptimisticResponse(
        location.state?.applicationId,
      ),
    });
  };

  return (
    <>
      <Navigation error={error} called={called} />
      <Box>
        <Title mb="m">Unfortunately, we&apos;re not a good fit</Title>
        <Description>
          It seems like you&apos;re not planning on hiring freelancers over the
          next while. We&apos;ll be happy to send you a reminder in six months
          if you click the button below.
        </Description>
        <Box display="flex" flexDirection={["column", "row"]}>
          <Button
            mb={2}
            mr={2}
            width={[1, "auto"]}
            onClick={requestApplicationReminder}
          >
            Remind Me
          </Button>
          <TryAgainButton width={[1, "auto"]} />
        </Box>
      </Box>
    </>
  );
}

export default NotHiringStatus;
