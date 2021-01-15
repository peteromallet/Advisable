import { object, string } from "yup";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gql, useMutation, useQuery } from "@apollo/client";
import ActionBar from "./ActionBar";
import { Formik, Form } from "formik";
import { useParams } from "react-router";
import { Share } from "@styled-icons/ionicons-outline";
import Loading from "src/components/Loading";
import FormField from "src/components/FormField";
import { useNotifications } from "src/components/Notifications";
import SubmitButton from "src/components/SubmitButton";
import {
  useModal,
  Text,
  Modal,
  Box,
  Stack,
  Avatar,
  Columns,
  Button,
  DialogDisclosure,
} from "@advisable/donut";

const validationSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

const MEMBERS_LIST = gql`
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

const INVITE_MEMBER = gql`
  mutation inviteMemberToReview($input: InviteUserToReviewApplicationsInput!) {
    inviteUserToReviewApplications(input: $input) {
      user {
        id
      }
    }
  }
`;

function Member({ member, applicationId, projectId }) {
  const { notify } = useNotifications();
  const [inviteMember, { loading, data }] = useMutation(INVITE_MEMBER, {
    variables: {
      input: {
        email: member.email,
        applicationId,
        projectId,
      },
    },
  });

  useEffect(() => {
    if (data) {
      notify(`We have sent an invite to ${member.name}`);
    }
  }, [data, notify, member.name]);

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" flex={1}>
        <Avatar bg="blue100" color="blue800" name={member.name} size="xs" />
        <Text ml={2}>{member.name}</Text>
      </Box>
      {!data ? (
        <Button
          size="xs"
          variant="subtle"
          loading={loading}
          onClick={inviteMember}
        >
          Share
        </Button>
      ) : null}
    </Box>
  );
}

function MembersList({ members, applicationId, projectId }) {
  return (
    <Stack spacing="md" divider="neutral100">
      {members.map((member) => (
        <Member
          key={member.id}
          member={member}
          projectId={projectId}
          applicationId={applicationId}
        />
      ))}
    </Stack>
  );
}

function InviteNewMember({ applicationId, projectId, onInvite }) {
  const { t } = useTranslation();
  const { notify } = useNotifications();
  const [inviteMember] = useMutation(INVITE_MEMBER);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const handleSubmit = async (values, formik) => {
    const { errors, data } = await inviteMember({
      variables: {
        input: {
          ...values,
          projectId,
          applicationId,
        },
      },
    });

    if (errors) {
      const errorCode = errors?.[0]?.extensions?.code;
      formik.setStatus(errorCode);
      formik.setSubmitting(false);
    } else {
      notify(`We have sent an invite to ${values.firstName}`);
      onInvite(data.inviteUserToReviewApplications.user);
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
          <Columns spacing="xs" marginBottom={2}>
            <FormField size="sm" name="firstName" placeholder="First Name" />
            <FormField size="sm" name="lastName" placeholder="Last Name" />
          </Columns>

          <FormField
            size="sm"
            name="email"
            marginBottom={3}
            placeholder="Email Address"
          />

          <SubmitButton variant="dark" size="s" disableUntilValid>
            Share
          </SubmitButton>

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

function ShareApplicationModal({ modal, application }) {
  const { id } = useParams();
  const { loading, data } = useQuery(MEMBERS_LIST, {
    skip: !modal.visible,
  });

  return (
    <Modal modal={modal}>
      {loading ? <Loading /> : null}

      {!loading && data ? (
        <>
          <Text
            mb={2}
            fontSize="4xl"
            fontWeight="medium"
            letterSpacing="-0.02rem"
          >
            Share
          </Text>
          <Text color="neutral800" lineHeight="1.2" mb={5}>
            Ask a team member to review this candidate by sharing this
            application with them.
          </Text>
          <Text fontWeight="medium" mb={0.5}>
            Add a new team member
          </Text>
          <Text fontSize="sm" color="neutral700" mb={2}>
            Invite someone to join your team on Advisable to review
            applications.
          </Text>
          <Box mb={8}>
            <InviteNewMember
              projectId={id}
              applicationId={application.id}
              onInvite={modal.hide}
            />
          </Box>
          <MembersList
            members={data.currentCompany.users}
            projectId={id}
            applicationId={application.id}
          />
        </>
      ) : null}
    </Modal>
  );
}

export default function ShareApplication({ application }) {
  const modal = useModal();

  return (
    <>
      <ShareApplicationModal modal={modal} application={application} />
      <DialogDisclosure
        {...modal}
        label="Share"
        icon={<Share />}
        as={ActionBar.Item}
      />
    </>
  );
}
