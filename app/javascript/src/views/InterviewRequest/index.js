import Loadable from 'react-loadable';
import Loading from 'src/components/Loading';

export default Loadable({
  loader: () => import('./InterviewRequest'),
  loading: Loading,
});
