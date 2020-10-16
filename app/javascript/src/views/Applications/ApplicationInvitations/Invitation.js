import { Text } from "@advisable/donut";
import LineClamp from "../../../components/LineClamp";
import { Invitation, Background, Content, Description, Button } from "./styles";

const InvitationComponent = ({ application, onViewInvitation }) => {
  const handleView = () => {
    onViewInvitation(application.id);
  };

  return (
    <Invitation onClick={handleView}>
      <Content>
        <Text fontSize="xl" color="white" mb="xs" fontWeight="medium">
          {application.project.primarySkill?.name}
        </Text>
        <Text mb="s" fontSize="xs" color="white" lineHeight="xs">
          {application.project.industry} {application.project.companyType}
        </Text>
        <Description>
          <LineClamp maxHeight={70}>
            {application.project.companyDescription}
          </LineClamp>
        </Description>
      </Content>
      <Button onClick={handleView}>
        View Details
        <svg width="11" height="10" viewBox="0 0 11 10">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.74224e-08 4.5L10 4.5V5.5L0 5.5L8.74224e-08 4.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7071 5L6.35355 9.35355L5.64645 8.64645L9.29289 5L5.64645 1.35355L6.35355 0.646446L10.7071 5Z"
          />
        </svg>
      </Button>
      <Background />
    </Invitation>
  );
};

export default InvitationComponent;
