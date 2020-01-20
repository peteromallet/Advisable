import React from "react";
import { get } from "lodash";
import gql from "graphql-tag";
import { useLazyQuery } from "react-apollo";
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
      previousProjects {
        project {
          ... on Project {
            id
            airtableId
            description
            primarySkill
            user {
              companyName
            }
          }
          ... on OffPlatformProject {
            id
            airtableId
            description
            primarySkill
            clientName
            confidential
            skills
            industry
            validationStatus
          }
        }
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
              </Box>
              {specialist.previousProjects.length > 0 && (
                <>
                  <Text
                    as="h4"
                    pl="l"
                    fontSize="xl"
                    color="neutral.8"
                    letterSpacing="-0.03rem"
                    fontWeight="semibold"
                  >
                    Previous Projects
                  </Text>
                  <PreviousProjects
                    showValidationStatus={false}
                    specialistId={specialist.airtableId}
                    previousProjects={specialist.previousProjects}
                  />
                </>
              )}
            </Box>
          )}
        </Scrollable>
      </Box>
    </Modal>
  );
};

export default SpecialistModal;
