import { useLocation, useHistory } from "react-router-dom";

// Usefull for multistep wizards. This hook makes managing information
// about which steps have been skipped or complete easier.
function useLocationStages() {
  const history = useHistory();
  const location = useLocation();

  const pathWithState = (pathname) => {
    return {
      ...location,
      pathname,
    };
  };

  const navigate = (pathname) => {
    history.push(pathWithState(pathname));
  };

  const skip = (stepName, pathname) => {
    history.push({
      ...location,
      pathname,
      state: {
        ...location.state,
        skipped: [...(location.state?.skipped || []), stepName],
      },
    });
  };

  // Takes a name and return wether or not its inside the skipped location state array.
  const skipped = (name) => {
    return (location.state?.skipped || []).indexOf(name) > -1;
  };

  return {
    ...location,
    skip,
    navigate,
    skipped,
    pathWithState,
  };
}

export default useLocationStages;
