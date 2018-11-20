import React, { Fragment, useState } from "react";
import { injectStripe } from "react-stripe-elements";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ButtonGroup from "src/components/ButtonGroup";
import CardInput from "./CardInput";
import { Total, Label, Amount } from "./styles";
import currency from 'src/utilities/currency';

const PaymentDetails = ({ project, match, history, stripe }) => {
  const [submitting, setSubmitting] = useState(false);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/terms`);

  const useSource = source => history.replace(`?source=${source.id}`);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const { source, error } = await stripe.createSource({ type: "card" });

    if (error) {
      console.log("error", error);
      setSubmitting(false);
      return;
    }

    if (source.card.three_d_secure === "required") {
      const three_d_secure = await stripe.createSource({
        type: "three_d_secure",
        amount: project.depositOwed,
        currency: "usd",
        three_d_secure: { card: source.id },
        redirect: {
          return_url: window.location.href
        }
      });

      window.location = three_d_secure.source.redirect.url
      return;
    }

    useSource(source);
  };

  return (
    <Fragment>
      <Text>
        In order to begin recruitment on a project, we ask for a security
        deposit. This deposit is fully-refundable if you choose not to go ahead
        with the project and deductible from your first payment to the
        freelancer if you do go ahead with it.
      </Text>
      <Total>
        <Amount>
          {currency(project.depositOwed / 100.0, "usd")}
        </Amount>
        <Label>Total</Label>
      </Total>
      <form onSubmit={handleSubmit}>
        <CardInput />
        <ButtonGroup>
          <Button type="button" styling="outlined" size="l" onClick={goBack}>
            Back
          </Button>
          <Button type="submit" size="l" styling="primary" loading={submitting}>
            Continue
          </Button>
        </ButtonGroup>
      </form>
    </Fragment>
  );
};

export default injectStripe(PaymentDetails);
