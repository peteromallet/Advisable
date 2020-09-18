import React, { useLayoutEffect } from "react";
import { useTheme, VerticalLayout } from "@advisable/donut";
import Header from "@guild/components/Header";

const HeaderLayout = ({ children }) => {
  const theme = useTheme();

  useLayoutEffect(() => {
    theme.updateTheme({ background: "ghostWhite" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <VerticalLayout header={<Header />}>{children}</VerticalLayout>;
};

export default HeaderLayout;
