import React from "react";
import { Formik, Form, Field } from "formik";
import { useDialogState } from "@advisable/donut";
import {
  Modal,
  Box,
  Button,
  Text,
  RadioGroup,
  Radio,
  Textarea,
} from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { useArchiveArticle } from "../queries";

function ArchiveForm({ article, search, modal, onArchive = () => {} }) {
  const [archive] = useArchiveArticle(search, article);

  const handleSubmit = async (values) => {
    await archive({
      variables: {
        input: {
          article: article.id,
          search: search.id,
          feedback: values.feedback,
        },
      },
    });

    modal.hide();
    onArchive();
  };

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
            Remove recommendation
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
            <SubmitButton prefix={<Trash />} variant="dark" marginRight={3}>
              Remove
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

export default function ArchiveButton({
  search,
  article,
  onArchive,
  ...props
}) {
  const modal = useDialogState();

  const handleClick = async (e) => {
    e.stopPropagation();
    modal.show();
  };

  return (
    <>
      <Modal modal={modal} label="Archive article">
        <ArchiveForm
          search={search}
          article={article}
          modal={modal}
          onArchive={onArchive}
        />
      </Modal>
      <Button
        variant="outlined"
        prefix={<Trash />}
        onClick={handleClick}
        {...props}
      >
        Remove
      </Button>
    </>
  );
}
