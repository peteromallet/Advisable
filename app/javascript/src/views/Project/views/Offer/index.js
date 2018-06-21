import React from 'react'
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Text from 'src/components/Text';
import Card from 'src/components/Card';
import Button from 'src/components/Button';
import Divider from 'src/components/Divider';
import Spacing from 'src/components/Spacing';
import Heading from 'src/components/Heading';
import Deliverables from '../../components/Deliverables';

class Offer extends React.Component {
  render() {
    return (
      <div>
        <div onClick={() => this.props.history.goBack()}>Back</div>
        <Spacing bottom='xs'>
          <Heading size='l'>Offer for Thomas Cullen</Heading>
        </Spacing>
        <Spacing bottom='xl'>
          <Text size='l'>Garth Group Corp – Sales Compensation, Sales Compensation Planning</Text>
        </Spacing>
        <Formik
          onSubmit={() => {}}
          initialValues={{deliverables: [""]}}
          render={form => (
            <form onSubmit={form.handleSubmit}>
              <Card>
                <Spacing size="xl">
                  <Deliverables />
                </Spacing>
                <Divider />
                <Spacing size="xl">
                  <Button primary>Send Offer</Button>
                </Spacing>
              </Card>
            </form>
          )}
        />
      </div>
    )
  }
}

export default Offer
