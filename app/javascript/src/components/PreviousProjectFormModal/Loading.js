import React from "react";
import Loading from "../../components/Loading";
import { Box, Skeleton, Container } from "@advisable/donut";
import { StyledSidebar } from "./styles";
import PreviousProjectFormHeader from "./PreviousProjectFormHeader";

function Login({ modal }) {
  return (
    <>
      <PreviousProjectFormHeader modal={modal}>
        <Skeleton height="20px" width="50%" maxWidth="250px" />
      </PreviousProjectFormHeader>
      <Box paddingLeft={{ _: 0, m: "250px" }}>
        <StyledSidebar display={["none", "none", "block"]}>
          <Skeleton height="36px" mb="xs" borderRadius="20px" width="160px" />
          <Skeleton height="36px" mb="xs" borderRadius="20px" width="200px" />
          <Skeleton height="36px" mb="xs" borderRadius="20px" width="120px" />
          <Skeleton height="36px" mb="xs" borderRadius="20px" width="150px" />
        </StyledSidebar>
        <Container maxWidth="1100px" py="l">
          <Box display="flex">
            <Loading />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Login;
