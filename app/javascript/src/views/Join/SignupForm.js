import React from "react";
import { motion } from "framer-motion";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";
import EmailForm from "./EmailForm";

export default function SingupForm() {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <LoginWithGoogle size="xl" mode="user" navigate="/setup/company">
        Signup with Google
      </LoginWithGoogle>
      <Divider py={6}>Or</Divider>
      <EmailForm />
    </motion.div>
  );
}
