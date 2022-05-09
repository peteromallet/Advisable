import React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Button } from "@advisable/donut";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";

export default function GeneralForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <LoginWithGoogle size="xl" mode="user" navigate="/setup">
        Signup with Google
      </LoginWithGoogle>
      <Divider py={6}>Or</Divider>
      <Button
        variant="secondary"
        size="xl"
        onClick={() => {
          searchParams.set("email", true);
          setSearchParams(searchParams);
        }}
        className="w-full"
      >
        Signup with email
      </Button>
    </motion.div>
  );
}
