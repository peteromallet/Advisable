import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import {
  Box,
  Text,
  Textarea,
  Label,
  Checkbox,
  Select,
  Avatar,
  Error,
} from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FileUpload from "src/components/FileUpload";
import FormField from "src/components/FormField";
import StepNumber from "../components/StepNumber";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import { UPDATE_PROFILE } from "../queries";
import { boolean, object, string } from "yup";
import DefaultAvatarIcon from "../components/DefaultAvatarIcon";
import { SPECIALIST_BIO_LENGTH } from "src/constants";

export const validationSchema = object().shape({
  avatar: string().nullable(),
  bio: string()
    .max(
      SPECIALIST_BIO_LENGTH,
      `Please keep your biography simple. It must be at most ${SPECIALIST_BIO_LENGTH} characters`,
    )
    .required("Please provide your short biography"),
  city: string().required("Please enter your city"),
  country: string().required("Please enter you country"),
  publicUse: boolean(),
});

export default function Introduction({ specialist, countries }) {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = React.useState(specialist?.avatar);
  const [update] = useMutation(UPDATE_PROFILE);

  const initialValues = {
    avatar: null,
    bio: specialist.bio || "",
    city: specialist.city || "",
    country: specialist.country?.id || "",
    publicUse: specialist.publicUse === null ? true : specialist.publicUse,
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    navigate("/freelancers/apply/overview");
  };

  return (
    <AnimatedCard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 1 of 5</StepNumber>
            <Header>Introduction</Header>
            <Description>
              We&apos;d like to start by learning some of the basic details
              about you.
            </Description>
            <Box mb={6}>
              <Text color="neutral900" mb={2} fontWeight="medium">
                Add your profile photo
              </Text>
              <FileUpload
                name="upload-avatar"
                onChange={(blob) => {
                  formik.setFieldValue("avatar", blob.signed_id);
                }}
                preview={(file) => {
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setProfilePhoto(e.target.result);
                    reader.readAsDataURL(file);
                  }
                  if (profilePhoto) {
                    return (
                      <Avatar
                        name={specialist.name}
                        url={profilePhoto}
                        size="s"
                      />
                    );
                  }
                  return <DefaultAvatarIcon />;
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
              description="This will be displayed on your profile when clients discover you. You can always update this later."
              placeholder="Tell us about yourself..."
              charLimit={SPECIALIST_BIO_LENGTH}
            />
            <Label marginBottom="xs">Where are you based?</Label>
            <Box display={["block", "flex"]} mb="l">
              <Box mr={[0, 3]} mb={[6, 0]} width="100%">
                <FormField name="city" width="100%" placeholder="City" />
              </Box>
              <Box width="100%">
                <FormField as={Select} name="country" placeholder="Country">
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </FormField>
              </Box>
            </Box>
            <Box mb={4}>
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
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
