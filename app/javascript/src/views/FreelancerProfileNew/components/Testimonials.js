import React from "react";
import {
  Box,
  Text,
  Stack,
  Modal,
  Heading,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import CopyURL from "src/components/CopyURL";
import SectionActionButton from "./SectionActionButton";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";

function TestimonialLinkModal({ modal, url }) {
  return (
    <Modal modal={modal}>
      <Heading size="3xl" mb={3}>
        Just send the link to your client
      </Heading>
      <Text mb={6} lineHeight="m" color="neutral800">
        You will see your testimonial on the profile, once your client fill down
        a very simple form.
      </Text>
      <CopyURL>{url}</CopyURL>
    </Modal>
  );
}

export default function Testimonials({ reviews, specialist }) {
  const modal = useModal();

  const testimonials = reviews.map((r) => (
    <Testimonial key={r.id} review={r} />
  ));

  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={6} mt={3}>
        {testimonials}
      </Stack>
      <DialogDisclosure as={SectionActionButton} my={6} {...modal}>
        Request a Testimonial
      </DialogDisclosure>
      <TestimonialLinkModal
        modal={modal}
        url={`${location.origin}/review/${specialist.id}/`}
      />
    </Box>
  );
}
