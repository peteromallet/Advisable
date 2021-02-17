import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import {
  Card,
  Box,
  Text,
  Textarea,
  Avatar,
  Label,
  Input,
  Checkbox,
  Select,
} from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FileUpload from "src/components/FileUpload";
import FormField from "src/components/FormField";
import StepNumber from "./StepNumber";
import BioLengthWidget from "./BioLengthWiget";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather";
import { Description, Header } from "./components";

export const GET_COUNTRIES = gql`
  {
    countries {
      value: id
      label: name
    }
  }
`;

export default function Introduction(specialist) {
  const history = useHistory();
  const [profilePhoto, setProfilePhoto] = React.useState(specialist?.avatar);
  const { data, loading } = useQuery(GET_COUNTRIES);

  const initialValues = {
    avatar: undefined,
    bio: "",
    city: "",
    country: "",
    publicUse: "",
  };

  const handleSubmit = () => {
    history.push("/freelancers/apply/overview");
  };

  if (loading) return <div>loading...</div>;

  return (
    <Card padding={10} borderRadius="12px">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <StepNumber>Step 1 of 5</StepNumber>
            <Header>Introduction</Header>
            <Description>
              Every freelancer has that one project that stands out in there
              mind. The one that you were so excited to complete and add to your
              portfolio. Tell us about one of your previous projects that you
              are most proud of and why.
            </Description>
            <Box mb="m">
              <Text color="neutral900" mb="xs" fontWeight="medium">
                Add your profile photo
              </Text>
              <FileUpload
                onChange={(blob) => {
                  formik.setFieldValue("avatar", blob.signed_id);
                }}
                preview={(file) => {
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setProfilePhoto(e.target.result);
                    reader.readAsDataURL(file);
                  }
                  return (
                    <Avatar
                      name={specialist.name}
                      url={profilePhoto}
                      size="m"
                    />
                  );
                }}
                label="Upload a profile photo"
                accept=".png, .jpg, .jpeg"
                maxSizeInMB={1}
              />
            </Box>
            <Box mb="l">
              <FormField
                as={Textarea}
                name="bio"
                minRows={5}
                label="About me"
                description="Add a short 2 - 3 sentence bio to describe who you are. A well structured bio demonstrates your experience and expertise by referencing past projects and achievements, including notable clients or numeric results. You will have a chance to customize this each time you apply for a project."
                placeholder="Add a short 2 - 3 sentence bio to describe who you are."
                widget={BioLengthWidget}
              />
            </Box>
            <Label marginBottom="xs">Where are you based?</Label>
            <Box mb="m" display="flex">
              <Box flex={1} pr="xxs">
                <FormField
                  as={Input}
                  name="city"
                  placeholder="City"
                  error={formik.touched.city && formik.errors.city}
                />
              </Box>
              <Box flex={1} pl="xxs">
                <FormField
                  as={Select}
                  name="country"
                  placeholder="Country"
                  data-testid="country"
                  options={data.countries}
                  error={formik.touched.country && formik.errors.country}
                >
                  {data.countries.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </FormField>
              </Box>
            </Box>
            <Box mb="l">
              <FormField as={Checkbox} type="checkbox" name="publicUse">
                I’m okay with Advisable using my profile to promote me publicly
                on advisable.com
              </FormField>
            </Box>
            <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
