import { ArrowLeft, ArrowRight } from "@styled-icons/feather";
import { Box, Text, Button, Link } from "@advisable/donut";
import useLocationStages from "../../hooks/useLocationStages";
import Helper from "./Helper";
import CoverPhoto from "./CoverPhoto";
import ImageTiles from "./ImageTiles";
import useImageReducer from "./useImageReducer";

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
          Back
        </Link>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Portfolio
        </Text>
        <Text lineHeight="l" color="neutral600" mb="l">
          Add images related to the work you carried out on this project. You
          can select one mage as the project cover photo.
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
          Continue
        </Button>
        <Button onClick={handleSkip} variant="subtle" size="l">
          Skip
        </Button>
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading="What's this for?" mb="l">
            The Advisable team will review and score the images you upload here
            in order to decide whether to propose you to clients.
          </Helper.Text>
          <Helper.Text heading="Who will see this?">
            The images you upload will be seen by potential clients when
            applying for projects on Advisable.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
