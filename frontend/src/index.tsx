import { ApplicationInProgress, NewApplication } from 'components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/application/:id" Component={ApplicationInProgress} />
        <Route path="/" Component={NewApplication} />
      </Routes>
    </Router>
  </React.StrictMode>
);