import React from "react";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import { Container, Deliverable } from "./styles";

class ViewOffer extends React.Component {
  state = {
    acceptModal: false,
    declineModal: false
  };

  render() {
    return (
      <Container>
        <Card>
          <Card.Section>
            <Spacing bottom="m">
              <Heading size="l">
                Garth Group Corp – Sales Compensation, Sales Compensation
                Planning
              </Heading>
            </Spacing>
            <Spacing bottom="l">
              <Text size="l">
                Recurring project for 6 months at a rate of €2,500 per month
              </Text>
            </Spacing>
            <Spacing bottom="s">
              <Text>Deliverables</Text>
            </Spacing>
            <Deliverable>
              Implement marketing and advertising campaigns by assembling and
              analyzing sales forecasts.
            </Deliverable>
            <Deliverable>
              Prepare marketing reports by collecting, analyzing, and
              summarizing sales data.
            </Deliverable>
            <Deliverable>
              Research competitive products by identifying and evaluating
              product characteristics, market share, pricing, and advertising;
              maintaining research databases.
            </Deliverable>
            <Deliverable>
              Develop marketing strategies for projects, including company
              websites and social media.
            </Deliverable>
            <Deliverable>
              Work closely with the sales team on program development and
              implementation
            </Deliverable>
            <Spacing top="m">
              <Spacing right="s" inline>
                <Modal
                  isOpen={this.state.acceptModal}
                  onClose={() => this.setState({ acceptModal: false })}>
                  yukayruskt
                </Modal>
                <Button
                  primary
                  onClick={() => this.setState({ acceptModal: true })}>
                  Accept Offer
                </Button>
              </Spacing>
              <Button>Decline</Button>
            </Spacing>
          </Card.Section>
        </Card>
      </Container>
    );
  }
}

export default ViewOffer
