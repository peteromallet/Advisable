import React, { useCallback } from "react";
import styled from "styled-components";
import {
  Box,
  theme,
  Modal,
  Text,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  useModal,
} from "@advisable/donut";
import { Archive } from "@styled-icons/heroicons-solid/Archive";
import { useArchive } from "./queries";
import { Form, Formik, Field } from "formik";
import SubmitButton from "src/components/SubmitButton";

const StyledArchiveButtonLabel = styled.div`
  font-size: 13px;
  color: ${theme.colors.neutral700};
`;

const StyledArchiveButtonIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 50%;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.blue900};
  background: ${theme.colors.neutral100};
  transition: background 300ms;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledArchiveButton = styled.div`
  width: 60px;
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  flex-direction: column;

  &:hover {
    ${StyledArchiveButtonIcon} {
      color: ${theme.colors.neutral600};
      background: ${theme.colors.neutral200};
    }
  }
`;

function ArchiveForm({ article, searchId, onArchive = () => {}, modal }) {
  const [archive] = useArchive({ article, searchId });

  const handleSubmit = useCallback(
    async ({ feedback, otherFeedback }) => {
      await archive({
        variables: {
          input: {
            action: "archive",
            article: article.id,
            feedback: feedback === "_OTHER" ? otherFeedback : feedback,
          },
        },
      });

      modal.hide();
      onArchive();
    },
    [archive, article, onArchive, modal],
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
      <Modal modal={modal}>
        <ArchiveForm modal={modal} {...props} />
      </Modal>
      <StyledArchiveButton onClick={handleClick}>
        <StyledArchiveButtonIcon>
          <Archive />
        </StyledArchiveButtonIcon>
        <StyledArchiveButtonLabel>Archive</StyledArchiveButtonLabel>
      </StyledArchiveButton>
    </>
  );
}
