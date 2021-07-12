import React, { useState } from "react";
import styled from "styled-components";
import { Upload } from "@styled-icons/heroicons-solid/Upload";
import { DialogDisclosure } from "reakit/Dialog";
import { Formik, Form } from "formik";
import {
  theme,
  Modal,
  Stack,
  Avatar,
  Button,
  Skeleton,
  Box,
  useModal,
  Text,
  Textarea,
} from "@advisable/donut";
import { useTeamMembers } from "../Settings/ClientSettings/Team/queries";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import InviteTeamMember from "src/components/InviteTeamMember";
import { useShareArticle } from "./queries";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";

const StyledShareButtonLabel = styled.div`
  font-size: 13px;
  color: ${theme.colors.neutral700};
`;

const StyledShareButtonIcon = styled.div`
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

const StyledShareButton = styled.div`
  width: 60px;
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  line-height: 1;

  &:hover {
    ${StyledShareButtonIcon} {
      color: ${theme.colors.neutral600};
      background: ${theme.colors.neutral200};
    }
  }
`;

function Member({ user, onSelect }) {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" flex={1}>
        <Avatar bg="blue100" color="blue900" name={user.name} size="xs" />
        <Text marginLeft={2}>{user.name}</Text>
      </Box>
      <Button size="xs" variant="subtle" onClick={() => onSelect(user)}>
        Share
      </Button>
    </Box>
  );
}

function MembersList({ onSelect }) {
  const viewer = useViewer();
  const { data, loading } = useTeamMembers();

  const members = data?.currentCompany?.users || [];
  const membersWithoutViewer = members.filter((u) => u.id !== viewer.id);

  if (loading) {
    return (
      <Stack spacing="md" divider="neutral100">
        <Skeleton height="12px" />
        <Skeleton height="12px" />
      </Stack>
    );
  }

  if (membersWithoutViewer.length > 0) {
    return (
      <Stack spacing="md" divider="neutral100">
        {membersWithoutViewer.map((u) => (
          <Member key={u.id} user={u} onSelect={onSelect} />
        ))}
      </Stack>
    );
  }

  return null;
}

function SelectTeamMember({ onSelect }) {
  return (
    <>
      <Box marginBottom={8}>
        <Text mb={3} fontSize="sm" color="neutral500">
          Team
        </Text>
        <MembersList onSelect={onSelect} />
      </Box>
      <Text mb={3} fontSize="sm" color="neutral500">
        Invite a team member
      </Text>
      <InviteTeamMember onInvite={onSelect} />
    </>
  );
}

function ShareMessage({ article, modal, user }) {
  const [share] = useShareArticle();
  const { notify } = useNotifications();

  const handleSubmit = async (values) => {
    await share({
      variables: {
        input: {
          with: user.id,
          article: article.id,
          message: values.message,
        },
      },
    });
    notify(`We have shared this article with ${user.name}`);
    modal.hide();
  };

  return (
    <>
      <Box
        padding={3}
        marginBottom={4}
        border="1px solid"
        borderRadius="12px"
        borderColor="neutral200"
      >
        <Text fontWeight={500} lineHeight="20px" mb={2}>
          {article.title}
        </Text>
        <Text fontSize="xs" color="neutral600" lineHeight="20px">
          {article.subtitle}
        </Text>
      </Box>
      <Formik initialValues={{ message: "" }} onSubmit={handleSubmit}>
        <Form>
          <FormField
            autoFocus
            as={Textarea}
            name="message"
            marginBottom={6}
            placeholder="Include a message... (optional)"
          />
          <SubmitButton>Share</SubmitButton>
        </Form>
      </Formik>
    </>
  );
}

function ShareCaseStudyModal({ modal, article }) {
  const [teamMember, setTeamMember] = useState(null);

  return (
    <>
      <Text fontSize="4xl" fontWeight={600} marginBottom={2}>
        Share
      </Text>
      <Text marginBottom={6}>
        Share this case study with another member of your team.
      </Text>
      {teamMember ? (
        <ShareMessage user={teamMember} article={article} modal={modal} />
      ) : (
        <SelectTeamMember onSelect={setTeamMember} />
      )}
    </>
  );
}

export default function ShareButton({ article }) {
  const modal = useModal();

  return (
    <>
      <Modal modal={modal}>
        <ShareCaseStudyModal article={article} modal={modal} />
      </Modal>
      <StyledShareButton as={DialogDisclosure} {...modal}>
        <StyledShareButtonIcon>
          <Upload />
        </StyledShareButtonIcon>
        <StyledShareButtonLabel>Share</StyledShareButtonLabel>
      </StyledShareButton>
    </>
  );
}
