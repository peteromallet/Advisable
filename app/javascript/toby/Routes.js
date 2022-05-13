import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Resource from "./views/resource";
import { resourcePath, pluralizeType } from "./utilities";
import { useToby } from "./components/TobyProvider";

export default function TobyRoutes() {
  const { resources } = useToby();

  return (
    <Routes>
      {resources.map((resource) => (
        <Route
          key={resource.type}
          path={`/${pluralizeType(resource.type)}/*`}
          element={<Resource resource={resource} />}
        />
      ))}
      <Route path="*" element={<Navigate to={resourcePath(resources[0])} />} />
    </Routes>
  );
}
