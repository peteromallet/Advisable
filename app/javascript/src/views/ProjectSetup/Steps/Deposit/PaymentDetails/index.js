import React, { Fragment, useState } from "react";
import { injectStripe } from "react-stripe-elements";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import CardInput from "./CardInput";
import { Error, Total, Label, Amount } from "./styles";
import currency from "src/utilities/currency";

const PaymentDetails = ({ project, match, history, stripe, error, setError }) => {
  const [submitting, setSubmitting] = useState(false);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/terms`);

  const useSource = source => history.replace(`?source=${source.id}`);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const response = await stripe.createSource({ type: "card" });

    if (response.error) {
    setError(response.error.message)
      setSubmitting(false);
      return;
    }

    if (response.source.card.three_d_secure === "required") {
      const three_d_secure = await stripe.createSource({
        type: "three_d_secure",
        amount: project.depositOwed,
        currency: "usd",
        three_d_secure: { card: response.source.id },
        redirect: {
          return_url: window.location.href
        }
      });

      window.location = three_d_secure.source.redirect.url;
      return;
    }

    useSource(response.source);
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
        <Amount>{currency(project.depositOwed / 100.0, "usd")}</Amount>
        <Label>Total</Label>
      </Total>
      <form onSubmit={handleSubmit}>
        <CardInput onChange={() => setError(null)} />
        {error && <Error>{error}</Error>}
        <Mobile>
          {isMobile => (
            <ButtonGroup fullWidth={isMobile}>
              <Button
                type="button"
                styling="outlined"
                size="l"
                onClick={goBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                size="l"
                styling="primary"
                loading={submitting}
              >
                Complete
              </Button>
            </ButtonGroup>
          )}
        </Mobile>
      </form>
    </Fragment>
  );
};

export default injectStripe(PaymentDetails);
