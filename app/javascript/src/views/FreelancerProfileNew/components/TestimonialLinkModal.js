import React from "react";
import { Heading, Modal, Text } from "@advisable/donut";
import CopyURL from "src/components/CopyURL";
import { useParams } from "react-router-dom";

export default function TestimonialLinkModal({ modal }) {
  const params = useParams();
  const { id } = params;

  return (
    <Modal modal={modal}>
      <Heading size="3xl" mb={3}>
        Just send the link to your client
      </Heading>
      <Text mb={6} lineHeight="m" color="neutral800">
        You will see your testimonial on the profile, once your client fill down
        a very simple form.
      </Text>
      <CopyURL>{`${location.origin}/review/${id}/`}</CopyURL>
    </Modal>
  );
}
