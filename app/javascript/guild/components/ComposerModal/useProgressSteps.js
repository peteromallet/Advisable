import { useLocation, useHistory } from "react-router-dom";

function useProgressSteps() {
  const history = useHistory();
  const location = useLocation();

  const progress = (stepName, pathname) => {
    history.push({
      ...location,
      pathname,
      state: {
        ...location.state,
        progressed: [...(location.state?.progressed || []), stepName],
      },
    });
  };

  const progressed = (name) => {
    return (location.state?.progressed || []).indexOf(name) > -1;
  };

  return {
    progressed,
    progress,
  };
}

export default useProgressSteps;
