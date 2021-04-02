import React from "react";
import { useHistory, useLocation } from "react-router";
import { Button, Box } from "@advisable/donut";
import TryAgainButton from "./TryAgainButton";
import { Title, Description } from "../styles";
import { useRequestApplicationReminder } from "../../queries";

function NotHiringStatus() {
  const location = useLocation();
  const history = useHistory();
  const [mutation, { loading }] = useRequestApplicationReminder();

  const requestApplicationReminder = async () => {
    await mutation({
      variables: { input: { id: location.state?.applicationId } },
    });
    history.push("/clients/signup/thank-you-reminder-set");
  };

  return (
    <>
      <Title mb="m">Unfortunately, we&apos;re not a good fit</Title>
      <Description>
        It seems like you&apos;re not planning on hiring freelancers over the
        next while. We&apos;ll be happy to send you a reminder in six months if
        you click the button below.
      </Description>
      <Box display="flex" flexDirection={["column", "row"]}>
        <Button
          mb={2}
          mr={2}
          width={[1, "auto"]}
          loading={loading}
          onClick={requestApplicationReminder}
        >
          Remind Me
        </Button>
        <TryAgainButton width={[1, "auto"]} />
      </Box>
    </>
  );
}

export default NotHiringStatus;
