import React from "react";
import { motion } from "framer-motion";
import { Link } from "@advisable/donut";
import Button from "src/components/Button";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";

export default function StartApplication() {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="2">
      <LoginWithGoogle size="xl" mode="user" navigate="/setup">
        Signup with Google
      </LoginWithGoogle>
      <Divider py={6}>Or</Divider>
      <Link to="/clients/join?email=true" className="w-full rounded-full">
        <Button size="lg" variant="secondary" className="w-full">
          Signup with email
        </Button>
      </Link>
    </motion.div>
  );
}
