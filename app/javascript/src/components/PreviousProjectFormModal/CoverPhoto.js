import { find } from "lodash";
import { Box } from "@advisable/donut";
import React from "react";

function CoverPhoto({ images }) {
  const cover = find(images, { cover: true });
  const [background, setBackground] = React.useState(cover?.url);

  React.useEffect(() => {
    if (cover?.uploading) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBackground(e.target.result);
      };

      reader.readAsDataURL(cover.file);
    } else {
      setBackground(cover?.url);
    }
  }, [cover]);

  if (!cover) return null;

  return (
    <Box
      mb="12px"
      borderRadius="12px"
      backgroundColor="neutral50"
      backgroundImage={`url('${background}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      height="250px"
    />
  );
}

export default CoverPhoto;
