import React, { useRef } from "react";
import { DateTime } from "luxon";
import { VariableSizeList as List } from "react-window";
import useComponentSize from "@rehooks/component-size";
import {
  StyledAvailability,
  StyledAvailabilityScrollContainer,
} from "./styles";
import Box from "../Box";
import Text from "../Text";
import AvailabilityDay from "./AvailabilityDay";
import AvailabilityModal from "./AvailabilityModal";

// Replaces the availability for a given date by first filtering out the
// existing availability for a given date and then spreading the new
// availability into a new array.
const replaceAvailabilityForDate = (existing, date, availability) => {
  const filtered = existing.filter(
    (v) => !DateTime.fromISO(v).hasSame(date, "day"),
  );

  return [...filtered, ...availability];
};

const Availability = ({ value, onChange, timezone }) => {
  const ref = useRef(null);
  const size = useComponentSize(ref);
  const [selectedDay, selectDay] = React.useState(null);
  const [month, setMonth] = React.useState(DateTime.local().startOf("month"));

  const handleItemsRendered = (item) => {
    const date = DateTime.local().plus({ days: item.visibleStartIndex });
    if (!month.hasSame(date, "month")) {
      setMonth(date.startOf("month"));
    }
  };

  const handleClickItem = (day) => {
    selectDay(day);
  };

  const availabilityForDate = (date) => {
    if (date === null) return [];
    return value.filter((v) => {
      return DateTime.fromISO(v).hasSame(date, "day");
    });
  };

  const setAvailabilityForDay = (date, availability) => {
    const nextValue = replaceAvailabilityForDate(value, date, availability);
    onChange(nextValue);
    selectDay(null);
  };

  return (
    <StyledAvailability ref={ref}>
      <AvailabilityModal
        timeZone={timezone}
        selectedDay={selectedDay}
        initialAvailability={availabilityForDate(selectedDay)}
        setAvailabilityForDay={setAvailabilityForDay}
      />
      <Text mb="s" fontSize="l" fontWeight="semibold">
        {month.toFormat("MMMM yyyy")}
      </Text>
      <List
        height={90}
        itemSize={() => 54}
        itemCount={367} // we render 365 days to the future
        layout="horizontal"
        innerElementType={StyledAvailabilityScrollContainer}
        onItemsRendered={handleItemsRendered}
        width={size.width}
      >
        {(item) => {
          const date = DateTime.local().plus({ days: item.index });

          return (
            <AvailabilityDay
              date={date}
              onClick={handleClickItem}
              availability={availabilityForDate(date)}
              {...item}
            />
          );
        }}
      </List>
    </StyledAvailability>
  );
};

export default Availability;
