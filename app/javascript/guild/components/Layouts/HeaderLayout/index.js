import React, { useLayoutEffect } from "react";
import { useTheme, VerticalLayout } from "@advisable/donut";
import Header from "@guild/components/Header";
import styled from "styled-components";
import { GuildBox } from "@guild/styles";

const HeaderLayout = ({ children }) => {
  const theme = useTheme();

  useLayoutEffect(() => {
    theme.updateTheme({ background: "ghostWhite" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VerticalLayout header={<Header />}>
      <VerticalContainer>{children}</VerticalContainer>
    </VerticalLayout>
  );
};

const VerticalContainer = styled(GuildBox)`
  margin: 0 auto !important;
  max-width: 1600px;
`;

export default HeaderLayout;
