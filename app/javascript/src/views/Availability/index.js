import { Formik } from "formik";
import { Query, Mutation } from "react-apollo";
import moment from "moment-timezone";
import React, { Component } from "react";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import Loading from "src/components/Loading";
import Availability from "src/components/Availability";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { withNotifications } from "src/components/Notifications";

import { Container, Form, Header, Body, Footer } from "./styles";

import FETCH_AVAILABILITY from "./fetchAvailability.graphql";
import UPDATE_AVAILABILITY from "./updateAvailability.graphql";

class AvailabilityView extends Component {
  state = {
    timeZone: moment.tz.guess() || "Europe/Dublin"
  };

  render() {
    const { match, notifications } = this.props;

    return (
      <Container>
        <Query
          query={FETCH_AVAILABILITY}
          variables={{ id: match.params.userID }}
        >
          {query => {
            if (query.loading) return <Loading />;

            return (
              <Mutation mutation={UPDATE_AVAILABILITY}>
                {updateAvailability => (
                  <Formik
                    onSubmit={async values => {
                      await updateAvailability({
                        variables: {
                          input: {
                            id: query.data.user.airtableId,
                            ...values
                          }
                        }
                      });

                      notifications.notify(
                        "Your availability has been updated"
                      );
                    }}
                    initialValues={{
                      availability: query.data.user.availability
                    }}
                  >
                    {formik => (
                      <Form onSubmit={formik.handleSubmit}>
                        <Header>
                          <Heading marginBottom="m">
                            Availability for calls with specialists
                          </Heading>
                          <TimeZoneSelect
                            value={this.state.timeZone}
                            onChange={timeZone => this.setState({ timeZone })}
                          />
                        </Header>
                        <Body>
                          <Availability
                            timeZone={this.state.timeZone}
                            selected={formik.values.availability}
                            onSelect={times => {
                              formik.setFieldValue("availability", times);
                            }}
                          />
                        </Body>
                        <Footer>
                          <Button
                            type="submit"
                            size="l"
                            isLoading={formik.isLoading}
                            disabled={formik.isLoading}
                            primary
                          >
                            Update Availability
                          </Button>
                        </Footer>
                      </Form>
                    )}
                  </Formik>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default withNotifications(AvailabilityView);
