import pluralize from "pluralize";

export function shortlistDescription(shortlist, company) {
  const skill = shortlist.skills?.[0]?.skill?.name?.toLowerCase();
  let output = `Recommendations of ${skill} specialists relevant for`;
  if (company.industry || company.kind) {
    const industry = company.industry?.name?.toLowerCase();
    const companyType = company.kind
      ? pluralize(company.kind?.toLowerCase())
      : "companies";
    if (industry) output += ` ${industry}`;
    if (companyType) output += ` ${companyType}`;
  } else {
    output += " your company.";
  }

  return output;
}
