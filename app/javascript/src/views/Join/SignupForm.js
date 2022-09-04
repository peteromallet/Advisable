import React from "react";
import { useBreakpoint } from "@advisable/donut";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";
import EmailForm from "./EmailForm";

export default function SingupForm() {
  const isMobile = useBreakpoint("s");
  return (
    <>
      <LoginWithGoogle
        size={isMobile ? "l" : "xl"}
        mode="user"
        navigate="/setup/company"
      >
        Signup with Google
      </LoginWithGoogle>
      <Divider py={[4, 6]}>Or</Divider>
      <EmailForm />
    </>
  );
}
