import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "src/components/Button";
import SearchIllustration from "src/illustrations/zest/search";

export default function Welcome() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[640px] mx-auto bg-white shadow-xl p-12 pb-16 text-center rounded-xl"
      >
        <SearchIllustration
          primaryColor="var(--color-pink-200)"
          secondaryColor="var(--color-blue900)"
          className="w-[200px] mx-auto"
        />
        <h2 className="text-3xl font-semibold tracking-tight mb-2 text-blue900">
          Welcome to Advisable!
        </h2>
        <p className="text-lg mb-8 text-neutral800">
          Let’s build your feed. Your answers to the next few questions will
          help us know what case studies to recommend.
        </p>
        <Link to="company">
          <Button size="lg" className="mx-auto">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
