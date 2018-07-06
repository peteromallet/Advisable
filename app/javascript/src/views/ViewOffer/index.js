import React from "react";
import { graphql } from "react-apollo";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Icon from "src/components/Icon";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import Loading from "src/components/Loading";
import NotFound from "src/views/NotFound";
import AcceptModal from "./components/AcceptModal";
import DeclineModal from "./components/DeclineModal";
import currency from "src/utilities/currency";
import { Container, Deliverable } from "./styles";
import FETCH_BOOKING from "./graphql/fetchBooking.graphql";

const description = booking => {};

const duration = booking => {
  if (booking.type === "recurring") {
    return booking.duration;
  }
  return "Fixed project";
};

const payment = booking => {
  const rate = currency(booking.rate, booking.application.project.currency)
  if (booking.type === "recurring" && booking.rateType === "fixed") {
    return `${rate} per month`;
  }

  if (booking.type === "recurring") {
    return `${rate} per hour`;
  }

  return rate;
};

class ViewOffer extends React.Component {
  state = {
    acceptModal: false,
    declineModal: false
  };

  render() {
    const { match, loading, data } = this.props;
    if (data.loading) return <Loading />;
    if (data.error) return <NotFound />;

    return (
      <Container>
        <Card>
          <Card.Section>
            <Spacing bottom="m">
              <Heading size="l">
                {data.booking.application.project.name}
              </Heading>
            </Spacing>
            <Spacing bottom="l">
              <Flex distribute="fillEvenly">
                <div>
                  <Text size="s">Project Type</Text>
                  <Text size="l" variation="strong">
                    {duration(data.booking)}
                  </Text>
                </div>

                <div>
                  <Text size="s">Payment</Text>
                  <Text size="l" variation="strong">
                    {payment(data.booking)}
                  </Text>
                </div>
              </Flex>
            </Spacing>
            <Spacing bottom="s">
              <Text>Deliverables</Text>
            </Spacing>
            {data.booking.deliverables.map((deliverable, index) => {
              if (deliverable.length === 0) return null;
              return <Deliverable key={index}>{deliverable}</Deliverable>;
            })}

            <Spacing top="m">
              {data.booking.status === "offered" && (
                <React.Fragment>
                  <Spacing right="s" inline>
                    <AcceptModal
                      booking={data.booking}
                      isOpen={this.state.acceptModal}
                      onClose={() => this.setState({ acceptModal: false })}
                    />
                    <Button
                      primary
                      onClick={() => this.setState({ acceptModal: true })}>
                      Accept Offer
                    </Button>
                  </Spacing>
                  <DeclineModal
                    booking={data.booking}
                    isOpen={this.state.declineModal}
                    onClose={() => this.setState({ declineModal: false })}
                  />
                  <Button onClick={() => this.setState({ declineModal: true })}>
                    Decline
                  </Button>
                </React.Fragment>
              )}

              {data.booking.status === "accepted" && (
                <Text>You have accepted this offer</Text>
              )}

              {data.booking.status === "declined" && (
                <Text>You have declined this offer</Text>
              )}
            </Spacing>
          </Card.Section>
        </Card>
      </Container>
    );
  }
}

export default graphql(FETCH_BOOKING, {
  options: ({ match }) => ({
    variables: {
      id: match.params.bookingID
    }
  })
})(ViewOffer);
