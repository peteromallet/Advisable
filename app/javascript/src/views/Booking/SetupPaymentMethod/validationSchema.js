import * as Yup from "yup";
import { find } from "lodash";

export const invoiceSettingsValidation = countries =>
  Yup.object().shape({
    name: Yup.string().required("Please enter your full name."),
    companyName: Yup.string().required("Please enter your company name."),
    address: Yup.object().shape({
      line1: Yup.string().required("Line 1 is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
    }),
    vatNumber: Yup.string().when("address.country", {
      is: code => {
        const country = find(countries, { id: code });
        return country ? country.eu : false;
      },
      then: Yup.string().required("Please provide your VAT ID"),
    }),
  });

export const paymentTermsValidation = Yup.object().shape({
  acceptTerms: Yup.boolean().oneOf(
    [true, false],
    "Please accept the payment terms"
  ),
  exceptionalTerms: Yup.string().when("acceptTerms", {
    is: false,
    then: Yup.string().required("Please outline your suggested terms."),
  }),
});
