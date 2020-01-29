// Renders the sidebar in the freelancer active application view.
import React from "react";
import {
  Text,
  Link,
  Avatar,
  Tooltip,
  Box,
  Icon,
  Circle,
  RoundedButton,
} from "@advisable/donut";

import Sticky from "../../components/Sticky";
import { useTranslation } from "react-i18next";
import Back from "../../components/Back";
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
    <Sticky offset={98} enabled={!isMobile}>
      <Link mb="xs" to="/clients">
        <Icon
          icon="arrow-left"
          mr="xxs"
          mt="-1px"
          width={20}
          height={20}
          strokeWidth={1.5}
        />
        All Clients
      </Link>
      <Text
        as="h3"
        mb="xs"
        fontSize="xxl"
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
        <RoundedButton
          width="100%"
          variant="dark"
          prefix={<Icon icon="message-circle" />}
          onClick={() => setTalkModal(true)}
        >
          Message {application.project.user.firstName}
        </RoundedButton>
      </Box>
      <Box mt="l" mb="m">
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
  );
};

export default FreelancerActiveApplicationSidebar;
