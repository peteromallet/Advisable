import React from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import Text from "src/components/Text";
import Select from "src/components/Select";
import Heading from "src/components/Heading";
import Modal from "src/components/Modal";
import Spacing from "src/components/Spacing";
import Button from "src/components/Button";
import Flex from "src/components/Flex";
import DECLINE_BOOKING from "../graphql/declineBooking.graphql";

export default ({ isOpen, booking, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Mutation mutation={DECLINE_BOOKING}>
      {declineBooking => (
        <Formik
          initialValues={{ reason: 'Rate is too low' }}
          onSubmit={values => {
            declineBooking({
              variables: {
                id: booking.id,
                reason: values.reason
              }
            });
            onClose();
          }}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <Spacing size="xl">
                <Spacing bottom="m">
                  <Heading>Decline Offer</Heading>
                  <Text>What is your reason for declining this offer?</Text>
                </Spacing>
                <Spacing bottom='l'>
                  <Select
                    block
                    name='reason'
                    options={[
                      "Rate is too low",
                      "Availability Doesn't Suit"
                    ]}
                  />
                </Spacing>
                <Flex distribute="fillEvenly">
                  <Spacing right="s">
                    <Button block>
                      Decline Offer
                    </Button>
                  </Spacing>
                  <Spacing left="s">
                    <Button blank block type='button' onClick={onClose}>
                      Cancel
                    </Button>
                  </Spacing>
                </Flex>
              </Spacing>
            </form>
          )}
        />
      )}
    </Mutation>
  </Modal>
);
