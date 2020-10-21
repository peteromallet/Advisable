import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { RemoveScroll } from "react-remove-scroll";
import { useToggle } from "@guild/hooks/useToggle";
import { StyledModal, ModalClose } from "@guild/components/Modal/styles";
import { ImagesButton, ImageModalOverrides } from "./styles";
import { Camera } from "@guild/icons";
import Mask from "@guild/components/Mask";

const PostImages = ({ images }) => {
  const [showModal, toggleModal] = useToggle();
  const galleryImages = images.map(({ url }, index) => ({
    original: url,
    description: `Image: ${index + 1}`,
    sizes: "(max-width: 640px) 80vw, 640px",
  }));

  return (
    <>
      <ImageModalOverrides />
      <ImagesButton onClick={toggleModal}>
        <Camera size="24" />
      </ImagesButton>

      {showModal && (
        <RemoveScroll>
          <StyledModal display="flex" flexDirection="column" p="l">
            <ModalClose onClose={toggleModal} />
            <ImageGallery
              items={galleryImages}
              showFullscreenButton={true}
              showPlayButton={false}
              showBullets={images.length > 1}
              showThumbnails={false}
            />
          </StyledModal>
        </RemoveScroll>
      )}
      <Mask header={false} isOpen={showModal} toggler={toggleModal} />
    </>
  );
};

export default PostImages;
