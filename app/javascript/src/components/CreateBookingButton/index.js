import { useHistory } from "react-router-dom";
import { Button } from "@advisable/donut";
import { UserCheck } from "@styled-icons/feather";

const CreateBookingButton = ({ application }) => {
  const history = useHistory();

  return (
    <Button
      width="100%"
      prefix={<UserCheck />}
      onClick={() => history.push(`/book/${application.airtableId}`)}
    >
      Start working with {application.specialist.firstName}
    </Button>
  );
};

export default CreateBookingButton;
