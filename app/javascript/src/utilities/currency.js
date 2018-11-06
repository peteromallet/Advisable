export const currencySymbol = currency => symbols[currency] || currency || "€"

export default (amount, currency = "EUR") => {
  const symbol = currencySymbol(currency)
  if (symbol != null) {
    return `${symbol}${amount}`;
  } else {
    return `${amount} ${currency}`;
  }
};

const symbols = {
  AED: "AED",
  BHD: "BHD",
  ILS: "₪",
  PEN: "S/.",
  XPF: "XPF",
  USD: "$",
  XOF: "XOF",
  EUR: "€",
  AFN: "؋",
  GEL: "GEL",
  NZD: "$",
  HNL: "L",
  CLP: "CLP",
  SBD: "$",
  CVE: "CVE",
  AUD: "$",
  JOD: "JOD",
  YER: "﷼",
  MKD: "ден",
  NPR: "₨",
  CRC: "₡",
  TRY: "TL",
  KGS: "лв",
  BIF: "BIF",
  XCD: "$",
  ERN: "ERN",
  none: "none",
  UAH: "₴",
  ANG: "ƒ",
  GBP: "£",
  QAR: "﷼",
  FKP: "£",
  KES: "KES",
  BMD: "$",
  JMD: "J$",
  CAD: "$",
  TJS: "TJS",
  SSP: "SSP",
  XAF: "XAF",
  CHF: "CHF",
  TND: "TND",
  BBD: "$",
  CNY: "¥",
  AOA: "AOA",
  UZS: "лв",
  DZD: "DZD",
  AMD: "AMD",
  UGX: "UGX",
  IMP: "IMP",
  KPW: "₩",
  SDG: "SDG",
  SGD: "$",
  PLN: "zł",
  ZMW: "ZMW",
  RUB: "руб",
  HRK: "kn",
  DJF: "DJF",
  IQD: "IQD",
  SYP: "£",
  JPY: "¥",
  RON: "lei",
  MMK: "MMK",
  MAD: "MAD",
  SRD: "$",
  TWD: "NT$",
  THB: "฿",
  KYD: "$",
  NOK: "kr",
  EGP: "£",
  SCR: "₨",
  INR: "INR",
  MGA: "MGA",
  MZN: "MT",
  GGP: "GGP",
  BGN: "лв",
  CUP: "CUP",
  PHP: "Php",
  SAR: "﷼",
  STN: "STN",
  KMF: "KMF",
  BND: "$",
  MVR: "MVR",
  MYR: "RM",
  CZK: "Kč",
  MNT: "₮",
  ALL: "Lek",
  OMR: "﷼",
  BZD: "BZ$",
  SHP: "£",
  COP: "COP",
  LRD: "$",
  JEP: "JEP",
  GNF: "GNF",
  SOS: "S",
  TOP: "TOP",
  RSD: "Дин.",
  HUF: "Ft",
  BAM: "KM",
  GMD: "GMD",
  FJD: "$",
  MXN: "MXN",
  HTG: "HTG",
  MOP: "MOP",
  WST: "WST",
  MRU: "MRU",
  NAD: "NAD",
  LKR: "₨",
  XDR: "XDR",
  KWD: "KWD",
  BOB: "BOB",
  VUV: "VUV",
  CDF: "CDF",
  MUR: "₨",
  PKR: "₨",
  KZT: "лв",
  ISK: "kr",
  BTN: "BTN",
  GHS: "GHS",
  SLL: "SLL",
  SEK: "kr",
  LYD: "LYD",
  PYG: "Gs",
  VEF: "Bs",
  BSD: "$",
  GTQ: "Q",
  DKK: "kr",
  BDT: "BDT",
  AWG: "ƒ",
  KRW: "₩",
  VND: "₫",
  DOP: "RD$",
  UYU: "UYU",
  RWF: "RWF",
  ARS: "$",
  LSL: "LSL",
  ZAR: "R",
  PGK: "PGK",
  LAK: "₭",
  BRL: "R$",
  AZN: "ман",
  BYN: "BYN",
  MDL: "MDL",
  BWP: "P",
  KHR: "៛",
  TTD: "TT$",
  LBP: "£",
  HKD: "$",
  TMT: "TMT",
  NIO: "C$",
  MWK: "MWK",
  IDR: "Rp",
  GIP: "£",
  IRR: "﷼",
  SZL: "SZL",
  TZS: "TZS",
  NGN: "₦",
  ETB: "ETB",
  GYD: "$"
};
