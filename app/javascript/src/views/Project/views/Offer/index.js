import React from "react";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import Back from "src/components/Back";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Card from "src/components/Card";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Divider from "src/components/Divider";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import InputLabel from "src/components/InputLabel";
import TextField from "src/components/TextField";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Deliverables from "../../components/Deliverables";
import OfferType from "../../components/OfferType";
import { required } from "src/utilities/validators";

const amountLabel = form => {
  if (form.values.type === "recurring") {
    if (form.values.rate_type === "fixed") {
      return "Amount per month";
    }
  }
  if (form.values.rate_type === "hourly") {
    return "Amount per hour";
  }
  return "Amount";
};

class Offer extends React.Component {
  render() {
    return (
      <div>
        <Spacing bottom="xs" onClick={() => this.props.history.goBack()}>
          <Back />
        </Spacing>
        <Spacing bottom="xs">
          <Heading size="l">Offer for Thomas Cullen</Heading>
        </Spacing>
        <Spacing bottom="xl">
          <Text size="l">
            Garth Group Corp – Sales Compensation, Sales Compensation Planning
          </Text>
        </Spacing>
        <Formik
          onSubmit={values => {
            console.log(values);
          }}
          initialValues={{
            type: "fixed",
            rate_type: "fixed",
            deliverables: [""]
          }}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <Card>
                <Spacing size="xl">
                  <OfferType />
                </Spacing>
                {form.values.type === "recurring" && (
                  <React.Fragment>
                    <Divider />
                    <Spacing size="xl" top="l" bottom="l">
                      <Select
                        name="length"
                        value={form.values.length}
                        onChange={form.handleChange}
                        label="How long do you want this offer to recur for?"
                        options={[
                          "2 Months",
                          "3 Months",
                          "4 Months",
                          "5 Months",
                          "6 Months",
                          "Until Cancellation"
                        ]}
                      />
                    </Spacing>
                  </React.Fragment>
                )}
                <Divider />
                <Spacing size="xl" top="l" bottom="l">
                  <Flex distribute="fillEvenly" spacing="m">
                    <Field
                      name="rate"
                      validate={required("Amount is required")}
                      render={({ field, form }) => (
                        <TextField
                          block
                          {...field}
                          label={amountLabel(form)}
                          error={form.touched.rate && form.errors.rate}
                          placeholder="€0.00"
                          mask={createNumberMask({
                            prefix: "€",
                            allowDecimal: true
                          })}
                        />
                      )}
                    />
                    <Select
                      block
                      label="Type"
                      name="rate_type"
                      value={form.values.rate_type}
                      onChange={form.handleChange}
                      options={[
                        { label: "Fixed Price", value: "fixed" },
                        { label: "Hourly Rate", value: "hourly" }
                      ]}
                    />
                    {form.values.rate_type === "hourly" ? (
                      <TextField
                        type="tel"
                        name='rate_limit'
                        value={form.values.rate_limit}
                        onChange={form.handleChange}
                        label="Monthly Budget"
                        placeholder="€0.00"
                        mask={createNumberMask({
                          prefix: "€",
                          allowDecimal: true
                        })}
                      />
                    ) : null}
                  </Flex>
                </Spacing>
                <Divider />
                <Spacing size="xl" top="l" bottom="m">
                  <Field
                    name="deliverables"
                    render={({ field, form }) => (
                      <React.Fragment>
                        <InputLabel>Deliverables</InputLabel>
                        <Deliverables
                          deliverables={field.value}
                          onChange={deliverables =>
                            form.setFieldValue("deliverables", deliverables)
                          }
                        />
                      </React.Fragment>
                    )}
                  />
                </Spacing>
                <Divider />
                <Spacing size="xl">
                  <Spacing right="m" inline>
                    <Button primary>Send Offer</Button>
                  </Spacing>
                  <Button blank>Cancel</Button>
                </Spacing>
              </Card>
            </form>
          )}
        />
      </div>
    );
  }
}

export default Offer;
