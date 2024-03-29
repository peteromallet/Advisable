import React from "react";
import { Formik } from "formik";
import queryString from "query-string";
import { Button, Text, Box } from "@advisable/donut";
import Logo from "src/components/Logo";
import FormField from "src/components/FormField";
import validationSchema from "./validationSchema";
import { Container, Card } from "../styles";
import { useResetPassword } from "./queries";
import { useNavigate, useLocation, useParams } from "react-router";
import { useNotifications } from "src/components/Notifications";

export default function ResetPassword() {
  const notifications = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [resetPassword] = useResetPassword();
  const queryParams = queryString.parse(location.search);

  if (!queryParams.email) {
    navigate("/reset_password", { replace: true });
  }

  return (
    <Container>
      <Box py={10} textAlign="center">
        <Logo />
      </Box>
      <Card padding="xl">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: queryParams.email,
            password: "",
            passwordConfirmation: "",
            token: params.token,
          }}
          onSubmit={async (values) => {
            const { data, errors } = await resetPassword({
              variables: {
                input: values,
              },
            });

            if (errors) {
              notifications.error("Something went wrong, please try again");
            }

            if (data.resetPassword.reset) {
              notifications.notify("Your password has been updated");
              navigate("/login", { replace: true });
              return;
            }

            notifications.notify(
              "Failed to reset your password, Please try again",
            );
            navigate("/reset_password", { replace: true });
          }}
          render={(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Text
                fontSize="xl"
                lineHeight="m"
                textAlign="center"
                color="neutral900"
                fontWeight="semibold"
                letterSpacing="-0.015em"
              >
                Reset Password
              </Text>
              <FormField
                name="password"
                type="password"
                marginBottom="l"
                label="New Password"
                placeholder="Password"
              />
              <FormField
                type="password"
                marginBottom="l"
                label="Confirm Password"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
              />
              <Button loading={formik.isSubmitting} type="submit">
                Reset Password
              </Button>
            </form>
          )}
        />
      </Card>
    </Container>
  );
}
