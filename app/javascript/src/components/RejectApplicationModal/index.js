import React from "react";
import { Formik, Form } from "formik";
import { Text, Select, Button, Textarea } from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { Trash } from "@styled-icons/ionicons-solid";
import { useRejectApplication } from "./queries";

const OPTIONS = [
  {
    value: "I want someone with more relevant experience",
    placeholder: "In what way would their experience be different?",
  },
  {
    value: "I want someone cheaper",
    placeholder: "Please describe what price range you had in mind",
  },
  {
    value: "I didn't like their answers",
    placeholder:
      "Please describe information you felt was missing in these answers.",
  },
  {
    value: "They just don't seem like a good fit",
    placeholder: "Please describe what a better candidate would look like.",
  },
];

const optionByValue = (value) => OPTIONS.find((o) => o.value === value);

export default function RejectApplicationModal({
  id,
  firstName,
  onReject = () => {},
  onCancel = () => {},
}) {
  const [rejectApplication] = useRejectApplication();

  const handleSubmit = async (values) => {
    const response = await rejectApplication({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    onReject(response);
  };

  const initialValues = {
    reason: OPTIONS[0].value,
    comment: "",
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <Form>
          <Text
            fontSize="24px"
            fontWeight="medium"
            color="neutral900"
            marginBottom="8px"
            letterSpacing="-0.04em"
          >
            Reject {firstName}
          </Text>
          <Text color="neutral700" lineHeight="20px" marginBottom="l">
            Please provide feedback to our recruitment team to help us find you
            a better candidate.
          </Text>
          <FormField
            as={Select}
            label="Reason for rejection"
            marginBottom="xs"
            name="reason"
          >
            {OPTIONS.map((o) => (
              <option key={o.value}>{o.value}</option>
            ))}
          </FormField>
          <FormField
            minRows={3}
            as={Textarea}
            marginBottom="xl"
            name="comment"
            placeholder={optionByValue(formik.values.reason).placeholder}
          />
          <SubmitButton prefix={<Trash />} variant="dark" marginRight="12px">
            Reject
          </SubmitButton>
          <Button type="button" variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}
