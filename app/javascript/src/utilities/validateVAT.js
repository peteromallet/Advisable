const VAT_REGEX = {
  CH: /^(CHE)(\d{9})(MWST|TVA|IVA)?$/, // Switzerland
  NO: /^(NO)(\d{9})(MVA)?$/, // Norway
};

function generateVatRegex(code) {
  return new RegExp(`^${code}[a-zA-Z0-9]{8,12}$`);
}

export function validateVAT(countryCode, value) {
  const regex = VAT_REGEX[countryCode] || generateVatRegex(countryCode);
  return regex.test(value);
}
