// import React, { createContext, useContext } from "react";
// import { useQuery } from "@apollo/client";
// import { generateResourcesQuery } from "../../utilities/queries";
// import { useSchemaIntrospection } from "../schema";

// const ResourcesContext = createContext();

// export function useResources() {
//   return useContext(ResourcesContext);
// }

// export function getResource(resources, name) {
//   return resources.find((r) => r.name === name);
// }

// export function getResourceByType(resources, name) {
//   return resources.find((r) => r.resourceType === name);
// }

// export function getResourceColumn(resources, resourceType, column) {
//   return getResourceByType(resources, resourceType).columns.find(
//     (c) => c.field === column,
//   );
// }

// export default function Resources({ children }) {
//   const schema = useSchemaIntrospection();
//   const GET_RESOURCES = generateResourcesQuery(schema);
//   const { data, loading } = useQuery(GET_RESOURCES);

//   return (
//     <ResourcesContext.Provider value={data?.__resources}>
//       {loading ? <>loading...</> : children}
//     </ResourcesContext.Provider>
//   );
// }
