// Renders the sidebar in the freelancer active application view.
import React from "react";
import { MessageCircle } from "@styled-icons/feather/MessageCircle";
import Sticky from "src/components/Sticky";
import { useTranslation } from "react-i18next";
import Back from "src/components/Back";
import Layout from "src/components/Layout";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Stack, Box, Button, Text } from "@advisable/donut";
import VideoButton from "src/components/VideoButton";
import AttributeList from "src/components/AttributeList";
import SendMessageModal from "src/components/SendMessageModal";
import { useMobile } from "src/components/Breakpoint";
import currency from "src/utilities/currency";
import StopWorking from "./StopWorking";

const Component = ({ data, tutorial, tutorialModal }) => {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const dialog = useDialogState();
  const application = data.application;
  const canStopWorking = application.status === "Working";

  return (
    <Layout.Sidebar>
      <Sticky offset={98} enabled={!isMobile}>
        <Box paddingBottom="xl">
          <Back to="/clients">All Clients</Back>
        </Box>
        <Text
          fontSize="xl"
          lineHeight="m"
          color="neutral900"
          fontWeight="semibold"
          letterSpacing="-0.015em"
        >
          {application.project.primarySkill?.name}
        </Text>
        <Text>{application.project.user.companyName}</Text>
        <SendMessageModal
          dialog={dialog}
          participants={[application.project.user]}
        />
        <Stack spacing="sm" paddingTop="xl">
          <DialogDisclosure
            as={Button}
            width="100%"
            variant="subtle"
            prefix={<MessageCircle />}
            {...dialog}
          >
            Message {application.project.user.firstName}
          </DialogDisclosure>
          {canStopWorking && (
            <StopWorking
              clientName={application.project.user.companyName}
              applicationId={application.id}
            />
          )}
        </Stack>
        <Box paddingTop="l" paddingBottom="xl">
          <AttributeList>
            {application.invoiceRate && (
              <AttributeList.Item
                label="Hourly Rate"
                value={currency(application.invoiceRate)}
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
