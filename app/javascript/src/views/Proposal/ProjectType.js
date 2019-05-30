import * as React from "react";
import { Formik, Form } from "formik";
import { compose, graphql } from "react-apollo";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import ButtonGroup from "../../components/ButtonGroup";
import Radio from "../../components/Radio";
import Heading from "../../components/Heading";
import { Padding } from "../../components/Spacing";
import { useMobile } from "../../components/Breakpoint";
import { projectTypeValidationSchema } from "./validationSchema";
import UPDATE_APPLICATION from "./updateApplication.graphql";

const numberMask = createNumberMask({
  prefix: "",
  suffix: " hours",
});

const ProjectType = ({ history, application, updateApplication }) => {
  const isMobile = useMobile();

  const handleSubmit = async values => {
    const response = await updateApplication({
      variables: {
        input: {
          id: application.airtableId,
          projectType: values.projectType,
          monthlyLimit: values.monthlyLimit,
        },
      },
    });

    const { errors } = response.data.updateApplication;

    if (!errors) {
      const urlPrefix = `/applications/${application.airtableId}/proposal`;
      history.push(`${urlPrefix}/tasks`);
    }
  };

  const initialValues = {
    projectType: application.projectType || "",
    monthlyLimit: application.monthlyLimit || undefined,
  };

  const isInitialValid = projectTypeValidationSchema.isValidSync(initialValues);

  const handleLimitChange = formik => e => {
    let value = e.target.value;
    if (Boolean(value)) {
      value = value.replace(" hours", "");
      value = value.replace(/\,/g, "");
      value = Number(value);
    } else {
      value = undefined;
    }
    formik.setFieldTouched("monthlyLimit", true);
    formik.setFieldValue("monthlyLimit", value);
  };

  return (
    <Card>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        isInitialValid={isInitialValid}
        validationSchema={projectTypeValidationSchema}
      >
        {formik => (
          <Form>
            <Padding size="l">
              <Padding bottom="s">
                <Heading level={3}>Project Type</Heading>
              </Padding>
              <Padding bottom="l">
                <Text size="s">
                  How do you think it makes sense to work with{" "}
                  {application.project.user.companyName}?
                </Text>
              </Padding>
              <Padding bottom="m">
                <Radio
                  name="projectType"
                  value="Fixed"
                  label="Fixed"
                  onChange={formik.handleChange}
                  checked={formik.values.projectType === "Fixed"}
                  description="I want to work with them on one big project or a number of smaller tasks"
                />
              </Padding>
              <Padding bottom="xl">
                <Radio
                  name="projectType"
                  value="Flexible"
                  label="Flexible"
                  onChange={formik.handleChange}
                  checked={formik.values.projectType === "Flexible"}
                  description="I want to work with them flexibly with monthly limits"
                />
              </Padding>
              {formik.values.projectType === "Flexible" && (
                <Padding bottom="xl">
                  <TextField
                    autoFocus
                    name="monthlyLimit"
                    mask={numberMask}
                    placeholder="Monthly limit"
                    label="Set suggested monthly hour cap (to 200-hour max)"
                    onChange={handleLimitChange(formik)}
                    value={formik.values.monthlyLimit}
                    error={
                      formik.touched.monthlyLimit && formik.errors.monthlyLimit
                    }
                  />
                </Padding>
              )}
              <ButtonGroup fullWidth={isMobile}>
                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  loading={formik.isSubmitting}
                  styling="primary"
                >
                  Continue
                </Button>
              </ButtonGroup>
            </Padding>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default compose(
  graphql(UPDATE_APPLICATION, { name: "updateApplication" })
)(ProjectType);
