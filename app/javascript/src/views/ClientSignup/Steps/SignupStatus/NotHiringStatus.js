import { Button } from "@advisable/donut";
import {
  useRequestApplicationReminder,
  useLocationState,
  getRequestApplicationReminderOptimisticResponse,
} from "../../queries";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";
import Navigation from "../Navigation";

function NotHiringStatus() {
  const locationState = useLocationState();
  const [mutation, { error, called }] = useRequestApplicationReminder();

  const requestApplicationReminder = () => {
    mutation({
      variables: { input: { id: locationState.applicationId } },
      optimisticResponse: getRequestApplicationReminderOptimisticResponse(
        locationState.applicationId,
      ),
    });
  };

  return (
    <>
      <Navigation error={error} called={called} />
      <MotionStack>
        <Title mb="m">Unfortunately, we&apos;re not a good fit</Title>
        <Description>
          It seems like you&apos;re not planning on hiring freelancers over the
          next while. We&apos;ll be happy to send you a reminder in six months
          if you click the button below.
        </Description>
        <Button width={[1, "auto"]} onClick={requestApplicationReminder}>
          Remind Me
        </Button>
      </MotionStack>
    </>
  );
}

export default NotHiringStatus;
