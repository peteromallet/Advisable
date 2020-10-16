import { Text } from "@advisable/donut";
import {
  StyledAvailabilityInputColumn,
  StyledAvailabilityInputCell,
} from "./styles";

function Time({ children }) {
  return (
    <StyledAvailabilityInputCell>
      <Text fontSize="11px" fontWeight="medium" color="neutral900">
        {children}
      </Text>
    </StyledAvailabilityInputCell>
  );
}

function AvailabilityInputTimes() {
  return (
    <StyledAvailabilityInputColumn>
      <Time>00:00</Time>
      <Time>00:30</Time>
      <Time>01:00</Time>
      <Time>01:30</Time>
      <Time>02:00</Time>
      <Time>02:30</Time>
      <Time>03:00</Time>
      <Time>03:30</Time>
      <Time>04:00</Time>
      <Time>04:30</Time>
      <Time>05:00</Time>
      <Time>05:30</Time>
      <Time>06:00</Time>
      <Time>06:30</Time>
      <Time>07:00</Time>
      <Time>07:30</Time>
      <Time>08:00</Time>
      <Time>08:30</Time>
      <Time>09:00</Time>
      <Time>09:30</Time>
      <Time>10:00</Time>
      <Time>10:30</Time>
      <Time>11:00</Time>
      <Time>11:30</Time>
      <Time>12:00</Time>
      <Time>12:30</Time>
      <Time>13:00</Time>
      <Time>13:30</Time>
      <Time>14:00</Time>
      <Time>14:30</Time>
      <Time>15:00</Time>
      <Time>15:30</Time>
      <Time>16:00</Time>
      <Time>16:30</Time>
      <Time>17:00</Time>
      <Time>17:30</Time>
      <Time>18:00</Time>
      <Time>18:30</Time>
      <Time>19:00</Time>
      <Time>19:30</Time>
      <Time>20:00</Time>
      <Time>20:30</Time>
      <Time>21:00</Time>
      <Time>21:30</Time>
      <Time>22:00</Time>
      <Time>22:30</Time>
      <Time>23:00</Time>
      <Time>23:30</Time>
    </StyledAvailabilityInputColumn>
  );
}

export default AvailabilityInputTimes;
