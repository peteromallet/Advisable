import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useNotifications } from "src/components/Notifications";
import { gql, useMutation } from "@apollo/client";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Box, Columns } from "@advisable/donut";

const validationSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

const USER_FIELDS = gql`
  fragment MemberFields on User {
    id
    name
    avatar
  }
`;

export const INVITE_MEMBER = gql`
  ${USER_FIELDS}

  mutation createUserForCompany($input: CreateUserForCompanyInput!) {
    createUserForCompany(input: $input) {
      user {
        ...MemberFields
      }
      company {
        id
      }
    }
  }
`;

const useInviteMember = () => {
  return useMutation(INVITE_MEMBER, {
    update(cache, { data, errors }) {
      if (errors) return;

      const { user, company } = data.createUserForCompany;

      cache.modify({
        id: cache.identify(company),
        fields: {
          users(existing = [], { readField }) {
            const newRef = cache.writeFragment({
              fragment: USER_FIELDS,
              data: user,
            });

            if (existing.some((ref) => readField("id", ref) === newRef.id)) {
              return existing;
            }

            return [...existing, newRef];
          },
        },
      });
    },
  });
};

export default function InviteTeamMember({ onInvite = () => {} }) {
  const { t } = useTranslation();
  const { notify } = useNotifications();
  const [inviteMember] = useInviteMember();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const handleSubmit = async (values, formik) => {
    const { errors, data } = await inviteMember({
      variables: {
        input: values,
      },
    });

    if (errors) {
      const errorCode = errors?.[0];
      formik.setStatus(errorCode);
      formik.setSubmitting(false);
    } else {
      formik.resetForm();
      notify(`We have sent an invite to ${values.firstName}`);
      onInvite(data.createUserForCompany.user);
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

          <SubmitButton variant="dark" size="s">
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
              {t(`errors.${formik.status?.extensions?.code}`, {
                error: formik.status,
              })}
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
}
