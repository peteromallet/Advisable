// Renders the sidebar in the freelancer active application view.
import React from "react";
import Sticky from "../../components/Sticky";
import { useTranslation } from "react-i18next";
import { Box, Text } from "@advisable/donut";
import Back from "../../components/Back";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import VideoButton from "../../components/VideoButton";
import AttributeList from "../../components/AttributeList";
import TalkModal from "../../components/TalkModal";
import { useMobile } from "../../components/Breakpoint";
import currency from "../../utilities/currency";
import BillingCycle from "./BillingCycle";

const FreelancerActiveApplicationSidebar = ({ data, tutorial }) => {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const application = data.application;
  const [talkModal, setTalkModal] = React.useState(false);

  return (
    <Layout.Sidebar>
      <Sticky offset={98} enabled={!isMobile}>
        <Back to="/clients">All Clients</Back>
        <Text
          mt="s"
          mb="xs"
          as="h3"
          fontSize="xl"
          color="blue.9"
          fontWeight="semibold"
          letterSpacing="-0.01em"
        >
          {application.project.primarySkill}
        </Text>
        <Text color="neutral.8">{application.project.user.companyName}</Text>
        <TalkModal
          isOpen={talkModal}
          onClose={() => setTalkModal(false)}
          conversationId={application.id}
          participants={[application.project.user]}
        />
        <Box mt="l">
          <Button
            block
            icon="message-circle"
            onClick={() => setTalkModal(true)}
          >
            Message {application.project.user.firstName}
          </Button>
        </Box>
        <Box mt="l" mb="l">
          <AttributeList>
            {Boolean(application.rate) && (
              <AttributeList.Item
                label="Hourly Rate"
                value={currency(parseFloat(application.rate) * 100.0)}
              />
            )}
            <AttributeList.Item
              label="Project Type"
              value={application.projectType}
            />
            {application.projectType === "Flexible" && (
              <AttributeList.Item
                label="Monthly Limit"
                value={`${application.monthlyLimit} hours`}
              />
            )}
            {application.projectType === "Flexible" && (
              <BillingCycle application={application} />
            )}
          </AttributeList>
        </Box>
        <Box mb="xl">
          <VideoButton onClick={tutorial.start}>
            {t(`tutorials.${tutorial.name}.prompt`)}
          </VideoButton>
        </Box>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default FreelancerActiveApplicationSidebar;
