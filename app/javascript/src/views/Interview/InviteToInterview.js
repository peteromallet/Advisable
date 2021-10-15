import { darken } from "polished";
import { object, string } from "yup";
import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import possesive from "src/utilities/possesive";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { DialogDisclosure } from "reakit/Dialog";
import useViewer from "src/hooks/useViewer";
import SubmitButton from "src/components/SubmitButton";
import Loading from "src/components/Loading";
import {
  Modal,
  Avatar,
  Button,
  Box,
  Text,
  Stack,
  theme,
  Input,
  useModal,
} from "@advisable/donut";
import styled from "styled-components";

export const GET_TEAM_MEMBERS = gql`
  query getTeamMembers {
    currentCompany {
      id
      users {
        id
        name
        email
      }
    }
  }
`;

export const INVITE_TO_INTERVIEW = gql`
  mutation inviteUserToInterview($input: InviteUserToInterviewInput!) {
    inviteUserToInterview(input: $input) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const StyledButton = styled.button`
  border: 0px;
  border-bottom: 2px solid;
  border-color: ${theme.colors.blue200};
  margin-right: 20px;
  font-family: TTHoves;
  font-size: 16px;
  font-weight: 500;
  padding: 4px 0;
  cursor: pointer;
  outline: none;
  background: transparent;
  color: ${theme.colors.blue800};
  transition: 0.2s border-color, 0.2s color;

  &:hover {
    color: ${theme.colors.blue900};
    border-color: ${darken(0.1, theme.colors.blue200)};
  }
`;

function Member({ member, applicationId, onInvite, invited }) {
  const [inviteMember, { loading }] = useMutation(INVITE_TO_INTERVIEW, {
    variables: {
      input: {
        email: member.email,
        applicationId,
      },
    },
  });

  async function handleInvite() {
    await inviteMember();
    onInvite();
  }

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" flex={1}>
        <Avatar bg="blue100" color="blue800" name={member.name} size="xs" />
        <Text ml={2}>{member.name}</Text>
      </Box>
      {invited ? (
        <Text fontSize="sm" color="neutral500">
          Invite sent
        </Text>
      ) : (
        <Button
          size="xs"
          variant="subtle"
          loading={loading}
          onClick={handleInvite}
          aria-label={`Share with ${member.name}`}
        >
          Invite
        </Button>
      )}
    </Box>
  );
}

const validationSchema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

function InviteNewMember({ applicationId, onInvite }) {
  const { t } = useTranslation();
  const [inviteMember] = useMutation(INVITE_TO_INTERVIEW);

  const initialValues = {
    name: "",
    email: "",
  };

  const handleSubmit = async (values, formik) => {
    const { errors, data } = await inviteMember({
      variables: {
        input: {
          firstName: values.name.split(" ")?.[0],
          lastName: values.name.split(" ")?.[1],
          email: values.email,
          applicationId,
        },
      },
    });

    if (errors) {
      const errorCode = errors?.[0]?.extensions?.code;
      formik.setStatus(errorCode);
      formik.setSubmitting(false);
    } else {
      formik.resetForm();
      onInvite(data.inviteUserToInterview.user);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {(formik) => (
        <Form>
          <Text fontWeight="medium" mb={2}>
            Invite a new team member
          </Text>
          <Box width="100%" display="flex" alignItems="center">
            <Box pr={2} flex={1} display="inline-flex">
              <Field as={Input} size="sm" name="name" placeholder="Full Name" />
            </Box>
            <Box pr={2} flex={1} display="inline-flex">
              <Field
                as={Input}
                size="sm"
                name="email"
                placeholder="Email Address"
              />
            </Box>

            <SubmitButton variant="dark" size="s" disableUntilValid>
              Invite
            </SubmitButton>
          </Box>

          {formik.status && (
            <Box
              mt="3"
              bg="red100"
              padding="3"
              fontSize="s"
              color="red600"
              borderRadius="12px"
            >
              {t(`errors.${formik.status}`)}
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
}

function InviteTeamMemberModal({ modal, interview }) {
  const viewer = useViewer();
  const client = useApolloClient();
  const [invited, setInvited] = useState([]);
  const firstName = interview.specialist.firstName;
  const { data, loading } = useQuery(GET_TEAM_MEMBERS, {
    skip: !modal.visible,
  });

  const members = useMemo(() => {
    return (data?.currentCompany.users || []).filter((u) => u.id !== viewer.id);
  }, [data?.currentCompany.users, viewer.id]);

  const handleNewTeamMember = useCallback(
    (user) => {
      if (!members.find((m) => m.id === user.id)) {
        client.writeQuery({
          query: GET_TEAM_MEMBERS,
          data: {
            ...data,
            currentCompany: {
              ...data.currentCompany,
              users: [...data.currentCompany.users, user],
            },
          },
        });
      }

      setInvited([...invited, user.id]);
    },
    [client, data, invited, members],
  );

  return (
    <Modal modal={modal} label="invite to call">
      {loading && <Loading />}
      {!loading && (
        <>
          <Text
            fontSize="4xl"
            color="neutral900"
            marginBottom={1}
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            Invite others to your call with {firstName}
          </Text>
          <Text lineHeight="1.3" marginBottom={4}>
            Invite team members to your call and we&apos;ll include them in the
            calendar invite when {firstName} schedules the call. We&apos;ll also
            send them a link to {possesive(firstName)} application details.
          </Text>
          <Stack mb={8} spacing="md" divider="neutral100">
            {members.map((member) => (
              <Member
                key={member.id}
                member={member}
                applicationId={interview.application.id}
                invited={invited.includes(member.id)}
                onInvite={() => setInvited([...invited, member.id])}
              />
            ))}
          </Stack>
          <Box mb={8}>
            <InviteNewMember
              applicationId={interview.application.id}
              onInvite={handleNewTeamMember}
            />
          </Box>
          <Button onClick={modal.hide} variant="subtle">
            Done
          </Button>
        </>
      )}
    </Modal>
  );
}

export default function InviteToInterview({ interview }) {
  const modal = useModal();

  return (
    <>
      <InviteTeamMemberModal modal={modal} interview={interview} />
      <DialogDisclosure
        as={StyledButton}
        size="s"
        variant="subtle"
        mr={2}
        {...modal}
      >
        Invite Others
      </DialogDisclosure>
    </>
  );
}
