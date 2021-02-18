import React from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather";
import {
  Box,
  Text,
  Textarea,
  Avatar,
  Label,
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
import { UPDATE_INTRODUCTION } from "../queries";

export const GET_COUNTRIES = gql`
  {
    countries {
      id
      name
      __typename
    }
  }
`;

export default function Introduction({ specialist }) {
  const history = useHistory();
  const [profilePhoto, setProfilePhoto] = React.useState(specialist?.avatar);
  const { data, loading } = useQuery(GET_COUNTRIES);
  const [update] = useMutation(UPDATE_INTRODUCTION);

  const initialValues = {
    avatar: undefined,
    bio: specialist.bio || "",
    city: specialist.city || "",
    country: specialist.country?.id || "",
    publicUse: specialist.publicUse === null ? true : specialist.publicUse,
  };

  const handleSubmit = async ({ avatar, ...values }) => {
    if (avatar) {
      values.avatar = avatar;
      await update({ variables: { input: values } });
    } else {
      update({
        variables: { input: values },
        optimisticResponse: {
          __typename: "Mutation",
          updateProfile: {
            __typename: "UpdateProfilePayload",
            specialist: {
              __typename: "Specialist",
              id: specialist.id,
              ...values,
              avatar: specialist.avatar,
              country: data.countries.find((c) => c.id === values.country),
            },
          },
        },
      });
    }

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
            <Box display={["block", "flex"]} mb="l">
              <Box mr={[0, 3]} mb={[6, 0]} width="100%">
                <FormField name="city" width="100%" placeholder="City" />
              </Box>
              <Box width="100%">
                <FormField as={Select} name="country" placeholder="Country">
                  {data.countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
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
