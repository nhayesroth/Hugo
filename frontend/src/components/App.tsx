import { ApplicationInProgress } from 'components/ApplicationInProgress';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NewApplication } from './NewApplication';

/**
 * Base component that maps our two routes to their corresponding components.
 */
export function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={NewApplication} />
        <Route path="/application/:id" Component={ApplicationInProgress} />
      </Routes>
    </Router>
  );
}