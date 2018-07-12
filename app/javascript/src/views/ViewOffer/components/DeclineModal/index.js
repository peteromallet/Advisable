import React from "react";
import { Mutation, Query } from "react-apollo";
import { Formik } from "formik";
import Text from "src/components/Text";
import Select from "src/components/Select";
import Loading from "src/components/Loading";
import TextField from "src/components/TextField";
import Heading from "src/components/Heading";
import Modal from "src/components/Modal";
import Spacing from "src/components/Spacing";
import Button from "src/components/Button";
import Flex from "src/components/Flex";
import FETCH_REASONS from "./fetchReasons.graphql";
import DECLINE_BOOKING from "./declineBooking.graphql";

export default ({ isOpen, booking, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Query query={FETCH_REASONS}>
      {query =>
        query.loading ? (
          <Loading />
        ) : (
          <Mutation mutation={DECLINE_BOOKING}>
            {declineBooking => (
              <Formik
                initialValues={{ reason: "Rate is too low" }}
                onSubmit={async values => {
                  await declineBooking({
                    variables: {
                      id: booking.id,
                      reason: values.reason,
                      declineComment: values.declineComment
                    }
                  });
                  onClose();
                }}
                render={form => (
                  <form onSubmit={form.handleSubmit}>
                    <Spacing size="xl">
                      <Spacing bottom="m">
                        <Heading>Decline Offer</Heading>
                        <Text>
                          What is your reason for declining this offer?
                        </Text>
                      </Spacing>
                      <Spacing bottom="s">
                        <Select
                          block
                          name="reason"
                          value={form.values.reason}
                          onChange={form.handleChange}
                          options={query.data.reasons}
                        />
                      </Spacing>
                      <Spacing bottom="l">
                        <TextField
                          block
                          multiline
                          name="declineComment"
                          placeholder="Optional comment"
                          value={form.values.declineComment}
                          onChange={form.handleChange}
                        />
                      </Spacing>
                      <Flex distribute="fillEvenly">
                        <Spacing right="s">
                          <Button block loading={form.isSubmitting}>
                            Decline Offer
                          </Button>
                        </Spacing>
                        <Spacing left="s">
                          <Button blank block type="button" onClick={onClose}>
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
        )
      }
    </Query>
  </Modal>
);
