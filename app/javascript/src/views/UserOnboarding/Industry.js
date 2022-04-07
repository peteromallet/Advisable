import React, { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Input from "src/components/Input";
import { ChevronRight, Search } from "@styled-icons/heroicons-solid";
import { useUpdateCompany } from "./queries";

export default function Industry({ data }) {
  const [update] = useUpdateCompany();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const filteredIndustries = useMemo(() => {
    if (!searchValue?.trim()) return data.industries;

    const fuse = new Fuse(data.industries, { keys: ["name"] });
    return fuse.search(searchValue).map((obj) => obj.item);
  }, [searchValue, data]);

  const handleSelection = (industry) => async () => {
    await update({
      variables: {
        input: { industry: industry.id },
      },
    });

    navigate("../audience");
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4 md:mb-12">
        <h2 className="font-semibold text-2xl md:text-3xl tracking-tight leading-none mb-1 text-blue900">
          What industry is your company in?
        </h2>
        <p className="md:text-lg text-neutral700 mb-6">
          We’ll use this to recommend projects from similar industries.
        </p>
        <div className="w-auto md:w-[400px] mx-auto">
          <Input
            rounded
            autoFocus
            prefix={<Search className="w-5 h-5 text-neutral600" />}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredIndustries.map((industry) => (
          <div
            key={industry.id}
            data-testid="industry"
            className="bg-white flex items-center shadow-md rounded-md p-5 cursor-pointer border-2 border-solid border-transparent hover:shadow-xl hover:border-neutral700"
            onClick={handleSelection(industry)}
          >
            <div className="flex-1">{industry.name}</div>
            <ChevronRight className="w-5 h-5 text-neutral600 shrink-0" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
