import { useState } from "react";
import { Box, Card } from "../../../../../donut/src";
import StarRatingInput from "./";

export default {
  title: "Star Rating Input",
};

export const basic = () => {
  const [value, setValue] = useState(undefined);
  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Card maxWidth="600px" mx="auto" my="60px" padding="xl">
      <Box display="flex" alignItems="center" justifyContent="center">
        <StarRatingInput value={value} onChange={handleChange} />
      </Box>
    </Card>
  );
};
