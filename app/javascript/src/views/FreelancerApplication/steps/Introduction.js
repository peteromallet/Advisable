import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather";
import {
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
import BioLengthWidget from "./BioLengthWiget";
import StepNumber from "../components/StepNumber";
import AnimatedCard from "../components/AnimatedCard";
import { Description, Header } from "../components";

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

  if (loading) return <motion.div exit>loading...</motion.div>;

  return (
    <AnimatedCard>
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
            <Box mb={6}>
              <Text color="neutral900" mb={2} fontWeight="medium">
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
            <FormField
              as={Textarea}
              name="bio"
              minRows={5}
              label="Add a short bio"
              marginBottom={6}
              description="This will be shown on your public Advisable profile and shown to clients when you apply to projects. You can always update this later."
              placeholder="Tell us about yourself..."
              widget={BioLengthWidget}
            />
            <Label marginBottom="xs">Where are you based?</Label>
            <Box mb={8} display="flex">
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
                <Text mb={0.5} fontWeight="medium">
                  I’m okay with Advisable using my profile to promote me
                  publicly on Advisable
                </Text>
                <Text fontSize="s" color="neutral700">
                  You can always change this later in your settings
                </Text>
              </FormField>
            </Box>
            <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
