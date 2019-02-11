import * as React from "react";
import { Formik, Form, FormikProps } from "formik";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  Flex,
  Button,
  Heading,
  Padding,
  Divider,
  FieldRow,
  Checkbox,
  TextField,
  BottomBar,
  ButtonGroup
} from "../../../components";
import StepDots from "../../../components/StepDots";
import { currencySymbol } from "../../../utilities/currency";
import { useScreenSize } from "../../../utilities/screenSizes";

interface Values {
  rate: string;
  acceptsFee: boolean;
  acceptsTerms: boolean;
}

const Terms = ({ application, steps, currentStep }) => {
  const isMobile = useScreenSize("small");
  const handleSubmit = () => {};

  return (
    <Formik
      initialValues={{
        rate: "",
        acceptsFee: false,
        acceptsTerms: false
      }}
      onSubmit={handleSubmit}
    >
      {(formik: FormikProps<Values>) => (
        <Form>
          <Padding size="xl">
            <Padding bottom="l">
              <Heading level={1}>Payment Terms</Heading>
            </Padding>
            <FieldRow>
              <TextField
                name="rate"
                value={formik.values.rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rate && formik.errors.rate}
                label="Including Advisable's fee, what's your estimated hourly rate for projects like this?"
                placeholder={`${currencySymbol(application.project.currency)}0.00`}
                mask={createNumberMask({
                  prefix: currencySymbol(application.project.currency),
                  allowDecimal: true
                })}
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="acceptsFee"
                value={formik.values.acceptsFee}
                onChange={formik.handleChange}
                error={formik.touched.acceptsFee && formik.touched.acceptsFee}
                label="I agree that If Advisable connects me to a client that I successfully contract with, 20% of my fees are payable to Advisable and all payments go through Advisable. "
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="acceptsTerms"
                value={formik.values.acceptsTerms}
                onChange={formik.handleChange}
                error={formik.touched.acceptsTerms && formik.touched.acceptsTerms}
                label="I agree with Advisable's freelancer agreement."
              />
            </FieldRow>
          </Padding>

          {!isMobile && (
            <React.Fragment>
              <Divider />
              <Padding size="xl">
                <Button styling="green" size="l">
                  Next
                </Button>
              </Padding>
            </React.Fragment>
          )}

          {isMobile && (
            <BottomBar>
              <Padding bottom="m">
                <Flex align="center" distribute="center">
                  <StepDots total={steps.length} current={currentStep + 1} />
                </Flex>
              </Padding>
              <ButtonGroup fullWidth>
                <Button size="l" type="submit" styling="green">
                  Next
                </Button>
              </ButtonGroup>
            </BottomBar>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Terms;
