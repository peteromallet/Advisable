import { DateTime } from "luxon";
import { curry } from "lodash-es";

const isoToLocalFormat = curry((format, iso) => {
  const timezone = DateTime.local().zoneName;
  return DateTime.fromISO(iso).setZone(timezone).toFormat(format);
});

export default isoToLocalFormat;
