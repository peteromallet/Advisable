import React, { useCallback } from "react";
import {
  Box,
  Modal,
  Text,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  useModal,
} from "@advisable/donut";
import { Archive } from "@styled-icons/heroicons-solid/Archive";
import { useArchive } from "../queries";
import { Form, Formik, Field } from "formik";
import SubmitButton from "src/components/SubmitButton";
import IconButton from "src/components/IconButton";

function ArchiveForm({ article, searchId, onArchive = () => {}, modal }) {
  const [archive] = useArchive({ article, searchId });

  const handleSubmit = useCallback(
    async ({ feedback, otherFeedback }) => {
      await archive({
        variables: {
          input: {
            action: "archive",
            article: article.id,
            search: searchId,
            feedback: feedback === "_OTHER" ? otherFeedback : feedback,
          },
        },
      });

      modal.hide();
      onArchive();
    },
    [archive, article, onArchive, modal, searchId],
  );

  const primarySkill =
    article.skills.find((s) => s.primary) || article.skills[0];

  return (
    <Formik
      initialValues={{ feedback: "", otherFeedback: undefined }}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Text letterSpacing="-0.04rem" fontSize="4xl" fontWeight={500} mb={2}>
            Archive
          </Text>
          <Text
            fontSize="lg"
            lineHeight="24px"
            fontWeight="350"
            marginBottom={6}
          >
            Help us improve your recommendations by letting us know why you
            don&apos;t think this recommendation is a good fit.
          </Text>
          <RadioGroup marginBottom={6}>
            <Field
              as={Radio}
              type="radio"
              name="feedback"
              value="Just doesn't seem like a good fit"
            >
              Just doesn&apos;t seem like a good fit
            </Field>
            <Field
              as={Radio}
              type="radio"
              name="feedback"
              value="Not suitable for SaaS industry"
            >
              Not suitable for SaaS industry
            </Field>
            <Field
              as={Radio}
              type="radio"
              name="feedback"
              value={`Not interested in ${primarySkill?.skill?.name}`}
            >
              Not interested in {primarySkill?.skill?.name}
            </Field>
            <Field as={Radio} type="radio" name="feedback" value="_OTHER">
              Other
            </Field>
          </RadioGroup>
          {formik.values.feedback === "_OTHER" && (
            <Field
              as={Textarea}
              name="otherFeedback"
              placeholder="Feedback"
              marginBottom={6}
              autoFocus
            />
          )}
          <Box paddingTop={2}>
            <SubmitButton variant="dark" marginRight={3}>
              Archive
            </SubmitButton>
            <Button onClick={modal.hide} variant="subtle">
              Cancel
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default function ArchiveButton(props) {
  const modal = useModal();

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      modal.show();
    },
    [modal],
  );

  return (
    <>
      <Modal modal={modal} label="Archive article">
        <ArchiveForm modal={modal} {...props} />
      </Modal>
      <IconButton icon={Archive} onClick={handleClick} label="Archive" />
    </>
  );
}
