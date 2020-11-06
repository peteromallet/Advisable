import React from "react";
import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Box, Text, Button, Link } from "@advisable/donut";
import useLocationStages from "../../hooks/useLocationStages";
import Helper from "./Helper";
import CoverPhoto from "./CoverPhoto";
import ImageTiles from "./ImageTiles";
import useImageReducer from "./useImageReducer";
import { Chunk } from 'editmode-react';

export default function Portfolio({ modal, data }) {
  const { navigate, skip, pathWithState } = useLocationStages();
  const [images, dispatch] = useImageReducer(data.previousProject.images);

  const handleContinue = () => {
    navigate(
      `${modal.returnPath}/previous_projects/${data.previousProject.id}/more`,
    );
  };

  const handleSkip = () => {
    skip(
      "PORTFOLIO",
      `${modal.returnPath}/previous_projects/${data.previousProject.id}/more`,
    );
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Link
          mb="s"
          fontSize="l"
          fontWeight="medium"
          to={pathWithState(
            `${modal.returnPath}/previous_projects/${data.previousProject.id}/overview`,
          )}
        >
          <Box display="inline-block" mr="xxs">
            <ArrowLeft size={20} strokeWidth={2} />
          </Box>
          <Chunk identifier='portfolio_back_btn'>Back</Chunk>
        </Link>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          <Chunk identifier='portfolio_header'>Portfolio</Chunk>
        </Text>
        <Text lineHeight="l" color="neutral600" mb="l">
          <Chunk identifier='portfolio_description'>
            Add images related to the work you carried out on this project.
            You can select one mage as the project cover photo.
          </Chunk>
        </Text>
        <Box mb="xl">
          <CoverPhoto images={images} dispatch={dispatch} />
          {images.length > 0 && (
            <ImageTiles
              images={images}
              dispatch={dispatch}
              previousProjectId={data.previousProject.id}
            />
          )}
        </Box>
        <Button
          size="l"
          mr="xs"
          onClick={handleContinue}
          suffix={<ArrowRight />}
          disabled={data.previousProject.images.length === 0}
        >
          <Chunk identifier='portfolio_submit_btn'>Continue</Chunk>
        </Button>
        <Button onClick={handleSkip} variant="subtle" size="l">
          <Chunk identifier='portfolio_skip_btn'>Skip</Chunk>
        </Button>
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading={<Chunk identifier='what_is_this_helper_title'>What&apos;s this for?</Chunk>} mb="l">
            <Chunk identifier='portfolio_what_is_this_helper_description'>
              The Advisable team will review and score the images you upload here in order to decide whether
              to propose you to clients.
            </Chunk>
          </Helper.Text>
          <Helper.Text heading={<Chunk identifier='portfolio_who_will_see_this_helper_title'>Who will see this?</Chunk>}>
            <Chunk identifier='portfolio_who_will_see_this_helper_description'>
              The images you upload will be seen by potential clients when applying for projects on Advisable.
            </Chunk>
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
