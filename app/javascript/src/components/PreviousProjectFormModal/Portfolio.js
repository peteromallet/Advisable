import React from "react";
import { find } from "lodash";
import { Link } from "react-router-dom";
import { Box, Text, Icon, RoundedButton } from "@advisable/donut";
import generateID from "../../utilities/generateID";
import CoverPhoto from "./CoverPhoto";
import ImageTiles from "./ImageTiles";
import Helper from "./Helper";

// We manage all of the photos inside of a state reducer. This is to make the UX when managing
// images a little better. e.g Allow users to change cover photos before the photos finish
// uploading. This state is an array of objects with the following attributes:
// - id: The previous project image UID. When a file is uploaded, this is generated on the
//       client side which allows to easily update the graphql cache once the upload completes
//       and the record is saved.
// - url: The url for the image. This will be null for images that are uploading.
// - file: The original file for the image. This will only be set for images that have just been
// .       uploaded and will be null for any images that are returned from the API on initial load.
// - uploading: Wether or not the image is currently uploading.
// - cover: Wether or not the image is the cover photo.
function reducer(state, action) {
  switch (action.type) {
    case "NEW_UPLOAD": {
      return [
        ...state,
        {
          id: generateID("ppi"),
          uploading: true,
          file: action.file,
          cover: action.cover,
          position: action.position,
        },
      ];
    }

    case "UPLOAD_FINISHED": {
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {
            ...image,
            ...action.image,
            uploading: false,
          };
        }

        return image;
      });
    }

    case "REMOVE_IMAGE": {
      const isCover = find(state, { id: action.id })?.cover || false;

      let nextState = state.filter((img) => img.id !== action.id);

      if (isCover) {
        nextState[0].cover = true;
      }

      return nextState;
    }

    case "SET_COVER": {
      const cover = find(state, { cover: true });

      return state.map((image) => {
        if (image.id === action.id) {
          return { ...image, cover: true };
        }

        if (image.id === cover?.id) {
          return { ...image, cover: false };
        }

        return image;
      });
    }
  }
}

export default function Portfolio({ modal, data }) {
  const [images, dispatch] = React.useReducer(
    reducer,
    data.previousProject.images,
  );

  return (
    <Box display="flex">
      <Box flexGrow={1} pr="xl">
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Portfolio
        </Text>
        <Text lineHeight="l" color="neutral600" mb="l">
          Previous projects are one of the most effective ways to validate your
          skills. Advisable uses them to decide what projects to invite you to.
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
        <Link
          to={`${modal.returnPath}/previous_projects/${data.previousProject.id}/validation`}
        >
          <RoundedButton size="l" mr="xs" suffix={<Icon icon="arrow-right" />}>
            Continue
          </RoundedButton>
        </Link>
        <Link
          to={`${modal.returnPath}/previous_projects/${data.previousProject.id}/validation`}
        >
          <RoundedButton variant="subtle" size="l">
            Skip
          </RoundedButton>
        </Link>
      </Box>
      <Box width={320} flexShrink={0}>
        <Helper>
          <Helper.Text heading="What's this for?" mb="l">
            The Advisable team will review and score the information you upload
            here in order to decide whether to propose you to clients.
          </Helper.Text>
          <Helper.Text heading="Who will see this?">
            This will be seen by potential clients when applying for projects on
            Advisable. Please provide as specific information as possible about
            the results of this project. Include URLs and examples of work where
            possible.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
