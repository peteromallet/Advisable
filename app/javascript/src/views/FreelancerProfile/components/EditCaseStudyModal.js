import React from "react";
import {
  Box,
  Text,
  Link,
  Button,
  Modal,
  Heading,
  theme,
} from "@advisable/donut";
import ClockIllustration from "src/illustrations/zest/clock";
import { ExternalLink } from "@styled-icons/heroicons-solid";

export default function EditCaseStudyModal({ modal, caseStudy }) {
  return (
    <Modal
      modal={modal}
      width={440}
      label="Go to our case study editor"
      padding={12}
    >
      <Box textAlign="center" maxWidth="340px" mx="auto">
        <ClockIllustration width="200px" color={theme.colors.blue300} mb={5} />
        <Heading mb={2}>Edit case study</Heading>
        <Text lineHeight="s" color="neutral900" mb={6}>
          Any edits you make will take up to 10 minutes to be reflected live.
        </Text>
        <Link.External href={caseStudy.editorUrl} target="_blank">
          <Button size="l" prefix={<ExternalLink />}>
            Open editor
          </Button>
        </Link.External>
      </Box>
    </Modal>
  );
}
