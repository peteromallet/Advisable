import React from "react";
import { motion } from "framer-motion";
import { Link, Button } from "@advisable/donut";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";

export default function StartApplication() {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="2">
      <LoginWithGoogle size="xl" mode="user" navigate="/setup">
        Signup with Google
      </LoginWithGoogle>
      <Divider py={6}>Or</Divider>
      <Button
        as={Link}
        variant="secondary"
        size="xl"
        to="/clients/join?email=true"
        className="w-full"
      >
        Signup with email
      </Button>
    </motion.div>
  );
}
