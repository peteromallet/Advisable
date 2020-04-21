import React from "react";
import { get } from "lodash-es";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import { useLocation, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
  Box,
  Text,
  RoundedButton,
  Link,
  Icon,
  useTheme,
  useBreakpoint,
} from "@advisable/donut";
import CREATE_ACCOUNT from "./createAccount";
import Form from "./Form";
import illustration from "../../../illustrations/handshake.png";

const SaveSearch = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const isDesktop = useBreakpoint("mUp");
  const [email, setEmail] = React.useState(null);
  const [createAccount, { data }] = useMutation(CREATE_ACCOUNT);
  const queryParams = queryString.parse(location.search, {
    parseBooleans: true,
  });

  React.useEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  if (!queryParams.skill) {
    return <Redirect to="/clients/signup" />;
  }

  const handleSubmit = async (values, formik) => {
    const response = await createAccount({
      variables: {
        input: {
          skill: queryParams.skill,
          industry: queryParams.industry,
          industryExperienceRequired: queryParams.industryRequired,
          companyType: queryParams.companyType,
          companyTypeExperienceRequired: queryParams.companyTypeRequired,
          email: values.email,
          specialists: location.state?.selected,
          campaignName: queryParams.utm_campaign,
          campaignSource: queryParams.utm_source,
          pid: queryParams.pid,
          rid: queryParams.rid,
          gclid: queryParams.gclid,
        },
      },
    });

    if (response.errors) {
      formik.setSubmitting(false);
      const code = get(response.errors, "[0].extensions.code");
      if (code === "emailTaken") {
        formik.setFieldError(
          "email",
          <>
            {t("errors.emailTaken")}
            <Text fontSize="xs" mt="xs">
              <Link
                to={`/login?email=${encodeURIComponent(values.email)}`}
                variant="subtle"
              >
                Click here to sign in
              </Link>
            </Text>
          </>,
        );
      } else if (code === "nonCorporateEmail") {
        formik.setFieldError("email", t("errors.nonCorporateEmail"));
      } else {
        formik.setStatus("errors.somethingWentWrong");
      }
    } else {
      setEmail(values.email);
    }
  };

  const handleContinue = () => {
    const project = data.createUserAccount.project;
    const selected = location.state?.selected || [];
    let url = "http://advisable.com/clients/signup/complete";
    url += `?pid=${project.airtableId}`;
    url += `&email=${encodeURIComponent(email)}`;
    url += `&skill=${get(location, "state.search.skill")}`;
    if (selected.length > 0) {
      url += `&specialists=${selected.join(",")}`;
    }
    window.location.replace(url);
  };

  return (
    <>
      <Box
        px="m"
        py="xl"
        display="flex"
        margin="0 auto"
        maxWidth={1100}
        alignItems="center"
      >
        <Box width="100%">
          {get(data, "createUserAccount") ? (
            <>
              <Text
                as="h2"
                mb="xs"
                color="blue.8"
                fontSize="xxxl"
                fontWeight="semibold"
                letterSpacing="-0.02em"
              >
                Tell us more
              </Text>
              <Text folor="neutral.9" lineHeight="m" mb="xl">
                Great! We think we’ll have the perfect person for this project
                but we need to know a little bit more about your project first.
              </Text>
              <RoundedButton
                size="l"
                suffix={<Icon icon="arrow-right" />}
                onClick={handleContinue}
              >
                Setup Project
              </RoundedButton>
            </>
          ) : (
            <Form onSubmit={handleSubmit} />
          )}
        </Box>
        {isDesktop && (
          <Box textAlign="center">
            <img src={illustration} width="80%" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default SaveSearch;
