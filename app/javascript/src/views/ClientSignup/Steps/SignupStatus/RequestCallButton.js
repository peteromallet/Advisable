import PropTypes from "prop-types";
import { Button } from "@advisable/donut";
import { Phone } from "@styled-icons/feather";
import calendly from "../../../../utilities/calendly";

const RequestCallButton = ({ children, ...props }) => {
  const handleSubmit = () => {
    calendly(
      "https://calendly.com/advisable-marketing/advisable-application-call",
      {
        a2: props.id,
        full_name: props.fullName,
        email: props.email,
      },
    );
  };

  return (
    <Button
      variant="secondary"
      prefix={<Phone />}
      {...props}
      onClick={handleSubmit}
    >
      {children}
    </Button>
  );
};

RequestCallButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string,
};

export default RequestCallButton;
