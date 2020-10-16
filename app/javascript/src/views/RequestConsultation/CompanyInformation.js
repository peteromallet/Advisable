import { object, string } from "yup";
import { ArrowRight } from "@styled-icons/feather";
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { Card, Text, Stack, Columns } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useCreateConsultation } from "./queries";

const validationSchema = object({
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
  email: string().required("Please enter your email").email(),
  company: string().required("Please enter your company name"),
});

const CompanyInformation = ({ data }) => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [createConsultation] = useCreateConsultation();

  if (!location?.state?.skill) {
    return (
      <Redirect to={`/request_consultation/${params.specialistId}/skills`} />
    );
  }

  const initialValues = {
    firstName: location.state?.firstName || "",
    lastName: location.state?.lastName || "",
    email: location.state?.email || "",
    company: location.state?.company || "",
  };

  const handleSubmit = async (values, formik) => {
    const response = await createConsultation({
      variables: {
        input: {
          skill: location.state?.skill,
          specialist: params.specialistId,
          utmSource: location.state?.utmSource,
          utmCampaign: location.state?.utmCampaign,
          utmMedium: location.state?.utmMedium,
          gclid: location.state?.gclid,
          ...values,
        },
      },
    });

    if (response.errors) {
      const error = response.errors[0]?.extensions?.code;
      if (error === "emailBelongsToFreelancer") {
        formik.setFieldError("email", "This email belongs to a freelancer");
      }
    }

    // Continue to the next step and pass the consultation id in the route
    // state. This makes the step routes much easier. i.e they are all prefixed
    // with request_consultation/:specialistId/[step] and don't need to have the
    // consultation id embeded.
    const consultation = response.data?.createConsultation.consultation;
    history.push({
      pathname: `/request_consultation/${params.specialistId}/availability`,
      state: {
        ...location.state,
        consultationId: consultation.id,
        completed: [...(location?.state?.completed || []), "DETAILS"],
      },
    });
  };

  return (
    <Card padding={["m", "l"]}>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        color="blue800"
        fontWeight="semibold"
        letterSpacing="-0.025em"
      >
        Company Information
      </Text>
      <Text color="neutral800" lineHeight="s" mb="l">
        Please provide some basic information so we can get back to you when{" "}
        {data.specialist.firstName} responds.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Stack spacing="m" mb="l">
            <Columns spacing="s">
              <FormField name="firstName" label="First Name" />
              <FormField name="lastName" label="Last Name" />
            </Columns>
            <FormField name="email" type="email" label="Email Address" />
            <FormField name="company" label="Company Name" />
          </Stack>
          <SubmitButton suffix={<ArrowRight />} width={["100%", "auto"]}>
            Continue
          </SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
};

export default CompanyInformation;
