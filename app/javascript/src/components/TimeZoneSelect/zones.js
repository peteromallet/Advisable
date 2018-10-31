import moment from "moment-timezone";

// returns an array of canonical time zones from moment-timezone.js excluding
// any Etc zones.
export default Object.keys(moment.tz._zones)
  .map(function(k) { return moment.tz._zones[k].split('|')[0]; })
  .filter(function(z) { return z.indexOf('/') >= 0; })
  .filter(function(z) { return z.indexOf('Etc') === -1; })
  .sort()
