import React from "react";
import { get } from "lodash-es";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
import { Box, Text, Modal } from "@advisable/donut";
import Avatar from "../Avatar";
import Loading from "../Loading";
import Scrollable from "../Scrollable";
import PreviousProjects from "../PreviousProjects";
import TagCloud from "./TagCloud";
import Attributes from "./Attributes";

const GET_DATA = gql`
  query specialist($id: ID!) {
    specialist(id: $id) {
      id
      name
      airtableId
      firstName
      hourlyRate
      avatar
      bio
      location
      hourlyRate
      skills(projectSkills: true) {
        name
        verified
      }
      previousProjectsCount
      reviewsCount
      ratings {
        overall
      }
      profileProjects {
        id
        title
        excerpt
        reviews {
          id
          name
          role
          comment
          ratings {
            overall
            skills
            qualityOfWork
            adherenceToSchedule
            availability
            communication
          }
        }
      }
    }
  }
`;

const SpecialistModal = ({ modal, specialistId }) => {
  const [getSpecialist, { loading, data, error }] = useLazyQuery(GET_DATA);

  React.useEffect(() => {
    if (modal.visible) {
      getSpecialist({
        variables: {
          id: specialistId,
        },
      });
    }
  }, [modal, specialistId]);

  const specialist = get(data, "specialist");

  return (
    <Modal
      width={700}
      modal={modal}
      label="Specialist details"
      loading={loading}
    >
      <Box overflowY="auto">
        {error && <>Something went wrong</>}
        <Scrollable>
          {!specialist ? (
            <Loading />
          ) : (
            <Box>
              <Box padding="l">
                <Box mb="m">
                  <Avatar
                    size="l"
                    name={specialist.name}
                    url={specialist.avatar}
                  />
                </Box>
                <Text
                  mb="xxs"
                  fontSize="xxl"
                  color="neutral.9"
                  fontWeight="semibold"
                  letterSpacing="-0.02rem"
                >
                  {specialist.name}
                </Text>
                <Text color="neutral.6" fontSize="s" letterSpacing="-0.015rem">
                  {specialist.location}
                </Text>
                <Attributes specialist={specialist} />
                <Text
                  mb="m"
                  fontSize={15}
                  fontWeight={400}
                  color="neutral.7"
                  lineHeight={1.35}
                  letterSpacing="-0.01rem"
                >
                  {specialist.bio}
                </Text>
                <TagCloud
                  tags={specialist.skills}
                  name={specialist.firstName}
                />
                {specialist.profileProjects.length > 0 && (
                  <>
                    <Text
                      my="l"
                      as="h4"
                      fontSize="xl"
                      color="blue900"
                      fontWeight="medium"
                      letterSpacing="-0.01rem"
                    >
                      Previous Projects
                    </Text>
                    <Box height={1} bg="neutral100" />
                    <PreviousProjects
                      showValidationStatus={false}
                      specialistId={specialist.airtableId}
                      previousProjects={specialist.profileProjects}
                    />
                  </>
                )}
              </Box>
            </Box>
          )}
        </Scrollable>
      </Box>
    </Modal>
  );
};

export default SpecialistModal;
