import React from "react";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { Box, useModal, Button, DialogDisclosure } from "@advisable/donut";
import RequestCallButton from "../RequestCallButton";
import PhoneModal from "./PhoneModal";
import { Title, Description, BulletListItem } from "../../styles";
import { useRequestApplicationCallback, useCoutryCode } from "../../../queries";
import { Coffee } from "@styled-icons/feather/Coffee";
import { Eye } from "@styled-icons/feather/Eye";
import { Smile } from "@styled-icons/feather/Smile";

function AcceptedStatus({ firstName, lastName }) {
  const location = useLocation();
  const [
    requestApplicationCallback,
    { called },
  ] = useRequestApplicationCallback();
  const { data } = useCoutryCode();
  const countryCode = data?.clientApplication?.country?.code;
  const fullName = `${firstName} ${lastName}`;
  const modal = useModal();
  const start = DateTime.fromISO(process.env.WORK_HOURS_START);
  const end = DateTime.fromISO(process.env.WORK_HOURS_END);
  const now = DateTime.utc();
  const isWorkingRange = now >= start && now <= end;

  return (
    <Box>
      <Title mb="m">We think you might be a good fit</Title>
      <Description mb="s">
        The final step before being able to access Advisable’s elite pool of
        talent is a ~10-minute call with us to:
      </Description>
      <BulletListItem
        text="Give you an overview of how Advisable works & how to get the most from our talent"
        Icon={Eye}
      />
      <BulletListItem
        text="Ask you a couple of clarification questions to ensure that you’re a
            good fit for Advisable"
        Icon={Coffee}
      />
      <BulletListItem
        text="Make you aware of the expectations for you as a client when dealing
            with our freelancers"
        Icon={Smile}
        mb="l"
      />
      <Box mb="l" display="flex" flexDirection={["column", "row"]}>
        <RequestCallButton
          mr={[null, "s"]}
          mb={["s", "auto"]}
          fullName={fullName}
          email={location.state?.email}
          id={location.state?.applicationId}
        >
          Schedule A Call
        </RequestCallButton>
        {isWorkingRange && (
          <DialogDisclosure
            as={Button}
            loading={called}
            variant="subtle"
            {...modal}
          >
            Call Me ASAP
          </DialogDisclosure>
        )}
        <PhoneModal
          requestApplicationCallback={requestApplicationCallback}
          countryCode={countryCode}
          modal={modal}
        />
      </Box>
    </Box>
  );
}

AcceptedStatus.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};

export default AcceptedStatus;
