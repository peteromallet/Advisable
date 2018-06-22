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
import TextField from "src/components/TextField";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Deliverables from "../../components/Deliverables";
import OfferType from "../../components/OfferType";

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
          onSubmit={() => {}}
          initialValues={{ deliverables: [""] }}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <Card>
                <Spacing size="xl">
                  <OfferType />
                </Spacing>
                <Divider />
                <Spacing size="xl" top="l" bottom="l">
                  <Select
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
                <Divider />
                <Spacing size="xl" top="l" bottom="l">
                  <Flex distribute="fillEvenly" spacing="m">
                    <TextField
                      type="tel"
                      label="Amount"
                      placeholder="€0.00"
                      mask={createNumberMask({
                        prefix: "€",
                        allowDecimal: true
                      })}
                    />
                    <Select
                      block
                      label="Type"
                      options={["Fixed Price", "Hourly Rate"]}
                    />
                    <TextField
                      type="tel"
                      label="Monthly Budget"
                      placeholder="€0.00"
                      mask={createNumberMask({
                        prefix: "€",
                        allowDecimal: true
                      })}
                    />
                  </Flex>
                </Spacing>
                <Divider />
                <Spacing size="xl" top="l" bottom="m">
                  <Field
                    name="deliverables"
                    render={({ field, form }) => (
                      <Deliverables
                        deliverables={field.value}
                        onChange={deliverables => 
                          form.setFieldValue("deliverables", deliverables)
                        }
                      />
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
