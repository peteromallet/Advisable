import { gql } from "@apollo/client";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import FormField from "components/FormField";
import { useQuery, useMutation } from "@apollo/client";
import SubmitButton from "components/SubmitButton";
import { Modal, Text, Autocomplete, Select, useModal } from "@advisable/donut";

export const GET_INDUSTRIES = gql`
  {
    industries {
      id
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        companyType
        industry {
          id
          name
        }
      }
    }
  }
`;

const validationSchema = object().shape({
  industry: string().required("Please select an industry"),
  companyType: string().nullable().required("Please select a company type"),
});

export default function UpdateIndustryModal({ industry, companyType }) {
  // Show the update industry modal if there is no industry or company type set
  const visible = !industry || !companyType;
  const modal = useModal({ visible });
  const { loading, data } = useQuery(GET_INDUSTRIES, { skip: !visible });
  const [updateUser] = useMutation(UPDATE_USER);

  const initialValues = {
    industry: "",
    companyType: null,
  };

  const handleSubmit = async (values) => {
    await updateUser({
      variables: {
        input: values,
      },
    });

    modal.hide();
  };

  return (
    <Modal
      padding="40px"
      modal={modal}
      loading={loading}
      hideOnClickOutside={false}
      showCloseButton={false}
      label="Update industry"
    >
      <Text
        fontSize="24px"
        color="blue900"
        marginBottom="xs"
        fontWeight="medium"
        letterSpacing="-0.07rem"
      >
        We need to confirm some details
      </Text>

      <Text color="neutral600" letterSpacing="-0.02rem" marginBottom="l">
        Please confirm what industry you are based in.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <FormField
              as={Autocomplete}
              name="industry"
              label="Industry"
              marginBottom="m"
              onChange={(industry) =>
                formik.setFieldValue("industry", industry)
              }
              options={(data?.industries || []).map((i) => ({
                label: i.name,
                value: i.name,
              }))}
            />
            <FormField
              as={Select}
              marginBottom="l"
              name="companyType"
              label="Company Type"
            >
              <option>Individual Entrepreneur</option>
              <option>Small Business</option>
              <option>Medium-Sized Business</option>
              <option>Startup</option>
              <option>Growth-Stage Startup</option>
              <option>Major Corporation</option>
              <option>Non-Profit</option>
              <option>Education Institution</option>
              <option>Government</option>
            </FormField>
            <SubmitButton variant="dark">Update Details</SubmitButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
