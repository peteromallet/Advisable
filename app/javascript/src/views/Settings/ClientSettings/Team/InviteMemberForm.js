import React from "react";
import { object, string } from "yup";
import { Text, Columns } from "@advisable/donut";
import { Send } from "@styled-icons/ionicons-solid";
import { Formik, Form } from "formik";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useCreateUserForCompany } from "./queries";

const validationSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

export default function InviteMemberForm({ company, onInvite = () => {} }) {
  const [invite] = useCreateUserForCompany(company);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const handleSubmit = async (values, formik) => {
    formik.setStatus(null);

    const { data, errors } = await invite({
      variables: {
        input: values,
      },
    });

    if (!errors) {
      onInvite(data.createUserForCompany.user);
    }
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="medium" color="neutral900" mb={2}>
        Invite new member
      </Text>
      <Text lineHeight="18px" color="neutral700" marginBottom={8}>
        Enter the name and email of the person you want to invite to your team
      </Text>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Columns spacing={4} marginBottom={4}>
            <Columns.Column>
              <FormField name="firstName" label="First Name" />
            </Columns.Column>
            <Columns.Column>
              <FormField name="lastName" label="Last Name" />
            </Columns.Column>
          </Columns>
          <FormField name="email" label="Email Address" marginBottom={8} />
          <SubmitButton prefix={<Send />} disableUntilValid>
            Send Invite
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
