import React from "react";
import { times } from "lodash";
import { DateTime } from "luxon";
import { Formik, Field } from "formik";
import Icon from "../Icon";
import Box from "../Box";
import Text from "../Text";
import Select from "../Select";
import VerticalLayout from "../VerticalLayout";
import InputDecorations from "../Input/InputDecorations";
import TIMEZONES from "./timezones";
import {
  StyledAvailabilityFormButton,
  StyledTime,
  StyledTimeCheckbox,
} from "./styles";

const AvailabilityFormTimes = ({ selectedDay, formik }) => {
  const dateISO = selectedDay.toISOWeekDate();
  const start = DateTime.fromISO(dateISO, { zone: formik.values.timeZone });

  return times(48, n => {
    const t = start.plus({ minutes: 30 * n });

    return (
      <Box key={n} borderBottom="1px solid" borderColor="neutral.1">
        <StyledTime htmlFor={`time-${n}`}>
          <Field
            type="checkbox"
            id={`time-${n}`}
            name="availability"
            value={t.toUTC().toISO()}
          />
          <StyledTimeCheckbox>
            <Icon
              width={14}
              height={14}
              icon="check"
              color="white.9"
              strokeWidth={2.2}
            />
          </StyledTimeCheckbox>
          {t.toFormat("HH:mma")} → {t.plus({ minutes: 30 }).toFormat("HH:mma")}
        </StyledTime>
      </Box>
    );
  });
};

const AvailabilityForm = ({
  initialAvailability,
  selectedDay,
  setAvailabilityForDay,
  setAvailabilityForWeek,
}) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollTo(0, 925);
    }, 10);
  }, []);

  // The intialAvailability might not be the same exact ISO format that luxon
  // outputs. i.e it might be missing miliseconds. Because of this we iterate
  // through the initialAvailability array and use luxon to recreate the ISO
  // so that we know it will be the same as the ISO generated for the checkbox
  // values.
  const asLuxonISOs = initialAvailability.map(iso => {
    return DateTime.fromISO(iso)
      .toUTC()
      .toISO();
  });

  const localTimeZone = DateTime.local().zoneName;

  const initialValues = {
    timeZone: localTimeZone,
    availability: asLuxonISOs,
  };

  const handleSubmit = values => {
    setAvailabilityForDay(selectedDay, values.availability);
  };

  const createHandlerForSetWeek = formik => {
    return () => {
      setAvailabilityForWeek(selectedDay, formik.values.availability);
    };
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formik => (
        <form onSubmit={formik.handleSubmit} style={{ height: "100%" }}>
          <VerticalLayout
            header={
              <Box padding="m" boxShadow="s">
                <Text
                  fontSize="xxl"
                  mb="xs"
                  color="neutral.9"
                  fontWeight="semibold"
                  letterSpacing="-0.02em"
                >
                  {selectedDay.toFormat("cccc, dd MMM yyyy")}
                </Text>
                <Text color="neutral.7" mb="m" letterSpacing="-0.01em">
                  Select the times you available.
                </Text>
                <InputDecorations
                  prefix={<label htmlFor="timezone">Timezone</label>}
                >
                  <Field as={Select} name="timeZone" id="timezone">
                    {TIMEZONES.map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </Field>
                </InputDecorations>
              </Box>
            }
            footer={
              <Box px="m" py="xs" boxShadow="s" display="flex">
                <Box width="100%" mr="xxs">
                  <StyledAvailabilityFormButton type="Submit">
                    <Icon width={20} height={20} icon="plus" />
                    <br />
                    Add for {selectedDay.toFormat("dd MMM")}
                  </StyledAvailabilityFormButton>
                </Box>
                <Box width="100%" ml="xxs">
                  <StyledAvailabilityFormButton
                    type="button"
                    onClick={createHandlerForSetWeek(formik)}
                  >
                    <Icon width={20} height={20} icon="calendar" />
                    <br />
                    Add for the week
                  </StyledAvailabilityFormButton>
                </Box>
              </Box>
            }
          >
            <div
              style={{ height: "100%", overflowY: "scroll" }}
              ref={scrollRef}
            >
              <AvailabilityFormTimes
                selectedDay={selectedDay}
                formik={formik}
              />
            </div>
          </VerticalLayout>
        </form>
      )}
    </Formik>
  );
};

export default AvailabilityForm;
