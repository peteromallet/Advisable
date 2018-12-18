// A simple react hook that will reset the view scroll back to 0 when the
// component mounts.
import { useEffect} from 'react';

export default (selector) => {
  useEffect(() => {
    if (selector) {
      const el = document.querySelector(selector)
      el.scrollTo(0, 0)
    } else {
      window.scrollTo(0,0); 
    }
  }, [])
}