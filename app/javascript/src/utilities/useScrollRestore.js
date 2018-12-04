// A simple react hook that will reset the view scroll back to 0 when the
// component mounts.
import { useEffect} from 'react';

export default () => {
  useEffect(() => {
    document.getElementById("AppRoot").scrollTo(0, 0)
  }, [])
}