import React from "react";
import { Dialog } from "reakit/Dialog";
import { StyledDialog } from "./styles";
import { Box, Container } from "@advisable/donut";
import NavigationMenu from "./NavigationMenu";
import PreviousProjectFormHeader from "./PreviousProjectFormHeader";
import PreviousProjectFormRoutes from "./PreviousProjectFormRoutes";
export * from "./usePreviousProjectModal";

export default function PreviousProjectFormModal({ modal }) {
  return (
    <Dialog as={StyledDialog} aria-label="Previous Project Modal" {...modal}>
      <PreviousProjectFormHeader modal={modal} />
      <Container display="flex" py="l">
        <Box width={200} flexShrink={0}>
          <NavigationMenu>asdf</NavigationMenu>
        </Box>
        <Box pl="l">
          <PreviousProjectFormRoutes />
        </Box>
      </Container>
    </Dialog>
  );
}
