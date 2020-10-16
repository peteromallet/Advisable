import { useLocation, useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Card, Box, Text, Button } from "@advisable/donut";
import ScaleInput from "../../components/ScaleInput";
import { useSendConsultation } from "./queries";

function Send({ data }) {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [send] = useSendConsultation();

  const initialValues = {
    likelyToHire: null,
  };

  const handleSubmit = async (values) => {
    await send({
      variables: {
        input: {
          consultation: location.state.consultationId,
          ...values,
        },
      },
    });

    history.push({
      pathname: `/request_consultation/${params.specialistId}/sent`,
      state: {
        ...location.state,
        completed: [...(location?.state?.completed || []), "SEND"],
      },
    });
  };

  return (
    <Card padding={["m", "l"]}>
      <Text
        mb="l"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue800"
        letterSpacing="-0.025em"
      >
        If you&apos;re impressed by {data.specialist.firstName}, how likely are
        you to hire them as a freelancer?
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Box mb="xl">
              <Field
                as={ScaleInput}
                name="likelyToHire"
                onChange={(v) => {
                  formik.setFieldValue("likelyToHire", v);
                }}
              />
            </Box>
            <Button type="submit" loading={formik.isSubmitting}>
              Request Consultation
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default Send;
