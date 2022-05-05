import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "src/components/Button";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import ArticleCardsComposition from "src/components/ArticleCardsComposition";

export default function Welcome() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[640px] mx-auto bg-white shadow-xl rounded-xl"
      >
        <ArticleCardsComposition />
        <div className="pt-6 p-2 md:p-10 md:pb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2 text-blue900">
            Let's build your feed
          </h2>
          <p className="px-4 md:px-8 md:text-lg mb-6 md:mb-12 text-neutral800">
            Before we give you access, we need you to answer a few questions
            about your company and interests in order to customise your
            experience.
          </p>
          <div className="p-4 md:p-0">
            <Link to="company" className="block md:inline-block">
              <Button
                size="lg"
                className="w-full mx-auto"
                suffix={<ArrowSmRight />}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
