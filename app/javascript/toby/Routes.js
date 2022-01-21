import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Resource from "./views/resource";
import { resourcePath } from "./utilities";
import { useResources } from "./components/resources";

export default function TobyRoutes() {
  const resources = useResources();

  return (
    <Routes>
      {resources.map((resource) => (
        <Route key={resource.type} path={resourcePath(resource)}>
          <Resource resource={resource} />
        </Route>
      ))}
      <Route path="*">
        <Navigate to={resourcePath(resources[0])} />
      </Route>
    </Routes>
  );
}
