import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@advisable/donut";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";

export default function GeneralForm() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <LoginWithGoogle size="xl" mode="user" navigate="/setup/company">
        Signup with Google
      </LoginWithGoogle>
      <Divider py={6}>Or</Divider>
      <Button
        variant="secondary"
        size="xl"
        onClick={() => navigate(`${location.pathname}/email`)}
        className="w-full"
      >
        Signup with email
      </Button>
    </motion.div>
  );
}
