// The booking setup will be rendered if there is additional information
// required for the booking to be in a working state.
import React from "react";
import { Box } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import {
  Switch,
  Route,
  Redirect,
  useParams,
  useHistory,
  generatePath,
} from "react-router-dom";
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
    enabled: ({ viewer }) =>
      !viewer.paymentsSetup && viewer.bankTransfersEnabled,
  },
  {
    path: "/book/:applicationId/card_details",
    component: CardDetails,
    enabled: ({ viewer }) => {
      if (viewer.projectPaymentMethod === "Bank Transfer") return false;
      return !viewer.paymentsSetup && !viewer.paymentMethod;
    },
  },
  {
    path: "/book/:applicationId/invoice_settings",
    component: InvoiceSettings,
    enabled: (data) => !data.viewer.paymentsSetup,
  },
  {
    path: "/book/:applicationId/payment_terms",
    component: PaymentTerms,
    enabled: (data) => !data.viewer.paymentsSetup,
  },
  {
    path: "/book/:applicationId/booking_type",
    component: BookingType,
  },
];

const BookingSetup = () => {
  const params = useParams();
  const viewer = useViewer();
  const history = useHistory();
  const { data, loading } = useQuery(GET_SETUP_DATA, {
    variables: { id: params.applicationId },
  });

  if (loading) return <Loading />;

  if (data.application.status === "Working") {
    return <Redirect to={`/manage/${data.application.id}`} />;
  }

  const filteredSteps = STEPS.filter((step) => {
    return step.enabled ? step.enabled(data) : true;
  });

  if (!viewer.isTeamManager) {
    return <RequiresTeamManager data={data} />;
  }

  return (
    <Box maxWidth={600} px="xs" mx="auto" mt="xxl" pb="l">
      <Switch>
        {filteredSteps.map((step, i) => {
          const Component = step.component;

          return (
            <Route
              key={step.path}
              path={step.path}
              render={(route) => (
                <Component
                  {...route}
                  data={data}
                  nextStep={() => {
                    const nextStep = filteredSteps[i + 1];
                    const nextPath = generatePath(nextStep.path, params);
                    if (nextStep) {
                      history.push(nextPath);
                    }
                  }}
                />
              )}
            />
          );
        })}
        <Redirect to={generatePath(filteredSteps[0].path, params)} />
      </Switch>
    </Box>
  );
};

export default BookingSetup;
