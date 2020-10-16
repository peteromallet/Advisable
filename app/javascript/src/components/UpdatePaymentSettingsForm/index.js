import { get } from "lodash-es";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Button, Box, Text, Select } from "@advisable/donut";
import FormField from "../FormField";
import AddressFields from "../AddressFields";
import validationSchema from "./validationSchema";
import { GET_PAYMENT_SETTINGS, UPDATE_PAYMENT_SETTINGS } from "./queries";

const UpdatePaymentSettingsForm = ({
  buttonLabel = "Save Changes",
  onSuccess,
}) => {
  const { data, loading } = useQuery(GET_PAYMENT_SETTINGS);
  const [updatePaymentSettings] = useMutation(UPDATE_PAYMENT_SETTINGS);

  const handleSubmit = async (values, formikBag) => {
    await updatePaymentSettings({
      variables: { input: values },
    });

    formikBag.setSubmitting(false);

    if (onSuccess) onSuccess();
  };

  let initialValues = {
    bankHolderName:
      get(data, "viewer.bankHolderName") || get(data, "viewer.name"),
    bankCurrency:
      get(data, "viewer.bankCurrency") ||
      get(data, "viewer.country.currency.isoCode"),
    vatNumber: get(data, "viewer.vatNumber") || "",
    bankHolderAddress: {
      line1: get(data, "viewer.bankHolderAddress.line1", "") || "",
      line2: get(data, "viewer.bankHolderAddress.line2", "") || "",
      city: get(data, "viewer.bankHolderAddress.city", "") || "",
      state: get(data, "viewer.bankHolderAddress.state", "") || "",
      country:
        get(data, "viewer.bankHolderAddress.country") ||
        get(data, "viewer.country.id"),
      postcode: get(data, "viewer.bankHolderAddress.postcode") || "",
    },
  };

  let currencies = get(data, "currencies", []).map((currency) => ({
    label: `${currency.name} (${currency.isoCode})`,
    value: currency.isoCode,
  }));

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <FormField
            marginBottom="m"
            name="bankHolderName"
            label="Bank account holder name"
            placeholder="Full name or company name..."
            description="Please provide the name of the bank account holder. Either your full name or company name."
          />
          <Box mb="m">
            <AddressFields
              label="Bank holder address"
              name="bankHolderAddress"
            />
          </Box>
          <FormField
            label="Bank account currency"
            marginBottom="m"
            as={Select}
            name="bankCurrency"
          >
            {currencies.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </FormField>
          <FormField
            marginBottom="m"
            name="vatNumber"
            label="VAT Number"
            placeholder="VAT Number..."
            description="Provide your VAT number if you have one."
          />
          <Text size="xs" color="neutral600" lineHeight="s" mb="l">
            All payments are made directly to your bank account via
            TransferWise: once your payment has been processed, TransferWise
            will send you an email where you can securely enter your bank
            account details
          </Text>
          <Button loading={formik.isSubmitting}>{buttonLabel}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePaymentSettingsForm;
