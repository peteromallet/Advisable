import React from "react";
import find from "lodash/find";
import sortBy from "lodash/sortBy";
import { withKnobs } from "@storybook/addon-knobs";
import Text from "../Text";
import Card from "../Card";
import Autocomplete from "./";

export default {
  title: "Autocomplete",
  decorators: [withKnobs],
};

export const singleSelect = () => {
  const [value, setValue] = React.useState("");

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        value={value}
        label="Choose a country"
        placeholder="Country"
        onChange={v => setValue(v)}
        options={sortBy(COUNTRIES, "name").map(country => ({
          label: country.name,
          value: country.code,
          emoji: country.emoji,
        }))}
        formatLabel={country => {
          return (
            <>
              {country.emoji} {country.label}
            </>
          );
        }}
      />
    </Card>
  );
};

export const existingValue = () => {
  const [value, setValue] = React.useState("IE");

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        value={value}
        label="Choose a country"
        placeholder="Country"
        onChange={v => setValue(v)}
        options={sortBy(COUNTRIES, "name").map(country => ({
          label: country.name,
          value: country.code,
          emoji: country.emoji,
        }))}
        formatLabel={country => {
          return (
            <>
              {country.emoji} {country.label}
            </>
          );
        }}
      />
    </Card>
  );
};

export const multipleSelect = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        multiple
        value={value}
        label="Countries"
        placeholder="Select a country"
        onChange={v => setValue(v)}
        formatLabel={country => {
          return (
            <>
              {country.emoji} {country.label}
            </>
          );
        }}
        options={sortBy(COUNTRIES, "name").map(country => ({
          label: country.name,
          value: country.code,
          emoji: country.emoji,
        }))}
      />
    </Card>
  );
};

export const PrimarySelection = () => {
  const [value, setValue] = React.useState("");
  const [primary, setPrimary] = React.useState(null);

  const options = sortBy(COUNTRIES, "name").map(country => ({
    label: country.name,
    value: country.code,
    emoji: country.emoji,
  }));

  const primaryCountry = find(options, { value: primary });

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        multiple
        value={value}
        label="Countries"
        primary={primary}
        onPrimaryChange={p => setPrimary(p)}
        placeholder="Select a country"
        onChange={v => setValue(v)}
        options={options}
      />
      {primaryCountry && (
        <Text fontSize="s" mt="m">
          You have selected {primaryCountry.label} as your primary country.
        </Text>
      )}
    </Card>
  );
};

const COUNTRIES = [
  {
    code: "AD",
    name: "Andorra",
    emoji: "🇦🇩",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    emoji: "🇦🇪",
  },
  {
    code: "AF",
    name: "Afghanistan",
    emoji: "🇦🇫",
  },
  {
    code: "AG",
    name: "Antigua and Barbuda",
    emoji: "🇦🇬",
  },
  {
    code: "AI",
    name: "Anguilla",
    emoji: "🇦🇮",
  },
  {
    code: "AL",
    name: "Albania",
    emoji: "🇦🇱",
  },
  {
    code: "AM",
    name: "Armenia",
    emoji: "🇦🇲",
  },
  {
    code: "AO",
    name: "Angola",
    emoji: "🇦🇴",
  },
  {
    code: "AQ",
    name: "Antarctica",
    emoji: "🇦🇶",
  },
  {
    code: "AR",
    name: "Argentina",
    emoji: "🇦🇷",
  },
  {
    code: "AS",
    name: "American Samoa",
    emoji: "🇦🇸",
  },
  {
    code: "AT",
    name: "Austria",
    emoji: "🇦🇹",
  },
  {
    code: "AU",
    name: "Australia",
    emoji: "🇦🇺",
  },
  {
    code: "AW",
    name: "Aruba",
    emoji: "🇦🇼",
  },
  {
    code: "AX",
    name: "Åland",
    emoji: "🇦🇽",
  },
  {
    code: "AZ",
    name: "Azerbaijan",
    emoji: "🇦🇿",
  },
  {
    code: "BA",
    name: "Bosnia and Herzegovina",
    emoji: "🇧🇦",
  },
  {
    code: "BB",
    name: "Barbados",
    emoji: "🇧🇧",
  },
  {
    code: "BD",
    name: "Bangladesh",
    emoji: "🇧🇩",
  },
  {
    code: "BE",
    name: "Belgium",
    emoji: "🇧🇪",
  },
  {
    code: "BF",
    name: "Burkina Faso",
    emoji: "🇧🇫",
  },
  {
    code: "BG",
    name: "Bulgaria",
    emoji: "🇧🇬",
  },
  {
    code: "BH",
    name: "Bahrain",
    emoji: "🇧🇭",
  },
  {
    code: "BI",
    name: "Burundi",
    emoji: "🇧🇮",
  },
  {
    code: "BJ",
    name: "Benin",
    emoji: "🇧🇯",
  },
  {
    code: "BL",
    name: "Saint Barthélemy",
    emoji: "🇧🇱",
  },
  {
    code: "BM",
    name: "Bermuda",
    emoji: "🇧🇲",
  },
  {
    code: "BN",
    name: "Brunei",
    emoji: "🇧🇳",
  },
  {
    code: "BO",
    name: "Bolivia",
    emoji: "🇧🇴",
  },
  {
    code: "BQ",
    name: "Bonaire",
    emoji: "🇧🇶",
  },
  {
    code: "BR",
    name: "Brazil",
    emoji: "🇧🇷",
  },
  {
    code: "BS",
    name: "Bahamas",
    emoji: "🇧🇸",
  },
  {
    code: "BT",
    name: "Bhutan",
    emoji: "🇧🇹",
  },
  {
    code: "BV",
    name: "Bouvet Island",
    emoji: "🇧🇻",
  },
  {
    code: "BW",
    name: "Botswana",
    emoji: "🇧🇼",
  },
  {
    code: "BY",
    name: "Belarus",
    emoji: "🇧🇾",
  },
  {
    code: "BZ",
    name: "Belize",
    emoji: "🇧🇿",
  },
  {
    code: "CA",
    name: "Canada",
    emoji: "🇨🇦",
  },
  {
    code: "CC",
    name: "Cocos [Keeling] Islands",
    emoji: "🇨🇨",
  },
  {
    code: "CD",
    name: "Democratic Republic of the Congo",
    emoji: "🇨🇩",
  },
  {
    code: "CF",
    name: "Central African Republic",
    emoji: "🇨🇫",
  },
  {
    code: "CG",
    name: "Republic of the Congo",
    emoji: "🇨🇬",
  },
  {
    code: "CH",
    name: "Switzerland",
    emoji: "🇨🇭",
  },
  {
    code: "CI",
    name: "Ivory Coast",
    emoji: "🇨🇮",
  },
  {
    code: "CK",
    name: "Cook Islands",
    emoji: "🇨🇰",
  },
  {
    code: "CL",
    name: "Chile",
    emoji: "🇨🇱",
  },
  {
    code: "CM",
    name: "Cameroon",
    emoji: "🇨🇲",
  },
  {
    code: "CN",
    name: "China",
    emoji: "🇨🇳",
  },
  {
    code: "CO",
    name: "Colombia",
    emoji: "🇨🇴",
  },
  {
    code: "CR",
    name: "Costa Rica",
    emoji: "🇨🇷",
  },
  {
    code: "CU",
    name: "Cuba",
    emoji: "🇨🇺",
  },
  {
    code: "CV",
    name: "Cape Verde",
    emoji: "🇨🇻",
  },
  {
    code: "CW",
    name: "Curacao",
    emoji: "🇨🇼",
  },
  {
    code: "CX",
    name: "Christmas Island",
    emoji: "🇨🇽",
  },
  {
    code: "CY",
    name: "Cyprus",
    emoji: "🇨🇾",
  },
  {
    code: "CZ",
    name: "Czech Republic",
    emoji: "🇨🇿",
  },
  {
    code: "DE",
    name: "Germany",
    emoji: "🇩🇪",
  },
  {
    code: "DJ",
    name: "Djibouti",
    emoji: "🇩🇯",
  },
  {
    code: "DK",
    name: "Denmark",
    emoji: "🇩🇰",
  },
  {
    code: "DM",
    name: "Dominica",
    emoji: "🇩🇲",
  },
  {
    code: "DO",
    name: "Dominican Republic",
    emoji: "🇩🇴",
  },
  {
    code: "DZ",
    name: "Algeria",
    emoji: "🇩🇿",
  },
  {
    code: "EC",
    name: "Ecuador",
    emoji: "🇪🇨",
  },
  {
    code: "EE",
    name: "Estonia",
    emoji: "🇪🇪",
  },
  {
    code: "EG",
    name: "Egypt",
    emoji: "🇪🇬",
  },
  {
    code: "EH",
    name: "Western Sahara",
    emoji: "🇪🇭",
  },
  {
    code: "ER",
    name: "Eritrea",
    emoji: "🇪🇷",
  },
  {
    code: "ES",
    name: "Spain",
    emoji: "🇪🇸",
  },
  {
    code: "ET",
    name: "Ethiopia",
    emoji: "🇪🇹",
  },
  {
    code: "FI",
    name: "Finland",
    emoji: "🇫🇮",
  },
  {
    code: "FJ",
    name: "Fiji",
    emoji: "🇫🇯",
  },
  {
    code: "FK",
    name: "Falkland Islands",
    emoji: "🇫🇰",
  },
  {
    code: "FM",
    name: "Micronesia",
    emoji: "🇫🇲",
  },
  {
    code: "FO",
    name: "Faroe Islands",
    emoji: "🇫🇴",
  },
  {
    code: "FR",
    name: "France",
    emoji: "🇫🇷",
  },
  {
    code: "GA",
    name: "Gabon",
    emoji: "🇬🇦",
  },
  {
    code: "GB",
    name: "United Kingdom",
    emoji: "🇬🇧",
  },
  {
    code: "GD",
    name: "Grenada",
    emoji: "🇬🇩",
  },
  {
    code: "GE",
    name: "Georgia",
    emoji: "🇬🇪",
  },
  {
    code: "GF",
    name: "French Guiana",
    emoji: "🇬🇫",
  },
  {
    code: "GG",
    name: "Guernsey",
    emoji: "🇬🇬",
  },
  {
    code: "GH",
    name: "Ghana",
    emoji: "🇬🇭",
  },
  {
    code: "GI",
    name: "Gibraltar",
    emoji: "🇬🇮",
  },
  {
    code: "GL",
    name: "Greenland",
    emoji: "🇬🇱",
  },
  {
    code: "GM",
    name: "Gambia",
    emoji: "🇬🇲",
  },
  {
    code: "GN",
    name: "Guinea",
    emoji: "🇬🇳",
  },
  {
    code: "GP",
    name: "Guadeloupe",
    emoji: "🇬🇵",
  },
  {
    code: "GQ",
    name: "Equatorial Guinea",
    emoji: "🇬🇶",
  },
  {
    code: "GR",
    name: "Greece",
    emoji: "🇬🇷",
  },
  {
    code: "GS",
    name: "South Georgia and the South Sandwich Islands",
    emoji: "🇬🇸",
  },
  {
    code: "GT",
    name: "Guatemala",
    emoji: "🇬🇹",
  },
  {
    code: "GU",
    name: "Guam",
    emoji: "🇬🇺",
  },
  {
    code: "GW",
    name: "Guinea-Bissau",
    emoji: "🇬🇼",
  },
  {
    code: "GY",
    name: "Guyana",
    emoji: "🇬🇾",
  },
  {
    code: "HK",
    name: "Hong Kong",
    emoji: "🇭🇰",
  },
  {
    code: "HM",
    name: "Heard Island and McDonald Islands",
    emoji: "🇭🇲",
  },
  {
    code: "HN",
    name: "Honduras",
    emoji: "🇭🇳",
  },
  {
    code: "HR",
    name: "Croatia",
    emoji: "🇭🇷",
  },
  {
    code: "HT",
    name: "Haiti",
    emoji: "🇭🇹",
  },
  {
    code: "HU",
    name: "Hungary",
    emoji: "🇭🇺",
  },
  {
    code: "ID",
    name: "Indonesia",
    emoji: "🇮🇩",
  },
  {
    code: "IE",
    name: "Ireland",
    emoji: "🇮🇪",
  },
  {
    code: "IL",
    name: "Israel",
    emoji: "🇮🇱",
  },
  {
    code: "IM",
    name: "Isle of Man",
    emoji: "🇮🇲",
  },
  {
    code: "IN",
    name: "India",
    emoji: "🇮🇳",
  },
  {
    code: "IO",
    name: "British Indian Ocean Territory",
    emoji: "🇮🇴",
  },
  {
    code: "IQ",
    name: "Iraq",
    emoji: "🇮🇶",
  },
  {
    code: "IR",
    name: "Iran",
    emoji: "🇮🇷",
  },
  {
    code: "IS",
    name: "Iceland",
    emoji: "🇮🇸",
  },
  {
    code: "IT",
    name: "Italy",
    emoji: "🇮🇹",
  },
  {
    code: "JE",
    name: "Jersey",
    emoji: "🇯🇪",
  },
  {
    code: "JM",
    name: "Jamaica",
    emoji: "🇯🇲",
  },
  {
    code: "JO",
    name: "Jordan",
    emoji: "🇯🇴",
  },
  {
    code: "JP",
    name: "Japan",
    emoji: "🇯🇵",
  },
  {
    code: "KE",
    name: "Kenya",
    emoji: "🇰🇪",
  },
  {
    code: "KG",
    name: "Kyrgyzstan",
    emoji: "🇰🇬",
  },
  {
    code: "KH",
    name: "Cambodia",
    emoji: "🇰🇭",
  },
  {
    code: "KI",
    name: "Kiribati",
    emoji: "🇰🇮",
  },
  {
    code: "KM",
    name: "Comoros",
    emoji: "🇰🇲",
  },
  {
    code: "KN",
    name: "Saint Kitts and Nevis",
    emoji: "🇰🇳",
  },
  {
    code: "KP",
    name: "North Korea",
    emoji: "🇰🇵",
  },
  {
    code: "KR",
    name: "South Korea",
    emoji: "🇰🇷",
  },
  {
    code: "KW",
    name: "Kuwait",
    emoji: "🇰🇼",
  },
  {
    code: "KY",
    name: "Cayman Islands",
    emoji: "🇰🇾",
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    emoji: "🇰🇿",
  },
  {
    code: "LA",
    name: "Laos",
    emoji: "🇱🇦",
  },
  {
    code: "LB",
    name: "Lebanon",
    emoji: "🇱🇧",
  },
  {
    code: "LC",
    name: "Saint Lucia",
    emoji: "🇱🇨",
  },
  {
    code: "LI",
    name: "Liechtenstein",
    emoji: "🇱🇮",
  },
  {
    code: "LK",
    name: "Sri Lanka",
    emoji: "🇱🇰",
  },
  {
    code: "LR",
    name: "Liberia",
    emoji: "🇱🇷",
  },
  {
    code: "LS",
    name: "Lesotho",
    emoji: "🇱🇸",
  },
  {
    code: "LT",
    name: "Lithuania",
    emoji: "🇱🇹",
  },
  {
    code: "LU",
    name: "Luxembourg",
    emoji: "🇱🇺",
  },
  {
    code: "LV",
    name: "Latvia",
    emoji: "🇱🇻",
  },
  {
    code: "LY",
    name: "Libya",
    emoji: "🇱🇾",
  },
  {
    code: "MA",
    name: "Morocco",
    emoji: "🇲🇦",
  },
  {
    code: "MC",
    name: "Monaco",
    emoji: "🇲🇨",
  },
  {
    code: "MD",
    name: "Moldova",
    emoji: "🇲🇩",
  },
  {
    code: "ME",
    name: "Montenegro",
    emoji: "🇲🇪",
  },
  {
    code: "MF",
    name: "Saint Martin",
    emoji: "🇲🇫",
  },
  {
    code: "MG",
    name: "Madagascar",
    emoji: "🇲🇬",
  },
  {
    code: "MH",
    name: "Marshall Islands",
    emoji: "🇲🇭",
  },
  {
    code: "MK",
    name: "North Macedonia",
    emoji: "🇲🇰",
  },
  {
    code: "ML",
    name: "Mali",
    emoji: "🇲🇱",
  },
  {
    code: "MM",
    name: "Myanmar [Burma]",
    emoji: "🇲🇲",
  },
  {
    code: "MN",
    name: "Mongolia",
    emoji: "🇲🇳",
  },
  {
    code: "MO",
    name: "Macao",
    emoji: "🇲🇴",
  },
  {
    code: "MP",
    name: "Northern Mariana Islands",
    emoji: "🇲🇵",
  },
  {
    code: "MQ",
    name: "Martinique",
    emoji: "🇲🇶",
  },
  {
    code: "MR",
    name: "Mauritania",
    emoji: "🇲🇷",
  },
  {
    code: "MS",
    name: "Montserrat",
    emoji: "🇲🇸",
  },
  {
    code: "MT",
    name: "Malta",
    emoji: "🇲🇹",
  },
  {
    code: "MU",
    name: "Mauritius",
    emoji: "🇲🇺",
  },
  {
    code: "MV",
    name: "Maldives",
    emoji: "🇲🇻",
  },
  {
    code: "MW",
    name: "Malawi",
    emoji: "🇲🇼",
  },
  {
    code: "MX",
    name: "Mexico",
    emoji: "🇲🇽",
  },
  {
    code: "MY",
    name: "Malaysia",
    emoji: "🇲🇾",
  },
  {
    code: "MZ",
    name: "Mozambique",
    emoji: "🇲🇿",
  },
  {
    code: "NA",
    name: "Namibia",
    emoji: "🇳🇦",
  },
  {
    code: "NC",
    name: "New Caledonia",
    emoji: "🇳🇨",
  },
  {
    code: "NE",
    name: "Niger",
    emoji: "🇳🇪",
  },
  {
    code: "NF",
    name: "Norfolk Island",
    emoji: "🇳🇫",
  },
  {
    code: "NG",
    name: "Nigeria",
    emoji: "🇳🇬",
  },
  {
    code: "NI",
    name: "Nicaragua",
    emoji: "🇳🇮",
  },
  {
    code: "NL",
    name: "Netherlands",
    emoji: "🇳🇱",
  },
  {
    code: "NO",
    name: "Norway",
    emoji: "🇳🇴",
  },
  {
    code: "NP",
    name: "Nepal",
    emoji: "🇳🇵",
  },
  {
    code: "NR",
    name: "Nauru",
    emoji: "🇳🇷",
  },
  {
    code: "NU",
    name: "Niue",
    emoji: "🇳🇺",
  },
  {
    code: "NZ",
    name: "New Zealand",
    emoji: "🇳🇿",
  },
  {
    code: "OM",
    name: "Oman",
    emoji: "🇴🇲",
  },
  {
    code: "PA",
    name: "Panama",
    emoji: "🇵🇦",
  },
  {
    code: "PE",
    name: "Peru",
    emoji: "🇵🇪",
  },
  {
    code: "PF",
    name: "French Polynesia",
    emoji: "🇵🇫",
  },
  {
    code: "PG",
    name: "Papua New Guinea",
    emoji: "🇵🇬",
  },
  {
    code: "PH",
    name: "Philippines",
    emoji: "🇵🇭",
  },
  {
    code: "PK",
    name: "Pakistan",
    emoji: "🇵🇰",
  },
  {
    code: "PL",
    name: "Poland",
    emoji: "🇵🇱",
  },
  {
    code: "PM",
    name: "Saint Pierre and Miquelon",
    emoji: "🇵🇲",
  },
  {
    code: "PN",
    name: "Pitcairn Islands",
    emoji: "🇵🇳",
  },
  {
    code: "PR",
    name: "Puerto Rico",
    emoji: "🇵🇷",
  },
  {
    code: "PS",
    name: "Palestine",
    emoji: "🇵🇸",
  },
  {
    code: "PT",
    name: "Portugal",
    emoji: "🇵🇹",
  },
  {
    code: "PW",
    name: "Palau",
    emoji: "🇵🇼",
  },
  {
    code: "PY",
    name: "Paraguay",
    emoji: "🇵🇾",
  },
  {
    code: "QA",
    name: "Qatar",
    emoji: "🇶🇦",
  },
  {
    code: "RE",
    name: "Réunion",
    emoji: "🇷🇪",
  },
  {
    code: "RO",
    name: "Romania",
    emoji: "🇷🇴",
  },
  {
    code: "RS",
    name: "Serbia",
    emoji: "🇷🇸",
  },
  {
    code: "RU",
    name: "Russia",
    emoji: "🇷🇺",
  },
  {
    code: "RW",
    name: "Rwanda",
    emoji: "🇷🇼",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    emoji: "🇸🇦",
  },
  {
    code: "SB",
    name: "Solomon Islands",
    emoji: "🇸🇧",
  },
  {
    code: "SC",
    name: "Seychelles",
    emoji: "🇸🇨",
  },
  {
    code: "SD",
    name: "Sudan",
    emoji: "🇸🇩",
  },
  {
    code: "SE",
    name: "Sweden",
    emoji: "🇸🇪",
  },
  {
    code: "SG",
    name: "Singapore",
    emoji: "🇸🇬",
  },
  {
    code: "SH",
    name: "Saint Helena",
    emoji: "🇸🇭",
  },
  {
    code: "SI",
    name: "Slovenia",
    emoji: "🇸🇮",
  },
  {
    code: "SJ",
    name: "Svalbard and Jan Mayen",
    emoji: "🇸🇯",
  },
  {
    code: "SK",
    name: "Slovakia",
    emoji: "🇸🇰",
  },
  {
    code: "SL",
    name: "Sierra Leone",
    emoji: "🇸🇱",
  },
  {
    code: "SM",
    name: "San Marino",
    emoji: "🇸🇲",
  },
  {
    code: "SN",
    name: "Senegal",
    emoji: "🇸🇳",
  },
  {
    code: "SO",
    name: "Somalia",
    emoji: "🇸🇴",
  },
  {
    code: "SR",
    name: "Suriname",
    emoji: "🇸🇷",
  },
  {
    code: "SS",
    name: "South Sudan",
    emoji: "🇸🇸",
  },
  {
    code: "ST",
    name: "São Tomé and Príncipe",
    emoji: "🇸🇹",
  },
  {
    code: "SV",
    name: "El Salvador",
    emoji: "🇸🇻",
  },
  {
    code: "SX",
    name: "Sint Maarten",
    emoji: "🇸🇽",
  },
  {
    code: "SY",
    name: "Syria",
    emoji: "🇸🇾",
  },
  {
    code: "SZ",
    name: "Swaziland",
    emoji: "🇸🇿",
  },
  {
    code: "TC",
    name: "Turks and Caicos Islands",
    emoji: "🇹🇨",
  },
  {
    code: "TD",
    name: "Chad",
    emoji: "🇹🇩",
  },
  {
    code: "TF",
    name: "French Southern Territories",
    emoji: "🇹🇫",
  },
  {
    code: "TG",
    name: "Togo",
    emoji: "🇹🇬",
  },
  {
    code: "TH",
    name: "Thailand",
    emoji: "🇹🇭",
  },
  {
    code: "TJ",
    name: "Tajikistan",
    emoji: "🇹🇯",
  },
  {
    code: "TK",
    name: "Tokelau",
    emoji: "🇹🇰",
  },
  {
    code: "TL",
    name: "East Timor",
    emoji: "🇹🇱",
  },
  {
    code: "TM",
    name: "Turkmenistan",
    emoji: "🇹🇲",
  },
  {
    code: "TN",
    name: "Tunisia",
    emoji: "🇹🇳",
  },
  {
    code: "TO",
    name: "Tonga",
    emoji: "🇹🇴",
  },
  {
    code: "TR",
    name: "Turkey",
    emoji: "🇹🇷",
  },
  {
    code: "TT",
    name: "Trinidad and Tobago",
    emoji: "🇹🇹",
  },
  {
    code: "TV",
    name: "Tuvalu",
    emoji: "🇹🇻",
  },
  {
    code: "TW",
    name: "Taiwan",
    emoji: "🇹🇼",
  },
  {
    code: "TZ",
    name: "Tanzania",
    emoji: "🇹🇿",
  },
  {
    code: "UA",
    name: "Ukraine",
    emoji: "🇺🇦",
  },
  {
    code: "UG",
    name: "Uganda",
    emoji: "🇺🇬",
  },
  {
    code: "UM",
    name: "U.S. Minor Outlying Islands",
    emoji: "🇺🇲",
  },
  {
    code: "US",
    name: "United States",
    emoji: "🇺🇸",
  },
  {
    code: "UY",
    name: "Uruguay",
    emoji: "🇺🇾",
  },
  {
    code: "UZ",
    name: "Uzbekistan",
    emoji: "🇺🇿",
  },
  {
    code: "VA",
    name: "Vatican City",
    emoji: "🇻🇦",
  },
  {
    code: "VC",
    name: "Saint Vincent and the Grenadines",
    emoji: "🇻🇨",
  },
  {
    code: "VE",
    name: "Venezuela",
    emoji: "🇻🇪",
  },
  {
    code: "VG",
    name: "British Virgin Islands",
    emoji: "🇻🇬",
  },
  {
    code: "VI",
    name: "U.S. Virgin Islands",
    emoji: "🇻🇮",
  },
  {
    code: "VN",
    name: "Vietnam",
    emoji: "🇻🇳",
  },
  {
    code: "VU",
    name: "Vanuatu",
    emoji: "🇻🇺",
  },
  {
    code: "WF",
    name: "Wallis and Futuna",
    emoji: "🇼🇫",
  },
  {
    code: "WS",
    name: "Samoa",
    emoji: "🇼🇸",
  },
  {
    code: "XK",
    name: "Kosovo",
    emoji: "🇽🇰",
  },
  {
    code: "YE",
    name: "Yemen",
    emoji: "🇾🇪",
  },
  {
    code: "YT",
    name: "Mayotte",
    emoji: "🇾🇹",
  },
  {
    code: "ZA",
    name: "South Africa",
    emoji: "🇿🇦",
  },
  {
    code: "ZM",
    name: "Zambia",
    emoji: "🇿🇲",
  },
  {
    code: "ZW",
    name: "Zimbabwe",
    emoji: "🇿🇼",
  },
];
