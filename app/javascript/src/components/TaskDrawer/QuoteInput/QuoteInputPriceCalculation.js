import React from "react";
import { Text } from "@advisable/donut";
import currency from "../../../utilities/currency";

const QuoteInputPriceCalculation = ({
  isFlexible,
  estimateType,
  estimate,
  flexibleEstimate,
  task,
}) => {
  if (estimateType === "Fixed") return null;
  if (!estimate) return null;

  const rate = parseFloat(task.application.rate) * 100.0;
  const earnings = calculateEarnings(estimate, rate);
  const flexibleEarnings = calculateEarnings(flexibleEstimate, rate);

  return (
    <Text fontSize="xs" color="neutral.7" mt="xs">
      {flexibleEarnings ? (
        <>
          You would earn between {currency(earnings)} and{" "}
          {currency(flexibleEarnings)} for this task
        </>
      ) : (
        <>You would earn {currency(earnings)} for this project</>
      )}
    </Text>
  );
};

const calculateEarnings = (hours, rate) => {
  const hoursParsed = Boolean(hours) ? parseFloat(hours.replace(",", "")) : 0;
  const total = hoursParsed * rate;
  return total - total * 0.2;
};

export default QuoteInputPriceCalculation;
