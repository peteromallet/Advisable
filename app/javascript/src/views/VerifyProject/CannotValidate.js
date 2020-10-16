import { Container, Card, Text, Link } from "@advisable/donut";
import LoginWithLinkedin from "./LoginWithLinkedin";

function ValidationPending({ data }) {
  const { contactName } = data.previousProject;

  return (
    <Container maxWidth="700px">
      <Card padding="l">
        <Text mb="xxs" fontWeight="medium" color="blue900" fontSize="l">
          Unable to validate project
        </Text>
        <Text lineHeight="m" color="neutral700" mb="l">
          We were not able to verify your linkedin account against our records.
          Please login to the Linkedin account that belongs to{" "}
          <b>{contactName}</b> to verify the project.
        </Text>
        <LoginWithLinkedin />
        <Text fontWeight="medium" mt="l" mb="xxs">
          Don&apos;t have a LinkedIn account?
        </Text>
        <Link.External href="mailto:hello@advisable.com">
          Verify via email
        </Link.External>
      </Card>
    </Container>
  );
}

export default ValidationPending;
