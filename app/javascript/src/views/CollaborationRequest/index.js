import React from "react";
import { X } from "@styled-icons/heroicons-solid";
import { Box, useBackground } from "@advisable/donut";
import CircularButton from "src/components/CircularButton";
import { Link } from "react-router-dom";
import View from "src/components/View";
import PostContent from "./PostContent";

export default function CollaborationRequest() {
  useBackground("white");

  return (
    <View>
      <Box position="absolute" right="20px" top="20px">
        <Link to="/">
          <CircularButton icon={<X />} />
        </Link>
      </Box>
      <Box maxWidth="800px" marginX="auto" padding={12}>
        <PostContent />
      </Box>
    </View>
  );
}
