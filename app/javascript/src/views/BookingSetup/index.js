// The booking setup will be rendered if there is additional information
// required for the booking to be in a working state.
import React from "react";
import { Box } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import { Switch, Redirect, useParams, generatePath } from "react-router-dom";
import Route from "src/components/Route";
import GET_SETUP_DATA from "./getSetupData";
import Loading from "../../components/Loading";
import CardDetails from "./CardDetails";
import InvoiceSettings from "./InvoiceSettings";
import PaymentTerms from "./PaymentTerms";
import BookingType from "./BookingType";
import PaymentMethod from "./PaymentMethod";
import useViewer from "src/hooks/useViewer";
import RequiresTeamManager from "./RequiresTeamManager";

// The steps
const STEPS = [
  {
    path: "/book/:applicationId/payment_method",
    component: PaymentMethod,
    isFirstStep: ({ viewer, currentCompany }) =>
      !viewer.paymentsSetup && currentCompany.bankTransfersEnabled,
  },
  {
    path: "/book/:applicationId/card_details",
    component: CardDetails,
    isFirstStep: ({ viewer }) => {
      return !viewer.paymentsSetup && !viewer.paymentMethod;
    },
  },
  {
    path: "/book/:applicationId/invoice_settings",
    component: InvoiceSettings,
    isFirstStep: (data) => !data.viewer.paymentsSetup,
  },
  {
    path: "/book/:applicationId/payment_terms",
    component: PaymentTerms,
    isFirstStep: (data) => !data.viewer.paymentsSetup,
  },
  {
    path: "/book/:applicationId/booking_type",
    component: BookingType,
  },
];

const BookingSetup = () => {
  const params = useParams();
  const viewer = useViewer();
  const { data, loading } = useQuery(GET_SETUP_DATA, {
    variables: { id: params.applicationId },
  });

  if (loading) return <Loading />;

  if (data.application.status === "Working") {
    return <Redirect to={`/manage/${data.application.id}`} />;
  }

  const firstStep = STEPS.find((step) => {
    return step.isFirstStep ? step.isFirstStep(data) : true;
  });

  if (!viewer.isTeamManager) {
    return <RequiresTeamManager data={data} />;
  }

  return (
    <Box maxWidth={600} px="xs" mx="auto" mt="xxl" pb="l">
      <Switch>
        {STEPS.map((step) => {
          const Component = step.component;

          return (
            <Route
              key={step.path}
              path={step.path}
              render={(route) => <Component {...route} data={data} />}
            />
          );
        })}
        <Redirect to={generatePath(firstStep.path, params)} />
      </Switch>
    </Box>
  );
};

export default BookingSetup;
