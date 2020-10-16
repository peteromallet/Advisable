import { Calendar } from "@styled-icons/feather";
import { Box, Circle, Text } from "@advisable/donut";

export default function Event({ date, zone }) {
  const zoned = zone ? date.setZone(zone) : date;

  return (
    <Box
      bg="neutral100"
      borderRadius={12}
      display="flex"
      alignItems="center"
      padding="s"
    >
      <Circle bg="blue800" color="blue100" size={40} mr="s">
        <Calendar size={20} strokeWidth={2} />
      </Circle>
      <Box>
        <Text mb="xxs" fontWeight="semibold" color="neutral900">
          {zoned.toFormat("cccc, dd MMMM")}
        </Text>
        <Text fontSize="s" color="neutral600" textAlign="left">
          {`${zoned.toFormat("h:mm a")} - ${zoned
            .plus({ minutes: 30 })
            .toFormat("h:mm a")}`}
        </Text>
      </Box>
    </Box>
  );
}
