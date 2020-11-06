import React from "react";
import { Box, Text } from "@advisable/donut";
import Helper from "./Helper";
import CoverPhoto from "./CoverPhoto";
import ImageTiles from "./ImageTiles";
import useImageReducer from "./useImageReducer";
import { Chunk } from 'editmode-react';

function EditImages({ data }) {
  const [images, dispatch] = useImageReducer(data.previousProject.images);

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          <Chunk identifier='edit_project_image_header'>Images</Chunk>
        </Text>
        <Text lineHeight="l" color="neutral600" mb="l">
          <Chunk identifier='edit_project_image_description'>
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
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading={<Chunk identifier='edit_project_image_what_is_this_helper_title'>What&apos;s this for?</Chunk>} mb="l">
            <Chunk identifier='edit_project_image_what_is_this_helper_description'>
              The Advisable team will review and score the images you upload here in order to
              decide whether to propose you to clients.
            </Chunk>
          </Helper.Text>
          <Helper.Text heading={<Chunk identifier='edit_project_image_who_will_see_helper_title'>Who will see this?</Chunk>}>
            <Chunk identifier='edit_project_image_who_will_see_helper_description'>
              The images you upload will be seen by potential clients when applying for projects on Advisable.
            </Chunk>
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}

export default EditImages;
