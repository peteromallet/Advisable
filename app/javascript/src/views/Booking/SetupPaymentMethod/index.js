import React from "react";
import { Box } from "@advisable/donut";
import { withRouter, Switch, Route } from "react-router-dom";
import PaymentTerms from "./PaymentTerms";
import PaymentMethodType from "./PaymentMethodType";
import PaymentMethodDetails from "./PaymentMethodDetails";

// Renders the setup process for setting the users project payment method.
const SetupPaymentMethod = props => {
  const [values, setValues] = React.useState({
    paymentMethod: undefined,
  });

  const setValue = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  const STEPS = [
    {
      path: `${props.match.path}/payment_terms`,
      component: PaymentTerms,
    },
    {
      path: `${props.match.path}/payment_details`,
      component: PaymentMethodDetails,
    },
    {
      path: props.match.path,
      component: PaymentMethodType,
    },
  ];

  return (
    <Box maxWidth={550} px="xs" mx="auto" mt="xxl" mb="xl">
      <Switch>
        {STEPS.map(step => {
          const Component = step.component;
          return (
            <Route
              key={step.path}
              path={step.path}
              render={route => (
                <Component
                  {...props}
                  {...route}
                  values={values}
                  setValue={setValue}
                />
              )}
            />
          );
        })}
      </Switch>
    </Box>
  );
};

export default withRouter(SetupPaymentMethod);
