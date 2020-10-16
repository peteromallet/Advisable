export { useManagePreviousProjects } from "./queries";
import PreviousProjectsList from "./PreviousProjectsList";

// For this component we expect the useManagePreviousProjects hook to be called
// from the parent and spread as props to the component. This is becuase in
// some areas, we also need to read the previous projects query from the parent
// (e.g FullApplication view). This prevents us having to duplicate the query
// string everywhere it is used.
function ManagePreviousProjects({ loading, data }) {
  if (loading) {
    return <>loading...</>;
  }

  return (
    <PreviousProjectsList
      previousProjects={data.viewer.previousProjects.nodes}
    />
  );
}

export default ManagePreviousProjects;
