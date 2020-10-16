import ActionBar from "./ActionBar";
import { Formik, Form } from "formik";
import { useParams, useHistory } from "react-router-dom";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import ActionBarModal from "./ActionBarModal";
import { Text, Select, Button, Textarea } from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useNotifications } from "components/Notifications";
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

export default function RejectApplication({ application }) {
  const { id } = useParams();
  const history = useHistory();
  const dialog = useDialogState();
  const notifications = useNotifications();
  const firstName = application.specialist.firstName;
  const isApplied = application.status === "Applied";
  const [rejectApplication] = useRejectApplication(application);

  const handleSubmit = async (values, formikBag) => {
    await rejectApplication({
      variables: {
        input: {
          id: application.id,
          ...values,
        },
      },
    });

    notifications.notify(`You have rejected ${firstName}`);

    dialog.hide();
    formikBag.resetForm();

    if (!isApplied) {
      history.replace(`/projects/${id}/candidates`);
    }
  };

  const initialValues = {
    reason: OPTIONS[0].value,
    comment: "",
  };

  return (
    <>
      <DialogDisclosure
        {...dialog}
        as={ActionBar.Item}
        label="Reject"
        icon={<Trash />}
        data-walkthrough="actionBarReject"
      />
      <ActionBarModal dialog={dialog} label={`Reject ${firstName}`}>
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
                Please provide feedback to our recruitment team to help us find
                you a better candidate.
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
              <SubmitButton
                prefix={<Trash />}
                variant="dark"
                marginRight="12px"
              >
                Reject
              </SubmitButton>
              <Button type="button" variant="subtle" onClick={dialog.hide}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </ActionBarModal>
    </>
  );
}
