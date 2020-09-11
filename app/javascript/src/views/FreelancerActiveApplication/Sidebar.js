// Renders the sidebar in the freelancer active application view.
import React from "react";
import { MessageCircle } from "@styled-icons/feather";
import Sticky from "../../components/Sticky";
import { useTranslation } from "react-i18next";
import Back from "../../components/Back";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Box, Button } from "@advisable/donut";
import Heading from "../../components/Heading";
import VideoButton from "../../components/VideoButton";
import AttributeList from "../../components/AttributeList";
import TalkModal from "../../components/TalkModal";
import { useMobile } from "../../components/Breakpoint";
import currency from "../../utilities/currency";

const Component = ({ data, tutorial, tutorialModal }) => {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const dialog = useDialogState();
  const application = data.application;

  return (
    <Layout.Sidebar>
      <Sticky offset={98} enabled={!isMobile}>
        <Box paddingBottom="xl">
          <Back to="/clients">All Clients</Back>
        </Box>
        <Heading level={3}>{application.project.primarySkill?.name}</Heading>
        <Text>{application.project.user.companyName}</Text>
        <TalkModal
          dialog={dialog}
          conversationId={application.id}
          participants={[application.project.user]}
        />
        <Box paddingTop="xl">
          <DialogDisclosure
            as={Button}
            width="100%"
            variant="subtle"
            prefix={<MessageCircle />}
            {...dialog}
          >
            Message {application.project.user.firstName}
          </DialogDisclosure>
        </Box>
        <Box paddingTop="l" paddingBottom="xl">
          <AttributeList>
            {Boolean(application.rate) && (
              <AttributeList.Item
                label="Hourly Rate"
                value={currency(parseFloat(application.rate) * 100.0)}
              />
            )}
            {Boolean(application.projectType === "Flexible") && (
              <AttributeList.Item
                label="Monthly Limit"
                value={`${application.monthlyLimit} hours`}
              />
            )}
            <AttributeList.Item
              label="Project Type"
              value={application.projectType}
            />
          </AttributeList>
        </Box>
        <Box paddingBottom="xl">
          <DialogDisclosure as={VideoButton} {...tutorialModal}>
            {t(`tutorials.${tutorial}.prompt`)}
          </DialogDisclosure>
        </Box>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Component;
