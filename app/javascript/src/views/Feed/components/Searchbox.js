import { Search } from "@styled-icons/heroicons-solid";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "src/components/Input";

export default function Searchbox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      navigate(`/explore/search?q=${value}`);
    }
  };

  return (
    <div className="mb-4">
      <Input
        size="sm"
        prefix={<Search className="w-4 h-4" />}
        placeholder="Search..."
        rounded
        value={value}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
      />
    </div>
  );
}
