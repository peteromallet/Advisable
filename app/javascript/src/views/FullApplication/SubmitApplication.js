import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Card, Text, Button } from "@advisable/donut";
import { SUBMIT_FULL_APPLICATION } from "./queries";

function SubmitApplication() {
  const history = useHistory();
  const [submit, { loading }] = useMutation(SUBMIT_FULL_APPLICATION);

  const handleClick = async () => {
    await submit({
      variables: {
        input: {},
      },
    });

    history.push("/apply/complete");
  };

  return (
    <Card padding="32px" mb="20px" variant="bordered">
      <Text fontSize="l" fontWeight="medium" color="blue900" mb="xxs">
        Submit for review
      </Text>
      <Text fontSize="s" color="neutral600" lineHeight="1.4em" mb="s">
        You have validated at least 3 projects and can now submit your
        application for review. This may take a couple of days.
      </Text>
      <Button onClick={handleClick} loading={loading}>
        Submit Application
      </Button>
    </Card>
  );
}

export default SubmitApplication;
